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
  ...props
}, ref) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(activeKey || '');
  const [isFixed, setIsFixed] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const isScrollingToTarget = useRef(false);
  
  const currentActiveKey = activeKey ?? internalActiveKey;

  // Smooth scroll to target element
  const scrollToTarget = useCallback((href: string, key: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      isScrollingToTarget.current = true;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offsetTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

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
  }, [offsetTop, activeKey, onChange]);

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingToTarget.current || items.length === 0) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let activeItem: string = '';
      let minDistance = Infinity;

      // Check all items (including nested ones)
      const checkItems = (itemList: AnchorItem[]) => {
        itemList.forEach(item => {
          const element = document.querySelector(item.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const distance = Math.abs(elementTop - scrollTop - offsetTop);
            
            if (elementTop <= scrollTop + offsetTop + 50 && distance < minDistance) {
              minDistance = distance;
              activeItem = item.key;
            }
          }
          
          if (item.children) {
            checkItems(item.children);
          }
        });
      };

      checkItems(items);

      if (activeItem && activeItem !== currentActiveKey) {
        if (activeKey === undefined) {
          setInternalActiveKey(activeItem);
        }
        onChange?.(activeItem);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, currentActiveKey, offsetTop, activeKey, onChange]);

  // Handle affix behavior
  useEffect(() => {
    if (!affix) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > offsetTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [affix, offsetTop]);

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
  }, [currentActiveKey, items]);

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
    >
      <div ref={anchorRef} className="ui-anchor-wrapper">
        <div className="ui-anchor-ink-wrapper">
          <div ref={inkRef} className="ui-anchor-ink" />
        </div>
        <div className="ui-anchor-content">
          {items.map(item => renderAnchorItem(item))}
        </div>
      </div>
    </div>
  );
});

Anchor.displayName = 'Anchor';
