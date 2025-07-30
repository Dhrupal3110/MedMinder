
import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Divider } from "./Divider";
import { Star, Heart, Settings, User, Mail, Calendar } from "lucide-react";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";

const dividerProps: APITableRow[] = [
  {
    property: "vertical",
    description: "Whether the divider is vertical (alternative to direction prop).",
    type: "boolean",
    default: "false",
  },
  {
    property: "direction",
    description: "Direction of the divider. Can be 'horizontal' or 'vertical'.",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    property: "variant",
    description: "Style variant of the divider line. Can be 'solid', 'dashed', or 'dotted'.",
    type: "'solid' | 'dashed' | 'dotted'",
    default: "'solid'",
  },
  {
    property: "textAlign",
    description: "Alignment of the text content within the divider.",
    type: "'left' | 'center' | 'right'",
    default: "'center'",
  },
  {
    property: "spacing",
    description: "Spacing around the divider. Can be 'none', 'xs', 'sm', 'md', 'lg', or 'xl'.",
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: "margin",
    description: "Alternative to spacing prop for outer margins.",
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "-",
  },
  {
    property: "thickness",
    description: "Thickness of the divider line. Can be 'thin', 'medium', or 'thick'.",
    type: "'thin' | 'medium' | 'thick'",
    default: "'thin'",
  },
  {
    property: "color",
    description: "Color variant of the divider. Can be 'default', 'primary', 'secondary', 'success', 'warning', 'danger', or 'info'.",
    type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'",
    default: "'default'",
  },
  {
    property: "plain",
    description: "Whether to use plain text styling (less prominent).",
    type: "boolean",
    default: "false",
  },
  {
    property: "dashed",
    description: "Whether to use dashed line style (alternative to variant prop).",
    type: "boolean",
    default: "false",
  },
  {
    property: "dotted",
    description: "Whether to use dotted line style (alternative to variant prop).",
    type: "boolean",
    default: "false",
  },
  {
    property: "className",
    description: "Additional class name for the divider.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the divider.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Content to display within the divider (text or elements).",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "label",
    description: "Alternative to children prop for text content.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the divider.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-orientation",
    description: "ARIA orientation attribute (automatically determined if not provided).",
    type: "'horizontal' | 'vertical'",
    default: "-",
  },
];

const dividerMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the divider element.",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the divider element.",
    type: "() => void",
    default: "-",
  },
];

export const DividerDocs: React.FC = () => {
  const [showContent, setShowContent] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<'solid' | 'dashed' | 'dotted'>('solid');
  const [selectedColor, setSelectedColor] = useState<'default' | 'primary' | 'success' | 'warning' | 'danger'>('default');
  const [selectedSpacing, setSelectedSpacing] = useState<'sm' | 'md' | 'lg'>('md');

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Divider</h1>
        <p>A divider line separates different content sections. Dividers can be horizontal or vertical, with optional text labels and various styling options.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Divide sections of lists or page layouts to create visual separation and improve readability.</li>
          <li>Use horizontal dividers to separate content vertically, such as between paragraphs, lists, or sections.</li>
          <li>Use vertical dividers in horizontal layouts like navigation menus, breadcrumbs, or inline elements.</li>
          <li>Add text labels to dividers to provide context or section headings.</li>
          <li>Choose appropriate styling (dashed, dotted, colored) to match your design hierarchy.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="The most basic usage of dividers."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<div>Content above</div>
<Divider />
<div>Content below</div>`}
        >
          <>
            <div>Content above the divider</div>
            <Divider />
            <div>Content below the divider</div>
          </>
        </ExampleContainer>

        {/* With Text */}
        <ExampleContainer
          title="With Text"
          description="Dividers with text content to label sections."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Divider>Center Text</Divider>
<Divider textAlign="left">Left Text</Divider>
<Divider textAlign="right">Right Text</Divider>`}
        >
          <>
            <div>Section 1 content</div>
            <Divider>Center Text</Divider>
            <div>Section 2 content</div>
            <Divider textAlign="left">Left Text</Divider>
            <div>Section 3 content</div>
            <Divider textAlign="right">Right Text</Divider>
            <div>Section 4 content</div>
          </>
        </ExampleContainer>

        {/* Vertical */}
        <ExampleContainer
          title="Vertical"
          description="Vertical dividers for horizontal content separation."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<div style={{ display: 'flex', alignItems: 'center' }}>
  <span>Item 1</span>
  <Divider vertical />
  <span>Item 2</span>
  <Divider vertical />
  <span>Item 3</span>
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <User size={16} />
  <Divider vertical>Profile</Divider>
  <Settings size={16} />
  <Divider vertical>Settings</Divider>
  <Mail size={16} />
</div>`}
        >
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Item 1</span>
              <Divider vertical />
              <span>Item 2</span>
              <Divider vertical />
              <span>Item 3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} />
              <Divider vertical>Profile</Divider>
              <Settings size={16} />
              <Divider vertical>Settings</Divider>
              <Mail size={16} />
            </div>
          </>
        </ExampleContainer>

        {/* Variants */}
        <ExampleContainer
          title="Line Variants"
          description="Different line styles: solid, dashed, and dotted."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Divider variant="solid">Solid Line</Divider>
<Divider variant="dashed">Dashed Line</Divider>
<Divider variant="dotted">Dotted Line</Divider>

<!-- Alternative boolean props -->
<Divider dashed>Dashed (Boolean)</Divider>
<Divider dotted>Dotted (Boolean)</Divider>`}
        >
          <>
            <Divider variant="solid">Solid Line</Divider>
            <Divider variant="dashed">Dashed Line</Divider>
            <Divider variant="dotted">Dotted Line</Divider>
            <Divider dashed>Dashed (Boolean)</Divider>
            <Divider dotted>Dotted (Boolean)</Divider>
          </>
        </ExampleContainer>

        {/* Colors */}
        <ExampleContainer
          title="Colors"
          description="Different color variants for various contexts."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Divider color="primary">Primary</Divider>
<Divider color="secondary">Secondary</Divider>
<Divider color="success">Success</Divider>
<Divider color="warning">Warning</Divider>
<Divider color="danger">Danger</Divider>
<Divider color="info">Info</Divider>`}
        >
          <>
            <Divider color="primary">Primary</Divider>
            <Divider color="secondary">Secondary</Divider>
            <Divider color="success">Success</Divider>
            <Divider color="warning">Warning</Divider>
            <Divider color="danger">Danger</Divider>
            <Divider color="info">Info</Divider>
          </>
        </ExampleContainer>

        {/* Thickness */}
        <ExampleContainer
          title="Thickness"
          description="Different line thickness options."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Divider thickness="thin">Thin Line</Divider>
<Divider thickness="medium">Medium Line</Divider>
<Divider thickness="thick">Thick Line</Divider>`}
        >
          <>
            <Divider thickness="thin">Thin Line</Divider>
            <Divider thickness="medium">Medium Line</Divider>
            <Divider thickness="thick">Thick Line</Divider>
          </>
        </ExampleContainer>

        {/* Spacing */}
        <ExampleContainer
          title="Spacing"
          description="Control spacing
