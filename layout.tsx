import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Badge } from "./Badge";
import { Bell, Mail, MessageCircle, Settings, ShoppingCart, User, X } from "lucide-react";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";

const badgeProps: APITableRow[] = [
  {
    property: "label",
    description: "The content to display in the badge.",
    type: "ReactNode | string",
    default: "-",
  },
  {
    property: "variant",
    description: "Color variant of the badge. Can be 'primary', 'secondary', 'success', 'warning', 'danger', or 'info'.",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'",
    default: "'primary'",
  },
  {
    property: "size",
    description: "Size of the badge. Can be 'sm', 'md', or 'lg'.",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: "count",
    description: "Number to display in the badge. Shows 99+ for numbers over 99.",
    type: "number",
    default: "-",
  },
  {
    property: "showZero",
    description: "Whether to show the badge when count is 0.",
    type: "boolean",
    default: "false",
  },
  {
    property: "dot",
    description: "Whether to show only a small dot without text.",
    type: "boolean",
    default: "false",
  },
  {
    property: "closable",
    description: "Whether the badge can be closed with a close button.",
    type: "boolean",
    default: "false",
  },
  {
    property: "disabled",
    description: "Whether the badge is disabled (affects close button).",
    type: "boolean",
    default: "false",
  },
  {
    property: "className",
    description: "Additional class name for the badge.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the badge.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Element to wrap with the badge (for positioned badges).",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "onClose",
    description: "Callback function when the close button is clicked.",
    type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the badge.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the badge.",
    type: "string",
    default: "-",
  },
];

const badgeMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the badge element (only for closable badges).",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the badge element.",
    type: "() => void",
    default: "-",
  },
];

export const BadgeDocs: React.FC = () => {
  const [count, setCount] = useState(5);
  const [showNotifications, setShowNotifications] = useState(true);
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

  const incrementCount = () => setCount(prev => prev + 1);
  const decrementCount = () => setCount(prev => Math.max(0, prev - 1));
  const resetCount = () => setCount(0);

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    const newTag = `Tag${tags.length + 1}`;
    setTags(prev => [...prev, newTag]);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Badge</h1>
        <p>Small numerical value or status descriptor for UI elements. Badges are used to display notifications, counts, or status indicators.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.</li>
          <li>Use badges to display small amounts of information like counts, statuses, or labels.</li>
          <li>Perfect for indicating new or unread items, showing quantities, or highlighting important status changes.</li>
          <li>Can be used as standalone elements or positioned relative to other components.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="The most basic usage of badges with different content."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Badge label="New" />
<Badge label="Hot" variant="danger" />
<Badge label="Beta" variant="warning" />`}
        >
          <>
            <Badge label="New" />
            <Badge label="Hot" variant="danger" />
            <Badge label="Beta" variant="warning" />
          </>
        </ExampleContainer>

        {/* Count */}
        <ExampleContainer
          title="Count"
          description="Display numerical counts with automatic 99+ formatting."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Badge count={5} />
<Badge count={25} variant="success" />
<Badge count={100} variant="danger" />
<Badge count={0} showZero variant="info" />`}
        >
          <>
            <Badge count={5} />
            <Badge count={25} variant="success" />
            <Badge count={100} variant="danger" />
            <Badge count={0} showZero variant="info" />
          </>
        </ExampleContainer>

        {/* Positioned */}
        <ExampleContainer
          title="Positioned"
          description="Badges positioned relative to other elements."
          style={{ display: 'flex', gap: '24px', alignItems: 'center' }}
          code={`<Badge count={3}>
  <Bell size={20} />
</Badge>

<Badge count={12} variant="danger">
  <Mail size={20} />
</Badge>

<Badge dot variant="success">
  <User size={20} />
</Badge>`}
        >
          <>
            <Badge count={3}>
              <Bell size={20} />
            </Badge>
            <Badge count={12} variant="danger">
              <Mail size={20} />
            </Badge>
            <Badge dot variant="success">
              <User size={20} />
            </Badge>
            <Badge count={99} variant="warning">
              <MessageCircle size={20} />
            </Badge>
          </>
        </ExampleContainer>

        {/* Dot */}
        <ExampleContainer
          title="Dot"
          description="Simple dot indicators for status or presence."
          style={{ display: 'flex', gap: '24px', alignItems: 'center' }}
          code={`<Badge dot>
  <Settings size={20} />
</Badge>

<Badge dot variant="success">
  <User size={20} />
</Badge>

<Badge dot variant="danger">
  <ShoppingCart size={20} />
</Badge>`}
        >
          <>
            <Badge dot>
              <Settings size={20} />
            </Badge>
            <Badge dot variant="success">
              <User size={20} />
            </Badge>
            <Badge dot variant="danger">
              <ShoppingCart size={20} />
            </Badge>
          </>
        </ExampleContainer>

        {/* Sizes */}
        <ExampleContainer
          title="Sizes"
          description="Badge supports three sizes: small, medium (default), and large."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />
