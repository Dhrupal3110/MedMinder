import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Typography } from "./Typography";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";

const typographyProps: APITableRow[] = [
  {
    property: "variant",
    description: "The typographic variant to apply. Determines font size, weight, and spacing.",
    type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'code'",
    default: "'body1'",
  },
  {
    property: "as",
    description: "The HTML element to render. Overrides the default element for the variant.",
    type: "keyof JSX.IntrinsicElements",
    default: "Auto-determined by variant",
  },
  {
    property: "component",
    description: "Alias for 'as' prop for backward compatibility.",
    type: "keyof JSX.IntrinsicElements",
    default: "Auto-determined by variant",
  },
  {
    property: "color",
    description: "Color variant to apply to the text.",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'inherit'",
    default: "'inherit'",
  },
  {
    property: "align",
    description: "Text alignment.",
    type: "'left' | 'center' | 'right' | 'justify'",
    default: "-",
  },
  {
    property: "weight",
    description: "Font weight to apply.",
    type: "'light' | 'normal' | 'medium' | 'semibold' | 'bold'",
    default: "Determined by variant",
  },
  {
    property: "italic",
    description: "Whether to apply italic styling.",
    type: "boolean",
    default: "false",
  },
  {
    property: "truncate",
    description: "Truncate text with ellipsis. Use number for line clamping.",
    type: "boolean | number",
    default: "false",
  },
  {
    property: "noWrap",
    description: "Prevent text from wrapping to new lines.",
    type: "boolean",
    default: "false",
  },
  {
    property: "gutterBottom",
    description: "Add bottom margin for spacing.",
    type: "boolean",
    default: "false",
  },
  {
    property: "className",
    description: "Additional class name for the typography element.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the typography element.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "The content to display.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the typography element.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the typography.",
    type: "string",
    default: "-",
  },
];

const typographyMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the typography element.",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the typography element.",
    type: "() => void",
    default: "-",
  },
];

export const TypographyDocs: React.FC = () => {
  const [truncateLines, setTruncateLines] = useState(2);
  const [selectedAlign, setSelectedAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [selectedWeight, setSelectedWeight] = useState<'light' | 'normal' | 'medium' | 'semibold' | 'bold'>('normal');

  const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Typography</h1>
        <p>Typography component for consistent text styling across your application. Provides semantic HTML elements with design system typography scales.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Use Typography to create consistent text hierarchy and maintain design system compliance.</li>
          <li>Apply different typographic variants to establish visual hierarchy (headings, body text, captions).</li>
          <li>Ensure semantic HTML structure while maintaining visual consistency.</li>
          <li>Handle text truncation, alignment, and responsive typography needs.</li>
          <li>Provide accessible text with proper semantic roles and ARIA attributes.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Headings */}
        <ExampleContainer
          title="Headings"
          description="Typography variants for headings with proper semantic hierarchy."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>`}
        >
          <>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
          </>
        </ExampleContainer>

        {/* Subtitles */}
        <ExampleContainer
          title="Subtitles"
          description="Subtitle variants for secondary headings and section descriptions."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Typography variant="subtitle1">Subtitle 1 - Larger secondary text</Typography>
<Typography variant="subtitle2">Subtitle 2 - Smaller secondary text</Typography>`}
        >
          <>
            <Typography variant="subtitle1">Subtitle 1 - Larger secondary text</Typography>
            <Typography variant="subtitle2">Subtitle 2 - Smaller secondary text</Typography>
          </>
        </ExampleContainer>

        {/* Body Text */}
        <ExampleContainer
          title="Body Text"
          description="Standard body text variants for paragraphs and general content."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Typography variant="body1">
  Body 1 - This is the default body text variant used for most paragraph content.
</Typography>
<Typography variant="body2">
  Body 2 - Smaller body text variant for secondary content and descriptions.
</Typography>`}
        >
          <>
            <Typography variant="body1">
              Body 1 - This is the default body text variant used for most paragraph content. It provides excellent readability and is suitable for longer text blocks.
            </Typography>
            <Typography variant="body2">
              Body 2 - Smaller body text variant for secondary content and descriptions. Perfect for supporting information and metadata.
            </Typography>
          </>
        </ExampleContainer>

        {/* Small Text Variants */}
        <ExampleContainer
          title="Small Text Variants"
          description="Caption and overline text for labels, metadata, and fine print."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Typography variant="caption">Caption text - Used for image captions, help text, and metadata</Typography>
<Typography variant="overline">Overline text - All caps label style</Typography>
<Typography variant="code">inline code snippet</Typography>`}
        >
          <>
            <Typography variant="caption">Caption text - Used for image captions, help text, and metadata</Typography>
            <Typography variant="overline">Overline text - All caps label style</Typography>
            <Typography variant="code">inline code snippet</Typography>
          </>
        </ExampleContainer>

        {/* Color Variants */}
        <ExampleContainer
          title="Color Variants"
          description="Different color variants for various contexts and states."
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          code={`<Typography color="primary">Primary color text</Typography>
<Typography color="secondary">Secondary color text</Typography>
<Typography color="success">Success color text</Typography>
<Typography color="warning">Warning color text</Typography>
<Typography color="danger">Danger color text</Typography>
<Typography color="info">Info color text</Typography>`}
        >
          <>
            <Typography color="primary">Primary color text</Typography>
            <Typography color="secondary">Secondary color text</Typography>
            <Typography color="success">Success color text</Typography>
            <Typography color="warning">Warning color text</Typography>
            <Typography color="danger">Danger color text</Typography>
            <Typography color="info">Info color text</Typography>
          </>
        </ExampleContainer>

        {/* Alignment */}
        <ExampleContainer
          title="Text Alignment"
          description="Control text alignment with the align prop."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Typography align="left">Left aligned text</Typography>
<Typography align="center">Center aligned text</Typography>
<Typography align="right">Right aligned text</Typography>
<Typography align="justify">Justified text that spreads across the full width...</Typography>`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                <Button
                  key={align}
                  size="sm"
                  variant={selectedAlign === align ? 'primary' : 'secondary'}
                  onClick={() => setSelectedAlign(align)}
                >
                  {align}
                </Button>
              ))}
            </div>
            <Typography align={selectedAlign}>
              This text alignment can be controlled dynamically. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </>
        </ExampleContainer>

        {/* Font Weights */}
        <ExampleContainer
          title="Font Weights"
          description="Different font weights for emphasis and hierarchy."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Typography weight="light">Light weight text</Typography>
<Typography weight="normal">Normal weight text</Typography>
<Typography weight="medium">Medium weight text</Typography>
<Typography weight="semibold">Semibold weight text</Typography>
<Typography weight="bold">Bold weight text</Typography>`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {(['light', 'normal', 'medium', 'semibold', 'bold'] as const).map((weight) => (
                <Button
                  key={weight}
                  size="sm"
                  variant={selectedWeight === weight ? 'primary' : 'secondary'}
                  onClick={() => setSelectedWeight(weight)}
                >
                  {weight}
                </Button>
              ))}
            </div>
            <Typography weight={selectedWeight}>
              This text uses {selectedWeight} font weight. You can see how different weights affect the visual hierarchy and emphasis of the text.
            </Typography>
          </>
        </ExampleContainer>

        {/* Text Styling */}
        <ExampleContainer
          title="Text Styling"
          description="Additional text styling options like italic and combinations."
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          code={`<Typography italic>Italic text for emphasis</Typography>
<Typography weight="bold" italic>Bold italic combination</Typography>
<Typography variant="h4" color="primary" italic>Styled heading with color and italic</Typography>`}
        >
          <>
            <Typography italic>Italic text for emphasis</Typography>
            <Typography weight="bold" italic>Bold italic combination</Typography>
            <Typography variant="h4" color="primary" italic>Styled heading with color and italic</Typography>
          </>
        </ExampleContainer>

        {/* Text Truncation */}
        <ExampleContainer
          title="Text Truncation"
          description="Control text overflow with truncate options."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`// Single line truncation
<Typography truncate style={{ width: '200px' }}>
  {longText}
</Typography>

// Multi-line truncation (line clamping)
<Typography truncate={2} style={{ width: '300px' }}>
  {longText}
</Typography>`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <Button size="sm" onClick={() => setTruncateLines(1)}>1 Line</Button>
              <Button size="sm" onClick={() => setTruncateLines(2)}>2 Lines</Button>
              <Button size="sm" onClick={() => setTruncateLines(3)}>3 Lines</Button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <Typography variant="caption" gutterBottom>Single line truncation:</Typography>
                <Typography truncate style={{ width: '250px', border: '1px dashed #ccc', padding: '8px' }}>
                  {longText}
                </Typography>
              </div>
              
              <div>
                <Typography variant="caption" gutterBottom>Multi-line truncation ({truncateLines} lines):</Typography>
                <Typography truncate={truncateLines} style={{ width: '300px', border: '1px dashed #ccc', padding: '8px' }}>
                  {longText}
                </Typography>
              </div>
            </div>
          </>
        </ExampleContainer>

        {/* No Wrap */}
        <ExampleContainer
          title="No Wrap"
          description="Prevent text from wrapping to new lines."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Typography noWrap style={{ width: '200px' }}>
  This text will not wrap to new lines even in a narrow container
