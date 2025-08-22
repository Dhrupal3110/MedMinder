import React, { forwardRef } from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverable?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  style,
  hoverable = false,
  bordered = true,
  size = 'md',
  ...props
}, ref) => {
  
  // Build class names
  const baseClass = 'ui-card';
  const sizeClass = `ui-card--${size}`;
  const hoverableClass = hoverable ? 'ui-card--hoverable' : '';
  const borderedClass = bordered ? 'ui-card--bordered' : '';

  const classes = [baseClass, sizeClass, hoverableClass, borderedClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
