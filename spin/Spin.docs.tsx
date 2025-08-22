import React, { useState, useEffect } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Spin } from "./Spin";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";
import { Card } from "../Card/Card";
import { Typography } from "../Typography/Typography";
import { Flex } from "../Flex/Flex";
import { Heart, Loader, RotateCw, Settings, Zap } from "lucide-react";

const spinProps: APITableRow[] = [
  {
    property: "spinning",
    description: "Whether Spin is spinning.",
    type: "boolean",
    default: "true",
  },
  {
    property: "size",
    description: "Size of Spin. Can be 'sm', 'md', or 'lg'.",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: "tip",
    description: "Customize description content when Spin has children.",
    type: "string",
    default: "-",
  },
  {
    property: "delay",
    description: "Specifies a delay in milliseconds for loading state. If spinning ends during delay, loading status won't appear.",
    type: "number",
    default: "0",
  },
  {
    property: "indicator",
    description: "React node of the spinning indicator.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "percent",
    description: "Progress percentage. When set to 'auto', shows indeterminate progress.",
    type: "number | 'auto'",
    default: "-",
  },
  {
    property: "wrapperClassName",
    description: "Additional class name for the wrapper element.",
    type: "string",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name for the spin element.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the spin element.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Content to be wrapped by the spin indicator.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "fullscreen",
    description: "Whether to show fullscreen spinner with overlay.",
    type: "boolean",
    default: "false",
  },
  {
    property: "aria-label",
    description: "Accessible label for the spinner.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the spinner.",
    type: "string",
    default: "-",
  },
];

const spinMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the spin element.",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the spin element.",
    type: "() => void",
    default: "-",
  },
];

