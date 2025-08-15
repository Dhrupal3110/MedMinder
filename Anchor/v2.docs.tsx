import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Anchor, type AnchorItem } from "./Anchor";
import { Typography } from "../Typography/Typography";
import { Divider } from "../Divider/Divider";
import { Stack } from "../Stack/Stack";
import { Flex } from "../Flex/Flex";
import { Button } from "../Button/Button";
import { Switch } from "../Switch/Switch";
import { Badge } from "../Badge/Badge";
import { APITable, type APITableRow } from "../Shared/APITable";
import { Anchor as AnchorIcon, Hash, Link, ArrowUp, Settings, User, FileText, Image, Code, Zap } from "lucide-react";

const anchorProps: APITableRow[] = [
  {
    property: "items",
    description: "Array of anchor items to display. Each item can have nested children.",
    type: "AnchorItem[]",
    default: "[]",
  },
  {
    property: "activeKey",
    description: "Currently active anchor key. When controlled, component won't manage active state internally.",
    type: "string",
    default: "-",
  },
  {
    property: "onChange",
    description: "Callback function when the active anchor changes.",
    type: "(activeKey: string) => void",
    default: "-",
  },
  {
    property: "offsetTop",
    description: "Offset from top of the page when scrolling to target or calculating active anchor.",
    type: "number",
    default: "0",
  },
  {
    property: "affix",
    description: "Whether to fix the anchor component in place when scrolling.",
    type: "boolean",
    default: "false",
  },
  {
    property: "showInkInFixed",
    description: "Whether to show the ink indicator when anchor is in fixed mode.",
    type: "boolean",
    default: "true",
  },
  {
    property: "container",
    description: "Scroll container for the anchor. Can be an HTMLElement, selector string, or function returning HTMLElement. If not provided, uses document scroll.",
    type: "HTMLElement | string | (() => HTMLElement)",
    default: "-",
  },
  {
    property: "namespace",
    description: "Namespace prefix for href values to avoid conflicts when multiple anchors exist on the same page.",
    type: "string",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name for the anchor container.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the anchor container.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the navigation.",
    type: "string",
    default: "'Page navigation'",
  },
];

const anchorItemProps: APITableRow[] = [
  {
    property: "key",
    description: "Unique identifier for the anchor item.",
    type: "string",
    default: "-",
  },
  {
    property: "title",
    description: "Display text or React element for the anchor link.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "href",
    description: "Target selector for the anchor (e.g., '#section-1'). Will be automatically prefixed with namespace if provided.",
    type: "string",
    default: "-",
  },
  {
    property: "children",
    description: "Nested anchor items for creating hierarchical navigation.",
    type: "AnchorItem[]",
    default: "-",
  },
];

