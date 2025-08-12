import React, { forwardRef } from 'react';
import './Container.css';

export interface ContainerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  maxWidth?: string | number;
  padding?: string | number;
  as?: keyof JSX.IntrinsicElements;
  center?: boolean;
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(({
  maxWidth,
  padding,
  as = 'div',
  center = true,
  fluid = false,
  className = '',
  style,
  children,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {

  // Build class names
  const baseClass = 'ui-container';
  const centerClass = center ? 'ui-container--center' : '';
  const fluidClass = fluid ? 'ui-container--fluid' : '';

  const classes = [baseClass, centerClass, fluidClass, className]
    .filter(Boolean)
    .join(' ');

  // Build inline styles
  const inlineStyles: React.CSSProperties = {
    ...style,
    ...(maxWidth && !fluid && { 
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth 
    }),
    ...(padding && { 
      padding: typeof padding === 'number' ? `${padding}px` : padding 
    }),
  };

  const Component = as as any;

  return (
    <Component
      {...props}
      ref={ref}
      className={classes}
      style={inlineStyles}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </Component>
  );
});

Container.displayName = 'Container';
