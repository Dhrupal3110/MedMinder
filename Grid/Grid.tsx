import React, { ElementType, forwardRef, type CSSProperties, type ReactNode } from 'react';
import './Grid.css';

type GridElement = keyof JSX.IntrinsicElements;

type Props<T extends GridElement> = {
  as?: T;
  cols?: number;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  responsive?: boolean;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'style' | 'className' | 'children'>;

export const Grid = forwardRef(
  <T extends GridElement = 'div'>(
    {
      as,
      cols = 12,
      gap,
      rowGap,
      columnGap,
      responsive = true,
      className = '',
      children,
      style,
      ...props
    }: Props<T>,
    ref: React.Ref<Element>
  ) => {
    const Component = as || 'div';

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
  }
);

Grid.displayName = 'Grid';
