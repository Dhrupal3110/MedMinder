import React, { createContext, useContext, useMemo } from 'react';
import { Label } from '../Label/Label';
import { Typography } from '../Typography/Typography';
import './FormField.css';

// Context for sharing field state with nested components
export interface FormFieldContextValue {
  fieldId: string;
  labelId: string;
  descriptionId?: string;
  errorId?: string;
  hasError: boolean;
  isRequired: boolean;
  isDisabled: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within a FormField component');
  }
  return context;
};

export interface FormFieldProps {
  /** Form field label - rendered using Label component */
  label?: React.ReactNode;
  /** ID for the form control - passed to Label's htmlFor */
  htmlFor?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text shown below the form control */
  description?: React.ReactNode;
  /** Error message or boolean error state */
  error?: string | boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Layout orientation */
  layout?: 'stacked' | 'inline';
  /** Size variant for label and typography */
  size?: 'sm' | 'md' | 'lg';
  /** Form control element(s) */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Additional props for the field wrapper */
  [key: string]: any;
}

let fieldIdCounter = 0;

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const {
    label,
    htmlFor,
    required = false,
    description,
    error,
    disabled = false,
    layout = 'stacked',
    size = 'md',
    children,
    className = '',
    style,
    ...rest
  } = props;

  // Generate unique IDs for accessibility
  const fieldId = useMemo(() => htmlFor || `formfield-${++fieldIdCounter}`, [htmlFor]);
  const labelId = `${fieldId}-label`;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  // Build CSS classes
  const baseClass = 'ui-formfield';
  const layoutClass = `ui-formfield--${layout}`;
  const sizeClass = `ui-formfield--${size}`;
  const errorClass = hasError ? 'ui-formfield--error' : '';
  const disabledClass = disabled ? 'ui-formfield--disabled' : '';
  const requiredClass = required ? 'ui-formfield--required' : '';

  const classes = [
    baseClass,
    layoutClass,
    sizeClass,
    errorClass,
    disabledClass,
    requiredClass,
    className
  ].filter(Boolean).join(' ');

  // Context value for nested components
  const contextValue: FormFieldContextValue = {
    fieldId,
    labelId,
    descriptionId,
    errorId,
    hasError,
    isRequired: required,
    isDisabled: disabled,
  };

  // Clone children to add accessibility attributes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const describedBy = [descriptionId, errorId].filter(Boolean).join(' ');
      
      return React.cloneElement(child as React.ReactElement<any>, {
        id: child.props.id || fieldId,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': hasError ? 'true' : undefined,
        'aria-required': required ? 'true' : undefined,
        disabled: disabled || child.props.disabled,
        required: required || child.props.required,
      });
    }
    return child;
  });

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={classes}
        style={style}
        {...rest}
      >
        {label && (
          <div className="ui-formfield__label-wrapper">
            <Label
              id={labelId}
              htmlFor={fieldId}
              required={required}
              disabled={disabled}
              size={size}
              className="ui-formfield__label"
            >
              {label}
            </Label>
          </div>
        )}
        
        <div className="ui-formfield__control-wrapper">
          <div className="ui-formfield__control">
            {enhancedChildren}
          </div>
          
          {description && (
            <div className="ui-formfield__description">
              <Typography
                id={descriptionId}
                variant="body-sm"
                color="muted"
                className="ui-formfield__description-text"
              >
                {description}
              </Typography>
            </div>
          )}
          
          {hasError && errorMessage && (
            <div className="ui-formfield__error" role="alert">
              <Typography
                id={errorId}
                variant="body-sm"
                color="danger"
                className="ui-formfield__error-text"
              >
                {errorMessage}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </FormFieldContext.Provider>
  );
});

FormField.displayName = 'FormField';

// Export context for external use
export { FormFieldContext };
