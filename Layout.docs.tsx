import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Help, Info, Settings, User, Star, Heart, Download, Copy, Edit, Trash2 } from "lucide-react";
import { APITable, type APITableRow } from "../Shared/APITable";

const tooltipProps: APITableRow[] = [
  {
    property: "content",
    description: "The content to display in the tooltip.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "placement",
    description: "Position of the tooltip relative to the target element.",
    type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'",
    default: "'top'",
  },
  {
    property: "trigger",
    description: "How the tooltip is triggered.",
    type: "'hover' | 'focus' | 'click' | 'manual'",
    default: "'hover'",
  },
  {
    property: "delay",
    description: "Delay in milliseconds before showing the tooltip.",
    type: "number",
    default: "100",
  },
  {
    property: "hideDelay",
    description: "Delay in milliseconds before hiding the tooltip.",
    type: "number",
    default: "100",
  },
  {
    property: "disabled",
    description: "Whether the tooltip is disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "visible",
    description: "Whether the tooltip is visible (controlled mode).",
    type: "boolean",
    default: "-",
  },
  {
    property: "defaultVisible",
    description: "Whether the tooltip is visible by default (uncontrolled mode).",
    type: "boolean",
    default: "false",
  },
  {
    property: "arrow",
    description: "Whether to show the tooltip arrow.",
    type: "boolean",
    default: "true",
  },
  {
    property: "offset",
    description: "Distance between tooltip and target element in pixels.",
    type: "number",
    default: "8",
  },
  {
    property: "portal",
    description: "Whether to render the tooltip in a portal (document.body).",
    type: "boolean",
    default: "true",
  },
  {
    property: "zIndex",
    description: "Z-index value for the tooltip.",
    type: "number",
    default: "9999",
  },
  {
    property: "maxWidth",
    description: "Maximum width of the tooltip.",
    type: "string | number",
    default: "250",
  },
  {
    property: "className",
    description: "Additional class name for the tooltip.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the tooltip.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "The target element that triggers the tooltip.",
    type: "ReactElement",
    default: "-",
  },
  {
    property: "onVisibleChange",
    description: "Callback when tooltip visibility changes.",
    type: "(visible: boolean) => void",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the tooltip.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the tooltip.",
    type: "string",
    default: "-",
  },
];

const tooltipMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the tooltip element.",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the tooltip element.",
    type: "() => void",
    default: "-",
  },
];

export const TooltipDocs: React.FC = () => {
  const [controlledVisible, setControlledVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [selectedTrigger, setSelectedTrigger] = useState<'hover' | 'focus' | 'click'>('hover');

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Tooltip</h1>
        <p>A simple text popup tip that displays additional information when users hover over, focus on, or click an element.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.</li>
          <li>To provide additional context or helpful information without cluttering the interface.</li>
          <li>For form inputs, buttons, icons, or any interactive elements that need explanation.</li>
          <li>When space is limited and you need to provide supplementary information.</li>
          <li>To show keyboard shortcuts, descriptions, or status information.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="The most basic usage of tooltips."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`}
        >
          <>
            <Tooltip content="This is a tooltip">
              <Button>Hover me</Button>
            </Tooltip>
            <Tooltip content="Tooltip with longer text that wraps to multiple lines when needed">
              <Button>Long tooltip</Button>
            </Tooltip>
          </>
        </ExampleContainer>

        {/* Placements */}
        <ExampleContainer
          title="Placements"
          description="There are 12 placement options available."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}
          code={`<Tooltip content="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button>Right</Button>
</Tooltip>`}
        >
          <>
            {/* Top row */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <Tooltip content="Top Start" placement="top-start">
                <Button size="sm">TL</Button>
              </Tooltip>
              <Tooltip content="Top" placement="top">
                <Button size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Top End" placement="top-end">
                <Button size="sm">TR</Button>
              </Tooltip>
            </div>

            {/* Middle row */}
            <div style={{ display: 'flex', gap: '80px', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Tooltip content="Left Start" placement="left-start">
                  <Button size="sm">LT</Button>
                </Tooltip>
                <Tooltip content="Left" placement="left">
                  <Button size="sm">Left</Button>
                </Tooltip>
                <Tooltip content="Left End" placement="left-end">
                  <Button size="sm">LB</Button>
                </Tooltip>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Tooltip content="Right Start" placement="right-start">
                  <Button size="sm">RT</Button>
                </Tooltip>
                <Tooltip content="Right" placement="right">
                  <Button size="sm">Right</Button>
                </Tooltip>
                <Tooltip content="Right End" placement="right-end">
                  <Button size="sm">RB</Button>
                </Tooltip>
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <Tooltip content="Bottom Start" placement="bottom-start">
                <Button size="sm">BL</Button>
              </Tooltip>
              <Tooltip content="Bottom" placement="bottom">
                <Button size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Bottom End" placement="bottom-end">
                <Button size="sm">BR</Button>
              </Tooltip>
            </div>
          </>
        </ExampleContainer>

        {/* Triggers */}
        <ExampleContainer
          title="Triggers"
          description="Different ways to trigger the tooltip."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip content="Hover trigger" trigger="hover">
  <Button>Hover</Button>
</Tooltip>

<Tooltip content="Focus trigger" trigger="focus">
  <Button>Focus</Button>
</Tooltip>

<Tooltip content="Click trigger" trigger="click">
  <Button>Click</Button>
</Tooltip>`}
        >
          <>
            <Tooltip content="Shows on mouse hover" trigger="hover">
              <Button>Hover</Button>
            </Tooltip>
            <Tooltip content="Shows on keyboard focus" trigger="focus">
              <Button>Focus</Button>
            </Tooltip>
            <Tooltip content="Shows on click (click again to hide)" trigger="click">
              <Button>Click</Button>
            </Tooltip>
          </>
        </ExampleContainer>

        {/* Icons */}
        <ExampleContainer
          title="With Icons"
          description="Tooltips on various icon elements."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip content="User profile">
  <User size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip content="Settings">
  <Settings size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip content="Help information">
  <Help size={20} style={{ cursor: 'pointer' }} />
</Tooltip>`}
        >
          <>
            <Tooltip content="User profile">
              <User size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
            <Tooltip content="Application settings">
              <Settings size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
            <Tooltip content="Get help and support">
              <Help size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
            <Tooltip content="Important information">
              <Info size={20} style={{ cursor: 'pointer', color: 'var(--primary-color)' }} />
            </Tooltip>
          </>
        </ExampleContainer>

        {/* Delays */}
        <ExampleContainer
          title="Delays"
          description="Control show and hide delays."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip content="No delay" delay={0} hideDelay={0}>
  <Button>No delay</Button>
</Tooltip>

<Tooltip content="Fast delay" delay={50} hideDelay={50}>
  <Button>Fast</Button>
</Tooltip>

<Tooltip content="Slow delay" delay={500} hideDelay={200}>
  <Button>Slow</Button>
</Tooltip>`}
        >
          <>
            <Tooltip content="Appears immediately" delay={0} hideDelay={0}>
              <Button>No delay</Button>
            </Tooltip>
            <Tooltip content="Appears quickly" delay={50} hideDelay={50}>
              <Button>Fast (50ms)</Button>
            </Tooltip>
            <Tooltip content="Takes time to appear" delay={500} hideDelay={200}>
              <Button>Slow (500ms)</Button>
            </Tooltip>
          </>
        </ExampleContainer>

        {/* Arrow Options */}
        <ExampleContainer
          title="Arrow Options"
          description="Tooltips with and without arrows."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip content="With arrow" arrow={true}>
  <Button>With arrow</Button>