export const AnchorDocs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('');
  const [isAffix, setIsAffix] = useState(false);
  const [showInk, setShowInk] = useState(true);

  const basicItems: AnchorItem[] = [
    {
      key: 'introduction',
      title: 'Introduction',
      href: '#introduction',
    },
    {
      key: 'installation',
      title: 'Installation',
      href: '#installation',
    },
    {
      key: 'usage',
      title: 'Usage',
      href: '#usage',
    },
    {
      key: 'examples',
      title: 'Examples',
      href: '#examples',
    },
    {
      key: 'api',
      title: 'API Reference',
      href: '#api',
    },
  ];

  const nestedItems: AnchorItem[] = [
    {
      key: 'getting-started',
      title: 'Getting Started',
      href: '#getting-started',
      children: [
        {
          key: 'prerequisites',
          title: 'Prerequisites',
          href: '#prerequisites',
        },
        {
          key: 'quick-start',
          title: 'Quick Start',
          href: '#quick-start',
        },
      ],
    },
    {
      key: 'components',
      title: 'Components',
      href: '#components',
      children: [
        {
          key: 'basic-components',
          title: 'Basic Components',
          href: '#basic-components',
          children: [
            { key: 'button-component', title: 'Button', href: '#button-component' },
            { key: 'input-component', title: 'Input', href: '#input-component' },
          ],
        },
        { key: 'layout-components', title: 'Layout Components', href: '#layout-components' },
      ],
    },
    { key: 'theming', title: 'Theming', href: '#theming' },
  ];

  const iconItems: AnchorItem[] = [
    {
      key: 'overview',
      title: (
        <Flex align="center" gap="xs">
          <FileText size={14} />
          Overview
        </Flex>
      ),
      href: '#overview',
    },
    {
      key: 'features',
      title: (
        <Flex align="center" gap="xs">
          <Zap size={14} />
          Features
        </Flex>
      ),
      href: '#features',
    },
    {
      key: 'gallery',
      title: (
        <Flex align="center" gap="xs">
          <Image size={14} />
          Gallery
        </Flex>
      ),
      href: '#gallery',
    },
    {
      key: 'code-examples',
      title: (
        <Flex align="center" gap="xs">
          <Code size={14} />
          Code Examples
        </Flex>
      ),
      href: '#code-examples',
    },
    {
      key: 'settings',
      title: (
        <Flex align="center" gap="xs">
          <Settings size={14} />
          Settings
        </Flex>
      ),
      href: '#settings',
    },
  ];

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>
          <AnchorIcon size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Anchor
        </h1>
        <p>Anchor navigation component for page sections. Automatically highlights the active section and provides smooth scrolling navigation with support for nested anchors and container-specific scrolling.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>For navigating between sections of a long page or document.</li>
          <li>When you need to provide a table of contents for lengthy content.</li>
          <li>To create a persistent navigation sidebar that follows the user's scroll position.</li>
          <li>For documentation sites, articles, or any content with clear hierarchical structure.</li>
          <li>When you want to provide quick access to different sections without losing context.</li>
          <li>In scrollable containers where you need section navigation within a specific area.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="Simple anchor navigation with a few links. Click on any link to see smooth scrolling within the container."
          style={{ display: 'flex', gap: '24px' }}
          code={`const items = [
  { key: 'introduction', title: 'Introduction', href: '#introduction' },
  { key: 'installation', title: 'Installation', href: '#installation' },
  { key: 'usage', title: 'Usage', href: '#usage' },
  { key: 'examples', title: 'Examples', href: '#examples' },
  { key: 'api', title: 'API Reference', href: '#api' },
];

<Anchor 
  items={items} 
  container=".scrollable-content"
  namespace="basic-example"
/>`}
        >
          <>
            <div style={{ minWidth: '180px' }}>
              <Anchor 
                items={basicItems} 
                container=".basic-example-content"
                namespace="basic-example"
              />
            </div>
            <div 
              className="basic-example-content"
              style={{ 
                flex: 1, 
                maxHeight: '300px', 
                overflow: 'auto', 
                padding: '16px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '8px' 
              }}
            >
              <div id="basic-example-introduction" style={{ marginBottom: '100px' }}>
                <Typography variant="h3">Introduction</Typography>
                <Typography variant="body1">
                  This is the introduction section. It contains basic information about the component and how to get started.
                  Notice how the anchor highlights update as you scroll within this container.
                </Typography>
              </div>
              <div id="basic-example-installation" style={{ marginBottom: '100px' }}>
                <Typography variant="h3">Installation</Typography>
                <Typography variant="body1">
                  Installation instructions and requirements go here. Follow the steps to set up the component in your project.
                  The active state updates automatically based on your scroll position within this container.
                </Typography>
              </div>
              <div id="basic-example-usage" style={{ marginBottom: '100px' }}>
                <Typography variant="h3">Usage</Typography>
                <Typography variant="body1">
                  Basic usage examples and common patterns. Learn how to implement the component effectively.
                  Each section is properly tracked as you scroll through the content.
                </Typography>
              </div>
              <div id="basic-example-examples" style={{ marginBottom: '100px' }}>
                <Typography variant="h3">Examples</Typography>
                <Typography variant="body1">
                  Comprehensive examples showcasing different features and use cases of the component.
                  The anchor navigation works seamlessly within scrollable containers.
                </Typography>
              </div>
              <div id="basic-example-api" style={{ marginBottom: '50px' }}>
                <Typography variant="h3">API Reference</Typography>
                <Typography variant="body1">
                  Complete API documentation with all available props, methods, and configuration options.
                  This demonstrates container-specific scroll detection in action.
                </Typography>
              </div>
            </div>
          </>
        </ExampleContainer>

        {/* Nested Items */}
        <ExampleContainer
          title="Nested Anchor Links"
          description="Hierarchical navigation with nested children. Supports multiple levels of nesting with container scrolling."
          style={{ display: 'flex', gap: '24px' }}
          code={`const nestedItems = [
  {
    key: 'getting-started',
    title: 'Getting Started',
    href: '#getting-started',
    children: [
      { key: 'prerequisites', title: 'Prerequisites', href: '#prerequisites' },
      { key: 'quick-start', title: 'Quick Start', href: '#quick-start' },
    ],
  },
  // ... more nested items
];

<Anchor 
  items={nestedItems} 
  container=".nested-example-content"
  namespace="nested-example"
/>`}
        >
          <>
            <div style={{ minWidth: '200px' }}>
              <Anchor 
                items={nestedItems} 
                container=".nested-example-content"
                namespace="nested-example"
              />
            </div>
            <div 
              className="nested-example-content"
              style={{ 
                flex: 1, 
                maxHeight: '400px', 
                overflow: 'auto', 
                padding: '16px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '8px' 
              }}
            >
              <div id="nested-example-getting-started" style={{ marginBottom: '60px' }}>
                <Typography variant="h2">Getting Started</Typography>
                <Typography variant="body1">Welcome to the getting started guide with container scrolling.</Typography>
                
                <div id="nested-example-prerequisites" style={{ marginTop: '30px', marginBottom: '30px' }}>
                  <Typography variant="h4">Prerequisites</Typography>
                  <Typography variant="body2">System requirements and dependencies needed before installation.</Typography>
                </div>
                
                <div id="nested-example-quick-start" style={{ marginBottom: '30px' }}>
                  <Typography variant="h4">Quick Start</Typography>
                  <Typography variant="body2">Get up and running in minutes with our quick start guide.</Typography>
                </div>
              </div>
              
              <div id="nested-example-components" style={{ marginBottom: '60px' }}>
                <Typography variant="h2">Components</Typography>
                <Typography variant="body1">Overview of all available components in the library.</Typography>
                
                <div id="nested-example-basic-components" style={{ marginTop: '30px', marginBottom: '30px' }}>
                  <Typography variant="h4">Basic Components</Typography>
                  <Typography variant="body2">Foundation components for building user interfaces.</Typography>
                  
                  <div id="nested-example-button-component" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Typography variant="h5">Button</Typography>
                    <Typography variant="body2">Interactive button component with multiple variants.</Typography>
                  </div>
                  
                  <div id="nested-example-input-component" style={{ marginBottom: '20px' }}>
                    <Typography variant="h5">Input</Typography>
                    <Typography variant="body2">Form input component with validation support.</Typography>
                  </div>
                </div>
                
                <div id="nested-example-layout-components" style={{ marginBottom: '30px' }}>
                  <Typography variant="h4">Layout Components</Typography>
                  <Typography variant="body2">Components for structuring and organizing content.</Typography>
                </div>
              </div>
              
              <div id="nested-example-theming" style={{ marginBottom: '50px' }}>
                <Typography variant="h2">Theming</Typography>
                <Typography variant="body1">Customization options and theme configuration.</Typography>
              </div>
            </div>
          </>
        </ExampleContainer>

        {/* Fixed Anchor */}
        <ExampleContainer
          title="Fixed Anchor on Scroll"
          description="Anchor that becomes fixed when scrolling the main document. Toggle options to see different behaviors."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Anchor 
  items={items} 
  affix={true} 
  offsetTop={64}
  showInkInFixed={true}
  namespace="fixed-example"
