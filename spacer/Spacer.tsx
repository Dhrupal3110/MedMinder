import React, { forwardRef } from 'react';
import './Spacer.css';

export interface SpacerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  size?: string | number;
  direction?: 'horizontal' | 'vertical';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export const Spacer = forwardRef<HTMLElement, SpacerProps>(({
  size = 'var(--spacing-md)',
  direction = 'vertical',
  as: Component = 'div',
  className = '',
  style,
  ...props
}, ref) => {
  
  // Convert numeric size to px units
  const getSize = (sizeValue: string | number): string => {
    if (typeof sizeValue === 'number') {
      return `${sizeValue}px`;
    }
    return sizeValue;
  };

  // Build class names
  const baseClass = 'ui-spacer';
  const directionClass = `ui-spacer--${direction}`;
  
  const classes = [baseClass, directionClass, className]
    .filter(Boolean)
    .join(' ');

  // Create style object with size
  const spacerStyle: React.CSSProperties = {
    ...style,
    ...(direction === 'vertical' 
      ? { height: getSize(size) } 
      : { width: getSize(size) }
    ),
  };

  return (
    <Component
      {...props}
      ref={ref as any}
      className={classes}
      style={spacerStyle}
      aria-hidden="true"
    />
  );
});

Spacer.displayName = 'Spacer';