</Tooltip>

<Tooltip content="No arrow" arrow={false}>
  <Button>No arrow</Button>
</Tooltip>`}
        >
          <>
            <Tooltip content="This tooltip has an arrow pointing to the trigger" arrow={true}>
              <Button>With arrow</Button>
            </Tooltip>
            <Tooltip content="This tooltip has no arrow" arrow={false}>
              <Button>No arrow</Button>
            </Tooltip>
          </>
        </ExampleContainer>

        {/* Rich Content */}
        <ExampleContainer
          title="Rich Content"
          description="Tooltips with complex content including JSX elements."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip 
  content={
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        <Star size={14} style={{ marginRight: '4px' }} />
        Featured Item
      </div>
      <div>This item has special features and benefits.</div>
    </div>
  }
>
  <Button>Rich content</Button>
</Tooltip>`}
        >
          <>
            <Tooltip 
              content={
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                    <Star size={14} style={{ marginRight: '4px' }} />
                    Featured Item
                  </div>
                  <div>This item has special features and benefits that make it stand out.</div>
                </div>
              }
              maxWidth={200}
            >
              <Button>Rich content</Button>
            </Tooltip>

            <Tooltip 
              content={
                <div>
                  <div style={{ color: '#ff4d4f', fontWeight: 'bold', marginBottom: '4px' }}>
                    ⚠️ Warning
                  </div>
                  <div>This action cannot be undone. Please proceed with caution.</div>
                </div>
              }
              maxWidth={180}
            >
              <Button variant="danger">Danger action</Button>
            </Tooltip>
          </>
        </ExampleContainer>

        {/* Disabled State */}
        <ExampleContainer
          title="Disabled"
          description="Tooltips can be disabled dynamically."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [isDisabled, setIsDisabled] = useState(false);

<Tooltip content="This tooltip can be disabled" disabled={isDisabled}>
  <Button>Target element</Button>
</Tooltip>

<Button onClick={() => setIsDisabled(!isDisabled)}>
  {isDisabled ? 'Enable' : 'Disable'} Tooltip
