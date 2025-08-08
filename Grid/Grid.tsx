import React, {
  ElementType,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  type CSSProperties,
} from 'react';
import './Grid.css';

type GridProps<T extends ElementType> = {
  as?: T;
  cols?: number;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  responsive?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Grid = forwardRef(
  <T extends ElementType = 'div'>(
    {
      as,
      cols = 12,
      gap,
      rowGap,
      columnGap,
      responsive = true,
      className = '',
      style,
      children,
      ...rest
    }: GridProps<T>,
    ref: React.Ref<ElementRef<T>>
  ) => {
    const Component = as || 'div';

    const gridClassName = [
      'ui-grid',
      responsive ? 'ui-grid--responsive' : '',
      `ui-grid--cols-${cols}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const gridStyle: CSSProperties = {
      ...style,
      ...(gap !== undefined && { '--grid-gap': typeof gap === 'number' ? `${gap}rem` : gap }),
      ...(rowGap !== undefined && { '--grid-row-gap': typeof rowGap === 'number' ? `${rowGap}rem` : rowGap }),
      ...(columnGap !== undefined && { '--grid-column-gap': typeof columnGap === 'number' ? `${columnGap}rem` : columnGap }),
      '--grid-cols': cols.toString(),
    } as CSSProperties;

    return (
      <Component
        ref={ref}
        className={gridClassName}
        style={gridStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';