export const SpinDocs: React.FC = () => {
  const [basicSpinning, setBasicSpinning] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [delayLoading, setDelayLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [fullscreenLoading, setFullscreenLoading] = useState(false);
  const [autoProgress, setAutoProgress] = useState(false);

  // Auto increment progress demo
  useEffect(() => {
    if (progressValue > 0 && progressValue < 100) {
      const timer = setTimeout(() => {
        setProgressValue(prev => Math.min(prev + 10, 100));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progressValue]);

  const startProgress = () => {
    setProgressValue(10);
  };

  const resetProgress = () => {
    setProgressValue(0);
  };

  const toggleCardLoading = () => {
    setCardLoading(true);
    setTimeout(() => setCardLoading(false), 3000);
  };

  const toggleDelayLoading = () => {
    setDelayLoading(true);
    setTimeout(() => setDelayLoading(false), 2000);
  };

  const toggleFullscreen = () => {
    setFullscreenLoading(true);
    setTimeout(() => setFullscreenLoading(false), 3000);
  };

  const toggleAutoProgress = () => {
    setAutoProgress(!autoProgress);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Spin</h1>
        <p>A spinner for displaying loading state of a page or a section. When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When a part of the page is waiting for asynchronous data or during a rendering process.</li>
          <li>When loading a page or section with substantial content that takes time to render.</li>
          <li>Providing feedback during form submission or data processing operations.</li>
          <li>Creating smooth loading transitions and preventing jarring content jumps.</li>
          <li>Use fullscreen mode for page-level loading states that require user attention.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Usage */}
        <ExampleContainer
          title="Basic Usage"
          description="A simple loading status with control over the spinning state."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`const [spinning, setSpinning] = useState(true);

<Spin spinning={spinning} />

<Button onClick={() => setSpinning(!spinning)}>
  {spinning ? 'Stop' : 'Start'} Spinning
</Button>`}
        >
          <>
            <Spin spinning={basicSpinning} />
            <Button onClick={() => setBasicSpinning(!basicSpinning)}>
              {basicSpinning ? 'Stop' : 'Start'} Spinning
            </Button>
          </>
        </ExampleContainer>

        {/* Size */}
        <ExampleContainer
          title="Size"
          description="A small Spin for loading text, default size for a card-level block, and large Spin for loading a full page."
          style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}
          code={`<Spin size="sm" tip="Loading..." />
<Spin size="md" tip="Loading..." />
<Spin size="lg" tip="Loading..." />`}
        >
          <>
            <Flex direction="column" align="center" gap="8px">
              <Spin size="sm" tip="Small" />
              <Typography variant="caption">Small</Typography>
            </Flex>
            <Flex direction="column" align="center" gap="8px">
              <Spin size="md" tip="Medium" />
              <Typography variant="caption">Medium</Typography>
            </Flex>
            <Flex direction="column" align="center" gap="8px">
              <Spin size="lg" tip="Large" />
              <Typography variant="caption">Large</Typography>
            </Flex>
          </>
        </ExampleContainer>

        {/* Embedded mode */}
        <ExampleContainer
          title="Embedded Mode"
          description="Embedding content into Spin sets it into loading state."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [loading, setLoading] = useState(false);

<Spin spinning={loading} tip="Loading content...">
  <Card style={{ padding: '24px', minHeight: '200px' }}>
    <Typography variant="h4">Card Content</Typography>
    <Typography variant="body1">
      This content will be blurred and overlayed with a spinner when loading.
    </Typography>
    <Typography variant="body2">
      The spinner appears in the center with a semi-transparent background.
    </Typography>
  </Card>
</Spin>`}
        >
          <>
            <Spin spinning={cardLoading} tip="Loading content...">
              <Card style={{ padding: '24px', minHeight: '200px' }}>
                <Typography variant="h4" style={{ marginBottom: '12px' }}>Card Content</Typography>
                <Typography variant="body1" style={{ marginBottom: '8px' }}>
                  This content will be blurred and overlayed with a spinner when loading.
                </Typography>
                <Typography variant="body2">
                  The spinner appears in the center with a semi-transparent background.
                </Typography>
              </Card>
            </Spin>
            <Button onClick={toggleCardLoading} disabled={cardLoading}>
              {cardLoading ? 'Loading...' : 'Start Loading (3s)'}
            </Button>
          </>
        </ExampleContainer>

        {/* Customized description */}
        <ExampleContainer
          title="Customized Description"
          description="Customize the description text displayed below the spinner."
          style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}
          code={`<Spin tip="Loading..." />
<Spin tip="Processing your request..." size="md" />
<Spin tip="Please wait while we fetch your data..." size="lg" />`}
        >
          <>
            <Spin tip="Loading..." size="sm" />
            <Spin tip="Processing your request..." size="md" />
            <Spin tip="Please wait while we fetch your data..." size="lg" />
          </>
        </ExampleContainer>

        {/* Delay */}
        <ExampleContainer
          title="Delay"
          description="Specifies a delay for loading state. If spinning ends during delay, loading status won't appear."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
          code={`const [loading, setLoading] = useState(false);

// With 500ms delay - quick operations won't show spinner
<Spin spinning={loading} delay={500} tip="Loading with delay...">
  <Card style={{ padding: '24px', height: '120px' }}>
    <Typography>
      Content with delayed spinner. Quick loads won't flash the spinner.
    </Typography>
  </Card>
</Spin>`}
        >
          <>
            <Spin spinning={delayLoading} delay={500} tip="Loading with delay...">
              <Card style={{ padding: '24px', height: '120px', display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Content with delayed spinner. Quick loads won't flash the spinner.
                </Typography>
              </Card>
            </Spin>
            <Button onClick={toggleDelayLoading} disabled={delayLoading}>
              {delayLoading ? 'Loading...' : 'Start Loading (2s with 500ms delay)'}
            </Button>
          </>
        </ExampleContainer>

        {/* Custom spinning indicator */}
        <ExampleContainer
          title="Custom Spinning Indicator"
          description="Use a custom loading indicator with different icons or animations."
          style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}
          code={`<Spin indicator={<Heart size={20} />} tip="Loading with heart" />
<Spin indicator={<Settings size={20} />} tip="Settings loading" />
<Spin indicator={<RotateCw size={20} />} tip="Rotating indicator" />
<Spin indicator={<Zap size={20} />} tip="Fast loading" />`}
        >
          <>
            <Spin indicator={<Heart size={20} />} tip="Loading with heart" />
            <Spin indicator={<Settings size={20} />} tip="Settings loading" />
            <Spin indicator={<RotateCw size={20} />} tip="Rotating indicator" />
            <Spin indicator={<Zap size={20} />} tip="Fast loading" />
          </>
        </ExampleContainer>

        {/* Progress */}
        <ExampleContainer
          title="Progress"
          description="Show the progress. When percent='auto' is set, an indeterminate progress is displayed."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`// Determinate progress
<Spin percent={progressValue} tip={\`Loading \${progressValue}%\`} />

// Indeterminate progress
<Spin percent="auto" tip="Auto progress" />`}
        >
          <>
            <Flex direction="column" gap="16px" align="center">
              <Typography variant="h6">Determinate Progress</Typography>
              <Spin percent={progressValue} tip={`Loading ${progressValue}%`} size="lg" />
              <Flex gap="8px">
                <Button onClick={startProgress} disabled={progressValue > 0 && progressValue < 100}>
                  Start Progress
                </Button>
                <Button onClick={resetProgress}>
                  Reset
                </Button>
              </Flex>
            </Flex>
            
            <Flex direction="column" gap="16px" align="center">
              <Typography variant="h6">Indeterminate Progress</Typography>
              <Spin percent="auto" tip="Auto progress" size="lg" spinning={autoProgress} />
              <Button onClick={toggleAutoProgress}>
                {autoProgress ? 'Stop' : 'Start'} Auto Progress
              </Button>
            </Flex>
          </>
        </ExampleContainer>

        {/* Fullscreen */}
        <ExampleContainer
          title="Fullscreen"
          description="Fullscreen mode creates a page loader with a dimmed overlay and centered spinner."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [fullscreenLoading, setFullscreenLoading] = useState(false);

<Spin 
  fullscreen 
  spinning={fullscreenLoading} 
  tip="Loading application..." 
  size="lg" 
/>

<Button onClick={toggleFullscreen}>
  Show Fullscreen Loading (3s)
</Button>`}
        >
          <>
            <Spin 
              fullscreen 
              spinning={fullscreenLoading} 
              tip="Loading application..." 
              size="lg" 
            />
            <Button onClick={toggleFullscreen} disabled={fullscreenLoading}>
              {fullscreenLoading ? 'Loading...' : 'Show Fullscreen Loading (3s)'}
            </Button>
            <Typography variant="body2" style={{ color: '#666' }}>
              Click the button above to see the fullscreen loading overlay in action.
            </Typography>
          </>
        </ExampleContainer>

        {/* Multiple States */}
        <ExampleContainer
          title="Multiple Loading States"
          description="Different loading states for various UI scenarios."
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}
          code={`// Button loading state
<Spin size="sm" spinning={true}>
  <Button disabled>Loading...</Button>
</Spin>

// List loading
<Spin tip="Loading items...">
  <div style={{ minHeight: '100px', padding: '16px' }}>
    <Typography>• Item 1</Typography>
    <Typography>• Item 2</Typography>
    <Typography>• Item 3</Typography>
  </div>
</Spin>

// Form loading
<Spin tip="Submitting form...">
  <Card style={{ padding: '16px' }}>
    <Typography variant="h6">User Form</Typography>
    <input placeholder="Name" disabled />
    <input placeholder="Email" disabled />
  </Card>
</Spin>`}
        >
          <>
            <Flex direction="column" gap="8px" align="center">
              <Typography variant="caption">Button Loading</Typography>
              <Spin size="sm" spinning={true}>
                <Button disabled style={{ width: '120px' }}>Loading...</Button>
              </Spin>
            </Flex>
            
            <Flex direction="column" gap="8px">
              <Typography variant="caption">List Loading</Typography>
              <Spin tip="Loading items..." size="sm">
                <div style={{ minHeight: '100px', padding: '16px', border: '1px solid #d9d9d9', borderRadius: '6px' }}>
                  <Typography style={{ marginBottom: '4px' }}>• Item 1</Typography>
                  <Typography style={{ marginBottom: '4px' }}>• Item 2</Typography>
                  <Typography>• Item 3</Typography>
                </div>
              </Spin>
            </Flex>
            
            <Flex direction="column" gap="8px">
              <Typography variant="caption">Form Loading</Typography>
              <Spin tip="Submitting..." size="sm">
                <Card style={{ padding: '16px', minWidth: '150px' }}>
                  <Typography variant="body2" style={{ marginBottom: '8px', fontWeight: 500 }}>User Form</Typography>
                  <input placeholder="Name" disabled style={{ width: '100%', marginBottom: '8px', padding: '4px', border: '1px solid #d9d9d9', borderRadius: '4px' }} />
                  <input placeholder="Email" disabled style={{ width: '100%', padding: '4px', border: '1px solid #d9d9d9', borderRadius: '4px' }} />
                </Card>
              </Spin>
            </Flex>
          </>
        </ExampleContainer>

        {/* Complex Scenarios */}
        <ExampleContainer
          title="Complex Loading Scenarios"
          description="Advanced usage patterns with different indicators and states."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`// Progress with custom indicator
<Spin 
  percent={75} 
  indicator={<Loader size={24} />} 
  tip="Processing files (75%)" 
  size="lg" 
/>

// Nested loading states
<Spin spinning={parentLoading} tip="Loading parent...">
  <Card>
    <Spin spinning={childLoading} tip="Loading child..." size="sm">
      <div style={{ padding: '16px' }}>Child Content</div>
    </Spin>
  </Card>
</Spin>`}
        >
          <>
            <Flex direction="column" gap="16px" align="center">
              <Typography variant="h6">Progress with Custom Indicator</Typography>
              <Spin 
                percent={75} 
                indicator={<Loader size={24} />} 
                tip="Processing files (75%)" 
                size="lg" 
              />
            </Flex>
            
            <Flex direction="column" gap="16px">
              <Typography variant="h6">Conditional Loading</Typography>
              <Spin spinning={!cardLoading} tip="Ready" size="sm">
                <Card style={{ padding: '16px', minHeight: '80px' }}>
                  <Typography variant="body1">
                    {cardLoading ? 'Content is loading...' : 'Content is ready to view!'}
                  </Typography>
                </Card>
              </Spin>
            </Flex>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Spin</strong> component. 
          You can use these properties to control behavior, appearance, and interactivity.</p>
        <APITable props={spinProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Spin</strong> component via ref. 
          They allow you to programmatically control the spinner's behavior.</p>
        <APITable props={spinMethods} />
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Use appropriate sizes:</strong> Small for inline loading, medium for sections, large for pages.</li>
          <li><strong>Provide meaningful tips:</strong> Give users context about what's loading.</li>
          <li><strong>Consider delays:</strong> Use delay prop to prevent spinner flash for quick operations.</li>
          <li><strong>Choose the right mode:</strong> Use embedded mode for sections, fullscreen for page-level loading.</li>
          <li><strong>Progress indication:</strong> Show progress percentages for long-running operations when possible.</li>
          <li><strong>Accessibility:</strong> Ensure proper ARIA attributes are used for screen reader support.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Design Tokens</h2>
        <p>The following CSS custom properties are available for theming the Spin component:</p>
        <div style={{ background: 'var(--background-secondary)', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <div>--spin-color: Primary spinner color</div>
          <div>--spin-color-hover: Spinner hover color</div>
          <div>--spin-overlay-bg: Fullscreen overlay background</div>
          <div>--spin-tip-color: Description text color</div>
          <div>--spin-progress-trail: Progress circle background</div>
          <div>--spin-progress-path: Progress circle foreground</div>
          <div>--spin-backdrop-filter: Fullscreen overlay blur effect</div>
        </div>
      </div>
    </div>
  );
};
