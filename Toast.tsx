import React, { useEffect, useState, useCallback, forwardRef } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClose'> {
  /** Toast content - can be string or ReactNode */
  message: string | React.ReactNode;
  /** Toast type determines icon and color scheme */
  type: ToastType;
  /** Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss */
  duration?: number;
  /** Whether toast is visible (for external animation control) */
  isVisible?: boolean;
  /** Accessible label for the toast */
  'aria-label'?: string;
  /** ID of element that describes the toast */
  'aria-describedby'?: string;
}

const defaultIcons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.25 5.625L8.125 13.75L3.75 9.375"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.485 2.495a1.5 1.5 0 0 1 2.53 0l7.5 12A1.5 1.5 0 0 1 17.25 17H2.75a1.5 1.5 0 0 1-1.265-2.505l7.5-12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4L4 12M4 4l8 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Toast = forwardRef<HTMLDivElement, ToastProps>(({
  message,
  type,
  duration = 5000,
  dismissible = true,
  onClose,
  icon,
  className = '',
  style,
  isVisible: externalIsVisible,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const [internalIsVisible, setInternalIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Use external visibility control if provided, otherwise use internal state
  const isVisible = externalIsVisible !== undefined ? externalIsVisible : internalIsVisible;

  const handleClose = useCallback(() => {
    setIsExiting(true);
    // Wait for exit animation to complete
    setTimeout(() => {
      setInternalIsVisible(false);
      onClose?.();
    }, 200);
  }, [onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && dismissible) {
      event.preventDefault();
      handleClose();
    }
  };

  useEffect(() => {
    if (duration > 0 && isVisible && !isExiting) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, isExiting, handleClose]);

  if (!isVisible && externalIsVisible === undefined) {
    return null;
  }

  // Build class names
  const baseClass = 'ui-toast';
  const typeClass = `ui-toast--${type}`;
  const exitingClass = isExiting ? 'ui-toast--exiting' : '';
  const dismissibleClass = dismissible ? 'ui-toast--dismissible' : '';

  const classes = [baseClass, typeClass, exitingClass, dismissibleClass, className]
    .filter(Boolean)
    .join(' ');

  const toastIcon = icon || defaultIcons[type];
  const roleAttr = type === 'error' ? 'alert' : 'status';

  // Determine aria-label for accessibility
  const getAriaLabel = (): string => {
    if (ariaLabel) return ariaLabel;
    if (typeof message === 'string') return `${type} notification: ${message}`;
    return `${type} notification`;
  };

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      role={roleAttr}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-label={getAriaLabel()}
      aria-describedby={ariaDescribedBy}
    >
      <div className="ui-toast-icon" aria-hidden="true">
        {toastIcon}
      </div>
      
      <div className="ui-toast-content">
        {typeof message === 'string' ? <span>{message}</span> : message}
      </div>

      {dismissible && (
        <button
          type="button"
          className="ui-toast-close"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          aria-label="Close notification"
          tabIndex={0}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast'; to show close button */
  dismissible?: boolean;
  /** Callback when toast is closed (manually or auto) */
  onClose?: () => void;
  /** Custom icon to override default type icon */
  icon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether
