import React, { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Grid.css';

export interface GridProps<T extends keyof JSX.IntrinsicElements = 'div'>
  extends HTMLAttributes<HTMLElement> {
  as?: T;
  cols?: number;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  responsive?: boolean;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const Grid = forwardRef<HTMLElement, GridProps>(({
  as = 'div',
  cols = 12,
  gap,
  rowGap,
  columnGap,
  responsive = true,
  className = '',
  children,
  style = {},
  ...props
}, ref) => {
  const Component = as;

  const gridClassName = [
    'ui-grid',
    responsive ? 'ui-grid--responsive' : '',
    `ui-grid--cols-${cols}`,
    className,
  ].filter(Boolean).join(' ');

  const gridStyle: CSSProperties = {
    ...style,
    ...(gap !== undefined && { '--grid-gap': typeof gap === 'number' ? `${gap}rem` : gap }),
    ...(rowGap !== undefined && { '--grid-row-gap': typeof rowGap === 'number' ? `${rowGap}rem` : rowGap }),
    ...(columnGap !== undefined && { '--grid-column-gap': typeof columnGap === 'number' ? `${columnGap}rem` : columnGap }),
    '--grid-cols': cols.toString(),
  } as CSSProperties;

  return (
    <Component
      {...props}
      ref={ref}
      className={gridClassName}
      style={gridStyle}
    >
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';