/>`}
        >
          <>
            <Flex align="center" gap="md">
              <Typography variant="body2">Fixed mode:</Typography>
              <Switch 
                checked={isAffix} 
                onChange={setIsAffix}
                size="sm"
              />
              <Typography variant="body2">Show ink:</Typography>
              <Switch 
                checked={showInk} 
                onChange={setShowInk}
                size="sm"
              />
            </Flex>
            
            <div style={{ position: 'relative', height: '300px', overflow: 'auto', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
              <Anchor 
                items={basicItems} 
                affix={isAffix}
                offsetTop={20}
                showInkInFixed={showInk}
                namespace="fixed-example"
              />
              <div style={{ padding: '20px', height: '1000px' }}>
                <Typography variant="h3" style={{ marginBottom: '20px' }}>Scroll to see fixed behavior</Typography>
                <div id="fixed-example-introduction" style={{ height: '150px', marginBottom: '50px' }}>
                  <Typography variant="h4">Introduction</Typography>
                  <Typography variant="body1">
                    When you enable affix mode, the anchor will become fixed to the viewport when scrolling the main document.
                    This is useful for long documents where you want persistent navigation.
                  </Typography>
                </div>
                <div id="fixed-example-installation" style={{ height: '150px', marginBottom: '50px' }}>
                  <Typography variant="h4">Installation</Typography>
                  <Typography variant="body1">
                    Installation section content. The anchor will track your scroll position and highlight
                    the current section automatically when scrolling the document.
                  </Typography>
                </div>
                <div id="fixed-example-usage" style={{ height: '150px', marginBottom: '50px' }}>
                  <Typography variant="h4">Usage</Typography>
                  <Typography variant="body1">
                    Usage examples and implementation details. Notice how the active indicator follows
                    your scroll position in the main document.
                  </Typography>
                </div>
                <div id="fixed-example-examples" style={{ height: '150px', marginBottom: '50px' }}>
                  <Typography variant="h4">Examples</Typography>
                  <Typography variant="body1">
                    Various examples showcasing different features of the anchor component.
                  </Typography>
                </div>
                <div id="fixed-example-api" style={{ height: '150px' }}>
                  <Typography variant="h4">API Reference</Typography>
                  <Typography variant="body1">
                    Complete API documentation with all available properties and methods.
                  </Typography>
                </div>
              </div>
            </div>
          </>
        </ExampleContainer>

        {/* Inside Container */}
        <ExampleContainer
          title="Anchor Inside Container"
          description="Anchor navigation contained within a specific layout using Stack component."
          code={`<Stack spacing="md">
  <Typography variant="h3">Documentation</Typography>
  <Divider />
  <Flex gap="lg">
    <Anchor items={items} namespace="container-example" />
    <Stack spacing="md" style={{ flex: 1 }}>
      <!-- Content sections -->
    </Stack>
  </Flex>