</Button>`}
        >
          <>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Tooltip content="This tooltip can be disabled" disabled={isDisabled}>
                <Button>Target element</Button>
              </Tooltip>
              <span>Tooltip is {isDisabled ? 'disabled' : 'enabled'}</span>
            </div>
            <Button size="sm" onClick={() => setIsDisabled(!isDisabled)}>
              {isDisabled ? 'Enable' : 'Disable'} Tooltip
            </Button>
          </>
        </ExampleContainer>

        {/* Controlled */}
        <ExampleContainer
          title="Controlled"
          description="Manually control tooltip visibility."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [visible, setVisible] = useState(false);

<Tooltip 
  content="This is a controlled tooltip" 
  visible={visible}
  trigger="manual"
  onVisibleChange={setVisible}
>
  <Button>Controlled tooltip</Button>
</Tooltip>

<Button onClick={() => setVisible(!visible)}>
  {visible ? 'Hide' : 'Show'} Tooltip
</Button>`}
        >
          <>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Tooltip 
                content="This is a controlled tooltip - visibility is managed externally" 
                visible={controlledVisible}
                trigger="manual"
                onVisibleChange={setControlledVisible}
              >
                <Button>Controlled tooltip</Button>
              </Tooltip>
              <span>Tooltip is {controlledVisible ? 'visible' : 'hidden'}</span>
            </div>
            <Button size="sm" onClick={() => setControlledVisible(!controlledVisible)}>
              {controlledVisible ? 'Hide' : 'Show'} Tooltip
            </Button>
          </>
        </ExampleContainer>

        {/* Interactive Demo */}
        <ExampleContainer
          title="Interactive Demo"
          description="Test different tooltip configurations."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [placement, setPlacement] = useState('top');
const [trigger, setTrigger] = useState('hover');

<Tooltip 
  content="Interactive tooltip demo"
  placement={placement}
  trigger={trigger}
>
  <Button>Interactive Demo</Button>
</Tooltip>`}
        >
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <strong>Placement:</strong>
                {(['top', 'bottom', 'left', 'right'] as const).map(placement => (
                  <Button
                    key={placement}
                    size="sm"
                    variant={selectedPlacement === placement ? 'primary' : 'secondary'}
                    onClick={() => setSelectedPlacement(placement)}
                  >
                    {placement}
                  </Button>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <strong>Trigger:</strong>
                {(['hover', 'focus', 'click'] as const).map(trigger => (
                  <Button
                    key={trigger}
                    size="sm"
                    variant={selectedTrigger === trigger ? 'primary' : 'secondary'}
                    onClick={() => setSelectedTrigger(trigger)}
                  >
                    {trigger}
                  </Button>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <Tooltip 
                content={`Interactive tooltip with ${selectedPlacement} placement and ${selectedTrigger} trigger`}
                placement={selectedPlacement}
                trigger={selectedTrigger}
              >
                <Button>Interactive Demo Button</Button>
              </Tooltip>
            </div>
          </>
        </ExampleContainer>

        {/* Action Tooltips */}
        <ExampleContainer
          title="Action Tooltips"
          description="Tooltips for common UI actions."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Tooltip content="Download file">
  <Download size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip content="Copy to clipboard">
  <Copy size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip content="Edit item">
  <Edit size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip content="Delete item" placement="bottom">
  <Trash2 size={20} style={{ cursor: 'pointer', color: 'var(--danger-color)' }} />
</Tooltip>`}
        >
          <>
            <Tooltip content="Download file">
              <Download size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
            <Tooltip content="Copy to clipboard">
              <Copy size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
            <Tooltip content="Edit item">
              <Edit size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
            <Tooltip content="Delete item (this action cannot be undone)" placement="bottom">
              <Trash2 size={20} style={{ cursor: 'pointer', color: 'var(--danger-color)' }} />
            </Tooltip>
            <Tooltip content="Add to favorites">
              <Heart size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </Tooltip>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Tooltip</strong> component. 
          You can use these properties to control behavior, appearance, and interactivity.</p>
        <APITable props={tooltipProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Tooltip</strong> component via ref. 
          They allow you to programmatically control the tooltip's behavior.</p>
        <APITable props={tooltipMethods} />
      </div>

      <div className="docs-section">
        <h2>Accessibility</h2>
        <p>The Tooltip component is built with accessibility in mind:</p>
        <ul>
          <li><strong>ARIA attributes:</strong> Uses proper <code>role="tooltip"</code> and <code>aria-describedby</code> attributes.</li>
          <li><strong>Keyboard navigation:</strong> Supports focus trigger and Escape key to close tooltips.</li>
          <li><strong>Screen readers:</strong> Tooltip content is properly announced when triggered by focus.</li>
          <li><strong>Focus management:</strong> Returns focus to trigger element when tooltip is dismissed with Escape.</li>
          <li><strong>High contrast:</strong> Automatically adapts to high contrast mode preferences.</li>
          <li><strong>Reduced motion:</strong> Respects user preferences for reduced motion.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Keep it concise:</strong> Tooltip content should be brief and informative.</li>
          <li><strong>Don't repeat obvious information:</strong> Avoid tooltips that just repeat button text.</li>
          <li><strong>Use appropriate triggers:</strong> Hover for supplementary info, focus for accessibility, click for complex content.</li>
          <li><strong>Consider mobile:</strong> Hover doesn't work on touch devices - provide alternative access methods.</li>
          <li><strong>Placement matters:</strong> Choose placement that doesn't obstruct important content.</li>
          <li><strong>Don't overuse:</strong> Too many tooltips can clutter the interface and overwhelm users.</li>
        </ul>
      </div>
    </div>
  );
};
