import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Grid } from "./Grid";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Switch } from "../Switch/Switch";
import { Typography } from "../Typography/Typography";
import { FormField } from "../FormField/FormField";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { APITable, type APITableRow } from "../Shared/APITable";
import { 
  Grid3X3, 
  Layout, 
  Users, 
  Star, 
  Heart, 
  MessageCircle,
  Share2,
  Bookmark,
  Calendar,
  MapPin,
  Clock,
  Phone,
  Mail
} from "lucide-react";

const gridProps: APITableRow[] = [
  {
    property: "cols",
    description: "Number of columns in the grid.",
    type: "number",
    default: "12",
  },
  {
    property: "gap",
    description: "Gap between grid items (applies to both row and column gaps).",
    type: "number | string",
    default: "-",
  },
  {
    property: "rowGap",
    description: "Gap between grid rows.",
    type: "number | string",
    default: "-",
  },
  {
    property: "columnGap",
    description: "Gap between grid columns.",
    type: "number | string",
    default: "-",
  },
  {
    property: "responsive",
    description: "Whether the grid should be responsive (adapts to screen size).",
    type: "boolean",
    default: "true",
  },
  {
    property: "as",
    description: "The HTML element to render as.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "className",
    description: "Additional class name for the grid.",
    type: "string",
    default: "-",
  },
  {
    property: "children",
    description: "Grid items to be displayed.",
    type: "React.ReactNode",
    default: "-",
  },
];

