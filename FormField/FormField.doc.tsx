import React, { useState } from 'react';
import { ExampleContainer } from '../Shared/ExampleContainer';
import { FormField, useFormField } from './FormField';
import { APITable, type APITableRow } from '../Shared/APITable';
import { Button } from '../Button/Button';

// Mock Input component for demonstration
const Input: React.FC<{
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, disabled, placeholder, type = 'text', required, className = '', value, onChange }) => (
  <input
    id={id}
    type={type}
    disabled={disabled}
    placeholder={placeholder}
    required={required}
    className={`ui-input ${className}`}
    value={value}
    onChange={onChange}
    style={{
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      boxSizing: 'border-box',
    }}
  />
);

// Mock Textarea component for demonstration
const Textarea: React.FC<{
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ id, disabled, placeholder, required, rows = 3, value, onChange }) => (
  <textarea
    id={id}
    disabled={disabled}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className="ui-textarea"
    value={value}
    onChange={onChange}
    style={{
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      resize: 'vertical',
      boxSizing: 'border-box',
    }}
  />
);

// Mock Select component for demonstration
const Select: React.FC<{
  id?: string;
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ id, disabled, required, children, value, onChange }) => (
  <select
    id={id}
    disabled={disabled}
    required={required}
    className="ui-select"
    value={value}
    onChange={onChange}
    style={{
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      background: 'white',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </select>
);

// Custom component that uses FormField context
const CustomInput: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const { fieldId, hasError, isRequired, isDisabled } = useFormField();
  
  return (
    <input
      id={fieldId}
      placeholder={placeholder}
      required={isRequired}
      disabled={isDisabled}
      aria-invalid={hasError}
      style={{
        padding: '8px 12px',
        border: `2px solid ${hasError ? '#dc2626' : '#d1d5db'}`,
        borderRadius: '6px',
        fontSize: '14px',
        width: '100%',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxSizing: 'border-box',
        backgroundColor: hasError ? '#fef2f2' : 'white',
      }}
    />
  );
};

// API Documentation
const formFieldProps: APITableRow[] = [
  {
    property: "label",
    description: "Form field label - rendered using the Label component.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "htmlFor",
    description: "ID for the form control - passed to Label's htmlFor and used for accessibility.",
    type: "string",
    default: "auto-generated",
  },
  {
    property: "required",
    description: "Whether the field is required. Shows asterisk and sets aria-required.",
    type: "boolean",
    default: "false",
  },
  {
    property: "description",
    description: "Helper text shown below the form control using Typography component.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "error",
    description: "Error message (string) or error state (boolean). Shows error styling and message.",
    type: "string | boolean",
    default: "-",
  },
  {
    property: "disabled",
    description: "Whether the field is disabled. Applies disabled styling and aria-disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "layout",
    description: "Layout orientation - stacked (vertical) or inline (horizontal).",
    type: "'stacked' | 'inline'",
    default: "'stacked'",
  },
  {
    property: "size",
    description: "Size variant that affects label and typography sizing.",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: "children",
    description: "Form control element(s) - Input, Textarea, Select, or custom components.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "className",
    description: "Additional CSS class name for the FormField wrapper.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline styles for the FormField wrapper.",
    type: "React.CSSProperties",
    default: "-",
  },
];

export const FormFieldDocs: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    country: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRequired, setIsRequired] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fieldSize, setFieldSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [layout, setLayout] = useState<'stacked' | 'inline'>('stacked');

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>FormField</h1>
        <p>
          Accessible form field wrapper that combines labels, form controls, descriptions, and error messages 
          with consistent layout, spacing, and ARIA attributes. Built on top of Label and Typography components.
        </p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Wrap form inputs with consistent styling and accessibility patterns.</li>
          <li>Display field labels, descriptions, and validation errors in a unified layout.</li>
          <li>Create accessible forms with proper ARIA relationships between elements.</li>
          <li>Maintain consistent spacing and alignment across form fields.</li>
          <li>Support both stacked and inline label layouts.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Usage */}
        <ExampleContainer
          title="Basic Usage"
          description="Simple form fields with labels and various input types."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
          code={`<FormField label="Username" htmlFor="basic-username">
  <Input id="basic-username" placeholder="Enter your username" />
</FormField>

<FormField label="Email Address" htmlFor="basic-email">
  <Input id="basic-email" type="email" placeholder="your@email.com" />
</FormField>

<FormField label="Biography" htmlFor="basic-bio">
  <Textarea id="basic-bio" placeholder="Tell us about yourself..." rows={3} />
</FormField>`}
        >
          <>
            <FormField label="Username" htmlFor="basic-username">
              <Input id="basic-username" placeholder="Enter your username" />
            </FormField>

            <FormField label="Email Address" htmlFor="basic-email">
              <Input id="basic-email" type="email" placeholder="your@email.com" />
            </FormField>

            <FormField label="Biography" htmlFor="basic-bio">
              <Textarea id="basic-bio" placeholder="Tell us about yourself..." rows={3} />
            </FormField>
          </>
        </ExampleContainer>

        {/* Required Fields */}
        <ExampleContainer
          title="Required Fields"
          description="Fields marked as required show an asterisk and set proper ARIA attributes."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
          code={`<FormField 
  label="Full Name" 
  htmlFor="required-name" 
  required
>
  <Input id="required-name" placeholder="Enter your full name" />
</FormField>

<FormField 
  label="Email Address" 
  htmlFor="required-email" 
  required
  description="We'll use this to send you important updates"
>
  <Input id="required-email" type="email" placeholder="your@email.com" />
</FormField>`}
        >
          <>
            <FormField 
              label="Full Name" 
              htmlFor="required-name" 
              required
            >
              <Input id="required-name" placeholder="Enter your full name" />
            </FormField>

            <FormField 
              label="Email Address" 
              htmlFor="required-email" 
              required
              description="We'll use this to send you important updates"
            >
              <Input id="required-email" type="email" placeholder="your@email.com" />
            </FormField>
          </>
        </ExampleContainer>

        {/* With Descriptions */}
        <ExampleContainer
          title="With Descriptions"
          description="Helper text provides additional context for form fields."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}
          code={`<FormField 
  label="Password" 
  htmlFor="desc-password"
  description="Must be at least 8 characters with uppercase, lowercase, and numbers"
>
  <Input id="desc-password" type="password" placeholder="Enter password" />
</FormField>

<FormField 
  label="Profile URL" 
  htmlFor="desc-url"
  description="This will be your public profile link: mysite.com/profile/username"
>
  <Input id="desc-url" placeholder="username" />
</FormField>

<FormField 
  label="API Key" 
  htmlFor="desc-api"
  description={
    <>
      Keep this secret! You can generate a new one in{' '}
      <a href="#" style={{ color: '#3b82f6' }}>Settings → API Keys</a>
    </>
  }
>
  <Input id="desc-api" type="password" placeholder="Enter your API key" />
</FormField>`}
        >
          <>
            <FormField 
              label="Password" 
              htmlFor="desc-password"
              description="Must be at least 8 characters with uppercase, lowercase, and numbers"
            >
              <Input id="desc-password" type="password" placeholder="Enter password" />
            </FormField>

            <FormField 
              label="Profile URL" 
              htmlFor="desc-url"
              description="This will be your public profile link: mysite.com/profile/username"
            >
              <Input id="desc-url" placeholder="username" />
            </FormField>

            <FormField 
              label="API Key" 
              htmlFor="desc-api"
              description={
                <>
                  Keep this secret! You can generate a new one in{' '}
                  <a href="#" style={{ color: '#3b82f6' }}>Settings → API Keys</a>
                </>
              }
            >
              <Input id="desc-api" type="password" placeholder="Enter your API key" />
            </FormField>
          </>
        </ExampleContainer>

        {/* Error States */}
        <ExampleContainer
          title="Error States"
          description="Display validation errors with proper styling and accessibility."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
          code={`<FormField 
  label="Username" 
  htmlFor="error-username"
  error="Username must be at least 3 characters long"
  required
>
  <Input id="error-username" placeholder="Enter username" />
</FormField>

<FormField 
  label="Email" 
  htmlFor="error-email"
  error="Please enter a valid email address"
  description="We'll send a verification email to this address"
>
  <Input id="error-email" type="email" placeholder="your@email.com" />
</FormField>

<FormField 
  label="Confirm Password" 
  htmlFor="error-confirm"
  error={true}  // Boolean error state without message
>
  <Input id="error-confirm" type="password" placeholder="Confirm password" />
</FormField>`}
        >
          <>
            <FormField 
              label="Username" 
              htmlFor="error-username"
              error="Username must be at least 3 characters long"
              required
            >
              <Input id="error-username" placeholder="Enter username" />
            </FormField>

            <FormField 
              label="Email" 
              htmlFor="error-email"
              error="Please enter a valid email address"
              description="We'll send a verification email to this address"
            >
              <Input id="error-email" type="email" placeholder="your@email.com" />
            </FormField>

            <FormField 
              label="Confirm Password" 
              htmlFor="error-confirm"
              error={true}
            >
              <Input id="error-confirm" type="password" placeholder="Confirm password" />
            </FormField>
          </>
        </ExampleContainer>

        {/* Disabled State */}
        <ExampleContainer
          title="Disabled State"
          description="Disabled form fields with muted styling and proper accessibility."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
          code={`<FormField 
  label="Account Type" 
  htmlFor="disabled-account"
  disabled
  description="Account type cannot be changed after registration"
>
  <Input id="disabled-account" value="Premium" disabled />
</FormField>

<FormField 
  label="Legacy Setting" 
  htmlFor="disabled-legacy"
  disabled
  required
  description="This feature is no longer available"
>
  <Select id="disabled-legacy" disabled>
    <option>Deprecated Option</option>
  </Select>
</FormField>`}
        >
          <>
            <FormField 
              label="Account Type" 
              htmlFor="disabled-account"
              disabled
              description="Account type cannot be changed after registration"
            >
              <Input id="disabled-account" value="Premium" disabled />
            </FormField>

            <FormField 
              label="Legacy Setting" 
              htmlFor="disabled-legacy"
              disabled
              required
              description="This feature is no longer available"
            >
              <Select id="disabled-legacy" disabled>
                <option>Deprecated Option</option>
              </Select>
            </FormField>
          </>
        </ExampleContainer>

        {/* Size Variants */}
        <ExampleContainer
          title="Size Variants"
          description="Different sizes affect label typography and field spacing."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
          code={`<FormField 
  label="Small Field" 
  htmlFor="size-small"
  size="sm"
  description="Compact size for dense forms"
>
  <Input id="size-small" placeholder="Small input" />
</FormField>

<FormField 
  label="Medium Field (Default)" 
  htmlFor="size-medium"
  size="md"
  description="Standard size for most forms"
>
  <Input id="size-medium" placeholder="Medium input" />
</FormField>

<FormField 
  label="Large Field" 
  htmlFor="size-large"
  size="lg"
  description="Prominent size for important fields"
>
  <Input id="size-large" placeholder="Large input" />
</FormField>`}
        >
          <>
            <FormField 
              label="Small Field" 
              htmlFor="size-small"
              size="sm"
              description="Compact size for dense forms"
            >
              <Input id="size-small" placeholder="Small input" />
            </FormField>

            <FormField 
              label="Medium Field (Default)" 
              htmlFor="size-medium"
              size="md"
              description="Standard size for most forms"
            >
              <Input id="size-medium" placeholder="Medium input" />
            </FormField>

            <FormField 
              label="Large Field" 
              htmlFor="size-large"
              size="lg"
              description="Prominent size for important fields"
            >
              <Input id="size-large" placeholder="Large input" />
            </FormField>
          </>
        </ExampleContainer>

        {/* Inline Layout */}
        <ExampleContainer
          title="Inline Layout"
          description="Horizontal layout with labels beside inputs (responsive - stacks on mobile)."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}
          code={`<FormField 
  label="First Name" 
  htmlFor="inline-first"
  layout="inline"
  required
>
  <Input id="inline-first" placeholder="John" />
</FormField>

<FormField 
  label="Email Address" 
  htmlFor="inline-email"
  layout="inline"
  description="Primary contact email"
>
  <Input id="inline-email" type="email" placeholder="john@example.com" />
</FormField>

<FormField 
  label="Country" 
  htmlFor="inline-country"
  layout="inline"
>
  <Select id="inline-country">
    <option value="">Select country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
  </Select>
</FormField>`}
        >
          <>
            <FormField 
              label="First Name" 
              htmlFor="inline-first"
              layout="inline"
              required
            >
              <Input id="inline-first" placeholder="John" />
            </FormField>

            <FormField 
              label="Email Address" 
              htmlFor="inline-email"
              layout="inline"
              description="Primary contact email"
            >
              <Input id="inline-email" type="email" placeholder="john@example.com" />
            </FormField>

            <FormField 
              label="Country" 
              htmlFor="inline-country"
              layout="inline"
            >
              <Select id="inline-country">
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </FormField>
          </>
        </ExampleContainer>

        {/* Rich Label Content */}
        <ExampleContainer
          title="Rich Label Content"
          description="Labels can contain complex content including formatting and links."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '450px' }}
          code={`<FormField 
  label={
    <>
      <strong>Password</strong>
      <br />
      <small style={{ fontWeight: 'normal', color: '#6b7280' }}>
        Choose a secure password
      </small>
    </>
  }
  htmlFor="rich-password"
  required
  description="Must include uppercase, lowercase, numbers, and symbols"
>
  <Input id="rich-password" type="password" placeholder="Enter password" />
</FormField>

<FormField 
  label={
    <>
      I agree to the{' '}
      <a href="#" style={{ color: '#3b82f6' }}>Terms of Service</a>
      {' '}and{' '}
      <a href="#" style={{ color: '#3b82f6' }}>Privacy Policy</a>
    </>
  }
  htmlFor="rich-terms"
>
  <input id="rich-terms" type="checkbox" />
</FormField>`}
        >
          <>
            <FormField 
              label={
                <>
                  <strong>Password</strong>
                  <br />
                  <small style={{ fontWeight: 'normal', color: '#6b7280' }}>
                    Choose a secure password
                  </small>
                </>
              }
              htmlFor="rich-password"
              required
              description="Must include uppercase, lowercase, numbers, and symbols"
            >
              <Input id="rich-password" type="password" placeholder="Enter password" />
            </FormField>

            <FormField 
              label={
                <>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#3b82f6' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#3b82f6' }}>Privacy Policy</a>
                </>
              }
              htmlFor="rich-terms"
            >
              <input 
                id="rich-terms" 
                type="checkbox" 
                style={{ width: 'auto', margin: 0 }}
              />
            </FormField>
          </>
        </ExampleContainer>

        {/* Custom Components with Context */}
        <ExampleContainer
          title="Custom Components with Context"
          description="Use the FormField context to build custom form controls that integrate seamlessly."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
          code={`// Custom component using FormField context
const CustomInput = ({ placeholder }) => {
  const { fieldId, hasError, isRequired, isDisabled } = useFormField();
  
  return (
    <input
      id={fieldId}
      placeholder={placeholder}
      required={isRequired}
      disabled={isDisabled}
      aria-invalid={hasError}
      style={{
        border: \`2px solid \${hasError ? '#dc2626' : '#d1d5db'}\`,
        backgroundColor: hasError ? '#fef2f2' : 'white',
        // ... other styles
      }}
    />
  );
};

<FormField 
  label="Custom Input" 
  htmlFor="custom-input"
  error="This field has an error"
  description="Built with FormField context"
>
  <CustomInput placeholder="Custom styled input" />
</FormField>`}
        >
          <>
            <FormField 
              label="Custom Input" 
              htmlFor="custom-input"
              error="This field has an error"
              description="Built with FormField context"
            >
              <CustomInput placeholder="Custom styled input" />
            </FormField>

            <FormField 
              label="Valid Custom Input" 
              htmlFor="custom-valid"
              required
              description="This one is working correctly"
            >
              <CustomInput placeholder="Valid custom input" />
            </FormField>
          </>
        </ExampleContainer>

        {/* Interactive Demo */}
        <ExampleContainer
          title="Interactive Demo"
          description="Try different combinations of FormField states and properties."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [isRequired, setIsRequired] = useState(true);