</Stack>`}
        >
          <Stack spacing="md">
            <Typography variant="h3">
              Documentation
              <Badge count={5} variant="info" style={{ marginLeft: '8px' }} />
            </Typography>
            <Divider />
            <Flex gap="lg">
              <div style={{ minWidth: '160px' }}>
                <Anchor 
                  items={basicItems.slice(0, 3)} 
                  namespace="container-example"
                />
              </div>
              <Stack spacing="md" style={{ flex: 1 }}>
                <div id="container-example-introduction">
                  <Typography variant="h4">Introduction</Typography>
                  <Typography variant="body1">
                    Welcome to our documentation. This section provides an overview of the component library.
                  </Typography>
                </div>
                <div id="container-example-installation">
                  <Typography variant="h4">Installation</Typography>
                  <Typography variant="body1">
                    Step-by-step installation guide to get started with the library.
                  </Typography>
                </div>
                <div id="container-example-usage">
                  <Typography variant="h4">Usage</Typography>
                  <Typography variant="body1">
                    Basic usage patterns and best practices for implementing components.
                  </Typography>
                </div>
              </Stack>
            </Flex>
          </Stack>
        </ExampleContainer>

        {/* With Icons */}
        <ExampleContainer
          title="Anchor with Icons"
          description="Anchor links enhanced with icons for better visual hierarchy and recognition."
          style={{ display: 'flex', gap: '24px' }}
          code={`const iconItems = [
  {
    key: 'overview',
    title: (
      <Flex align="center" gap="xs">
        <FileText size={14} />
        Overview
      </Flex>
    ),
    href: '#overview',
  },
  // ... more items
];

<Anchor 
  items={iconItems} 
  container=".icon-example-content"
  namespace="icon-example"
