import React, { forwardRef, useEffect, useState, useCallback, useRef } from 'react';
import { Anchor as AnchorIcon } from 'lucide-react';
import './Anchor.css';

export interface AnchorItem {
  key: string;
  title: React.ReactNode;
  href: string;
  children?: AnchorItem[];
}

export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: AnchorItem[];
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  offsetTop?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  container?: HTMLElement | string | (() => HTMLElement);
  namespace?: string;
}

export const Anchor = forwardRef<HTMLDivElement, AnchorProps>(({
  items = [],
  activeKey,
  onChange,
  offsetTop = 0,
  affix = false,
  showInkInFixed = true,
  className = '',
  style,
  'aria-label': ariaLabel,
  container,
  namespace,
  ...props
}, ref) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(activeKey || '');
  const [isFixed, setIsFixed] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const isScrollingToTarget = useRef(false);
  
  const currentActiveKey = activeKey ?? internalActiveKey;

  // Process items with namespace
  const processedItems = React.useMemo(() => {
    if (!namespace) return items;
    
    const processItem = (item: AnchorItem): AnchorItem => ({
      ...item,
      href: item.href.startsWith('#') ? `#${namespace}-${item.href.slice(1)}` : item.href,
      children: item.children?.map(processItem)
    });
    
    return items.map(processItem);
  }, [items, namespace]);

  // Get scroll container
  useEffect(() => {
    if (!container) {
      setScrollContainer(null);
      return;
    }

    let containerElement: HTMLElement | null = null;

    if (typeof container === 'string') {
      containerElement = document.querySelector(container);
    } else if (typeof container === 'function') {
      containerElement = container();
    } else {
      containerElement = container;
    }

    setScrollContainer(containerElement);
  }, [container]);

  // Get scroll position and dimensions
  const getScrollInfo = useCallback(() => {
    if (scrollContainer) {
      return {
        scrollTop: scrollContainer.scrollTop,
        scrollHeight: scrollContainer.scrollHeight,
        clientHeight: scrollContainer.clientHeight,
        getBoundingClientRect: () => scrollContainer.getBoundingClientRect()
      };
    }
    
    return {
      scrollTop: window.pageYOffset || document.documentElement.scrollTop,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: window.innerHeight,
      getBoundingClientRect: () => ({ top: 0, left: 0 })
    };
  }, [scrollContainer]);

  // Smooth scroll to target element
  const scrollToTarget = useCallback((href: string, key: string) => {
    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    isScrollingToTarget.current = true;
    
    if (scrollContainer) {
      // Scroll within container
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top;
      const scrollTop = scrollContainer.scrollTop + relativeTop - offsetTop;

      scrollContainer.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    } else {
      // Scroll document
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offsetTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // Update active key
    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);

    // Reset scroll flag after animation
    setTimeout(() => {
      isScrollingToTarget.current = false;
    }, 800);
  }, [scrollContainer, offsetTop, activeKey, onChange]);

  // Handle scroll to detect active section
  useEffect(() => {
    if (processedItems.length === 0) return;

    const handleScroll = () => {
      if (isScrollingToTarget.current) return;

      const scrollInfo = getScrollInfo();
      let activeItem: string = '';
      let minDistance = Infinity;

      // Check all items (including nested ones)
      const checkItems = (itemList: AnchorItem[]) => {
        itemList.forEach(item => {
          const element = document.querySelector(item.href);
          if (!element) return;

          let elementTop: number;
          
          if (scrollContainer) {
            // Calculate position relative to container
            const containerRect = scrollContainer.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            elementTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
          } else {
            // Calculate position relative to document
            elementTop = element.getBoundingClientRect().top + scrollInfo.scrollTop;
          }
          
          const distance = Math.abs(elementTop - scrollInfo.scrollTop - offsetTop);
          
          // Check if element is in view
          const threshold = scrollContainer ? 50 : 50;
          if (elementTop <= scrollInfo.scrollTop + offsetTop + threshold && distance < minDistance) {
            minDistance = distance;
            activeItem = item.key;
          }
          
          if (item.children) {
            checkItems(item.children);
          }
        });
      };

      checkItems(processedItems);

      if (activeItem && activeItem !== currentActiveKey) {
        if (activeKey === undefined) {
          setInternalActiveKey(activeItem);
        }
        onChange?.(activeItem);
      }
    };

    const target = scrollContainer || window;
    const eventOptions = { passive: true };
    
    target.addEventListener('scroll', handleScroll, eventOptions);
    handleScroll(); // Initial check

    return () => {
      target.removeEventListener('scroll', handleScroll, eventOptions);
    };
  }, [processedItems, currentActiveKey, offsetTop, activeKey, onChange, scrollContainer, getScrollInfo]);

  // Handle affix behavior (only for document scroll)
  useEffect(() => {
    if (!affix || scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > offsetTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [affix, offsetTop, scrollContainer]);

  // Update ink position
  useEffect(() => {
    if (!inkRef.current || !currentActiveKey || !anchorRef.current) return;

    const activeLink = anchorRef.current.querySelector(`[data-anchor-key="${currentActiveKey}"]`);
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const containerRect = anchorRef.current.getBoundingClientRect();
      const top = rect.top - containerRect.top + anchorRef.current.scrollTop;
      const height = rect.height;

      inkRef.current.style.top = `${top}px`;
      inkRef.current.style.height = `${height}px`;
      inkRef.current.style.opacity = '1';
    } else {
      inkRef.current.style.opacity = '0';
    }
  }, [currentActiveKey, processedItems]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: AnchorItem) => {
    e.preventDefault();
    scrollToTarget(item.href, item.key);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, item: AnchorItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTarget(item.href, item.key);
    }
  };

  const renderAnchorItem = (item: AnchorItem, level: number = 0) => {
    const isActive = currentActiveKey === item.key;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.key} className="ui-anchor-item-wrapper">
        <a
          href={item.href}
          data-anchor-key={item.key}
          className={`ui-anchor-link ${isActive ? 'ui-anchor-link--active' : ''} ui-anchor-link--level-${level}`}
          onClick={(e) => handleLinkClick(e, item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          role="button"
          tabIndex={0}
          aria-current={isActive ? 'location' : undefined}
        >
          <span className="ui-anchor-link-title">{item.title}</span>
        </a>
        {hasChildren && (
          <div className="ui-anchor-children">
            {item.children!.map(child => renderAnchorItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Build class names
  const baseClass = 'ui-anchor';
  const affixClass = affix && isFixed && !scrollContainer ? 'ui-anchor--fixed' : '';
  const showInkClass = showInkInFixed || !isFixed ? 'ui-anchor--show-ink' : '';

  const classes = [baseClass, affixClass, showInkClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label={ariaLabel || 'Page navigation'}
      role="navigation"
    >
      <div ref={anchorRef} className="ui-anchor-wrapper">
        <div className="ui-anchor-ink-wrapper">
          <div ref={inkRef} className="ui-anchor-ink" />
        </div>
        <div className="ui-anchor-content">
          {processedItems.map(item => renderAnchorItem(item))}
        </div>
      </div>
    </div>
  );
});
