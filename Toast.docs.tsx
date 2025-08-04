import React, { useState } from 'react';
import { ExampleContainer } from '../Shared/ExampleContainer';
import { Label } from './Label';
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
}> = ({ id, disabled, placeholder, type = 'text', required, className = '' }) => (
  <input
    id={id}
    type={type}
    disabled={disabled}
    placeholder={placeholder}
    required={required}
    className={`ui-input ${className}`}
    style={{
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '200px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease',
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
}> = ({ id, disabled, placeholder, required, rows = 3 }) => (
  <textarea
    id={id}
    disabled={disabled}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className="ui-textarea"
    style={{
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '200px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      resize: 'vertical',
    }}
  />
);

// Mock Select component for demonstration
const Select: React.FC<{
  id?: string;
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
}> = ({ id, disabled, required, children }) => (
  <select
    id={id}
    disabled={disabled}
    required={required}
    className="ui-select"
    style={{
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '224px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      background: 'white',
    }}
  >
    {children}
  </select>
);

// API Documentation
const labelProps: APITableRow[] = [
  {
    property: "htmlFor",
    description: "ID of the associated form input element. Creates semantic binding between label and input.",
    type: "string",
    default: "-",
  },
  {
    property: "children",
    description: "Label content - can be string or ReactNode.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "required",
    description: "Whether the associated input is required. Adds visual indicator (*) and aria-required.",
    type: "boolean",
    default: "false",
  },
  {
    property: "disabled",
    description: "Whether the label is disabled. Applies muted styling and aria-disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "align",
    description: "Text alignment of the label content.",
    type: "'left' | 'center' | 'right'",
    default: "'left'",
  },
  {
    property: "size",
    description: "Size variant of the label that affects font size and spacing.",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: "as",
    description: "Element type to render as. Use 'legend' for fieldsets, 'span' or 'div' for non-form contexts.",
    type: "'label' | 'legend' | 'span' | 'div'",
    default: "'label'",
  },
  {
    property: "className",
    description: "Additional CSS class name for the label.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline styles for the label.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the label itself (when additional context is needed).",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the label.",
    type: "string",
    default: "-",
  },
];

export const LabelDocs: React.FC = () => {
  const [isRequired, setIsRequired] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [labelSize, setLabelSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Label</h1>
        <p>
          Accessible label component for form inputs. Provides semantic association with form elements 
          and supports required/disabled states with proper ARIA attributes.
        </p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Associate descriptive text with form inputs, selects, and textareas.</li>
          <li>Indicate required fields with visual and semantic indicators.</li>
          <li>Provide accessible labels that screen readers can announce.</li>
          <li>Create semantic form structures with proper label-input relationships.</li>
          <li>Group related form controls with fieldset legends.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Usage */}
        <ExampleContainer
          title="Basic Usage"
          description="Simple label associated with form inputs using htmlFor prop."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<div>
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter your username" />
</div>

<div>
  <Label htmlFor="email">Email Address</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>`}
        >
          <>
            <div>
              <Label htmlFor="username">Username</Label>
              <br />
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <br />
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </>
        </ExampleContainer>

        {/* Required Fields */}
        <ExampleContainer
          title="Required Fields"
          description="Labels for required fields show a red asterisk and set proper ARIA attributes."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<div>
  <Label htmlFor="required-name" required>
    Full Name
  </Label>
  <Input id="required-name" required placeholder="Enter your full name" />
</div>

<div>
  <Label htmlFor="required-email" required>
    Email Address
  </Label>
  <Input id="required-email" type="email" required placeholder="Enter your email" />
</div>`}
        >
          <>
            <div>
              <Label htmlFor="required-name" required>
                Full Name
              </Label>
              <br />
              <Input id="required-name" required placeholder="Enter your full name" />
            </div>
            <div>
              <Label htmlFor="required-email" required>
                Email Address
              </Label>
              <br />
              <Input id="required-email" type="email" required placeholder="Enter your email" />
            </div>
          </>
        </ExampleContainer>

        {/* Disabled State */}
        <ExampleContainer
          title="Disabled State"
          description="Labels can be disabled to match the state of their associated inputs."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<div>
  <Label htmlFor="disabled-input" disabled>
    Disabled Field
  </Label>
  <Input id="disabled-input" disabled placeholder="This field is disabled" />
</div>

<div>
  <Label htmlFor="disabled-required" disabled required>
    Disabled Required Field
  </Label>
  <Input id="disabled-required" disabled required placeholder="Disabled and required" />
</div>`}
        >
          <>
            <div>
              <Label htmlFor="disabled-input" disabled>
                Disabled Field
              </Label>
              <br />
              <Input id="disabled-input" disabled placeholder="This field is disabled" />
            </div>
            <div>
              <Label htmlFor="disabled-required" disabled required>
                Disabled Required Field
              </Label>
              <br />
              <Input id="disabled-required" disabled required placeholder="Disabled and required" />
            </div>
          </>
        </ExampleContainer>

        {/* Size Variants */}
        <ExampleContainer
          title="Size Variants"
          description="Labels support three sizes to match your typography hierarchy."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<div>
  <Label htmlFor="small-input" size="sm">
    Small Label
  </Label>
  <Input id="small-input" placeholder="Small input" />
</div>

<div>
  <Label htmlFor="medium-input" size="md">
    Medium Label (Default)
  </Label>
  <Input id="medium-input" placeholder="Medium input" />
</div>

<div>
  <Label htmlFor="large-input" size="lg">
    Large Label
  </Label>
  <Input id="large-input" placeholder="Large input" />
</div>`}
        >
          <>
            <div>
              <Label htmlFor="small-input" size="sm">
                Small Label
              </Label>
              <br />
              <Input id="small-input" placeholder="Small input" />
            </div>
            <div>
              <Label htmlFor="medium-input" size="md">
                Medium Label (Default)
              </Label>
              <br />
              <Input id="medium-input" placeholder="Medium input" />
            </div>
            <div>
              <Label htmlFor="large-input" size="lg">
                Large Label
              </Label>
              <br />
              <Input id="large-input" placeholder="Large input" />
            </div>
          </>
        </ExampleContainer>

        {/* Alignment */}
        <ExampleContainer
          title="Text Alignment"
          description="Labels can be aligned left, center, or right."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start', width: '100%' }}
          code={`<div style={{ width: '100%' }}>
  <Label htmlFor="left-align" align="left">
    Left Aligned (Default)
  </Label>
  <Input id="left-align" placeholder="Left aligned" />
</div>

<div style={{ width: '100%' }}>
  <Label htmlFor="center-align" align="center">
    Center Aligned
  </Label>
  <Input id="center-align" placeholder="Center aligned" />
</div>

<div style={{ width: '100%' }}>
  <Label htmlFor="right-align" align="right">
    Right Aligned
  </Label>
  <Input id="right-align" placeholder="Right aligned" />
</div>`}
        >
          <>
            <div style={{ width: '100%' }}>
              <Label htmlFor="left-align" align="left">
                Left Aligned (Default)
              </Label>
              <br />
              <Input id="left-align" placeholder="Left aligned" />
            </div>
            <div style={{ width: '100%' }}>
              <Label htmlFor="center-align" align="center">
                Center Aligned
              </Label>
              <br />
              <Input id="center-align" placeholder="Center aligned" />
            </div>
            <div style={{ width: '100%' }}>
              <Label htmlFor="right-align" align="right">
                Right Aligned
              </Label>
              <br />
              <Input id="right-align" placeholder="Right aligned" />
            </div>
          </>
        </ExampleContainer>

        {/* Different Input Types */}
        <ExampleContainer
          title="Different Form Controls"
          description="Labels work with various types of form controls."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<div>
  <Label htmlFor="textarea-field" required>
    Description
  </Label>
  <Textarea id="textarea-field" required placeholder="Enter description" />
</div>

<div>
  <Label htmlFor="select-field">
    Country
  </Label>
  <Select id="select-field">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
  </Select>
</div>`}
        >
          <>
            <div>
              <Label htmlFor="textarea-field" required>
                Description
              </Label>
              <br />
              <Textarea id="textarea-field" required placeholder="Enter description" />
            </div>
            <div>
              <Label htmlFor="select-field">
                Country
              </Label>
              <br />
              <Select id="select-field">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </div>
          </>
        </ExampleContainer>

        {/* Custom Element Types */}
        <ExampleContainer
          title="Custom Element Types"
          description="Use the 'as' prop to render different HTML elements while maintaining label styling."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<fieldset style={{ border: '1px solid #d1d5db', padding: '16px', borderRadius: '6px' }}>
  <Label as="legend" size="lg">
    Personal Information
  </Label>
  <div style={{ marginTop: '12px' }}>
    <Label htmlFor="first-name" size="sm">First Name</Label>
    <br />
    <Input id="first-name" placeholder="Enter first name" />
  </div>
</fieldset>

<div>
  <Label as="span" size="sm">
    Status Indicator (Non-form label)
  </Label>
</div>`}
        >
          <>
            <fieldset style={{ border: '1px solid #d1d5db', padding: '16px', borderRadius: '6px', width: '300px' }}>
              <Label as="legend" size="lg">
                Personal Information
              </Label>
              <div style={{ marginTop: '12px' }}>
                <Label htmlFor="first-name" size="sm">First Name</Label>
                <br />
                <Input id="first-name" placeholder="Enter first name" />
              </div>
            </fieldset>
            <div>
              <Label as="span" size="sm">
                Status Indicator (Non-form label)
              </Label>
            </div>
          </>
        </ExampleContainer>

        {/* Rich Content */}
        <ExampleContainer
          title="Rich Content"
          description="Labels can contain complex ReactNode content with formatting and icons."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<div>
  <Label htmlFor="password-field" required>
    <strong>Password</strong>
    <br />
    <small style={{ fontWeight: 'normal', color: '#6b7280' }}>
      Must be at least 8 characters long
    </small>
  </Label>
  <Input id="password-field" type="password" required placeholder="Enter password" />
