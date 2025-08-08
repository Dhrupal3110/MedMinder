import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './Grid.css';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  cols?: number;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  responsive?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

export const Grid = forwardRef<HTMLElement, GridProps>(({
  cols = 12,
  gap,
  rowGap,
  columnGap,
  responsive = true,
  as: Component = 'div',
  className,
  children,
  style,
  ...props
}, ref) => {
  const gridClasses = clsx(
    'ui-grid',
    {
      'ui-grid--responsive': responsive,
      [`ui-grid--cols-${cols}`]: cols,
    },
    className
  );

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
      ref={ref as any}
      className={gridClasses}
      style={gridStyle}
    >
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';