</Typography>`}
        >
          <>
            <Typography variant="caption" gutterBottom>Normal text (wraps):</Typography>
            <Typography style={{ width: '200px', border: '1px dashed #ccc', padding: '8px', marginBottom: '12px' }}>
              This text will wrap to new lines when it reaches the container width
            </Typography>
            
            <Typography variant="caption" gutterBottom>No wrap text (overflows):</Typography>
            <Typography noWrap style={{ width: '200px', border: '1px dashed #ccc', padding: '8px' }}>
              This text will not wrap to new lines even in a narrow container
            </Typography>
          </>
        </ExampleContainer>

        {/* Semantic Elements */}
        <ExampleContainer
          title="Semantic Elements"
          description="Use different HTML elements while maintaining visual consistency."
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          code={`<Typography variant="h3" as="h1">Visual h3, semantic h1</Typography>
<Typography variant="body1" as="label">Body text as label</Typography>
<Typography variant="caption" as="span">Caption as span</Typography>
<Typography variant="body2" as="strong">Body text as strong</Typography>`}
        >
          <>
            <Typography variant="h3" as="h1">Visual h3, semantic h1</Typography>
            <Typography variant="body1" as="label">Body text as label element</Typography>
            <Typography variant="caption" as="span">Caption as span element</Typography>
            <Typography variant="body2" as="strong">Body text as strong element</Typography>
          </>
        </ExampleContainer>

        {/* Gutter Bottom */}
        <ExampleContainer
          title="Gutter Bottom"
          description="Add consistent bottom spacing with gutterBottom prop."
          style={{ display: 'flex', flexDirection: 'column' }}
          code={`<Typography variant="h4" gutterBottom>Heading with gutter</Typography>
<Typography variant="body1" gutterBottom>
  First paragraph with bottom spacing.
</Typography>
<Typography variant="body1">
  Second paragraph without additional spacing follows naturally.
</Typography>`}
        >
          <>
            <Typography variant="h4" gutterBottom>Heading with gutter</Typography>
            <Typography variant="body1" gutterBottom>
              First paragraph with bottom spacing. This creates consistent vertical rhythm in your layout.
            </Typography>
            <Typography variant="body1">
              Second paragraph without additional spacing follows naturally with the component's default margins.
            </Typography>
          </>
        </ExampleContainer>

        {/* Interactive Typography */}
        <ExampleContainer
          title="Interactive Typography"
          description="Typography with interactive behaviors and focus states."
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          code={`<Typography 
  color="primary" 
  role="button" 
  tabIndex={0}
  onClick={() => alert('Typography clicked!')}
