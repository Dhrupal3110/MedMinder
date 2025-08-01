import React, { forwardRef, useState, useRef, useCallback, useEffect, useId, cloneElement, isValidElement } from 'react';
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
  
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // Fix: Use number instead of NodeJS.Timeout for browser compatibility with initial values
  const showTimeoutRef = useRef<number | undefined>(undefined);
  const hideTimeoutRef = useRef<number | undefined>(undefined);
  const tooltipId = useId();

  const isControlled = visible !== undefined;
  const currentVisible = isControlled ? visible : internalVisible;

  // Calculate tooltip position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let top = 0;
    let left = 0;
    let finalPlacement = placement;

    // Calculate base position
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

    // Viewport collision detection and adjustment
    if (top < 0) {
      if (placement.includes('top')) {
        top = triggerRect.bottom + offset;
        finalPlacement = placement.replace('top', 'bottom') as typeof placement;
      } else {
        top = 8;
      }
    } else if (top + tooltipRect.height > viewport.height) {
      if (placement.includes('bottom')) {
        top = triggerRect.top - tooltipRect.height - offset;
        finalPlacement = placement.replace('bottom', 'top') as typeof placement;
      } else {
        top = viewport.height - tooltipRect.height - 8;
      }
    }

    if (left < 0) {
      if (placement.includes('left')) {
        left = triggerRect.right + offset;
        finalPlacement = placement.replace('left', 'right') as typeof placement;
      } else {
        left = 8;
      }
    } else if (left + tooltipRect.width > viewport.width) {
      if (placement.includes('right')) {
        left = triggerRect.left - tooltipRect.width - offset;
        finalPlacement = placement.replace('right', 'left') as typeof placement;
      } else {
        left = viewport.width - tooltipRect.width - 8;
      }
    }

    setPosition({ top, left });
    setActualPlacement(finalPlacement);
  }, [placement, offset]);

  // Show tooltip
  const showTooltip = useCallback(() => {
    if (disabled || !content) return;

    if (hideTimeoutRef.current !== undefined) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }

    if (delay > 0) {
      showTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) {
          setInternalVisible(true);
        }
        onVisibleChange?.(true);
      }, delay);
    } else {
      if (!isControlled) {
        setInternalVisible(true);
      }
      onVisibleChange?.(true);
    }
  }, [disabled, content, delay, isControlled, onVisibleChange]);

  // Hide tooltip
  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current !== undefined) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }

    if (hideDelay > 0) {
      hideTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) {
          setInternalVisible(false);
        }
        onVisibleChange?.(false);
      }, hideDelay);
    } else {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onVisibleChange?.(false);
    }
  }, [hideDelay, isControlled, onVisibleChange]);

  // Event handlers
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

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
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
      triggerRef.current?.focus();
    }
  }, [currentVisible, hideTooltip]);

  // Update position when visible
  useEffect(() => {
    if (currentVisible) {
      calculatePosition();
      
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [currentVisible, calculatePosition]);

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

  // Fix: Improved ref handling for triggerElement with better event propagation
  const triggerElement = isValidElement(children) 
    ? cloneElement(children, {
        ...children.props,
        ref: (node: HTMLElement) => {
          triggerRef.current = node;
          // Handle both function and object refs from the original child
          const originalRef = (children as any).ref;
          if (typeof originalRef === 'function') {
            originalRef(node);
          } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
            (originalRef as React.MutableRefObject<HTMLElement>).current = node;
          }
        },
        onMouseEnter: (e: React.MouseEvent) => {
          // Call original handler first if it exists
          if (children.props.onMouseEnter) {
            children.props.onMouseEnter(e);
          }
          handleMouseEnter();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          if (children.props.onMouseLeave) {
            children.props.onMouseLeave(e);
          }
          handleMouseLeave();
        },
        onFocus: (e: React.FocusEvent) => {
          if (children.props.onFocus) {
            children.props.onFocus(e);
          }
          handleFocus();
        },
        onBlur: (e: React.FocusEvent) => {
          if (children.props.onBlur) {
            children.props.onBlur(e);
          }
          handleBlur();
        },
        onClick: (e: React.MouseEvent) => {
          if (children.props.onClick) {
            children.props.onClick(e);
          }
          handleClick();
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (children.props.onKeyDown) {
            children.props.onKeyDown(e);
          }
          handleKeyDown(e);
        },
        'aria-describedby': currentVisible ? tooltipId : children.props['aria-describedby'] || ariaDescribedBy,
      })
    : children;

  // Tooltip content
  const tooltipContent = (
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
        ...style,
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        pointerEvents: trigger === 'hover' ? 'none' : 'auto',
      }}
      role="tooltip"
      aria-label={ariaLabel}
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      {content}
      {arrow && <div className="ui-tooltip-arrow" aria-hidden="true" />}
    </div>
  );

  return (
    <>
      {triggerElement}
      {currentVisible && content && (
        portal ? createPortal(tooltipContent, document.body) : tooltipContent
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';
