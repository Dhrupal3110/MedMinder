import React from 'react';
import './Button.css';

export interface ButtonProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'danger';
  variant?: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
  size?: 'small' | 'medium' | 'large';
  shape?: 'default' | 'circle' | 'round';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  title?: string; // optional title for icon-only buttons
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = 'default',
  variant = 'solid',
  size = 'medium',
  shape = 'default',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'start',
  onClick,
  type = 'button',
  className = '',
  style,
  href,
  title
}) => {
  const isIconOnly = icon && !children;

  const baseClass = 'ui-button';
  const colorClass = `ui-button--${color}`;
  const variantClass = `ui-button--${variant}`;
  const sizeClass = `ui-button--${size}`;
  const shapeClass = `ui-button--${shape}`;
  const disabledClass = disabled || loading ? 'ui-button--disabled' : '';
  const loadingClass = loading ? 'ui-button--loading' : '';
  const iconOnlyClass = isIconOnly ? 'ui-button--icon-only' : '';

  const classes = [
    baseClass,
    variantClass,
    colorClass,
    sizeClass,
    shapeClass,
    disabledClass,
    loadingClass,
    iconOnlyClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const renderIcon = (iconElement: React.ReactNode, position: 'start' | 'end') => {
    const iconClass = `ui-button__icon ui-button__icon--${position}`;
    return <span className={iconClass}>{iconElement}</span>;
  };

  const spinner = <span className="ui-button__spinner" />;
  const buttonContent = (
    <>
      {loading && iconPosition === 'start' && (
        <span className="ui-button__icon ui-button__icon--start ui-button__icon--loading">{spinner}</span>
      )}

      {!loading && icon && iconPosition === 'start' && renderIcon(icon, 'start')}

      {children && <span className="ui-button__content">{children}</span>}

      {!loading && icon && iconPosition === 'end' && renderIcon(icon, 'end')}

      {loading && iconPosition === 'end' && (
        <span className="ui-button__icon ui-button__icon--end ui-button__icon--loading">{spinner}</span>
      )}
    </>
  );

  const accessibilityLabel = isIconOnly
    ? title || (typeof icon === 'string' ? icon : 'Button')
    : undefined;

  if (variant === 'link' && href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || loading}
        style={style}
        title={accessibilityLabel}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      aria-label={accessibilityLabel}
      title={accessibilityLabel}
    >
      {buttonContent}
    </button>
  );
};
