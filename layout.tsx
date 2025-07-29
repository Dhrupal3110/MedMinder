import React, { forwardRef } from 'react';
import './Badge.css';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  label?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  showZero?: boolean;
  dot?: boolean;
  closable?: boolean;
  disabled?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-describedby'?: string;
  children?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  label,
  variant = 'primary',
  size = 'md',
  count,
  showZero = false,
  dot = false,
  closable = false,
  disabled = false,
  onClose,
  className = '',
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  children,
  ...props
}, ref) => {
  
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    event.stopPropagation();
    onClose?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && closable && !disabled) {
      event.preventDefault();
      const syntheticEvent = {
        ...event,
        currentTarget: event.currentTarget,
        target: event.target,
        stopPropagation: () => event.stopPropagation(),
        preventDefault: () => event.preventDefault(),
      } as React.MouseEvent<HTMLButtonElement>;
      
      handleClose(syntheticEvent);
    }
  };

  // Determine if badge should be shown
  const shouldShowBadge = () => {
    if (dot) return true;
    if (count !== undefined) {
      return count > 0 || (count === 0 && showZero);
    }
    return label !== undefined && label !== null && label !== '';
  };

  // Format count display
  const formatCount = (num: number): string => {
    if (num > 99) return '99+';
    return num.toString();
  };

  // Build class names
  const baseClass = 'ui-badge';
  const sizeClass = `ui-badge--${size}`;
  const variantClass = variant !== 'primary' ? `ui-badge--${variant}` : '';
  const dotClass = dot ? 'ui-badge--dot' : '';
  const closableClass = closable ? 'ui-badge--closable' : '';
  const disabledClass = disabled ? 'ui-badge--disabled' : '';
  const standAloneClass = !children ? 'ui-badge--standalone' : '';

  const classes = [baseClass, sizeClass, variantClass, dotClass, closableClass, disabledClass, standAloneClass, className]
    .filter(Boolean)
    .join(' ');

  // Determine content to display
  const getContent = () => {
    if (dot) return null;
    if (count !== undefined) return formatCount(count);
    return label;
  };

  const content = getContent();

  // If badge shouldn't be shown and no children, return null
  if (!shouldShowBadge() && !children) {
    return null;
  }

  // Determine aria-label for accessibility
  const getAriaLabel = (): string => {
    if (ariaLabel) return ariaLabel;
    if (dot) return 'Status indicator';
    if (count !== undefined) {
      const countText = count > 99 ? 'more than 99' : count.toString();
      return `${countText} ${count === 1 ? 'notification' : 'notifications'}`;
    }
    if (label) return `Badge: ${label}`;
    return 'Badge';
  };

  // If there are children, render as wrapper
  if (children) {
    return (
      <span 
        {...props}
        ref={ref}
        className={`ui-badge-wrapper ${className}`}
        style={style}
      >
        {children}
        {shouldShowBadge() && (
          <span
            className={classes}
            aria-label={getAriaLabel()}
            aria-describedby={ariaDescribedBy}
            role="status"
          >
            {content && <span className="ui-badge-content">{content}</span>}
            {closable && (
              <button
                type="button"
                className="ui-badge-close"
                onClick={handleClose}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-label="Remove badge"
                tabIndex={disabled ? -1 : 0}
              >
                <span className="ui-badge-close-icon" aria-hidden="true">×</span>
              </button>
            )}
          </span>
        )}
      </span>
    );
  }

  // Render standalone badge
  return (
    <span
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label={getAriaLabel()}
      aria-describedby={ariaDescribedBy}
      role="status"
    >
      {content && <span className="ui-badge-content">{content}</span>}
      {closable && (
        <button
          type="button"
          className="ui-badge-close"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Remove badge"
          tabIndex={disabled ? -1 : 0}
        >
          <span className="ui-badge-close-icon" aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';
