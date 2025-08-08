import React, { forwardRef } from 'react';
import type { ElementType, ReactNode, ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import './Grid.css';

interface GridOwnProps<C extends ElementType = ElementType> {
  as?: C;
  children: ReactNode;
  cols?: number;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  responsive?: boolean;
}

export type GridProps<C extends ElementType> = GridOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof GridOwnProps<C>>;

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropsWithRef<C extends ElementType, P> = 
  GridProps<C> & { ref?: PolymorphicRef<C> };

type GridComponentType = <C extends ElementType = 'div'>(
  props: PolymorphicComponentPropsWithRef<C, {}>
) => React.ReactElement | null;


// --- SOLUTION ---
// We define the implementation and then cast it to our desired type.
// This solves the incompatibility error with forwardRef.

const GridComponent = forwardRef(
  <C extends ElementType = 'div'>(
    {
      as,
      children,
      cols = 12,
      gap,
      rowGap,
      columnGap,
      responsive = true,
      className = '',
      style,
      ...props
    }: GridProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';

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
  }
);

GridComponent.displayName = 'Grid';

export const Grid = GridComponent as GridComponentType;