<Badge label="Large" size="lg" />

<Badge count={5} size="sm" />
<Badge count={5} size="md" />
<Badge count={5} size="lg" />`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <Badge label="Small" size="sm" />
              <Badge label="Medium" size="md" />
              <Badge label="Large" size="lg" />
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Badge count={5} size="sm" />
              <Badge count={5} size="md" />
              <Badge count={5} size="lg" />
            </div>
          </>
        </ExampleContainer>

        {/* Color Variants */}
        <ExampleContainer
          title="Color Variants"
          description="Different color variants for different contexts."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Badge label="Primary" variant="primary" />
<Badge label="Secondary" variant="secondary" />
<Badge label="Success" variant="success" />
<Badge label="Warning" variant="warning" />
<Badge label="Danger" variant="danger" />
<Badge label="Info" variant="info" />`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Badge label="Primary" variant="primary" />
              <Badge label="Secondary" variant="secondary" />
              <Badge label="Success" variant="success" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Danger" variant="danger" />
              <Badge label="Info" variant="info" />
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Badge count={1} variant="primary" />
              <Badge count={2} variant="secondary" />
              <Badge count={3} variant="success" />
              <Badge count={4} variant="warning" />
              <Badge count={5} variant="danger" />
              <Badge count={6} variant="info" />
            </div>
          </>
        </ExampleContainer>

        {/* Closable */}
        <ExampleContainer
          title="Closable"
          description="Badges with close buttons for removable tags or labels."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

const removeTag = (tagToRemove: string) => {
  setTags(prev => prev.filter(tag => tag !== tagToRemove));
};

{tags.map(tag => (
  <Badge
    key={tag}
    label={tag}
    closable
    onClose={() => removeTag(tag)}
  />
))}`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <Badge
                  key={tag}
                  label={tag}
                  closable
                  variant="secondary"
                  onClose={() => removeTag(tag)}
                />
              ))}
              <Button size="sm" onClick={addTag}>
                Add Tag
              </Button>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Current tags: {tags.length}
            </div>
          </>
        </ExampleContainer>

        {/* Dynamic Count */}
        <ExampleContainer
          title="Dynamic Count"
          description="Interactive example showing dynamic count changes."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [count, setCount] = useState(5);

<Badge count={count} variant="primary">
  <Bell size={24} />
</Badge>`}
        >
          <>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Badge count={count}>
                <Bell size={24} />
              </Badge>
              <div>Current count: {count}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" onClick={incrementCount}>
                +1
              </Button>
              <Button size="sm" onClick={decrementCount}>
                -1
              </Button>
              <Button size="sm" onClick={resetCount}>
                Reset
              </Button>
            </div>
          </>
        </ExampleContainer>

        {/* Status Indicator */}
        <ExampleContainer
          title="Status Indicator"
          description="Using badges as status indicators with dot variant."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Badge dot variant={showNotifications ? 'success' : 'secondary'}>
  <Bell size={20} />
</Badge>`}
        >
          <>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Badge dot variant={showNotifications ? 'success' : 'secondary'}>
                <Bell size={20} />
              </Badge>
              <span>Notifications: {showNotifications ? 'On' : 'Off'}</span>
            </div>
            <Button size="sm" onClick={() => setShowNotifications(!showNotifications)}>
              Toggle Notifications
            </Button>
          </>
        </ExampleContainer>

        {/* Disabled */}
        <ExampleContainer
          title="Disabled"
          description="Disabled state for badges with close buttons."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Badge label="Disabled" closable disabled />
<Badge count={5} closable disabled variant="danger" />`}
        >
          <>
            <Badge label="Disabled" closable disabled />
            <Badge count={5} closable disabled variant="danger" />
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Badge</strong> component. 
          You can use these properties to control behavior, appearance, and interactivity.</p>
        <APITable props={badgeProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Badge</strong> component via ref. 
          They allow you to programmatically control the badge's behavior.</p>
        <APITable props={badgeMethods} />
      </div>
    </div>
  );
};
