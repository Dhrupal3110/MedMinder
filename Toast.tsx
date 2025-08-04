import React from 'react';
import './Label.css';

type CommonLabelProps = {
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
  /** Accessible label for the label itself (when needed) */
  'aria-label'?: string;
  /** ID of element that describes the label */
  'aria-describedby'?: string;
};

// Individual variants per "as" type
type LabelAsLabel = {
  as?: 'label';
  htmlFor?: string;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>;

type LabelAsLegend = {
  as: 'legend';
} & React.HTMLAttributes<HTMLLegendElement>;

type LabelAsDiv = {
  as: 'div';
} & React.HTMLAttributes<HTMLDivElement>;

type LabelAsSpan = {
  as: 'span';
} & React.HTMLAttributes<HTMLSpanElement>;

type LabelProps =
  | (LabelAsLabel & CommonLabelProps)
  | (LabelAsLegend & CommonLabelProps)
  | (LabelAsDiv & CommonLabelProps)
  | (LabelAsSpan & CommonLabelProps);

export const Label = React.forwardRef<HTMLElement, LabelProps>((props, ref) => {
  const {
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
    ...rest
  } = props;

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

  const filteredAria = Object.fromEntries(
    Object.entries(ariaAttributes).filter(([, v]) => v !== undefined)
  );

  if (as === 'label') {
    const { htmlFor, ...labelRest } = rest as LabelAsLabel;
    return (
      <label
        {...labelRest}
        {...filteredAria}
        htmlFor={htmlFor}
        className={classes}
        style={style}
        ref={ref as React.Ref<HTMLLabelElement>}
      >
        {content}
      </label>
    );
  }

  if (as === 'legend') {
    return (
      <legend
        {...(rest as LabelAsLegend)}
        {...filteredAria}
        className={classes}
        style={style}
        ref={ref as React.Ref<HTMLLegendElement>}
      >
        {content}
      </legend>
    );
  }

  if (as === 'span') {
    return (
      <span
        {...(rest as LabelAsSpan)}
        {...filteredAria}
        className={classes}
        style={style}
        ref={ref as React.Ref<HTMLSpanElement>}
      >
        {content}
      </span>
    );
  }

  return (
    <div
      {...(rest as LabelAsDiv)}
      {...filteredAria}
      className={classes}
      style={style}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {content}
    </div>
  );
});

Label.displayName = 'Label';
