import React, { forwardRef } from 'react';
import './Typography.css';

export interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'code';
  as?: keyof JSX.IntrinsicElements;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'inherit';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  italic?: boolean;
  truncate?: boolean | number;
  noWrap?: boolean;
  gutterBottom?: boolean;
  component?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-describedby'?: string;
  children?: React.ReactNode;
}

const variantElementMap: Record<string, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  variant = 'body1',
  as,
  component,  // alias for 'as' for backward compatibility
  color = 'inherit',
  align,
  weight,
  italic = false,
  truncate = false,
  noWrap = false,
  gutterBottom = false,
  className = '',
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  children,
  ...props
}, ref) => {
  
  // Determine the HTML element to render
  const Component = (as || component || variantElementMap[variant] || 'span') as keyof JSX.IntrinsicElements;

  // Build class names
  const baseClass = 'ui-typography';
  const variantClass = `ui-typography--${variant}`;
  const colorClass = color !== 'inherit' ? `ui-typography--color-${color}` : '';
  const alignClass = align ? `ui-typography--align-${align}` : '';
  const weightClass = weight ? `ui-typography--weight-${weight}` : '';
  const italicClass = italic ? 'ui-typography--italic' : '';
  const truncateClass = truncate ? (typeof truncate === 'number' ? 'ui-typography--truncate-lines' : 'ui-typography--truncate') : '';
  const noWrapClass = noWrap ? 'ui-typography--nowrap' : '';
  const gutterBottomClass = gutterBottom ? 'ui-typography--gutter-bottom' : '';

  const classes = [
    baseClass,
    variantClass,
    colorClass,
    alignClass,
    weightClass,
    italicClass,
    truncateClass,
    noWrapClass,
    gutterBottomClass,
    className
  ].filter(Boolean).join(' ');

  // Handle line clamp for truncate with number
  const computedStyle = React.useMemo(() => {
    const baseStyle = style || {};
    
    if (typeof truncate === 'number' && truncate > 0) {
      return {
        ...baseStyle,
        '--typography-line-clamp': truncate.toString(),
      } as React.CSSProperties;
    }
    
    return baseStyle;
  }, [style, truncate]);

  // Handle semantic roles for accessibility
  const getRole = (): string | undefined => {
    if (variant.startsWith('h')) return 'heading';
    if (variant === 'code') return 'code';
    return undefined;
  };

  // Get aria-level for headings
  const getAriaLevel = (): number | undefined => {
    if (variant.startsWith('h')) {
      return parseInt(variant.charAt(1), 10);
    }
    return undefined;
  };

  const role = getRole();
  const ariaLevel = getAriaLevel();

  return React.createElement(
    Component,
    {
      ...props,
      ref,
      className: classes,
      style: computedStyle,
      role,
      'aria-level': ariaLevel,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    children
  );
});

Typography.displayName = 'Typography';
