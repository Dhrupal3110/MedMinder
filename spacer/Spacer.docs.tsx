import React from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Spacer } from "./Spacer";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { Flex } from "../Flex/Flex";
import { Stack } from "../Stack/Stack";
import { Container } from "../Container/Container";
import { Badge } from "../Badge/Badge";
import { Input } from "../Input/Input";
import { Avatar } from "../Avatar/Avatar";
import { APITable, type APITableRow } from "../Shared/APITable";
import { User, Settings, Heart, Star, ChevronRight } from "lucide-react";

const spacerProps: APITableRow[] = [
  {
    property: "size",
    description: "Gap size. Supports theme variables (e.g., 'var(--spacing-md)') or CSS units (px, rem, %).",
    type: "string | number",
    default: "'var(--spacing-md)'",
  },
  {
    property: "direction",
    description: "Orientation of the spacing. Vertical creates height, horizontal creates width.",
    type: "'horizontal' | 'vertical'",
    default: "'vertical'",
  },
  {
    property: "as",
    description: "HTML element to render as the spacer container.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "className",
    description: "Additional class name for custom styling.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the spacer.",
    type: "React.CSSProperties",
    default: "-",
  },
];

const spacerMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the spacer element (not typically used as spacers are not focusable).",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the spacer element.",
    type: "() => void",
    default: "-",
  },
];

export const SpacerDocs: React.FC = () => {
  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Spacer</h1>
        <p>Provides consistent empty space between elements in both horizontal and vertical layouts. The Spacer component helps maintain proper spacing without adding unnecessary markup or complex CSS.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you need consistent spacing between elements in flex or stack layouts.</li>
          <li>To create visual separation without relying on margins or padding on content elements.</li>
          <li>When building responsive layouts that need different spacing at various breakpoints.</li>
          <li>To maintain design system spacing standards across your application.</li>
          <li>As an alternative to CSS gaps in older browser environments.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Vertical Spacing */}
        <ExampleContainer
          title="Basic Vertical Spacing"
          description="Simple vertical spacing between Typography elements."
          style={{ display: 'flex', flexDirection: 'column' }}
          code={`<Typography variant="h3">First Heading</Typography>
<Spacer />
<Typography variant="body1">
  This paragraph has consistent spacing above it using the Spacer component.
</Typography>
<Spacer size="var(--spacing-lg)" />
<Typography variant="body2" color="secondary">
  This paragraph has larger spacing above it.
</Typography>`}
        >
          <>
            <Typography variant="h3">First Heading</Typography>
            <Spacer />
            <Typography variant="body1">
              This paragraph has consistent spacing above it using the Spacer component.
            </Typography>
            <Spacer size="var(--spacing-lg)" />
            <Typography variant="body2" color="secondary">
              This paragraph has larger spacing above it.
            </Typography>
          </>
        </ExampleContainer>

        {/* Horizontal Spacing */}
        <ExampleContainer
          title="Horizontal Spacing"
          description="Horizontal spacing between buttons in a flex container."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Flex direction="row" align="center">
  <Button variant="primary">Save</Button>
  <Spacer direction="horizontal" />
  <Button variant="secondary">Cancel</Button>
  <Spacer direction="horizontal" size="var(--spacing-lg)" />
  <Button variant="outline">Help</Button>
</Flex>`}
        >
          <>
            <Flex direction="row" align="center">
              <Button variant="primary">Save</Button>
              <Spacer direction="horizontal" />
              <Button variant="secondary">Cancel</Button>
              <Spacer direction="horizontal" size="var(--spacing-lg)" />
              <Button variant="outline">Help</Button>
            </Flex>
            <Typography variant="caption" color="secondary">
              Notice the different horizontal spacing between buttons
            </Typography>
          </>
        </ExampleContainer>

        {/* Inside a Stack */}
        <ExampleContainer
          title="Inside a Stack"
          description="Using Spacer between items in a vertical Stack layout."
          style={{ maxWidth: '400px' }}
          code={`<Stack spacing="none">
  <Typography variant="h4">User Profile</Typography>
  <Spacer size="var(--spacing-sm)" />
  
  <Flex direction="row" align="center" gap="sm">
    <Avatar size="sm" />
    <Typography variant="body1">John Doe</Typography>
    <Badge count={3} variant="danger">
      <Settings size={16} />
    </Badge>
  </Flex>
  
  <Spacer />
  
  <Input placeholder="Enter your bio..." />
  
  <Spacer size="var(--spacing-lg)" />
  
  <Flex direction="row" gap="sm">
    <Button size="sm" variant="outline">
      <Heart size={14} />
      Like
    </Button>
    <Button size="sm" variant="outline">
      <Star size={14} />
      Favorite
    </Button>
  </Flex>