/>`}
        >
          <>
            <div style={{ minWidth: '180px' }}>
              <Anchor 
                items={iconItems} 
                container=".icon-example-content"
                namespace="icon-example"
              />
            </div>
            <div 
              className="icon-example-content"
              style={{ 
                flex: 1, 
                maxHeight: '300px', 
                overflow: 'auto', 
                padding: '16px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '8px' 
              }}
            >
              <div id="icon-example-overview" style={{ marginBottom: '80px' }}>
                <Typography variant="h3">
                  <FileText size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Overview
                </Typography>
                <Typography variant="body1">
                  Comprehensive overview of the component features and capabilities.
                </Typography>
              </div>
              <div id="icon-example-features" style={{ marginBottom: '80px' }}>
                <Typography variant="h3">
                  <Zap size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Features
                </Typography>
                <Typography variant="body1">
                  Detailed feature list and functionality descriptions.
                </Typography>
              </div>
              <div id="icon-example-gallery" style={{ marginBottom: '80px' }}>
                <Typography variant="h3">
                  <Image size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Gallery
                </Typography>
                <Typography variant="body1">
                  Visual examples and screenshots of the component in action.
                </Typography>
              </div>
              <div id="icon-example-code-examples" style={{ marginBottom: '80px' }}>
                <Typography variant="h3">
                  <Code size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Code Examples
                </Typography>
                <Typography variant="body1">
                  Practical code examples and implementation snippets.
                </Typography>
              </div>
              <div id="icon-example-settings" style={{ marginBottom: '50px' }}>
                <Typography variant="h3">
                  <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Settings
                </Typography>
                <Typography variant="body1">
                  Configuration options and customization settings.
                </Typography>
              </div>
            </div>
          </>
        </ExampleContainer>

        {/* Controlled State */}
        <ExampleContainer
          title="Controlled Active State"
          description="Manually control which anchor link is active. Use external buttons to change the active section."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [activeKey, setActiveKey] = useState('');

<Anchor 
  items={items}
  activeKey={activeKey}
  onChange={setActiveKey}
  namespace="controlled-example"
/>

<Button onClick={() => setActiveKey('introduction')}>
  Go to Introduction
</Button>`}
        >
          <>
            <Flex align="center" gap="sm" wrap="wrap">
              <Typography variant="body2">Quick navigation:</Typography>
              {basicItems.slice(0, 4).map(item => (
                <Button 
                  key={item.key}
                  size="sm" 
                  variant={activeKey === item.key ? 'primary' : 'outline'}
                  onClick={() => setActiveKey(item.key)}
                >
                  {item.title as string}
                </Button>
              ))}
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => setActiveKey('')}
              >
                Clear
              </Button>
            </Flex>
            
            <Flex gap="lg">
              <div style={{ minWidth: '160px' }}>
                <Anchor 
                  items={basicItems}
                  activeKey={activeKey}
                  onChange={setActiveKey}
                  namespace="controlled-example"
                />
              </div>
              <div style={{ flex: 1 }}>
                <Typography variant="body2" color="secondary">
                  Current active: {activeKey || 'None'}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '8px' }}>
                  The anchor component can be controlled externally. Click the buttons above to see how 
                  the active state changes, or click on the anchor links directly. Each anchor instance 
                  uses unique hrefs to avoid conflicts.
                </Typography>
                <div id="controlled-example-introduction" style={{ marginTop: '16px', padding: '8px', background: 'var(--color-background-subtle)', borderRadius: '4px' }}>
                  <Typography variant="h5">Introduction Content</Typography>
                </div>
                <div id="controlled-example-installation" style={{ marginTop: '16px', padding: '8px', background: 'var(--color-background-subtle)', borderRadius: '4px' }}>
                  <Typography variant="h5">Installation Content</Typography>
                </div>
                <div id="controlled-example-usage" style={{ marginTop: '16px', padding: '8px', background: 'var(--color-background-subtle)', borderRadius: '4px' }}>
                  <Typography variant="h5">Usage Content</Typography>
                </div>
                <div id="controlled-example-examples" style={{ marginTop: '16px', padding: '8px', background: 'var(--color-background-subtle)', borderRadius: '4px' }}>
                  <Typography variant="h5">Examples Content</Typography>
                </div>
              </div>
            </Flex>
          </>
        </ExampleContainer>

        {/* Dark Mode */}
        <ExampleContainer
          title="Dark Mode Support"
          description="Anchor component with full dark theme support and proper contrast ratios."
          style={{ display: 'flex', gap: '24px' }}
          code={`<div data-theme="dark">
  <Anchor items={items} namespace="dark-example" />
</div>`}
        >
          <div data-theme="dark" style={{ background: 'var(--color-background)', padding: '16px', borderRadius: '8px', display: 'flex', gap: '24px' }}>
            <div style={{ minWidth: '180px' }}>
              <Anchor 
                items={basicItems.slice(0, 4)} 
                namespace="dark-example"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="h4" style={{ color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                Dark Theme Example
              </Typography>
              <Typography variant="body1" style={{ color: 'var(--color-text-secondary)' }}>
                The anchor component automatically adapts to dark themes with proper contrast ratios 
                and accessible color schemes. All interactive states maintain visibility and usability.
                Each example uses namespaced hrefs to prevent conflicts.
              </Typography>
              <div id="dark-example-introduction" style={{ marginTop: '16px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <Typography variant="h5" style={{ color: 'var(--color-text-primary)' }}>Introduction</Typography>
              </div>
              <div id="dark-example-installation" style={{ marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <Typography variant="h5" style={{ color: 'var(--color-text-primary)' }}>Installation</Typography>
              </div>
              <div id="dark-example-usage" style={{ marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <Typography variant="h5" style={{ color: 'var(--color-text-primary)' }}>Usage</Typography>
              </div>
              <div id="dark-example-examples" style={{ marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <Typography variant="h5" style={{ color: 'var(--color-text-primary)' }}>Examples</Typography>
              </div>
            </div>
          </div>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Anchor</strong> component. 
          You can use these properties to control navigation behavior, styling, and interactivity.</p>
        <APITable props={anchorProps} />
      </div>

      <div className="docs-section">
        <h2>AnchorItem Interface</h2>
        <p>The <strong>AnchorItem</strong> interface defines the structure for each navigation item 
          in the anchor component.</p>
        <APITable props={anchorItemProps} />
      </div>

      <div className="docs-section">
        <h2>Design Guidelines</h2>
        <ul>
          <li><strong>Hierarchy:</strong> Use nested items sparingly and limit to 2-3 levels to maintain readability.</li>
          <li><strong>Link text:</strong> Keep anchor titles concise and descriptive. Use sentence case for consistency.</li>
          <li><strong>Scroll behavior:</strong> Consider the offsetTop prop when you have fixed headers or navigation bars.</li>
          <li><strong>Fixed positioning:</strong> Use affix mode judiciously - it works best for desktop experiences with sufficient screen real estate.</li>
          <li><strong>Container scrolling:</strong> Use the container prop for sections within scrollable areas. This enables precise scroll tracking within specific containers.</li>
          <li><strong>Namespacing:</strong> Always use the namespace prop when multiple anchor components exist on the same page to avoid href conflicts.</li>
          <li><strong>Accessibility:</strong> Ensure target sections have proper heading structure and are keyboard accessible.</li>
          <li><strong>Performance:</strong> For very long documents, consider implementing virtualization or pagination instead of a single anchor list.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Accessibility</h2>
        <ul>
          <li>All anchor links are keyboard navigable using Tab and Enter/Space keys.</li>
          <li>Active states are announced to screen readers using <code>aria-current="location"</code>.</li>
          <li>The component uses <code>role="navigation"</code> to identify it as a navigation landmark.</li>
          <li>Focus management ensures visible focus indicators for all interactive elements.</li>
          <li>High contrast mode support with enhanced borders and indicators.</li>
          <li>Container-specific scrolling maintains accessibility standards within scrollable regions.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Advanced Usage</h2>
        <h3>Container Scrolling</h3>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          The <code>container</code> prop enables anchor tracking within specific scrollable containers:
        </Typography>
        <ul>
          <li><strong>CSS Selector:</strong> Pass a string selector like <code>".my-container"</code></li>
          <li><strong>HTMLElement:</strong> Pass a direct DOM element reference</li>
          <li><strong>Function:</strong> Pass a function that returns an HTMLElement</li>
        </ul>
        
        <h3>Namespacing</h3>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          Use the <code>namespace</code> prop to avoid conflicts when multiple anchors exist:
        </Typography>
        <ul>
          <li>Automatically prefixes all href values with the namespace</li>
          <li>Ensures each anchor instance targets unique DOM elements</li>
          <li>Essential for documentation pages with multiple examples</li>
        </ul>
      </div>
    </div>
  );
};