>
  Clickable typography
</Typography>`}
        >
          <>
            <Typography 
              color="primary" 
              role="button" 
              tabIndex={0}
              onClick={() => alert('Typography clicked!')}
              style={{ cursor: 'pointer' }}
            >
              Clickable typography (try clicking)
            </Typography>
            <Typography 
              color="info" 
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              Focusable typography (try tabbing to it)
            </Typography>
          </>
        </ExampleContainer>

        {/* Real-world Example */}
        <ExampleContainer
          title="Real-world Example"
          description="A complete article layout using various typography variants."
          style={{ maxWidth: '600px' }}
          code={`<article>
  <Typography variant="overline" color="primary">Technology</Typography>
  <Typography variant="h2" gutterBottom>
    The Future of Web Development
  </Typography>
  <Typography variant="subtitle1" color="secondary" gutterBottom>
    Exploring modern frameworks and development practices
  </Typography>
  <Typography variant="body1" gutterBottom>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
  </Typography>
  <Typography variant="caption" color="secondary">
    Published on March 15, 2024
  </Typography>
</article>`}
        >
          <article>
            <Typography variant="overline" color="primary">Technology</Typography>
            <Typography variant="h2" gutterBottom>
              The Future of Web Development
            </Typography>
            <Typography variant="subtitle1" color="secondary" gutterBottom>
              Exploring modern frameworks and development practices that are shaping the industry
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Typography variant="caption" color="secondary">
              Published on March 15, 2024 • 5 min read
            </Typography>
          </article>
        </ExampleContainer>

        {/* Code Blocks */}
        <ExampleContainer
          title="Code Typography"
          description="Typography variant for inline code and code snippets."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Typography variant="body1">
  Use the <Typography variant="code" as="code">useState</Typography> hook for state management.
</Typography>

<Typography variant="code" as="pre" style={{ padding: '16px', display: 'block' }}>
  const [count, setCount] = useState(0);
</Typography>`}
        >
          <>
            <Typography variant="body1">
              Use the <Typography variant="code" as="code">useState</Typography> hook for state management in React components.
            </Typography>
            
            <Typography variant="code" as="pre" style={{ 
              padding: '16px', 
              display: 'block',
              backgroundColor: 'var(--background-code)',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {`const [count, setCount] = useState(0);
              
const increment = () => {
  setCount(prev => prev + 1);
};`}
            </Typography>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Typography</strong> component. 
          You can use these properties to control appearance, behavior, and semantic structure.</p>
        <APITable props={typographyProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Typography</strong> component via ref. 
          They allow you to programmatically control the typography element's behavior.</p>
        <APITable props={typographyMethods} />
      </div>

      <div className="docs-section">
        <h2>Design Guidelines</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Typography variant="h5" gutterBottom>Typography Hierarchy</Typography>
            <Typography variant="body1">
              Use consistent typography hierarchy to establish clear information architecture. 
              Headings should decrease in size and importance from h1 to h6, with proper semantic nesting.
            </Typography>
          </div>
          
          <div>
            <Typography variant="h5" gutterBottom>Color Usage</Typography>
            <Typography variant="body1">
              Use color variants purposefully - primary for key actions, success for positive states, 
              warning for cautions, and danger for errors. Avoid overusing colored text.
            </Typography>
          </div>
          
          <div>
            <Typography variant="h5" gutterBottom>Accessibility</Typography>
            <Typography variant="body1">
              Always consider semantic HTML structure. Use proper heading hierarchy, 
              ensure sufficient color contrast, and provide meaningful text for screen readers.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
