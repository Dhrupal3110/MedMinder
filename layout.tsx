import React, { forwardRef, useState, useRef, useCallback, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
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
  useWrapper?: boolean; // New prop to force wrapper usage
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
  useWrapper = false, // Default to false for backward compatibility
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

  // Calculate tooltip position (same as original)
  const calculatePosition = useCallback(() => {
    const targetRef = useWrapper ? wrapperRef.current : triggerRef.current;
    if (!targetRef || !tooltipRef.current || !mounted) return;

    const triggerRect = targetRef.getBoundingClientRect();
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

    // Same positioning logic as original...
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top + viewport.scrollY - tooltipRect.height - offset;
        left = placement === 'top-start' 
          ? triggerRect.left + viewport.scrollX
          : placement === 'top-end'
          ? triggerRect.right + viewport.scrollX - tooltipRect.width
          : triggerRect.left + viewport.scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + viewport.scrollY + offset;
        left = placement === 'bottom-start'
          ? triggerRect.left + viewport.scrollX
          : placement === 'bottom-end'
          ? triggerRect.right + viewport.scrollX - tooltipRect.width
          : triggerRect.left + viewport.scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        top = placement === 'left-start'
          ? triggerRect.top + viewport.scrollY
          : placement === 'left-end'
          ? triggerRect.bottom + viewport.scrollY - tooltipRect.height
          : triggerRect.top + viewport.scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left + viewport.scrollX - tooltipRect.width - offset;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        top = placement === 'right-start'
          ? triggerRect.top + viewport.scrollY
          : placement === 'right-end'
          ? triggerRect.bottom + viewport.scrollY - tooltipRect.height
          : triggerRect.top + viewport.scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + viewport.scrollX + offset;
        break;
    }

    // Viewport collision detection (same as original)
    const minMargin = 8;
    if (top < viewport.scrollY + minMargin) {
      if (placement.includes('top')) {
        top = triggerRect.bottom + viewport.scrollY + offset;
        finalPlacement = placement.replace('top', 'bottom') as typeof placement;
      } else {
        top = viewport.scrollY + minMargin;
      }
    } else if (top + tooltipRect.height > viewport.scrollY + viewport.height - minMargin) {
      if (placement.includes('bottom')) {
        top = triggerRect.top + viewport.scrollY - tooltipRect.height - offset;
        finalPlacement = placement.replace('bottom', 'top') as typeof placement;
      } else {
        top = viewport.scrollY + viewport.height - tooltipRect.height - minMargin;
      }
    }

    if (left < viewport.scrollX + minMargin) {
      if (placement.includes('left')) {
        left = triggerRect.right + viewport.scrollX + offset;
        finalPlacement = placement.replace('left', 'right') as typeof placement;
      } else {
        left = viewport.scrollX + minMargin;
      }
    } else if (left + tooltipRect.width > viewport.scrollX + viewport.width - minMargin) {
      if (placement.includes('right')) {
        left = triggerRect.left + viewport.scrollX - tooltipRef.current.width - offset;
        finalPlacement = placement.replace('right', 'left') as typeof placement;
      } else {
        left = viewport.scrollX + viewport.width - tooltipRect.width - minMargin;
      }
    }

    setPosition({ top, left });
    setActualPlacement(finalPlacement);
  }, [placement, offset, mounted, useWrapper]);

  // Show/hide functions (same as original)
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

  // Event handlers (same as original)
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      showTooltip();
    }
  }, [trigger, showTooltip]);

  const handleMouseLeave = useCallback(() => {
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
      const targetRef = useWrapper ? wrapperRef.current : triggerRef.current;
      targetRef?.focus();
    }
  }, [currentVisible, hideTooltip, useWrapper]);

  // Update position when visible (same as original)
  useEffect(() => {
    if (currentVisible && mounted) {
      calculatePosition();
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

  // Cleanup timeouts (same as original)
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

  // Tooltip content (same as original)
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
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        pointerEvents: trigger === 'hover' ? 'none' : 'auto',
        ...style,
      }}
      role="tooltip"
      aria-label={ariaLabel}
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      {content}
      {arrow && <div className="ui-tooltip-arrow" aria-hidden="true" />}
    </div>
  ) : null;

  // Determine if we should use wrapper approach
  const shouldUseWrapper = useWrapper || children.type === 'button' || 
    (typeof children.type === 'function' && children.type.displayName === 'Button');

  if (shouldUseWrapper) {
    // Use wrapper div approach
    return (
      <>
        <div
          ref={wrapperRef}
          style={{ display: 'inline-flex', alignItems: 'center' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-describedby={currentVisible ? tooltipId : ariaDescribedBy}
        >
          {children}
        </div>
        {tooltipContent && (
          portal ? createPortal(tooltipContent, document.body) : tooltipContent
        )}
      </>
    );
  }

  // Use original cloneElement approach
  const triggerElement = React.cloneElement(children, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      const originalRef = (children as any).ref;
      if (typeof originalRef === 'function') {
        originalRef(node);
      } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
        (originalRef as React.MutableRefObject<HTMLElement>).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      const originalHandler = (children.props as any).onMouseEnter;
      if (originalHandler) originalHandler(e);
      handleMouseEnter();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      const originalHandler = (children.props as any).onMouseLeave;
      if (originalHandler) originalHandler(e);
      handleMouseLeave();
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
    'aria-describedby': currentVisible ? tooltipId : (children.props as any)['aria-describedby'] || ariaDescribedBy,
  } as any);

  return (
    <>
      {triggerElement}
      {tooltipContent && (
        portal ? createPortal(tooltipContent, document.body) : tooltipContent
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';