export const GridDocs: React.FC = () => {
  const [gridCols, setGridCols] = useState(3);
  const [isResponsive, setIsResponsive] = useState(true);
  const [gap, setGap] = useState(1);

  const teamMembers = [
    { name: "Alice Johnson", role: "Designer", avatar: "A" },
    { name: "Bob Smith", role: "Developer", avatar: "B" },
    { name: "Carol Davis", role: "Manager", avatar: "C" },
    { name: "David Wilson", role: "Developer", avatar: "D" },
    { name: "Eva Brown", role: "Designer", avatar: "E" },
    { name: "Frank Miller", role: "Developer", avatar: "F" },
  ];

  const features = [
    { title: "Fast Performance", icon: Star, description: "Optimized for speed" },
    { title: "Easy to Use", icon: Heart, description: "Simple and intuitive" },
    { title: "Community", icon: Users, description: "Active support" },
    { title: "Documentation", icon: MessageCircle, description: "Comprehensive guides" },
    { title: "Open Source", icon: Share2, description: "Free and open" },
    { title: "Reliable", icon: Bookmark, description: "Production ready" },
  ];

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Grid</h1>
        <p>A flexible grid layout component for creating responsive layouts. The Grid component provides a CSS Grid-based system that adapts to different screen sizes automatically.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Creating responsive layouts that adapt to different screen sizes.</li>
          <li>Building card layouts, galleries, or dashboards.</li>
          <li>Organizing form elements in structured layouts.</li>
          <li>When you need precise control over grid positioning and sizing.</li>
          <li>Creating complex layouts that require both horizontal and vertical alignment.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic 3-Column Grid */}
        <ExampleContainer
          title="Basic 3-Column Grid"
          description="A simple 3-column grid layout with badges."
          code={`<Grid cols={3} gap={1}>
  <Badge label="New" variant="success" />
  <Badge label="Popular" variant="warning" />
  <Badge label="Hot" variant="danger" />
  <Badge label="Featured" variant="info" />
  <Badge label="Limited" variant="secondary" />
  <Badge label="Sale" variant="primary" />
</Grid>`}
        >
          <Grid cols={3} gap={1}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge label="New" variant="success" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge label="Popular" variant="warning" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge label="Hot" variant="danger" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge label="Featured" variant="info" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge label="Limited" variant="secondary" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge label="Sale" variant="primary" />
            </div>
          </Grid>
        </ExampleContainer>

        {/* Responsive Team Grid */}
        <ExampleContainer
          title="Responsive Team Grid"
          description="A responsive grid showcasing team members with avatars and controls."
          code={`<Grid cols={3} responsive={true} gap={1.5}>
  {teamMembers.map(member => (
    <div key={member.name} style={{ 
      padding: '16px', 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <Avatar size="lg">{member.avatar}</Avatar>
      <Typography variant="h6" style={{ marginTop: '8px' }}>
        {member.name}
      </Typography>
      <Typography variant="body2" color="secondary">
        {member.role}
      </Typography>
      <div style={{ marginTop: '12px' }}>
        <Button size="sm" variant="outline">
          View Profile
        </Button>
      </div>
    </div>
  ))}
</Grid>`}
        >
          <>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Switch 
                checked={isResponsive}
                onChange={setIsResponsive}
                label="Responsive"
              />
            </div>
            <Grid cols={3} responsive={isResponsive} gap={1.5}>
              {teamMembers.map(member => (
                <div key={member.name} style={{ 
                  padding: '16px', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <Avatar size="lg">{member.avatar}</Avatar>
                  <Typography variant="h6" style={{ marginTop: '8px' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    {member.role}
                  </Typography>
                  <div style={{ marginTop: '12px' }}>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </Grid>
          </>
        </ExampleContainer>

        {/* 2-Column Form Layout */}
        <ExampleContainer
          title="2-Column Form Layout"
          description="A form layout using Grid with FormField, Label, and Input components."
          code={`<Grid cols={2} gap={1.5}>
  <FormField>
    <Label htmlFor="firstName">First Name</Label>
    <Input id="firstName" placeholder="Enter first name" />
  </FormField>

  <FormField>
    <Label htmlFor="lastName">Last Name</Label>
    <Input id="lastName" placeholder="Enter last name" />
  </FormField>

  <FormField>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter email" />
  </FormField>

  <FormField>
    <Label htmlFor="phone">Phone</Label>
    <Input id="phone" type="tel" placeholder="Enter phone" />
  </FormField>

  <div style={{ gridColumn: '1 / -1' }}>
    <FormField>
      <Label htmlFor="address">Address</Label>
      <Input id="address" placeholder="Enter full address" />
    </FormField>
  </div>

  <FormField>
    <Label htmlFor="city">City</Label>
    <Input id="city" placeholder="Enter city" />
  </FormField>

  <FormField>
    <Label htmlFor="zip">ZIP Code</Label>
    <Input id="zip" placeholder="Enter ZIP" />
  </FormField>
</Grid>`}
        >
          <Grid cols={2} gap={1.5}>
            <FormField>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter first name" />
            </FormField>

            <FormField>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter last name" />
            </FormField>

            <FormField>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </FormField>

            <FormField>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter phone" />
            </FormField>

            <div style={{ gridColumn: '1 / -1' }}>
              <FormField>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter full address" />
              </FormField>
            </div>

            <FormField>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter city" />
            </FormField>

            <FormField>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" placeholder="Enter ZIP" />
            </FormField>
          </Grid>
        </ExampleContainer>

        {/* Different Column Counts */}
        <ExampleContainer
          title="Different Column Counts"
          description="Grid with different column counts to show flexibility."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`<Grid cols={2} gap={1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>

<Grid cols={4} gap={1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>

<Grid cols={6} gap={0.5}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Grid>`}
        >
          <>
            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>2 Columns</Typography>
              <Grid cols={2} gap={1}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ 
                    padding: '12px', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    Item {i}
                  </div>
                ))}
              </Grid>
            </div>

            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>4 Columns</Typography>
              <Grid cols={4} gap={1}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ 
                    padding: '12px', 
                    backgroundColor: '#f0f8ff', 
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    Item {i}
                  </div>
                ))}
              </Grid>
            </div>

            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>6 Columns</Typography>
              <Grid cols={6} gap={0.5}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} style={{ 
                    padding: '8px', 
                    backgroundColor: '#fff0f5', 
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '14px'
                  }}>
                    {i}
                  </div>
                ))}
              </Grid>
            </div>
          </>
        </ExampleContainer>

        {/* Features Grid */}
        <ExampleContainer
          title="Features Grid"
          description="A features showcase using icons and descriptions in a responsive grid."
          code={`<Grid cols={3} gap={2}>
  {features.map(feature => (
    <div key={feature.title} style={{
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <feature.icon size={32} style={{ marginBottom: '12px', color: '#0066cc' }} />
      <Typography variant="h6">{feature.title}</Typography>
      <Typography variant="body2" color="secondary">
        {feature.description}
      </Typography>
    </div>
  ))}
</Grid>`}
        >
          <Grid cols={3} gap={2}>
            {features.map(feature => (
              <div key={feature.title} style={{
                padding: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <feature.icon size={32} style={{ marginBottom: '12px', color: '#0066cc' }} />
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body2" color="secondary">
                  {feature.description}
                </Typography>
              </div>
            ))}
          </Grid>
        </ExampleContainer>

        {/* Custom Gap Spacing */}
        <ExampleContainer
          title="Custom Gap Spacing"
          description="Grid with different gap configurations."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`// Uniform gap
<Grid cols={3} gap={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Different row and column gaps
<Grid cols={3} rowGap={1} columnGap={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// No gap
<Grid cols={4} gap={0}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>`}
        >
          <>
            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>Uniform Gap (2rem)</Typography>
              <Grid cols={3} gap={2}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ 
                    padding: '16px', 
                    backgroundColor: '#e8f5e8', 
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    Item {i}
                  </div>
                ))}
              </Grid>
            </div>

            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>Row Gap: 1rem, Column Gap: 3rem</Typography>
              <Grid cols={3} rowGap={1} columnGap={3}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} style={{ 
                    padding: '16px', 
                    backgroundColor: '#fff3cd', 
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    Item {i}
                  </div>
                ))}
              </Grid>
            </div>

            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>No Gap</Typography>
              <Grid cols={4} gap={0}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ 
                    padding: '16px', 
                    backgroundColor: '#f8d7da', 
                    border: '1px solid #f5c6cb',
                    textAlign: 'center'
                  }}>
                    Item {i}
                  </div>
                ))}
              </Grid>
            </div>
          </>
        </ExampleContainer>

        {/* Interactive Controls */}
        <ExampleContainer
          title="Interactive Controls"
          description="Grid with interactive controls to adjust columns and gap."
          code={`const [gridCols, setGridCols] = useState(3);
const [gap, setGap] = useState(1);

<Grid cols={gridCols} gap={gap}>
  {Array.from({ length: 12 }, (_, i) => (
    <div key={i} style={{
      padding: '12px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      textAlign: 'center'
    }}>
      {i + 1}
    </div>
  ))}
</Grid>`}
        >
          <>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <FormField>
                <Label>Columns: {gridCols}</Label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={gridCols}
                  onChange={(e) => setGridCols(Number(e.target.value))}
                  style={{ width: '120px' }}
                />
              </FormField>
              <FormField>
                <Label>Gap: {gap}rem</Label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.5"
                  value={gap}