</Stack>`}
        >
          <Stack spacing="none">
            <Typography variant="h4">User Profile</Typography>
            <Spacer size="var(--spacing-sm)" />
            
            <Flex direction="row" align="center" gap="sm">
              <Avatar size="sm" />
              <Typography variant="body1">John Doe</Typography>
              <Badge count={3} variant="danger">
                <Settings size={16} />
              </Badge>
            </Flex>
            
            <Spacer />
            
            <Input placeholder="Enter your bio..." />
            
            <Spacer size="var(--spacing-lg)" />
            
            <Flex direction="row" gap="sm">
              <Button size="sm" variant="outline">
                <Heart size={14} />
                Like
              </Button>
              <Button size="sm" variant="outline">
                <Star size={14} />
                Favorite
              </Button>
            </Flex>
          </Stack>
        </ExampleContainer>

        {/* Responsive Spacer */}
        <ExampleContainer
          title="Responsive Spacer"
          description="Spacer with responsive sizing that adapts to screen size."
          style={{ display: 'flex', flexDirection: 'column' }}
          code={`<Typography variant="h3">Mobile Responsive Layout</Typography>
<Spacer 
  className="ui-spacer--responsive-mobile ui-spacer--responsive-tablet ui-spacer--responsive-desktop" 
/>
<Typography variant="body1">
  The spacing above changes based on screen size: small on mobile, medium on tablet, large on desktop.
</Typography>
<Spacer size="clamp(var(--spacing-sm), 4vw, var(--spacing-xl))" />
<Typography variant="body2" color="secondary">
  This uses CSS clamp() for fluid responsive spacing.
</Typography>`}
        >
          <>
            <Typography variant="h3">Mobile Responsive Layout</Typography>
            <Spacer className="ui-spacer--responsive-mobile ui-spacer--responsive-tablet ui-spacer--responsive-desktop" />
            <Typography variant="body1">
              The spacing above changes based on screen size: small on mobile, medium on tablet, large on desktop.
            </Typography>
            <Spacer size="clamp(var(--spacing-sm), 4vw, var(--spacing-xl))" />
            <Typography variant="body2" color="secondary">
              This uses CSS clamp() for fluid responsive spacing.
            </Typography>
          </>
        </ExampleContainer>

        {/* Custom Styled Spacer */}
        <ExampleContainer
          title="Custom Styled Spacer"
          description="Spacer with visual debugging to show spacing areas."
          style={{ display: 'flex', flexDirection: 'column' }}
          code={`<Typography variant="h4">Debug Mode</Typography>
<Spacer size="var(--spacing-xl)" className="ui-spacer--debug" />
<Typography variant="body1">
  The red dashed area above shows exactly where the spacer is placed.
</Typography>

<Flex direction="row" align="center">
  <Button>Left Button</Button>
  <Spacer 
    direction="horizontal" 
    size="60px" 
    className="ui-spacer--debug" 
  />
  <Button>Right Button</Button>
</Flex>`}
        >
          <>
            <Typography variant="h4">Debug Mode</Typography>
            <Spacer size="var(--spacing-xl)" className="ui-spacer--debug" />
            <Typography variant="body1">
              The red dashed area above shows exactly where the spacer is placed.
            </Typography>
            
            <Spacer size="var(--spacing-md)" />
            
            <Flex direction="row" align="center">
              <Button>Left Button</Button>
              <Spacer 
                direction="horizontal" 
                size="60px" 
                className="ui-spacer--debug" 
              />
              <Button>Right Button</Button>
            </Flex>
          </>
        </ExampleContainer>

        {/* Size Variations */}
        <ExampleContainer
          title="Size Variations"
          description="Different spacing sizes using design system variables."
          style={{ display: 'flex', flexDirection: 'column' }}
          code={`<Typography variant="h4">Spacing Scale</Typography>
<Typography variant="body2" color="secondary">Extra Small (4px)</Typography>
<Spacer size="var(--spacing-xs)" className="ui-spacer--debug" />

<Typography variant="body2" color="secondary">Small (8px)</Typography>
<Spacer size="var(--spacing-sm)" className="ui-spacer--debug" />

<Typography variant="body2" color="secondary">Medium (16px) - Default</Typography>
<Spacer size="var(--spacing-md)" className="ui-spacer--debug" />

<Typography variant="body2" color="secondary">Large (24px)</Typography>
<Spacer size="var(--spacing-lg)" className="ui-spacer--debug" />

<Typography variant="body2" color="secondary">Extra Large (32px)</Typography>
<Spacer size="var(--spacing-xl)" className="ui-spacer--debug" />

