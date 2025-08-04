import React, { forwardRef } from 'react';
import './Label.css';

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> {
  /** ID of the associated form input element */
  htmlFor?: string;
  /** Label content - can be string or ReactNode */
  children: React.ReactNode;
  /** Whether the associated input is required - adds visual indicator */
  required?: boolean;
  /** Whether the label is disabled - applies muted styling */
  disabled?: boolean;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Custom element type to render as */
  as?: 'label' | 'legend' | 'span' | 'div';
  /** Accessible label for the label itself (when needed) */
  'aria-label'?: string;
  /** ID of element that describes the label */
  'aria-describedby'?: string;
}

export const Label = forwardRef<HTMLElement, LabelProps>(({
  htmlFor,
  children,
  required = false,
  disabled = false,
  align = 'left',
  size = 'md',
  className = '',
  style,
  as = 'label',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const baseClass = 'ui-label';
  const sizeClass = `ui-label--${size}`;
  const alignClass = align !== 'left' ? `ui-label--${align}` : '';
  const requiredClass = required ? 'ui-label--required' : '';
  const disabledClass = disabled ? 'ui-label--disabled' : '';
  const classes = [baseClass, sizeClass, alignClass, requiredClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const ariaAttributes = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-required': required ? 'true' : undefined,
    'aria-disabled': disabled ? 'true' : undefined,
  };

  const filteredAriaAttributes = Object.fromEntries(
    Object.entries(ariaAttributes).filter(([, value]) => value !== undefined)
  );

  const commonProps = {
    ...props,
    ...filteredAriaAttributes,
    className: classes,
    style,
  };

  const content = (
    <>
      <span className="ui-label-content">{children}</span>
      {required && (
        <span
          className="ui-label-required-indicator"
          aria-hidden="true"
          title="Required field"
        >
          *
        </span>
      )}
    </>
  );

  if (as === 'label') {
    return (
      <label
        {...commonProps}
        ref={ref as React.Ref<HTMLLabelElement>}
        htmlFor={htmlFor}
      >
        {content}
      </label>
    );
  }

  if (as === 'legend') {
    const { htmlFor: _, ...legendProps } = commonProps;
    return (
      <legend
        {...legendProps}
        ref={ref as React.Ref<HTMLLegendElement>}
      >
        {content}
      </legend>
    );
  }

  if (as === 'span') {
    const { htmlFor: _, ...spanProps } = commonProps;
    return (
      <span
        {...spanProps}
        ref={ref as React.Ref<HTMLSpanElement>}
      >
        {content}
      </span>
    );
  }

  // Fallback to <div>
  const { htmlFor: _, ...divProps } = commonProps;
  return (
    <div
      {...divProps}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {content}
    </div>
  );
});

Label.displayName = 'Label';
