import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Flex } from "./Flex";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";

const flexProps: APITableRow[] = [
  {
    property: "direction",
    description: "The direction of the flex container. Defines the main axis.",
    type: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
    default: "'row'",
  },
  {
    property: "align",
    description: "How flex items are aligned along the cross axis.",
    type: "'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'",
    default: "'stretch'",
  },
  {
    property: "justify",
    description: "How flex items are aligned along the main axis.",
    type: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'",
    default: "'flex-start'",
  },
  {
    property: "wrap",
    description: "Whether flex items should wrap to new lines.",
    type: "'nowrap' | 'wrap' | 'wrap-reverse'",
    default: "'nowrap'",
  },
  {
    property: "gap",
    description: "Space between flex items. Can be a number (px) or string (any CSS unit).",
    type: "number | string",
    default: "-",
  },
  {
    property: "fullWidth",
    description: "Whether the flex container should take full width of its parent.",
    type: "boolean",
    default: "false",
  },
  {
    property: "as",
    description: "The HTML element to render. Useful for semantic markup.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "className",
    description: "Additional class name for the flex container.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the flex container.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "The content to be laid out using flexbox.",
    type: "ReactNode",
    default: "-",
  },
];

// Demo component for examples
const DemoBox: React.FC<{ 
  children: React.ReactNode; 
  color?: string; 
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}> = ({ 
  children, 
  color = '#1890ff', 
  size = 'md',
  style 
}) => {
  const sizeMap = {
    sm: { padding: '8px 12px', fontSize: '12px' },
    md: { padding: '12px 16px', fontSize: '14px' },
    lg: { padding: '16px 24px', fontSize: '16px' }
  };
  
  return (
    <div 
      style={{
        backgroundColor: color,
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center',
        fontWeight: 500,
        display: 'inline-block',
        ...sizeMap[size],
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const FlexDocs: React.FC = () => {
  const [dynamicGap, setDynamicGap] = useState(16);
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [wrapEnabled, setWrapEnabled] = useState(false);

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Flex</h1>
        <p>A flexible layout container component built on CSS Flexbox. Provides a clean API for creating responsive layouts with proper alignment, spacing, and direction control.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Creating responsive layouts that adapt to different screen sizes.</li>
          <li>Aligning items horizontally or vertically with precise control.</li>
          <li>Distributing space between elements evenly or with specific patterns.</li>
          <li>Building complex layouts by nesting multiple flex containers.</li>
          <li>When you need a semantic, accessible layout container that's more flexible than CSS Grid.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="Simple horizontal and vertical layouts."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`// Horizontal (default)
<Flex gap={12}>
  <DemoBox>Item 1</DemoBox>
  <DemoBox>Item 2</DemoBox>
  <DemoBox>Item 3</DemoBox>
</Flex>

// Vertical
<Flex direction="column" gap={12}>
  <DemoBox>Item 1</DemoBox>
  <DemoBox>Item 2</DemoBox>
  <DemoBox>Item 3</DemoBox>
</Flex>`}
        >
          <>
            <div>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Horizontal (default)</h4>
              <Flex gap={12}>
                <DemoBox>Item 1</DemoBox>
                <DemoBox>Item 2</DemoBox>
                <DemoBox>Item 3</DemoBox>
              </Flex>
            </div>
            <div>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Vertical</h4>
              <Flex direction="column" gap={12}>
                <DemoBox>Item 1</DemoBox>
                <DemoBox>Item 2</DemoBox>
                <DemoBox>Item 3</DemoBox>
              </Flex>
            </div>
          </>
        </ExampleContainer>

        {/* Justify Content */}
        <ExampleContainer
          title="Justify Content"
          description="Different ways to distribute items along the main axis."
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          code={`<Flex justify="flex-start">
<Flex justify="center">
<Flex justify="flex-end">
<Flex justify="space-between">
<Flex justify="space-around">
<Flex justify="space-evenly">`}
        >
          <>
            {[
              { justify: 'flex-start', label: 'flex-start (default)' },
              { justify: 'center', label: 'center' },
              { justify: 'flex-end', label: 'flex-end' },
              { justify: 'space-between', label: 'space-between' },
              { justify: 'space-around', label: 'space-around' },
              { justify: 'space-evenly', label: 'space-evenly' },
            ].map(({ justify, label }) => (
              <div key={justify}>
                <h3 style={{ margin: 0, fontSize: '14px' }}>Sidebar</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Sidebar content...</p>
              </Flex>
            </Flex>
          </div>
        </ExampleContainer>

        {/* Common Patterns */}
        <ExampleContainer
          title="Common Patterns"
          description="Frequently used layout patterns with Flex."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`// Card with header and actions
<Flex direction="column" gap={12}>
  <Flex justify="space-between" align="center">
    <h3>Card Title</h3>
    <Button>Action</Button>
  </Flex>
  <div>Card content...</div>
</Flex>

// Center everything
<Flex justify="center" align="center" style={{ minHeight: '200px' }}>
  <div>Perfectly Centered</div>
</Flex>

// Form layout
<Flex direction="column" gap={16} fullWidth>
  <Flex gap={16}>
    <input placeholder="First Name" style={{ flex: 1 }} />
    <input placeholder="Last Name" style={{ flex: 1 }} />
  </Flex>
  <Flex justify="flex-end" gap={8}>
    <Button>Cancel</Button>
    <Button>Submit</Button>
  </Flex>
</Flex>`}
        >
          <>
            <div>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Card with header and actions</h4>
              <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px' }}>
                <Flex direction="column" gap={12}>
                  <Flex justify="space-between" align="center">
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Card Title</h3>
                    <Button size="sm">Action</Button>
                  </Flex>
                  <div style={{ fontSize: '14px', color: '#666' }}>Card content goes here with some sample text...</div>
                </Flex>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Center everything</h4>
              <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                <Flex justify="center" align="center" style={{ minHeight: '120px' }}>
                  <DemoBox>Perfectly Centered</DemoBox>
                </Flex>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Form layout</h4>
              <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px' }}>
                <Flex direction="column" gap={16} fullWidth>
                  <Flex gap={16}>
                    <input 
                      placeholder="First Name" 
                      style={{ 
                        flex: 1, 
                        padding: '8px 12px', 
                        border: '1px solid #d9d9d9', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }} 
                    />
                    <input 
                      placeholder="Last Name" 
                      style={{ 
                        flex: 1, 
                        padding: '8px 12px', 
                        border: '1px solid #d9d9d9', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }} 
                    />
                  </Flex>
                  <Flex justify="flex-end" gap={8}>
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Submit</Button>
                  </Flex>
                </Flex>
              </div>
            </div>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Flex</strong> component. 
          You can use these properties to control layout behavior, alignment, and spacing.</p>
        <APITable props={flexProps} />
      </div>

      <div className="docs-section">
        <h2>CSS Classes</h2>
        <p>The Flex component includes utility classes that can be applied to flex items for additional control:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '16px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Flex Item Growth</h4>
            <ul style={{ fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
              <li><code>.ui-flex-item--grow</code> - flex-grow: 1</li>
              <li><code>.ui-flex-item--shrink</code> - flex-shrink: 1</li>
              <li><code>.ui-flex-item--no-shrink</code> - flex-shrink: 0</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Flex Item Alignment</h4>
            <ul style={{ fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
              <li><code>.ui-flex-item--align-self-start</code></li>
              <li><code>.ui-flex-item--align-self-center</code></li>
              <li><code>.ui-flex-item--align-self-end</code></li>
              <li><code>.ui-flex-item--align-self-stretch</code></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Utility Classes</h4>
            <ul style={{ fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
              <li><code>.ui-flex--center-all</code> - Center both axes</li>
              <li><code>.ui-flex--space-between-center</code> - Space between + center align</li>
              <li><code>.ui-flex--column-center</code> - Column direction, center aligned</li>
              <li><code>.ui-flex--debug</code> - Visual debugging outlines</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#52c41a' }}>✅ Do</h4>
            <ul style={{ fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
              <li>Use semantic HTML elements with the <code>as</code> prop when appropriate</li>
              <li>Prefer numeric gap values for consistency (maps to design tokens)</li>
              <li>Use <code>fullWidth</code> for containers that should fill their parent</li>
              <li>Combine with CSS Grid for complex layouts</li>
              <li>Test with different content lengths to ensure flexibility</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#f5222d' }}>❌ Don't</h4>
            <ul style={{ fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
              <li>Overuse nested flex containers when CSS Grid would be simpler</li>
              <li>Hardcode pixel values when CSS variables are available</li>
              <li>Use flex for simple single-item centering (use CSS Grid instead)</li>
              <li>Forget to test responsive behavior on different screen sizes</li>
              <li>Mix direction changes with complex alignment requirements</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>Accessibility</h2>
        <p>The Flex component is primarily a layout tool and doesn't introduce accessibility concerns by itself. However, consider these points:</p>
        <ul>
          <li>Use semantic HTML elements via the <code>as</code> prop when the flex container represents a meaningful document structure</li>
          <li>Be aware that visual order (via <code>flex-direction: row-reverse</code>) may not match DOM order for screen readers</li>
          <li>Ensure adequate color contrast and focus indicators for interactive children</li>
          <li>Test keyboard navigation flows, especially with complex nested layouts</li>
        </ul>
      </div>
    </div>
  );
};4 style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>{label}</h4>
                <div style={{ border: '1px dashed #ccc', borderRadius: '4px', padding: '8px' }}>
                  <Flex justify={justify as any}>
                    <DemoBox size="sm">A</DemoBox>
                    <DemoBox size="sm">B</DemoBox>
                    <DemoBox size="sm">C</DemoBox>
                  </Flex>
                </div>
              </div>
            ))}
          </>
        </ExampleContainer>

        {/* Align Items */}
        <ExampleContainer
          title="Align Items"
          description="Different ways to align items along the cross axis."
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          code={`<Flex align="flex-start">
<Flex align="center">
<Flex align="flex-end">
<Flex align="stretch">
<Flex align="baseline">`}
        >
          <>
            {[
              { align: 'flex-start', label: 'flex-start' },
              { align: 'center', label: 'center' },
              { align: 'flex-end', label: 'flex-end' },
              { align: 'stretch', label: 'stretch (default)' },
              { align: 'baseline', label: 'baseline' },
            ].map(({ align, label }) => (
              <div key={align}>
                <h4 style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>{label}</h4>
                <div style={{ border: '1px dashed #ccc', borderRadius: '4px', padding: '8px', height: '80px' }}>
                  <Flex align={align as any} style={{ height: '100%' }} gap={8}>
                    <DemoBox size="sm">A</DemoBox>
                    <DemoBox size="md">B</DemoBox>
                    <DemoBox size="lg">C</DemoBox>
                  </Flex>
                </div>
              </div>
            ))}
          </>
        </ExampleContainer>

        {/* Direction Variants */}
        <ExampleContainer
          title="Direction"
          description="Control the direction of the flex container."
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
          code={`<Flex direction="row">
<Flex direction="row-reverse">
<Flex direction="column">
<Flex direction="column-reverse">`}
        >
          <>
            {[
              { direction: 'row', label: 'row (default)' },
              { direction: 'row-reverse', label: 'row-reverse' },
              { direction: 'column', label: 'column' },
              { direction: 'column-reverse', label: 'column-reverse' },
            ].map(({ direction, label }) => (
              <div key={direction}>
                <h4 style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>{label}</h4>
                <div style={{ border: '1px dashed #ccc', borderRadius: '4px', padding: '8px', minHeight: '100px' }}>
                  <Flex direction={direction as any} gap={8}>
                    <DemoBox size="sm" color="#52c41a">1</DemoBox>
                    <DemoBox size="sm" color="#1890ff">2</DemoBox>
                    <DemoBox size="sm" color="#f5222d">3</DemoBox>
                  </Flex>
                </div>
              </div>
            ))}
          </>
        </ExampleContainer>

        {/* Wrapping */}
        <ExampleContainer
          title="Wrapping"
          description="Control how items wrap within the container."
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          code={`<Flex wrap="nowrap">
<Flex wrap="wrap">
<Flex wrap="wrap-reverse">`}
        >
          <>
            {[
              { wrap: 'nowrap', label: 'nowrap (default)' },
              { wrap: 'wrap', label: 'wrap' },
              { wrap: 'wrap-reverse', label: 'wrap-reverse' },
            ].map(({ wrap, label }) => (
              <div key={wrap}>
                <h4 style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>{label}</h4>
                <div style={{ border: '1px dashed #ccc', borderRadius: '4px', padding: '8px', width: '200px' }}>
                  <Flex wrap={wrap as any} gap={8}>
                    <DemoBox size="sm">Item 1</DemoBox>
                    <DemoBox size="sm">Item 2</DemoBox>
                    <DemoBox size="sm">Item 3</DemoBox>
                    <DemoBox size="sm">Item 4</DemoBox>
                    <DemoBox size="sm">Item 5</DemoBox>
                  </Flex>
                </div>
              </div>
            ))}
          </>
        </ExampleContainer>

        {/* Gap Variations */}
        <ExampleContainer
          title="Gap Variations"
          description="Different spacing between items."
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          code={`<Flex gap={0}>      // No gap
<Flex gap={8}>      // 8px gap
<Flex gap={16}>     // 16px gap
<Flex gap="2rem">   // 2rem gap`}
        >
          <>
            {[
              { gap: 0, label: 'No gap' },
              { gap: 8, label: '8px gap' },
              { gap: 16, label: '16px gap' },
              { gap: '2rem', label: '2rem gap' },
            ].map(({ gap, label }) => (
              <div key={String(gap)}>
                <h4 style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>{label}</h4>
                <Flex gap={gap}>
                  <DemoBox size="sm">A</DemoBox>
                  <DemoBox size="sm">B</DemoBox>
                  <DemoBox size="sm">C</DemoBox>
                </Flex>
              </div>
            ))}
          </>
        </ExampleContainer>

        {/* Nested Flex */}
        <ExampleContainer
          title="Nested Layouts"
          description="Complex layouts using nested flex containers."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Flex direction="column" gap={16} fullWidth>
  <Flex justify="space-between" align="center">
    <h3>Header</h3>
    <Badge count={5} />
  </Flex>
  
  <Flex gap={16}>
    <Flex direction="column" gap={8} style={{ flex: 1 }}>
      <DemoBox>Content 1</DemoBox>
      <DemoBox>Content 2</DemoBox>
    </Flex>
    <Flex direction="column" gap={8} style={{ flex: 1 }}>
      <DemoBox>Sidebar 1</DemoBox>
      <DemoBox>Sidebar 2</DemoBox>
    </Flex>
  </Flex>
</Flex>`}
        >
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '16px' }}>
            <Flex direction="column" gap={16} fullWidth>
              <Flex justify="space-between" align="center">
                <h3 style={{ margin: 0, fontSize: '18px' }}>Header</h3>
                <Badge count={5} />
              </Flex>
              
              <Flex gap={16}>
                <Flex direction="column" gap={8} style={{ flex: 1 }}>
                  <DemoBox color="#52c41a">Content 1</DemoBox>
                  <DemoBox color="#52c41a">Content 2</DemoBox>
                </Flex>
                <Flex direction="column" gap={8} style={{ flex: 1 }}>
                  <DemoBox color="#722ed1">Sidebar 1</DemoBox>
                  <DemoBox color="#722ed1">Sidebar 2</DemoBox>
                </Flex>
              </Flex>
            </Flex>
          </div>
        </ExampleContainer>

        {/* Interactive Demo */}
        <ExampleContainer
          title="Interactive Demo"
          description="Play with different flex properties dynamically."
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          code={`const [gap, setGap] = useState(16);
const [direction, setDirection] = useState('row');
const [wrap, setWrap] = useState(false);

<Flex 
  direction={direction} 
  gap={gap} 
  wrap={wrap ? 'wrap' : 'nowrap'}
  style={{ minHeight: '100px', border: '1px dashed #ccc' }}
>
  {items.map(item => <DemoBox key={item}>{item}</DemoBox>)}
</Flex>`}
        >
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 500 }}>
                  Gap: {dynamicGap}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={dynamicGap}
                  onChange={(e) => setDynamicGap(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 500 }}>
                  Direction
                </label>
                <select 
                  value={direction} 
                  onChange={(e) => setDirection(e.target.value as 'row' | 'column')}
                  style={{ width: '100%', padding: '4px' }}
                >
                  <option value="row">Row</option>
                  <option value="column">Column</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    checked={wrapEnabled}
                    onChange={(e) => setWrapEnabled(e.target.checked)}
                  />
                  Enable Wrap
                </label>
              </div>
            </div>

            <div style={{ border: '1px dashed #ccc', borderRadius: '4px', padding: '16px', minHeight: '100px', width: wrapEnabled ? '200px' : 'auto' }}>
              <Flex 
                direction={direction} 
                gap={dynamicGap} 
                wrap={wrapEnabled ? 'wrap' : 'nowrap'}
                style={{ minHeight: '60px' }}
              >
                <DemoBox size="sm" color="#1890ff">A</DemoBox>
                <DemoBox size="sm" color="#52c41a">B</DemoBox>
                <DemoBox size="sm" color="#f5222d">C</DemoBox>
                <DemoBox size="sm" color="#fa8c16">D</DemoBox>
                <DemoBox size="sm" color="#722ed1">E</DemoBox>
              </Flex>
            </div>
          </>
        </ExampleContainer>

        {/* Semantic Usage */}
        <ExampleContainer
          title="Semantic Elements"
          description="Using the 'as' prop for semantic HTML."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Flex as="header" justify="space-between" align="center">
  <h1>Site Title</h1>
  <nav>Navigation</nav>
</Flex>

<Flex as="main" gap={24}>
  <Flex as="section" direction="column" gap={16}>
    <h2>Main Content</h2>
    <p>Content goes here...</p>
  </Flex>
  <Flex as="aside" direction="column" gap={16}>
    <h3>Sidebar</h3>
    <p>Sidebar content...</p>
  </Flex>
</Flex>`}
        >
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', overflow: 'hidden' }}>
            <Flex as="header" justify="space-between" align="center" style={{ padding: '16px', backgroundColor: '#fafafa', borderBottom: '1px solid #d9d9d9' }}>
              <h1 style={{ margin: 0, fontSize: '20px' }}>Site Title</h1>
              <nav style={{ fontSize: '14px', color: '#666' }}>Navigation</nav>
            </Flex>
            
            <Flex as="main" gap={24} style={{ padding: '16px' }}>
              <Flex as="section" direction="column" gap={16} style={{ flex: 2 }}>
                <h2 style={{ margin: 0, fontSize: '16px' }}>Main Content</h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Content goes here...</p>
              </Flex>
              <Flex as="aside" direction="column" gap={16} style={{ flex: 1, padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <h
