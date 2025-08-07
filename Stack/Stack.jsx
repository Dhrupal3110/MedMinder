import React, { forwardRef } from 'react';
import './Stack.css';

export interface StackProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  direction?: 'vertical' | 'horizontal';
  gap?: number | string;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
  fullWidth?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Stack = forwardRef<HTMLElement, StackProps>(({
  direction = 'vertical',
  gap,
  align,
  justify,
  wrap = false,
  fullWidth = false,
  as = 'div',
  className = '',
  style,
  children,
  ...props
}, ref) => {
  
  // Build class names
  const baseClass = 'ui-stack';
  const directionClass = `ui-stack--${direction}`;
  const alignClass = align ? `ui-stack--align-${align}` : '';
  const justifyClass = justify ? `ui-stack--justify-${justify}` : '';
  const wrapClass = wrap ? 'ui-stack--wrap' : '';
  const fullWidthClass = fullWidth ? 'ui-stack--full-width' : '';

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

Stack.displayName = 'Stack';