<Typography variant="body2" color="secondary">Custom (48px)</Typography>
<Spacer size="48px" className="ui-spacer--debug" />`}
        >
          <>
            <Typography variant="h4">Spacing Scale</Typography>
            <Typography variant="body2" color="secondary">Extra Small (4px)</Typography>
            <Spacer size="var(--spacing-xs)" className="ui-spacer--debug" />

            <Typography variant="body2" color="secondary">Small (8px)</Typography>
            <Spacer size="var(--spacing-sm)" className="ui-spacer--debug" />

            <Typography variant="body2" color="secondary">Medium (16px) - Default</Typography>
            <Spacer size="var(--spacing-md)" className="ui-spacer--debug" />

            <Typography variant="body2" color="secondary">Large (24px)</Typography>
            <Spacer size="var(--spacing-lg)" className="ui-spacer--debug" />

            <Typography variant="body2" color="secondary">Extra Large (32px)</Typography>
            <Spacer size="var(--spacing-xl)" className="ui-spacer--debug" />

            <Typography variant="body2" color="secondary">Custom (48px)</Typography>
            <Spacer size="48px" className="ui-spacer--debug" />
          </>
        </ExampleContainer>

        {/* Complex Layout */}
        <ExampleContainer
          title="Complex Layout"
          description="Real-world example using Spacer in a complex layout."
          style={{ maxWidth: '500px' }}
          code={`<Container>
  <Stack spacing="none">
    <Flex direction="row" justify="between" align="center">
      <Typography variant="h3">Dashboard</Typography>
      <Badge count={12} variant="danger">
        <User size={20} />
      </Badge>
    </Flex>
    
    <Spacer size="var(--spacing-sm)" />
    
    <Typography variant="body2" color="secondary">
      Welcome back! Here's what's new.
    </Typography>
    
    <Spacer size="var(--spacing-lg)" />
    
    <Flex direction="row" gap="sm">
      <Button variant="primary" size="sm">New Project</Button>
      <Button variant="outline" size="sm">
        <Settings size={14} />
        Settings
      </Button>
    </Flex>
    
    <Spacer />
    
    <div style={{ padding: '16px', backgroundColor: 'var(--color-gray-50)', borderRadius: '8px' }}>
      <Typography variant="body1">Recent Activity</Typography>
      <Spacer size="var(--spacing-xs)" />
      <Flex direction="row" align="center" gap="sm">
        <Avatar size="xs" />
        <Typography variant="body2">John updated the design system</Typography>
        <Spacer direction="horizontal" />
        <ChevronRight size={14} />
      </Flex>
    </div>
  </Stack>
</Container>`}
        >
          <Container>
            <Stack spacing="none">
              <Flex direction="row" justify="between" align="center">
                <Typography variant="h3">Dashboard</Typography>
                <Badge count={12} variant="danger">
                  <User size={20} />
                </Badge>
              </Flex>
              
              <Spacer size="var(--spacing-sm)" />
              
              <Typography variant="body2" color="secondary">
                Welcome back! Here's what's new.
              </Typography>
              
              <Spacer size="var(--spacing-lg)" />
              
              <Flex direction="row" gap="sm">
                <Button variant="primary" size="sm">New Project</Button>
                <Button variant="outline" size="sm">
                  <Settings size={14} />
                  Settings
                </Button>
              </Flex>
              
              <Spacer />
              
              <div style={{ padding: '16px', backgroundColor: 'var(--color-gray-50)', borderRadius: '8px' }}>
                <Typography variant="body1">Recent Activity</Typography>
                <Spacer size="var(--spacing-xs)" />
                <Flex direction="row" align="center" gap="sm">
                  <Avatar size="xs" />
                  <Typography variant="body2">John updated the design system</Typography>
                  <Spacer direction="horizontal" />
                  <ChevronRight size={14} />
                </Flex>
              </div>
            </Stack>
          </Container>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Spacer</strong> component. 
          You can use these properties to control spacing size, direction, and styling.</p>
        <APITable props={spacerProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Spacer</strong> component via ref. 
          Note that spacers are typically not interactive elements.</p>
        <APITable props={spacerMethods} />
      </div>

      <div className="docs-section">
        <h2>Design Guidelines</h2>
        <ul>
          <li><strong>Consistency:</strong> Use design system spacing variables (--spacing-xs, --spacing-sm, etc.) for consistent spacing across your application.</li>
          <li><strong>Semantic spacing:</strong> Choose spacing sizes that match the visual hierarchy and relationship between elements.</li>
          <li><strong>Responsive design:</strong> Consider how spacing should adapt across different screen sizes.</li>
          <li><strong>Accessibility:</strong> Spacers are hidden from screen readers with aria-hidden="true" as they provide no semantic value.</li>
          <li><strong>Performance:</strong> Spacer components render as simple div elements with minimal CSS, making them very lightweight.</li>
        </ul>
      </div>
    </div>
  );
};
