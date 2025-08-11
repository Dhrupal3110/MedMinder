import React, { forwardRef } from 'react';
import './Box.css';

export interface BoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  as?: keyof JSX.IntrinsicElements;
  p?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  px?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  py?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  pt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  pr?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  pb?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  pl?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  m?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  mx?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  my?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  mt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  mr?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  mb?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  ml?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto';
  bg?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'surface' | 'muted' | 'transparent';
  border?: 'none' | 'solid' | 'dashed' | 'dotted';
  borderColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'border' | 'muted';
  borderWidth?: 'thin' | 'medium' | 'thick';
  borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Box = forwardRef<HTMLElement, BoxProps>(({
  as = 'div',
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  bg,
  border,
  borderColor,
  borderWidth = 'thin',
  borderRadius,
  shadow,
  overflow,
  position,
  display,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  className = '',
  style,
  children,
  ...props
}, ref) => {
  
  // Build class names
  const baseClass = 'ui-box';
  
  // Padding classes
  const paddingClasses = [
    p && `ui-box--p-${p}`,
    px && `ui-box--px-${px}`,
    py && `ui-box--py-${py}`,
    pt && `ui-box--pt-${pt}`,
    pr && `ui-box--pr-${pr}`,
    pb && `ui-box--pb-${pb}`,
    pl && `ui-box--pl-${pl}`,
  ].filter(Boolean);

  // Margin classes
  const marginClasses = [
    m && `ui-box--m-${m}`,
    mx && `ui-box--mx-${mx}`,
    my && `ui-box--my-${my}`,
    mt && `ui-box--mt-${mt}`,
    mr && `ui-box--mr-${mr}`,
    mb && `ui-box--mb-${mb}`,
    ml && `ui-box--ml-${ml}`,
  ].filter(Boolean);

  // Style classes
  const styleClasses = [
    bg && `ui-box--bg-${bg}`,
    border && border !== 'none' && `ui-box--border-${border}`,
    borderColor && `ui-box--border-color-${borderColor}`,
    borderWidth && border && border !== 'none' && `ui-box--border-width-${borderWidth}`,
    borderRadius && `ui-box--border-radius-${borderRadius}`,
    shadow && shadow !== 'none' && `ui-box--shadow-${shadow}`,
    overflow && `ui-box--overflow-${overflow}`,
    position && position !== 'static' && `ui-box--position-${position}`,
    display && display !== 'block' && `ui-box--display-${display}`,
  ].filter(Boolean);

  const classes = [
    baseClass,
    ...paddingClasses,
    ...marginClasses,
    ...styleClasses,
    className
  ].filter(Boolean).join(' ');

  // Build inline styles
  const inlineStyles: React.CSSProperties = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
    ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
  };

  const Component = as as any;

  return (
    <Component
      {...props}
      ref={ref}
      className={classes}
      style={inlineStyles}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';
