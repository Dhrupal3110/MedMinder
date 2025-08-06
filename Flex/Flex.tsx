import React, { forwardRef } from 'react';
import './Flex.css';

export interface FlexProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
  fullWidth?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Flex = forwardRef<HTMLElement, FlexProps>(({
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  fullWidth = false,
  as = 'div',
  className = '',
  style,
  children,
  ...props
}, ref) => {
  
  // Build class names
  const baseClass = 'ui-flex';
  const directionClass = direction !== 'row' ? `ui-flex--${direction}` : '';
  const alignClass = align !== 'stretch' ? `ui-flex--align-${align}` : '';
  const justifyClass = justify !== 'flex-start' ? `ui-flex--justify-${justify}` : '';
  const wrapClass = wrap !== 'nowrap' ? `ui-flex--wrap-${wrap}` : '';
  const fullWidthClass = fullWidth ? 'ui-flex--full-width' : '';

  const classes = [baseClass, directionClass, alignClass, justifyClass, wrapClass, fullWidthClass, className]
    .filter(Boolean)
    .join(' ');

  // Build inline styles for dynamic values
  const inlineStyles: React.CSSProperties = {
    ...style,
  };

  // Handle gap - can be number (converted to px) or string (used as-is)
  if (gap !== undefined) {
    inlineStyles.gap = typeof gap === 'number' ? `${gap}px` : gap;
  }

  // Create the element using the specified tag
  const Component = as as React.ElementType;

  return (
    <Component
      {...props}
      ref={ref}
      className={classes}
      style={inlineStyles}
    >
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';
