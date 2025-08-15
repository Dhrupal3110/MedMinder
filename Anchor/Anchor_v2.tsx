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
  containerId?: string; // ID of the scrollable container (optional)
  anchorId?: string; // Unique ID for this anchor instance
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
  containerId,
  anchorId,
  ...props
}, ref) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(activeKey || '');
  const [isFixed, setIsFixed] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const isScrollingToTarget = useRef(false);
  const instanceId = useRef(anchorId || `anchor-${Math.random().toString(36).substr(2, 9)}`);
  
  const currentActiveKey = activeKey ?? internalActiveKey;

  // Get the scroll container (either specified container or window)
  const getScrollContainer = useCallback(() => {
    if (containerId) {
      return document.getElementById(containerId);
    }
    return null; // Use window
  }, [containerId]);

  // Get scroll position for container or window
  const getScrollTop = useCallback((container: HTMLElement | null) => {
    if (container) {
      return container.scrollTop;
    }
    return window.pageYOffset || document.documentElement.scrollTop;
  }, []);

  // Get container rect for relative positioning
  const getContainerRect = useCallback((container: HTMLElement | null) => {
    if (container) {
      return container.getBoundingClientRect();
    }
    return { top: 0, left: 0 };
  }, []);

  // Generate unique href for this instance
  const getUniqueHref = useCallback((originalHref: string) => {
    if (anchorId || containerId) {
      const prefix = anchorId || containerId;
      // Remove the # if present and add our prefix
      const cleanHref = originalHref.replace('#', '');
      return `#${prefix}-${cleanHref}`;
    }
    return originalHref;
  }, [anchorId, containerId]);

  // Process items to add unique hrefs
  const processedItems = React.useMemo(() => {
    const processItem = (item: AnchorItem): AnchorItem => ({
      ...item,
      href: getUniqueHref(item.href),
      children: item.children?.map(processItem)
    });
    
    return items.map(processItem);
  }, [items, getUniqueHref]);

  // Smooth scroll to target element
  const scrollToTarget = useCallback((href: string, key: string) => {
    const container = getScrollContainer();
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      isScrollingToTarget.current = true;
      
      if (container) {
        // Scroll within container
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top;
        const scrollPosition = container.scrollTop + relativeTop - offsetTop;
        
        container.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      } else {
        // Scroll window
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
    }
  }, [getScrollContainer, offsetTop, activeKey, onChange]);

  // Handle scroll to detect active section
  useEffect(() => {
    if (processedItems.length === 0) return;

    const container = getScrollContainer();
    const scrollElement = container || window;

    const handleScroll = () => {
      if (isScrollingToTarget.current) return;

      const scrollTop = getScrollTop(container);
      const containerRect = getContainerRect(container);
      let activeItem: string = '';
      let minDistance = Infinity;

      // Check all items (including nested ones)
      const checkItems = (itemList: AnchorItem[]) => {
        itemList.forEach(item => {
          const element = document.querySelector(item.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            let elementTop: number;
            
            if (container) {
              // Calculate position relative to container
              elementTop = rect.top - containerRect.top + container.scrollTop;
              const distance = Math.abs(elementTop - scrollTop - offsetTop);
              
              if (elementTop <= scrollTop + offsetTop + 50 && distance < minDistance) {
                minDistance = distance;
                activeItem = item.key;
              }
            } else {
              // Calculate position relative to window
              elementTop = rect.top + window.pageYOffset;
              const distance = Math.abs(elementTop - scrollTop - offsetTop);
              
              if (elementTop <= scrollTop + offsetTop + 50 && distance < minDistance) {
                minDistance = distance;
                activeItem = item.key;
              }
            }
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

    const eventOptions = { passive: true };
    scrollElement.addEventListener('scroll', handleScroll, eventOptions);
    handleScroll(); // Initial check

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [processedItems, currentActiveKey, offsetTop, activeKey, onChange, getScrollContainer, getScrollTop, getContainerRect]);

  // Handle affix behavior (only works with window scroll)
  useEffect(() => {
    if (!affix || containerId) return; // Affix only works with window scroll

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > offsetTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [affix, offsetTop, containerId]);

  // Update ink position
  useEffect(() => {
    if (!inkRef.current || !currentActiveKey) return;

    const activeLink = anchorRef.current?.querySelector(`[data-anchor-key="${currentActiveKey}"]`);
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const containerRect = anchorRef.current!.getBoundingClientRect();
      const top = rect.top - containerRect.top + anchorRef.current!.scrollTop;
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
  const affixClass = affix && isFixed ? 'ui-anchor--fixed' : '';
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
      data-anchor-instance={instanceId.current}
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

Anchor.displayName = 'Anchor';