const [isDisabled, setIsDisabled] = useState(false);
const [fieldSize, setFieldSize] = useState('md');
const [layout, setLayout] = useState('stacked');

<FormField 
  label="Interactive Field"
  htmlFor="interactive-field"
  required={isRequired}
  disabled={isDisabled}
  size={fieldSize}
  layout={layout}
  description="This field changes based on the controls above"
  error={/* conditional error */}
>
  <Input 
    id="interactive-field"
    placeholder="Try the controls above"
  />
</FormField>`}
        >
          <>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <Button 
                size="sm" 
                onClick={() => setIsRequired(!isRequired)}
                style={{ backgroundColor: isRequired ? '#dc2626' : '#6b7280' }}
              >
                {isRequired ? 'Remove Required' : 'Make Required'}
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsDisabled(!isDisabled)}
                style={{ backgroundColor: isDisabled ? '#6b7280' : '#3b82f6' }}
              >
                {isDisabled ? 'Enable' : 'Disable'}
              </Button>
              <select 
                value={fieldSize} 
                onChange={(e) => setFieldSize(e.target.value as 'sm' | 'md' | 'lg')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
              <select 
                value={layout} 
                onChange={(e) => setLayout(e.target.value as 'stacked' | 'inline')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              >
                <option value="stacked">Stacked</option>
                <option value="inline">Inline</option>
              </select>
            </div>
            <div style={{ maxWidth: layout === 'inline' ? '500px' : '350px' }}>
              <FormField 
                label="Interactive Field"
                htmlFor="interactive-field"
                required={isRequired}
                disabled={isDisabled}
                size={fieldSize}
                layout={layout}
                description="This field changes based on the controls above"
                error={isDisabled ? "Field is currently disabled" : undefined}
              >
                <Input 
                  id="interactive-field"
                  placeholder="Try the controls above"
                />
              </FormField>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Current state: {isRequired ? 'Required' : 'Optional'}, {isDisabled ? 'Disabled' : 'Enabled'}, 
              Size: {fieldSize}, Layout: {layout}
            </div>
          </>
        </ExampleContainer>

        {/* Complete Form Example */}
        <ExampleContainer
          title="Complete Form Example"
          description="A realistic form demonstrating validation, error handling, and proper FormField usage."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [formData, setFormData] = useState({
  username: '', email: '', password: '', confirmPassword: '', bio: '', country: ''
});
const [errors, setErrors] = useState({});

const validateForm = () => {
  // Validation logic...
};

<form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
  <FormField 
    label="Username" 
    htmlFor="form-username"
    required
    error={errors.username}
    description="Choose a unique username (3+ characters)"
  >
    <Input 
      id="form-username"
      value={formData.username}
      onChange={handleInputChange('username')}
      placeholder="Enter username"
    />
  </FormField>
  
  {/* More fields... */}
  
  <Button type="submit">Create Account</Button>
</form>`}
        >
          <form 
            onSubmit={(e) => { e.preventDefault(); validateForm(); }} 
            style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <FormField 
              label="Username" 
              htmlFor="form-username"
              required
              error={errors.username}
              description="Choose a unique username (3+ characters)"
            >
              <Input 
                id="form-username"
                value={formData.username}
                onChange={handleInputChange('username')}
                placeholder="Enter username"
              />
            </FormField>

            <FormField 
              label="Email Address" 
              htmlFor="form-email"
              required
              error={errors.email}
              description="We'll send a verification email here"
            >
              <Input 
                id="form-email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="your@email.com"
              />
            </FormField>

            <FormField 
              label="Password" 
              htmlFor="form-password"
              error={errors.password}
              description="Must be at least 8 characters long"
            >
              <Input 
                id="form-password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                placeholder="Choose a secure password"
              />
            </FormField>

            <FormField 
              label="Confirm Password" 
              htmlFor="form-confirm"
              error={errors.confirmPassword}
            >
              <Input 
                id="form-confirm"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                placeholder="Repeat your password"
              />
            </FormField>

            <FormField 
              label="Biography" 
              htmlFor="form-bio"
              description="Tell us a bit about yourself (optional)"
            >
              <Textarea 
                id="form-bio"
                value={formData.bio}
                onChange={handleInputChange('bio')}
                placeholder="Your bio..."
                rows={3}
              />
            </FormField>

            <FormField 
              label="Country" 
              htmlFor="form-country"
            >
              <Select 
                id="form-country"
                value={formData.country}
                onChange={handleInputChange('country')}
              >
                <option value="">Select your country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
              </Select>
            </FormField>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <Button type="submit" style={{ backgroundColor: '#3b82f6' }}>
                Create Account
              </Button>
              <Button 
                type="button" 
                onClick={() => {
                  setFormData({
                    username: '', email: '', password: '', confirmPassword: '', bio: '', country: ''
                  });
                  setErrors({});
                }}
                style={{ backgroundColor: '#6b7280' }}
              >
                Reset
              </Button>
            </div>

            {Object.keys(errors).length > 0 && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#fef2f2', 
                border: '1px solid #fecaca', 
                borderRadius: '6px',
                fontSize: '14px',
                color: '#dc2626'
              }}>
                Please fix the errors above to continue.
              </div>
            )}
          </form>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>
          This section describes all the available props for the <strong>FormField</strong> component. 
          You can use these properties to control layout, validation, accessibility, and appearance.
        </p>
        <APITable props={formFieldProps} />
      </div>

      <div className="docs-section">
        <h2>FormField Context</h2>
        <p>
          FormField provides a context that nested components can use to access field state and IDs. 
          This is useful for building custom form controls that integrate seamlessly.
        </p>
        
        <h3>Context Properties</h3>
        <ul>
          <li><code>fieldId</code> - The ID of the form control element</li>
          <li><code>labelId</code> - The ID of the label element</li>
          <li><code>descriptionId</code> - The ID of the description element (if present)</li>
          <li><code>errorId</code> - The ID of the error element (if present)</li>
          <li><code>hasError</code> - Boolean indicating if the field has an error</li>
          <li><code>isRequired</code> - Boolean indicating if the field is required</li>
          <li><code>isDisabled</code> - Boolean indicating if the field is disabled</li>
        </ul>

        <h3>Usage</h3>
        <pre style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '12px', 
          borderRadius: '6px', 
          fontSize: '14px',
          overflow: 'auto'
        }}>
{`import { useFormField } from './FormField';

const CustomInput = () => {
  const { fieldId, hasError, isRequired, isDisabled } = useFormField();
  
  return (
    <input
      id={fieldId}
      required={isRequired}
      disabled={isDisabled}
      aria-invalid={hasError}
      // ... other props
    />
  );
};`}
        </pre>
      </div>

      <div className="docs-section">
        <h2>Accessibility</h2>
        <ul>
          <li><strong>Semantic Association:</strong> Automatically links labels to form controls using <code>htmlFor</code></li>
          <li><strong>ARIA Attributes:</strong> Sets <code>aria-describedby</code> to link descriptions and errors</li>
          <li><strong>Error Announcements:</strong> Error messages use <code>role="alert"</code> for screen reader announcements</li>
          <li><strong>Required Fields:</strong> Properly sets <code>aria-required</code> and visual indicators</li>
          <li><strong>Disabled State:</strong> Sets <code>aria-disabled</code> and prevents interaction</li>
          <li><strong>Focus Management:</strong> Maintains logical tab order and focus indicators</li>
          <li><strong>Validation State:</strong> Uses <code>aria-invalid</code> to indicate field errors</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Styling & Theming</h2>
        <p>
          FormField uses CSS variables for complete customization and integrates with your existing 
          Label and Typography components for consistent styling across your design system.
        </p>
        
        <h3>Key CSS Variables</h3>
        <ul>
          <li><code>--formfield-gap</code> - Spacing between form field elements</li>
          <li><code>--formfield-inline-gap</code> - Spacing in inline layout mode</li>
          <li><code>--formfield-inline-label-width</code> - Label width in inline layout</li>
          <li><code>--formfield-description-color</code> - Color for description text</li>
          <li><code>--formfield-error-color</code> - Color for error messages and styling</li>
          <li><code>--formfield-disabled-opacity</code> - Opacity for disabled state</li>
          <li><code>--formfield-focus-label-color</code> - Label color when field is focused</li>
        </ul>

        <h3>Component Integration</h3>
        <p>
          FormField automatically inherits styling from your Label and Typography components, 
          ensuring consistent appearance across your form elements while allowing for customization 
          where needed.
        </p>
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li>Always provide meaningful labels for form fields</li>
          <li>Use descriptions to clarify field requirements or provide helpful context</li>
          <li>Show validation errors clearly with specific, actionable messages</li>
          <li>Mark required fields consistently and provide clear visual indicators</li>
          <li>Use appropriate input types (email, password, tel) for better UX and validation</li>
          <li>Group related fields using fieldsets with legend labels</li>
          <li>Test forms with keyboard navigation and screen readers</li>
          <li>Provide inline validation feedback when possible</li>
          <li>Use the inline layout sparingly - primarily for compact forms or specific design requirements</li>
          <li>Leverage the FormField context for custom components to maintain consistency</li>
        </ul>
      </div>
    </div>
  );
};
