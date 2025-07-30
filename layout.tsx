import React, {
  cloneElement,
  isValidElement,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import type {
  ReactElement,
  Ref,
  RefObject,
} from 'react';


const child = children as ReactElement<any> & { ref?: React.Ref<any> };

const triggerElement = isValidElement(child)
  ? cloneElement(child, {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;

        if (typeof child.ref === 'function') {
          child.ref(node);
        } else if (child.ref && typeof child.ref === 'object') {
          (child.ref as MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      onMouseEnter: (e: React.MouseEvent) => {
        child.props.onMouseEnter?.(e);
        handleMouseEnter();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        child.props.onMouseLeave?.(e);
        handleMouseLeave();
      },
      onFocus: (e: React.FocusEvent) => {
        child.props.onFocus?.(e);
        handleFocus();
      },
      onBlur: (e: React.FocusEvent) => {
        child.props.onBlur?.(e);
        handleBlur();
      },
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        handleClick();
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        child.props.onKeyDown?.(e);
        handleKeyDown(e);
      },
      'aria-describedby': currentVisible
        ? tooltipId
        : child.props['aria-describedby'] || ariaDescribedBy,
    })
  : child;














import React, {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
  cloneElement,
  isValidElement,
  ReactElement,
  MutableRefObject
} from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: React.ReactNode;
  placement?:
    | 'top' | 'bottom' | 'left' | 'right'
    | 'top-start' | 'top-end'
    | 'bottom-start' | 'bottom-end'
    | 'left-start' | 'left-end'
    | 'right-start' | 'right-end';
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
  children: ReactElement;
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

  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const tooltipId = useId();

  const isControlled = visible !== undefined;
  const currentVisible = isControlled ? visible : internalVisible;

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    let top = 0;
    let left = 0;
    let finalPlacement = placement;

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

    // Collision detection
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

  const showTooltip = useCallback(() => {
    if (disabled || !content) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    if (delay > 0) {
      showTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) setInternalVisible(true);
        onVisibleChange?.(true);
      }, delay);
    } else {
      if (!isControlled) setInternalVisible(true);
      onVisibleChange?.(true);
    }
  }, [delay, disabled, content, isControlled, onVisibleChange]);

  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

    if (hideDelay > 0) {
      hideTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) setInternalVisible(false);
        onVisibleChange?.(false);
      }, hideDelay);
    } else {
      if (!isControlled) setInternalVisible(false);
      onVisibleChange?.(false);
    }
  }, [hideDelay, isControlled, onVisibleChange]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'manual') showTooltip();
  };
  const handleMouseLeave = () => {
    if (trigger === 'hover' || trigger === 'manual') hideTooltip();
  };
  const handleFocus = () => {
    if (trigger === 'focus' || trigger === 'manual') showTooltip();
  };
  const handleBlur = () => {
    if (trigger === 'focus' || trigger === 'manual') hideTooltip();
  };
  const handleClick = () => {
    if (trigger === 'click') currentVisible ? hideTooltip() : showTooltip();
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && currentVisible) {
      hideTooltip();
      triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    if (currentVisible) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition, true);
      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition, true);
      };
    }
  }, [currentVisible, calculatePosition]);

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const baseClass = 'ui-tooltip';
  const placementClass = `ui-tooltip--${actualPlacement}`;
  const visibleClass = currentVisible ? 'ui-tooltip--visible' : '';
  const arrowClass = arrow ? 'ui-tooltip--arrow' : '';

  const classes = [baseClass, placementClass, visibleClass, arrowClass, className]
    .filter(Boolean)
    .join(' ');

  const childElement = children as ReactElement<any>;

  const triggerElement = isValidElement(childElement)
    ? cloneElement(childElement, {
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
          const childRef = childElement.ref;
          if (typeof childRef === 'function') {
            childRef(node);
          } else if (childRef && typeof childRef === 'object') {
            (childRef as MutableRefObject<HTMLElement | null>).current = node;
          }
        },
        onMouseEnter: (e: React.MouseEvent) => {
          childElement.props.onMouseEnter?.(e);
          handleMouseEnter();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          childElement.props.onMouseLeave?.(e);
          handleMouseLeave();
        },
        onFocus: (e: React.FocusEvent) => {
          childElement.props.onFocus?.(e);
          handleFocus();
        },
        onBlur: (e: React.FocusEvent) => {
          childElement.props.onBlur?.(e);
          handleBlur();
        },
        onClick: (e: React.MouseEvent) => {
          childElement.props.onClick?.(e);
          handleClick();
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          childElement.props.onKeyDown?.(e);
          handleKeyDown(e);
        },
        'aria-describedby': currentVisible
          ? tooltipId
          : childElement.props['aria-describedby'] || ariaDescribedBy,
      })
    : childElement;

  const tooltipContent = (
    <div
      {...props}
      ref={(node) => {
        tooltipRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref && typeof ref === 'object') {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;
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
