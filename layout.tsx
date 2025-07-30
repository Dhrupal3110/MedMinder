import React, { forwardRef } from 'react';
import './Divider.css';

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  vertical?: boolean;
  direction?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  textAlign?: 'left' | 'center' | 'right';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  plain?: boolean;
  dashed?: boolean;
  dotted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  label?: React.ReactNode;
  'aria-label'?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(({
  vertical = false,
  direction,
  variant = 'solid',
  textAlign = 'center',
  spacing = 'md',
  margin,
  thickness = 'thin',
  color = 'default',
  plain = false,
  dashed = false,
  dotted = false,
  className = '',
  style,
  children,
  label,
  'aria-label': ariaLabel,
  'aria-orientation': ariaOrientation,
  ...props
}, ref) => {

  // Determine orientation
  const isVertical = vertical || direction === 'vertical';
  
  // Determine variant from boolean props or variant prop
  const getVariant = (): 'solid' | 'dashed' | 'dotted' => {
    if (dotted) return 'dotted';
    if (dashed) return 'dashed';
    return variant;
  };

  const currentVariant = getVariant();
  const effectiveSpacing = margin || spacing;
  const content = children || label;
  const hasContent = content !== undefined && content !== null && content !== '';

  // Build class names
  const baseClass = 'ui-divider';
  const orientationClass = isVertical ? 'ui-divider--vertical' : 'ui-divider--horizontal';
  const variantClass = currentVariant !== 'solid' ? `ui-divider--${currentVariant}` : '';
  const spacingClass = effectiveSpacing !== 'md' ? `ui-divider--spacing-${effectiveSpacing}` : '';
  const thicknessClass = thickness !== 'thin' ? `ui-divider--${thickness}` : '';
  const colorClass = color !== 'default' ? `ui-divider--${color}` : '';
  const textAlignClass = hasContent && textAlign !== 'center' ? `ui-divider--text-${textAlign}` : '';
  const plainClass = plain ? 'ui-divider--plain' : '';
  const withTextClass = hasContent ? 'ui-divider--with-text' : '';

  const classes = [
    baseClass,
    orientationClass,
    variantClass,
    spacingClass,
    thicknessClass,
    colorClass,
    textAlignClass,
    plainClass,
    withTextClass,
    className
  ].filter(Boolean).join(' ');

  // Determine ARIA attributes
  const getAriaLabel = (): string | undefined => {
    if (ariaLabel) return ariaLabel;
    if (hasContent) return `Divider: ${content}`;
    return undefined;
  };

  const getAriaOrientation = (): 'horizontal' | 'vertical' => {
    if (ariaOrientation) return ariaOrientation;
    return isVertical ? 'vertical' : 'horizontal';
  };

  // For vertical dividers, we need different HTML structure
  if (isVertical) {
    return (
      <div
        {...props}
        ref={ref}
        className={classes}
        style={style}
        role="separator"
        aria-orientation={getAriaOrientation()}
        aria-label={getAriaLabel()}
      >
        {hasContent && (
          <span className="ui-divider-text" aria-hidden="false">
            {content}
          </span>
        )}
        <div className="ui-divider-line" aria-hidden="true" />
      </div>
    );
  }

  // For horizontal dividers, we can use semantic HR when appropriate
  if (!hasContent) {
    return (
      <hr
        {...props}
        ref={ref as React.ForwardedRef<HTMLHRElement>}
        className={classes}
        style={style}
        role="separator"
        aria-orientation={getAriaOrientation()}
        aria-label={getAriaLabel()}
      />
    );
  }

  // Horizontal divider with content
  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
      role="separator"
      aria-orientation={getAriaOrientation()}
      aria-label={getAriaLabel()}
    >
      <div className="ui-divider-line ui-divider-line--before" aria-hidden="true" />
      <span className="ui-divider-text" aria-hidden="false">
        {content}
      </span>
      <div className="ui-divider-line ui-divider-line--after" aria-hidden="true" />
    </div>
  );
});

Divider.displayName = 'Divider';
