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
                  onChange={(e) => setGap(Number(e.target.value))}
                  style={{ width: '120px' }}
                />
              </FormField>
            </div>
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
            </Grid>
          </>
        </ExampleContainer>

        {/* Semantic HTML */}
        <ExampleContainer
          title="Semantic HTML"
          description="Grid rendered as different semantic HTML elements."
          code={`<Grid as="section" cols={2} gap={1.5}>
  <article style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <Typography variant="h6">Article 1</Typography>
    <Typography variant="body2">Content for article 1</Typography>
  </article>
  <article style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <Typography variant="h6">Article 2</Typography>
    <Typography variant="body2">Content for article 2</Typography>
  </article>
</Grid>

<Grid as="nav" cols={4} gap={1}>
  <Button variant="ghost">Home</Button>
  <Button variant="ghost">About</Button>
  <Button variant="ghost">Services</Button>
  <Button variant="ghost">Contact</Button>
</Grid>`}
        >
          <>
            <div style={{ marginBottom: '20px' }}>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>Grid as Section</Typography>
              <Grid as="section" cols={2} gap={1.5}>
                <article style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <Typography variant="h6">Article 1</Typography>
                  <Typography variant="body2">Content for the first article with some descriptive text.</Typography>
                </article>
                <article style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <Typography variant="h6">Article 2</Typography>
                  <Typography variant="body2">Content for the second article with different information.</Typography>
                </article>
              </Grid>
            </div>

            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>Grid as Navigation</Typography>
              <Grid as="nav" cols={4} gap={1}>
                <Button variant="ghost" size="sm">Home</Button>
                <Button variant="ghost" size="sm">About</Button>
                <Button variant="ghost" size="sm">Services</Button>
                <Button variant="ghost" size="sm">Contact</Button>
              </Grid>
            </div>
          </>
        </ExampleContainer>

        {/* Dashboard Layout */}
        <ExampleContainer
          title="Dashboard Layout"
          description="Complex dashboard layout using nested grids."
          code={`<Grid cols={4} gap={1.5}>
  {/* Header spans full width */}
  <div style={{ gridColumn: '1 / -1', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
    <Typography variant="h5">Dashboard Header</Typography>
  </div>

  {/* Sidebar */}
  <div style={{ gridColumn: '1', gridRow: 'span 3', padding: '16px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
    <Typography variant="h6">Sidebar</Typography>
    <Button variant="ghost" size="sm" style={{ marginTop: '8px', width: '100%' }}>
      <Users size={16} style={{ marginRight: '8px' }} />
      Users
    </Button>
    <Button variant="ghost" size="sm" style={{ marginTop: '4px', width: '100%' }}>
      <Calendar size={16} style={{ marginRight: '8px' }} />
      Calendar
    </Button>
  </div>

  {/* Main content area */}
  <div style={{ gridColumn: '2 / -1', padding: '16px', backgroundColor: '#fff', border: '1px solid #dee2e6', borderRadius: '8px' }}>
    <Typography variant="h6">Main Content</Typography>
    <Grid cols={3} gap={1} style={{ marginTop: '16px' }}>
      <div style={{ padding: '12px', backgroundColor: '#d4edda', borderRadius: '4px', textAlign: 'center' }}>
        <Typography variant="h4">125</Typography>
        <Typography variant="body2">Users</Typography>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#cce5ff', borderRadius: '4px', textAlign: 'center' }}>
        <Typography variant="h4">89</Typography>
        <Typography variant="body2">Orders</Typography>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#ffe6cc', borderRadius: '4px', textAlign: 'center' }}>
        <Typography variant="h4">42</Typography>
        <Typography variant="body2">Products</Typography>
      </div>
    </Grid>
  </div>

  {/* Footer spans remaining columns */}
  <div style={{ gridColumn: '2 / -1', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
    <Typography variant="body2" color="secondary">
      Dashboard footer content
    </Typography>
  </div>
</Grid>`}
        >
          <Grid cols={4} gap={1.5}>
            {/* Header spans full width */}
            <div style={{ gridColumn: '1 / -1', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <Typography variant="h5">Dashboard Header</Typography>
            </div>

            {/* Sidebar */}
            <div style={{ gridColumn: '1', gridRow: 'span 3', padding: '16px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
              <Typography variant="h6">Sidebar</Typography>
              <Button variant="ghost" size="sm" style={{ marginTop: '8px', width: '100%', justifyContent: 'flex-start' }}>
                <Users size={16} style={{ marginRight: '8px' }} />
                Users
              </Button>
              <Button variant="ghost" size="sm" style={{ marginTop: '4px', width: '100%', justifyContent: 'flex-start' }}>
                <Calendar size={16} style={{ marginRight: '8px' }} />
                Calendar
              </Button>
              <Button variant="ghost" size="sm" style={{ marginTop: '4px', width: '100%', justifyContent: 'flex-start' }}>
                <MapPin size={16} style={{ marginRight: '8px' }} />
                Locations
              </Button>
            </div>

            {/* Main content area */}
            <div style={{ gridColumn: '2 / -1', padding: '16px', backgroundColor: '#fff', border: '1px solid #dee2e6', borderRadius: '8px' }}>
              <Typography variant="h6">Main Content</Typography>
              <Grid cols={3} gap={1} style={{ marginTop: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: '#d4edda', borderRadius: '4px', textAlign: 'center' }}>
                  <Typography variant="h4">125</Typography>
                  <Typography variant="body2">Users</Typography>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#cce5ff', borderRadius: '4px', textAlign: 'center' }}>
                  <Typography variant="h4">89</Typography>
                  <Typography variant="body2">Orders</Typography>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#ffe6cc', borderRadius: '4px', textAlign: 'center' }}>
                  <Typography variant="h4">42</Typography>
                  <Typography variant="body2">Products</Typography>
                </div>
              </Grid>
            </div>

            {/* Footer spans remaining columns */}
            <div style={{ gridColumn: '2 / -1', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <Typography variant="body2" color="secondary">
                Dashboard footer content with additional information
              </Typography>
            </div>
          </Grid>
        </ExampleContainer>

        {/* Card Gallery */}
        <ExampleContainer
          title="Card Gallery"
          description="A responsive card gallery layout perfect for portfolios or product showcases."
          code={`<Grid cols={4} gap={1.5}>
  {Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{
      aspectRatio: '1',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#0066cc',
        borderRadius: '8px',
        marginBottom: '8px'
      }} />
      <Typography variant="body2" style={{ textAlign: 'center' }}>
        Card {i + 1}
      </Typography>
    </div>
  ))}
</Grid>`}
        >
          <Grid cols={4} gap={1.5}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{
                aspectRatio: '1',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: i % 2 === 0 ? '#0066cc' : '#28a745',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {i + 1}
                </div>
                <Typography variant="body2" style={{ textAlign: 'center', fontWeight: '500' }}>
                  Card {i + 1}
                </Typography>
              </div>
            ))}
          </Grid>
        </ExampleContainer>

        {/* Contact Cards Grid */}
        <ExampleContainer
          title="Contact Cards Grid"
          description="A contact directory layout using icons and contact information."
          code={`<Grid cols={3} gap={2}>
  {contacts.map((contact, i) => (
    <div key={i} style={{
      padding: '20px',
      backgroundColor: '#fff',
      border: '1px solid #e9ecef',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      <Avatar size="lg">{contact.initials}</Avatar>
      <Typography variant="h6" style={{ margin: '12px 0 4px' }}>
        {contact.name}
      </Typography>
      <Typography variant="body2" color="secondary" style={{ marginBottom: '16px' }}>
        {contact.role}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <Button size="sm" variant="ghost">
          <Phone size={16} />
        </Button>
        <Button size="sm" variant="ghost">
          <Mail size={16} />
        </Button>
        <Button size="sm" variant="ghost">
          <MessageCircle size={16} />
        </Button>
      </div>
    </div>
  ))}
</Grid>`}
        >
          <Grid cols={3} gap={2}>
            {[
              { name: "Sarah Wilson", role: "Product Manager", initials: "SW" },
              { name: "Mike Chen", role: "Lead Developer", initials: "MC" },
              { name: "Elena Rodriguez", role: "UX Designer", initials: "ER" },
              { name: "James Park", role: "Data Analyst", initials: "JP" },
              { name: "Lisa Thompson", role: "Marketing Lead", initials: "LT" },
              { name: "Alex Kumar", role: "DevOps Engineer", initials: "AK" }
            ].map((contact, i) => (
              <div key={i} style={{
                padding: '20px',
                backgroundColor: '#fff',
                border: '1px solid #e9ecef',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <Avatar size="lg">{contact.initials}</Avatar>
                <Typography variant="h6" style={{ margin: '12px 0 4px' }}>
                  {contact.name}
                </Typography>
                <Typography variant="body2" color="secondary" style={{ marginBottom: '16px' }}>
                  {contact.role}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <Button size="sm" variant="ghost">
                    <Phone size={16} />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Mail size={16} />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MessageCircle size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </Grid>
        </ExampleContainer>

        {/* Stats Dashboard */}
        <ExampleContainer
          title="Stats Dashboard"
          description="A statistics dashboard showing key metrics in a grid layout."
          code={`<Grid cols={2} gap={1.5}>
  <div style={{ gridColumn: '1 / -1' }}>
    <Typography variant="h5" style={{ marginBottom: '16px' }}>
      Performance Overview
    </Typography>
  </div>
  
  <div style={{
    padding: '24px',
    backgroundColor: '#f8f9ff',
    borderRadius: '12px',
    border: '1px solid #e0e7ff'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <Users size={24} style={{ color: '#4f46e5', marginRight: '12px' }} />
      <Typography variant="h6">Total Users</Typography>
    </div>
    <Typography variant="h3" style={{ color: '#4f46e5', marginBottom: '4px' }}>
      12,459
    </Typography>
    <Typography variant="body2" color="secondary">
      +12% from last month
    </Typography>
  </div>

  <div style={{
    padding: '24px',
    backgroundColor: '#f0fdf4',
    borderRadius: '12px',
    border: '1px solid '#dcfce7'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <Star size={24} style={{ color: '#16a34a', marginRight: '12px' }} />
      <Typography variant="h6">Revenue</Typography>
    </div>
    <Typography variant="h3" style={{ color: '#16a34a', marginBottom: '4px' }}>
      $89,240
    </Typography>
    <Typography variant="body2" color="secondary">
      +8% from last month
    </Typography>
  </div>

  <div style={{
    padding: '24px',
    backgroundColor: '#fffbeb',
    borderRadius: '12px',
    border: '1px solid #fed7aa'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <Clock size={24} style={{ color: '#d97706', marginRight: '12px' }} />
      <Typography variant="h6">Avg. Session</Typography>
    </div>
    <Typography variant="h3" style={{ color: '#d97706', marginBottom: '4px' }}>
      4m 32s
    </Typography>
    <Typography variant="body2" color="secondary">
      -2% from last month
    </Typography>
  </div>

  <div style={{
    padding: '24px',
    backgroundColor: '#fef2f2',
    borderRadius: '12px',
    border: '1px solid #fecaca'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <Heart size={24} style={{ color: '#dc2626', marginRight: '12px' }} />
      <Typography variant="h6">Satisfaction</Typography>
    </div>
    <Typography variant="h3" style={{ color: '#dc2626', marginBottom: '4px' }}>
      94%
    </Typography>
    <Typography variant="body2" color="secondary">
      +3% from last month
    </Typography>
  </div>
</Grid>`}
        >
          <Grid cols={2} gap={1.5}>
            <div style={{ gridColumn: '1 / -1' }}>
              <Typography variant="h5" style={{ marginBottom: '16px' }}>
                Performance Overview
              </Typography>
            </div>
            
            <div style={{
              padding: '24px',
              backgroundColor: '#f8f9ff',
              borderRadius: '12px',
              border: '1px solid #e0e7ff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Users size={24} style={{ color: '#4f46e5', marginRight: '12px' }} />
                <Typography variant="h6">Total Users</Typography>
              </div>
              <Typography variant="h3" style={{ color: '#4f46e5', marginBottom: '4px' }}>
                12,459
              </Typography>
              <Typography variant="body2" color="secondary">
                +12% from last month
              </Typography>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '1px solid #dcfce7'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Star size={24} style={{ color: '#16a34a', marginRight: '12px' }} />
                <Typography variant="h6">Revenue</Typography>
              </div>
              <Typography variant="h3" style={{ color: '#16a34a', marginBottom: '4px' }}>
                $89,240
              </Typography>
              <Typography variant="body2" color="secondary">
                +8% from last month
              </Typography>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: '#fffbeb',
              borderRadius: '12px',
              border: '1px solid #fed7aa'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Clock size={24} style={{ color: '#d97706', marginRight: '12px' }} />
                <Typography variant="h6">Avg. Session</Typography>
              </div>
              <Typography variant="h3" style={{ color: '#d97706', marginBottom: '4px' }}>
                4m 32s
              </Typography>
              <Typography variant="body2" color="secondary">
                -2% from last month
              </Typography>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: '#fef2f2',
              borderRadius: '12px',
              border: '1px solid #fecaca'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Heart size={24} style={{ color: '#dc2626', marginRight: '12px' }} />
                <Typography variant="h6">Satisfaction</Typography>
              </div>
              <Typography variant="h3" style={{ color: '#dc2626', marginBottom: '4px' }}>
                94%
              </Typography>
              <Typography variant="body2" color="secondary">
                +3% from last month
              </Typography>
            </div>
          </Grid>
        </ExampleContainer>
      </div>

      {/* API Documentation */}
      <div className="docs-section">
        <h2>API</h2>
        <APITable data={gridProps} />
      </div>

      {/* Best Practices */}
      <div className="docs-section">
        <h2>Best Practices</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #28a745' }}>
            <Typography variant="h6" style={{ color: '#28a745', marginBottom: '8px' }}>
              ✓ Do
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Use responsive grids for layouts that need to adapt to different screen sizes</li>
              <li>Choose appropriate column counts based on content - fewer columns for complex content</li>
              <li>Use consistent gap spacing throughout your application</li>
              <li>Leverage CSS Grid properties like gridColumn and gridRow for advanced positioning</li>
              <li>Test your grid layouts across different screen sizes</li>
            </ul>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#fff3cd', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
            <Typography variant="h6" style={{ color: '#b45309', marginBottom: '8px' }}>
              ⚠ Caution
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Avoid using too many columns on mobile devices - consider responsive behavior</li>
              <li>Be mindful of content overflow when using fixed grid positioning</li>
              <li>Don't rely solely on grid positioning for semantic structure - use proper HTML elements</li>
              <li>Consider accessibility when using complex grid layouts</li>
            </ul>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#f8d7da', borderRadius: '8px', borderLeft: '4px solid #dc3545' }}>
            <Typography variant="h6" style={{ color: '#dc3545', marginBottom: '8px' }}>
              ✗ Avoid
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Don't create grids with too many columns that make content hard to read</li>
              <li>Avoid inconsistent gap spacing within the same interface</li>
              <li>Don't use grid for simple single-column layouts - flexbox might be more appropriate</li>
              <li>Avoid hard-coded positioning that breaks responsive behavior</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Components */}
      <div className="docs-section">
        <h2>Related Components</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="outline" size="sm">
            <Layout size={16} style={{ marginRight: '8px' }} />
            Flexbox
          </Button>
          <Button variant="outline" size="sm">
            <Grid3X3 size={16} style={{ marginRight: '8px' }} />
            Container
          </Button>
          <Button variant="outline" size="sm">
            <Users size={16} style={{ marginRight: '8px' }} />
            Card
          </Button>
        </div>
      </div>

      {/* Usage Notes */}
      <div className="docs-section">
        <h2>Usage Notes</h2>
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <Typography variant="body1" style={{ marginBottom: '12px' }}>
            The Grid component is built on CSS Grid and provides a flexible foundation for creating responsive layouts. Here are some key points to remember:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Responsive by default:</strong> The grid automatically adjusts column counts on smaller screens when responsive is enabled</li>
            <li><strong>Gap units:</strong> Gap values are in rem units by default, but you can pass string values like "20px" for pixel-based spacing</li>
            <li><strong>Grid positioning:</strong> Use CSS grid properties like gridColumn: "1 / -1" to span items across multiple columns</li>
            <li><strong>Semantic HTML:</strong> Use the 'as' prop to render the grid as appropriate semantic elements (section, nav, main, etc.)</li>
            <li><strong>Nested grids:</strong> Grids can be nested within grid items for more complex layouts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
