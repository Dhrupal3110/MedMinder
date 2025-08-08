import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { JSX } from 'react';
import './Grid.css';

export interface GridProps extends HTMLAttributes<HTMLElement> {
  cols?: number;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  responsive?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}

export const Grid = forwardRef<HTMLElement, GridProps>(({
  cols = 12,
  gap,
  rowGap,
  columnGap,
  responsive = true,
  as = 'div',
  className = '',
  children,
  style,
  ...props
}, ref) => {
  const Component = as;

  const baseClass = 'ui-grid';
  const responsiveClass = responsive ? 'ui-grid--responsive' : '';
  const colsClass = cols ? `ui-grid--cols-${cols}` : '';
  const combinedClassName = [baseClass, responsiveClass, colsClass, className]
    .filter(Boolean)
    .join(' ');

  const gridStyle = {
    ...style,
    ...(gap !== undefined && { '--grid-gap': typeof gap === 'number' ? `${gap}rem` : gap }),
    ...(rowGap !== undefined && { '--grid-row-gap': typeof rowGap === 'number' ? `${rowGap}rem` : rowGap }),
    ...(columnGap !== undefined && { '--grid-column-gap': typeof columnGap === 'number' ? `${columnGap}rem` : columnGap }),
    ...(cols && { '--grid-cols': cols.toString() }),
  } as React.CSSProperties;

  return (
    <Component
      {...props}
      ref={ref}
      className={combinedClassName}
      style={gridStyle}
    >
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';
