import React, { forwardRef, useState, useRef, useCallback, useEffect, useId, cloneElement, isValidElement } from 'react';
import './Tooltip.css';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
  trigger?: 'hover' | 'focus' | 'click' | 'manual';
  delay?: number;
  hideDelay?: number;
  disabled?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  arrow?: boolean;
  offset?: number;
  portal?: boolean;
  zIndex?: number;
  maxWidth?: string | number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactElement;
  onVisibleChange?: (visible: boolean) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  placement = 'top',
  trigger = 'hover',
  delay = 100,
  hideDelay = 100,
  disabled = false,
  visible,
  defaultVisible = false,
  arrow = true,
  offset = 8,
  portal = true,
  zIndex = 9999,
  maxWidth = 250,
  className = '',
  style,
  children,
  onVisibleChange,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState(placement);
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<number | undefined>(undefined);
  const hideTimeoutRef = useRef<number | undefined>(undefined);
  const tooltipId = useId();

  const isControlled = visible !== undefined;
  const currentVisible = isControlled ? visible : internalVisible;

  // Ensure component is mounted before showing tooltip
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tooltip position
  const calculatePosition = useCallback(() => {
    const targetElement = triggerRef.current || wrapperRef.current;
    if (!targetElement || !tooltipRef.current || !mounted) return;

    const triggerRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };

    let top = 0;
    let left = 0;
    let finalPlacement = placement;

    // Calculate base position without scroll offset for fixed positioning
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top - tooltipRect.height - offset;
        left = placement === 'top-start'
          ? triggerRect.left
          : placement === 'top-end'
            ? triggerRect.right - tooltipRect.width
            : triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + offset;
        left = placement === 'bottom-start'
          ? triggerRect.left
          : placement === 'bottom-end'
            ? triggerRect.right - tooltipRect.width
            : triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        top = placement === 'left-start'
          ? triggerRect.top
          : placement === 'left-end'
            ? triggerRect.bottom - tooltipRect.height
            : triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        top = placement === 'right-start'
          ? triggerRect.top
          : placement === 'right-end'
            ? triggerRect.bottom - tooltipRect.height
            : triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + offset;
        break;
    }

    // Viewport collision detection for fixed positioning
    const minMargin = 8;
    if (top < minMargin) {
      if (placement.includes('top')) {
        top = triggerRect.bottom + offset;
        finalPlacement = placement.replace('top', 'bottom') as typeof placement;
      } else {
        top = minMargin;
      }
    } else if (top + tooltipRect.height > viewport.height - minMargin) {
      if (placement.includes('bottom')) {
        top = triggerRect.top - tooltipRect.height - offset;
        finalPlacement = placement.replace('bottom', 'top') as typeof placement;
      } else {
        top = viewport.height - tooltipRect.height - minMargin;
      }
    }

    if (left < minMargin) {
      if (placement.includes('left')) {
        left = triggerRect.right + offset;
        finalPlacement = placement.replace('left', 'right') as typeof placement;
      } else {
        left = minMargin;
      }
    } else if (left + tooltipRect.width > viewport.width - minMargin) {
      if (placement.includes('right')) {
        left = triggerRect.left - tooltipRect.width - offset;
        finalPlacement = placement.replace('right', 'left') as typeof placement;
      } else {
        left = viewport.width - tooltipRect.width - minMargin;
      }
    }

    setPosition({ top, left });
    setActualPlacement(finalPlacement);
  }, [placement, offset, mounted]);

  // Show tooltip
  const showTooltip = useCallback(() => {
    if (disabled || !content || !mounted) return;

    if (hideTimeoutRef.current !== undefined) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }

    const executeShow = () => {
      if (!isControlled) {
        setInternalVisible(true);
      }
      onVisibleChange?.(true);
    };

    if (delay > 0) {
      showTimeoutRef.current = window.setTimeout(executeShow, delay);
    } else {
      executeShow();
    }
  }, [disabled, content, delay, isControlled, onVisibleChange, mounted]);

  // Hide tooltip
  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current !== undefined) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }

    const executeHide = () => {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onVisibleChange?.(false);
    };

    if (hideDelay > 0) {
      hideTimeoutRef.current = window.setTimeout(executeHide, hideDelay);
    } else {
      executeHide();
    }
  }, [hideDelay, isControlled, onVisibleChange]);

  // Event handlers
  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (trigger === 'hover') {
      showTooltip();
    }
  }, [trigger, showTooltip]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (trigger === 'hover') {
      hideTooltip();
    }
  }, [trigger, hideTooltip]);

  const handleFocus = useCallback(() => {
    if (trigger === 'focus') {
      showTooltip();
    }
  }, [trigger, showTooltip]);

  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  }, [trigger, hideTooltip]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (trigger === 'click') {
      e.preventDefault();
      e.stopPropagation();
      if (currentVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  }, [trigger, currentVisible, showTooltip, hideTooltip]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && currentVisible) {
      hideTooltip();
      const targetElement = triggerRef.current || wrapperRef.current;
      targetElement?.focus();
    }
  }, [currentVisible, hideTooltip]);

  // Update position when visible
  useEffect(() => {
    if (currentVisible && mounted) {
      // Calculate position immediately
      calculatePosition();

      // Recalculate after a small delay to ensure DOM is updated
      const positionTimeout = setTimeout(calculatePosition, 10);

      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        clearTimeout(positionTimeout);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [currentVisible, calculatePosition, mounted]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current !== undefined) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current !== undefined) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Build class names
  const baseClass = 'ui-tooltip';
  const placementClass = `ui-tooltip--${actualPlacement}`;
  const visibleClass = currentVisible ? 'ui-tooltip--visible' : '';
  const arrowClass = arrow ? 'ui-tooltip--arrow' : '';

  const classes = [baseClass, placementClass, visibleClass, arrowClass, className]
    .filter(Boolean)
    .join(' ');

  // Check if child can handle refs and events properly
  const canCloneChild = isValidElement(children) && 
    (typeof children.type === 'string' || 
     (children.type as any).$typeof === Symbol.for('react.forward_ref'));

  // Create trigger element - either clone the child or wrap it
  let triggerElement: React.ReactElement;

  if (canCloneChild) {
    // Try to clone the child if it can handle refs properly
    triggerElement = cloneElement(children, {
      ref: (node: HTMLElement) => {
        triggerRef.current = node;
        // Handle original ref
        const originalRef = (children as any).ref;
        if (typeof originalRef === 'function') {
          originalRef(node);
        } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
          (originalRef as React.MutableRefObject<HTMLElement>).current = node;
        }
      },
      'aria-label': (children.props as any)['aria-label'] ||
        (typeof content === 'string' ? content : ariaLabel),
      'title': (children.props as any).title ||
        (typeof content === 'string' ? content : undefined),
      'aria-describedby': currentVisible ? tooltipId : (children.props as any)['aria-describedby'] || ariaDescribedBy,
      onMouseEnter: (e: React.MouseEvent) => {
        const originalHandler = (children.props as any).onMouseEnter;
        if (originalHandler) originalHandler(e);
        handleMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        const originalHandler = (children.props as any).onMouseLeave;
        if (originalHandler) originalHandler(e);
        handleMouseLeave(e);
      },
      onFocus: (e: React.FocusEvent) => {
        const originalHandler = (children.props as any).onFocus;
        if (originalHandler) originalHandler(e);
        handleFocus();
      },
      onBlur: (e: React.FocusEvent) => {
        const originalHandler = (children.props as any).onBlur;
        if (originalHandler) originalHandler(e);
        handleBlur();
      },
      onClick: (e: React.MouseEvent) => {
        const originalHandler = (children.props as any).onClick;
        if (originalHandler) originalHandler(e);
        handleClick(e);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        const originalHandler = (children.props as any).onKeyDown;
        if (originalHandler) originalHandler(e);
        handleKeyDown(e);
      },
    } as any);
  } else {
    // Wrap the child in a span if it can't handle refs or events
    triggerElement = (
      <span
        ref={wrapperRef}
        style={{ display: 'inline-block' }}
        aria-label={typeof content === 'string' ? content : ariaLabel}
        title={typeof content === 'string' ? content : undefined}
        aria-describedby={currentVisible ? tooltipId : ariaDescribedBy}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={trigger === 'focus' ? 0 : undefined}
      >
        {children}
      </span>
    );
  }

  // Tooltip content - always render but control visibility with CSS
  const tooltipContent = mounted && content ? (
    <div
      {...props}
      ref={(node) => {
        tooltipRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref && typeof ref === 'object' && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      id={tooltipId}
      className={classes}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 2147483647,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        pointerEvents: trigger === 'hover' ? 'none' : 'auto',
        display: 'block',
        visibility: currentVisible ? 'visible' : 'hidden',
        opacity: currentVisible ? 1 : 0,
        transition: 'opacity 0.15s ease-in-out, visibility 0.15s ease-in-out',
        ...style,
      }}
      role="tooltip"
      aria-label={ariaLabel}
      data-tooltip-visible={currentVisible}
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      {content}
      {arrow && <div className="ui-tooltip-arrow" aria-hidden="true" />}
    </div>
  ) : null;

  return (
    <>
      {triggerElement}
      {tooltipContent}
    </>
  );
});

Tooltip.displayName = 'Tooltip';