</div>

<div>
  <Label htmlFor="terms-checkbox">
    I agree to the{' '}
    <a href="#" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
      Terms of Service
    </a>{' '}
    and{' '}
    <a href="#" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
      Privacy Policy
    </a>
  </Label>
  <br />
  <input 
    id="terms-checkbox" 
    type="checkbox" 
    style={{ marginTop: '8px' }}
  />
</div>`}
        >
          <>
            <div>
              <Label htmlFor="password-field" required>
                <strong>Password</strong>
                <br />
                <small style={{ fontWeight: 'normal', color: '#6b7280' }}>
                  Must be at least 8 characters long
                </small>
              </Label>
              <br />
              <Input id="password-field" type="password" required placeholder="Enter password" />
            </div>
            <div style={{ width: '300px' }}>
              <Label htmlFor="terms-checkbox">
                I agree to the{' '}
                <a href="#" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                  Privacy Policy
                </a>
              </Label>
              <br />
              <input 
                id="terms-checkbox" 
                type="checkbox" 
                style={{ marginTop: '8px' }}
              />
            </div>
          </>
        </ExampleContainer>

        {/* Interactive Example */}
        <ExampleContainer
          title="Interactive Demo"
          description="Try different combinations of label states and properties."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [isRequired, setIsRequired] = useState(false);
const [isDisabled, setIsDisabled] = useState(false);
const [labelSize, setLabelSize] = useState<'sm' | 'md' | 'lg'>('md');
const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

<Label 
  htmlFor="interactive-input"
  required={isRequired}
  disabled={isDisabled}
  size={labelSize}
  align={alignment}
>
  Interactive Label
</Label>
<Input 
  id="interactive-input" 
  disabled={isDisabled}
  required={isRequired}
  placeholder="Interactive input"
/>`}
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
                value={labelSize} 
                onChange={(e) => setLabelSize(e.target.value as 'sm' | 'md' | 'lg')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
              <select 
                value={alignment} 
                onChange={(e) => setAlignment(e.target.value as 'left' | 'center' | 'right')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div style={{ width: '250px' }}>
              <Label 
                htmlFor="interactive-input"
                required={isRequired}
                disabled={isDisabled}
                size={labelSize}
                align={alignment}
              >
                Interactive Label
              </Label>
              <br />
              <Input 
                id="interactive-input" 
                disabled={isDisabled}
                required={isRequired}
                placeholder="Interactive input"
              />
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Current state: {isRequired ? 'Required' : 'Optional'}, {isDisabled ? 'Disabled' : 'Enabled'}, Size: {labelSize}, Align: {alignment}
            </div>
          </>
        </ExampleContainer>

        {/* Form Layout Example */}
        <ExampleContainer
          title="Complete Form Example"
          description="A realistic form demonstrating proper label usage with various input types."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`<form style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <Label htmlFor="form-name" required size="sm">Full Name</Label>
    <Input id="form-name" required placeholder="Enter your full name" />
  </div>
  
  <div>
    <Label htmlFor="form-email" required size="sm">Email</Label>
    <Input id="form-email" type="email" required placeholder="your@email.com" />
  </div>
  
  <div>
    <Label htmlFor="form-phone" size="sm">Phone Number</Label>
    <Input id="form-phone" type="tel" placeholder="(555) 123-4567" />
  </div>
  
  <div>
    <Label htmlFor="form-company" size="sm">Company</Label>
    <Input id="form-company" placeholder="Your company name" />
  </div>
  
  <div>
    <Label htmlFor="form-message" size="sm">Message</Label>
    <Textarea id="form-message" placeholder="Your message..." rows={4} />
  </div>
</form>`}
        >
          <form style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="form-name" required size="sm">Full Name</Label>
              <Input id="form-name" required placeholder="Enter your full name" />
            </div>
            
            <div>
              <Label htmlFor="form-email" required size="sm">Email</Label>
              <Input id="form-email" type="email" required placeholder="your@email.com" />
            </div>
            
            <div>
              <Label htmlFor="form-phone" size="sm">Phone Number</Label>
              <Input id="form-phone" type="tel" placeholder="(555) 123-4567" />
            </div>
            
            <div>
              <Label htmlFor="form-company" size="sm">Company</Label>
              <Input id="form-company" placeholder="Your company name" />
            </div>
            
            <div>
              <Label htmlFor="form-message" size="sm">Message</Label>
              <Textarea id="form-message" placeholder="Your message..." rows={4} />
            </div>
          </form>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>
          This section describes all the available props for the <strong>Label</strong> component. 
          You can use these properties to control behavior, appearance, and accessibility.
        </p>
        <APITable props={labelProps} />
      </div>

      <div className="docs-section">
        <h2>Accessibility</h2>
        <ul>
          <li><strong>Semantic HTML:</strong> Uses proper <code>&lt;label&gt;</code> elements for form association</li>
          <li><strong>ARIA Support:</strong> Automatically sets <code>aria-required</code> and <code>aria-disabled</code> attributes</li>
          <li><strong>Screen Reader Friendly:</strong> Properly announces required fields and disabled states</li>
          <li><strong>Keyboard Navigation:</strong> Labels are focusable and maintain proper tab order</li>
          <li><strong>High Contrast:</strong> Enhanced styling for high contrast display modes</li>
          <li><strong>Form Association:</strong> <code>htmlFor</code> creates semantic binding with form controls</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Styling & Theming</h2>
        <p>
          The Label component uses CSS variables for complete customization. 
          It integrates with your Typography system and supports light/dark themes automatically.
        </p>
        
        <h3>Key CSS Variables</h3>
        <ul>
          <li><code>--label-font-family</code> - Font family (inherits from Typography)</li>
          <li><code>--label-font-size</code> - Font size for each size variant</li>
          <li><code>--label-font-weight</code> - Font weight (bolder for required)</li>
          <li><code>--label-text-color</code> - Text color</li>
          <li><code>--label-required-color</code> - Color of the required asterisk</li>
          <li><code>--label-disabled-color</code> - Color when disabled</li>
          <li><code>--label-gap</code> - Space between content and required indicator</li>
        </ul>

        <h3>Integration with Typography</h3>
        <p>
          The Label component is designed to work seamlessly with your Typography system. 
          It respects your global font settings and can be styled to match your design tokens.
        </p>
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li>Always use <code>htmlFor</code> to associate labels with their corresponding inputs</li>
          <li>Keep label text concise but descriptive</li>
          <li>Use the <code>required</code> prop instead of manually adding asterisks</li>
          <li>Match the <code>disabled</code> state of labels with their associated inputs</li>
          <li>Use appropriate size variants to maintain visual hierarchy</li>
          <li>Provide additional context for complex fields using rich content</li>
          <li>Use <code>as="legend"</code> for fieldset groupings</li>
          <li>Test with screen readers to ensure proper announcements</li>
        </ul>
      </div>
    </div>
  );
};
