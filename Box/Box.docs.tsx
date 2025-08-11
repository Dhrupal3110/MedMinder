import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Box } from "./Box";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { Badge } from "../Badge/Badge";
import { Avatar } from "../Avatar/Avatar";
import { Input } from "../Input/Input";
import { APITable, type APITableRow } from "../Shared/APITable";
import { Heart, Star, Users, Mail, Settings, ChevronRight } from "lucide-react";

const boxProps: APITableRow[] = [
  {
    property: "as",
    description: "The HTML element to render as.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "p",
    description: "Padding on all sides.",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "px",
    description: "Horizontal padding (left and right).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "py",
    description: "Vertical padding (top and bottom).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "pt | pr | pb | pl",
    description: "Individual padding sides (top, right, bottom, left).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "m",
    description: "Margin on all sides.",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "mx",
    description: "Horizontal margin (left and right).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "my",
    description: "Vertical margin (top and bottom).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "mt | mr | mb | ml",
    description: "Individual margin sides (top, right, bottom, left).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "bg",
    description: "Background color variant.",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'surface' | 'muted' | 'transparent'",
    default: "-",
  },
  {
    property: "border",
    description: "Border style.",
    type: "'none' | 'solid' | 'dashed' | 'dotted'",
    default: "-",
  },
  {
    property: "borderColor",
    description: "Border color variant.",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'border' | 'muted'",
    default: "-",
  },
  {
    property: "borderWidth",
    description: "Border width.",
    type: "'thin' | 'medium' | 'thick'",
    default: "'thin'",
  },
  {
    property: "borderRadius",
    description: "Border radius size.",
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "-",
  },
  {
    property: "shadow",
    description: "Box shadow size.",
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "-",
  },
  {
    property: "overflow",
    description: "Overflow behavior.",
    type: "'visible' | 'hidden' | 'scroll' | 'auto'",
    default: "-",
  },
  {
    property: "position",
    description: "CSS position property.",
    type: "'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'",
    default: "-",
  },
  {
    property: "display",
    description: "CSS display property.",
    type: "'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none'",
    default: "-",
  },
  {
    property: "width",
    description: "Box width.",
    type: "string | number",
    default: "-",
  },
  {
    property: "height",
    description: "Box height.",
    type: "string | number",
    default: "-",
  },
  {
    property: "minWidth",
    description: "Minimum width constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "minHeight",
    description: "Minimum height constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "maxWidth",
    description: "Maximum width constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "maxHeight",
    description: "Maximum height constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name for the box.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the box.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Content to render inside the box.",
    type: "ReactNode",
    default: "-",
  },
];

export const BoxDocs: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardVariant, setCardVariant] = useState<'surface' | 'primary' | 'success'>('surface');

  const nextVariant = () => {
    const variants: Array<'surface' | 'primary' | 'success'> = ['surface', 'primary', 'success'];
    const currentIndex = variants.indexOf(cardVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setCardVariant(variants[nextIndex]);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Box</h1>
        <p>A flexible container component for layout and styling. Box provides a simple way to apply consistent spacing, colors, borders, and other styling properties without writing custom CSS.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>As a generic container for creating layouts and applying consistent spacing.</li>
          <li>When you need to quickly apply padding, margin, background colors, or borders without custom CSS.</li>
          <li>For creating card-like components, sections, or any styled container.</li>
          <li>As a building block for more complex layout components.</li>
          <li>When you need responsive spacing or styling that adapts to different screen sizes.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="Simple box container with basic styling."
          style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
          code={`<Box p="md" border="solid" borderColor="border" borderRadius="md">
  <Typography>Basic box with padding and border</Typography>
</Box>

<Box bg="surface" p="lg" borderRadius="lg" shadow="sm">
  <Typography>Box with background and shadow</Typography>
</Box>`}
        >
          <>
            <Box p="md" border="solid" borderColor="border" borderRadius="md">
              <Typography>Basic box with padding and border</Typography>
            </Box>
            <Box bg="surface" p="lg" borderRadius="lg" shadow="sm">
              <Typography>Box with background and shadow</Typography>
            </Box>
          </>
        </ExampleContainer>

        {/* Background Colors and Padding */}
        <ExampleContainer
          title="Background Colors and Padding"
          description="Different background colors with various padding sizes."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Box bg="primary" p="md" borderRadius="md">
  <Typography style={{ color: 'white' }}>Primary background</Typography>
</Box>

<Box bg="success" p="lg" borderRadius="md">
  <Typography style={{ color: 'white' }}>Success background</Typography>
</Box>

<Box bg="surface" p="xl" borderRadius="md" shadow="md">
  <Typography>Surface background with large padding</Typography>
</Box>`}
        >
          <>
            <Box bg="primary" p="md" borderRadius="md">
              <Typography style={{ color: 'white' }}>Primary background</Typography>
            </Box>
            <Box bg="success" p="lg" borderRadius="md">
              <Typography style={{ color: 'white' }}>Success background</Typography>
            </Box>
            <Box bg="surface" p="xl" borderRadius="md" shadow="md">
              <Typography>Surface background with large padding</Typography>
            </Box>
          </>
        </ExampleContainer>

        {/* Wrapping Components */}
        <ExampleContainer
          title="Wrapping Other Components"
          description="Using Box to create layouts with other components."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Box 
  bg="surface" 
  p="lg" 
  borderRadius="lg" 
  shadow="md" 
  display="flex" 
  style={{ gap: '16px', alignItems: 'center' }}
>
  <Avatar src="https://via.placeholder.com/40" alt="User" />
  <div style={{ flex: 1 }}>
    <Typography variant="h6">John Doe</Typography>
    <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
      Software Engineer
    </Typography>
  </div>
  <Badge count={5} variant="primary" />
</Box>`}
        >
          <>
            <Box 
              bg="surface" 
              p="lg" 
              borderRadius="lg" 
              shadow="md" 
              display="flex" 
              style={{ gap: '16px', alignItems: 'center' }}
            >
              <Avatar src="https://via.placeholder.com/40" alt="User" />
              <div style={{ flex: 1 }}>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                  Software Engineer
                </Typography>
              </div>
              <Badge count={5} variant="primary" />
            </Box>

            <Box 
              border="solid" 
              borderColor="border" 
              borderRadius="md" 
              p="md"
              display="flex"
              style={{ gap: '12px', flexDirection: 'column' }}
            >
              <Box display="flex" style={{ gap: '8px', alignItems: 'center' }}>
                <Settings size={16} />
                <Typography variant="h6">Settings</Typography>
              </Box>
              <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                Configure your application preferences
              </Typography>
              <Box mt="sm" display="flex" style={{ gap: '8px' }}>
                <Button size="sm" variant="primary">Save</Button>
                <Button size="sm" variant="secondary">Cancel</Button>
              </Box>
            </Box>
          </>
        </ExampleContainer>

        {/* Hover Effects */}
        <ExampleContainer
          title="Interactive Box with Hover Effects"
          description="Box with hover states and interactive behavior."
          style={{ display: 'flex', gap: '16px' }}
          code={`const [isHovered, setIsHovered] = useState(false);

<Box
  bg="surface"
  p="lg"
  borderRadius="lg"
  shadow={isHovered ? "lg" : "sm"}
  style={{
    cursor: 'pointer',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all 0.2s ease'
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <Box display="flex" style={{ gap: '12px', alignItems: 'center' }}>
    <Heart size={20} color={isHovered ? 'var(--danger-color)' : 'var(--text-secondary)'} />
    <Typography>Hover me!</Typography>
  </Box>
</Box>`}
        >
          <>
            <Box
              bg="surface"
              p="lg"
              borderRadius="lg"
              shadow={isHovered ? "lg" : "sm"}
              style={{
                cursor: 'pointer',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Box display="flex" style={{ gap: '12px', alignItems: 'center' }}>
                <Heart size={20} color={isHovered ? 'var(--danger-color)' : 'var(--text-secondary)'} />
                <Typography>Hover me!</Typography>
              </Box>
            </Box>

            <Box
              bg={cardVariant}
              p="lg"
              borderRadius="lg"
              shadow="md"
              style={{ cursor: 'pointer', minWidth: '200px' }}
              onClick={nextVariant}
            >
              <Box display="flex" style={{ gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography style={{ color: cardVariant === 'surface' ? 'inherit' : 'white' }}>
                  Click to change
                </Typography>
                <ChevronRight size={16} color={cardVariant === 'surface' ? 'var(--text-secondary)' : 'white'} />
              </Box>
            </Box>
          </>
        </ExampleContainer>

        {/* Responsive Layout */}
        <ExampleContainer
          title="Responsive Layout"
          description="Box with responsive behavior using different screen sizes."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Box
  bg="surface"
  p="md"
  borderRadius="md"
  shadow="sm"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  }}
>
  <Box border="solid" borderColor="border" p="md" borderRadius="sm">
    <Typography variant="h6">Card 1</Typography>
    <Typography variant="body2">Responsive grid item</Typography>
  </Box>
  <Box border="solid" borderColor="border" p="md" borderRadius="sm">
    <Typography variant="h6">Card 2</Typography>
    <Typography variant="body2">Adapts to screen size</Typography>
  </Box>
  <Box border="solid" borderColor="border" p="md" borderRadius="sm">
    <Typography variant="h6">Card 3</Typography>
    <Typography variant="body2">Minimum 200px width</Typography>
  </Box>
</Box>`}
        >
          <>
            <Box
              bg="surface"
              p="md"
              borderRadius="md"
              shadow="sm"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}
            >
              <Box border="solid" borderColor="border" p="md" borderRadius="sm">
                <Typography variant="h6">Card 1</Typography>
                <Typography variant="body2">Responsive grid item</Typography>
              </Box>
              <Box border="solid" borderColor="border" p="md" borderRadius="sm">
                <Typography variant="h6">Card 2</Typography>
                <Typography variant="body2">Adapts to screen size</Typography>
              </Box>
              <Box border="solid" borderColor="border" p="md" borderRadius="sm">
                <Typography variant="h6">Card 3</Typography>
                <Typography variant="body2">Minimum 200px width</Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              style={{
                gap: '8px',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              <Box bg="primary" p="sm" borderRadius="md" style={{ flex: '1 1 150px' }}>
                <Typography style={{ color: 'white', fontSize: '14px' }}>Flex item 1</Typography>
              </Box>
              <Box bg="success" p="sm" borderRadius="md" style={{ flex: '1 1 150px' }}>
                <Typography style={{ color: 'white', fontSize: '14px' }}>Flex item 2</Typography>
              </Box>
              <Box bg="warning" p="sm" borderRadius="md" style={{ flex: '1 1 150px' }}>
                <Typography style={{ color: 'white', fontSize: '14px' }}>Flex item 3</Typography>
              </Box>
            </Box>
          </>
        </ExampleContainer>

        {/* Advanced Layout */}
        <ExampleContainer
          title="Advanced Layout Example"
          description="Complex layout combining multiple Box components with different styling."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Box bg="surface" borderRadius="lg" shadow="lg" overflow="hidden">
  {/* Header */}
  <Box bg="primary" px="lg" py="md">
    <Typography variant="h5" style={{ color: 'white' }}>
      Dashboard
    </Typography>
  </Box>
  
  {/* Content */}
  <Box p="lg">
    <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }} mb="lg">
      <Box border="solid" borderColor="border" p="md" borderRadius="md">
        <Box display="flex" style={{ gap: '8px', alignItems: 'center' }} mb="sm">
          <Users size={16} />
          <Typography variant="h6">Users</Typography>
        </Box>
        <Typography variant="h4">1,234</Typography>
        <Typography variant="body2" style={{ color: 'var(--success-color)' }}>
          +12% from last month
        </Typography>
      </Box>
      
      <Box border="solid" borderColor="border" p="md" borderRadius="md">
        <Box display="flex" style={{ gap: '8px', alignItems: 'center' }} mb="sm">
          <Star size={16} />
          <Typography variant="h6">Reviews</Typography>
        </Box>
        <Typography variant="h4">4.8</Typography>
        <Typography variant="body2" style={{ color: 'var(--warning-color)' }}>
          Average rating
        </Typography>
      </Box>
    </Box>
    
    <Box border="solid" borderColor="border" borderRadius="md" p="md">
      <Typography variant="h6" mb="sm">Quick Actions</Typography>
      <Box display="flex" style={{ gap: '8px' }}>
        <Button size="sm">Add User</Button>
        <Button size="sm" variant="secondary">Export Data</Button>
        <Button size="sm" variant="secondary">Settings</Button>
      </Box>
    </Box>
  </Box>
</Box>`}
        >
          <>
            <Box bg="surface" borderRadius="lg" shadow="lg" overflow="hidden">
              {/* Header */}
              <Box bg="primary" px="lg" py="md">
                <Typography variant="h5" style={{ color: 'white' }}>
                  Dashboard
                </Typography>
              </Box>
              
              {/* Content */}
              <Box p="lg">
                <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }} mb="lg">
                  <Box border="solid" borderColor="border" p="md" borderRadius="md">
                    <Box display="flex" style={{ gap: '8px', alignItems: 'center' }} mb="sm">
                      <Users size={16} />
                      <Typography variant="h6">Users</Typography>
                    </Box>
                    <Typography variant="h4">1,234</Typography>
                    <Typography variant="body2" style={{ color: 'var(--success-color)' }}>
                      +12% from last month
                    </Typography>
                  </Box>
                  
                  <Box border="solid" borderColor="border" p="md" borderRadius="md">
                    <Box display="flex" style={{ gap: '8px', alignItems: 'center' }} mb="sm">
                      <Star size={16} />
                      <Typography variant="h6">Reviews</Typography>
                    </Box>
                    <Typography variant="h4">4.8</Typography>
                    <Typography variant="body2" style={{ color: 'var(--warning-color)' }}>
                      Average rating
                    </Typography>
                  </Box>
                </Box>
                
                <Box border="solid" borderColor="border" borderRadius="md" p="md">
                  <Typography variant="h6" mb="sm">Quick Actions</Typography>
                  <Box display="flex" style={{ gap: '8px' }}>
                    <Button size="sm">Add User</Button>
                    <Button size="sm" variant="secondary">Export Data</Button>
                    <Button size="sm" variant="secondary">Settings</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        </ExampleContainer>

        {/* Spacing Examples */}
        <ExampleContainer
          title="Spacing System"
          description="Demonstrating the spacing system with padding and margin utilities."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Box bg="muted" p="lg" borderRadius="md">
  <Typography variant="h6" mb="md">Spacing Examples</Typography>
  
  <Box bg="primary" p="xs" mb="sm" borderRadius="sm">
    <Typography style={{ color: 'white', fontSize: '12px' }}>xs padding</Typography>
  </Box>
  
  <Box bg="success" p="sm" mb="sm" borderRadius="sm">
    <Typography style={{ color: 'white', fontSize: '12px' }}>sm padding</Typography>
  </Box>
  
  <Box bg="warning" p="md" mb="sm" borderRadius="sm">
    <Typography style={{ color: 'white', fontSize: '12px' }}>md padding</Typography>
  </Box>
  
  <Box bg="danger" p="lg" borderRadius="sm">
    <Typography style={{ color: 'white', fontSize: '12px' }}>lg padding</Typography>
  </Box>
</Box>`}
        >
          <>
            <Box bg="muted" p="lg" borderRadius="md">
              <Typography variant="h6" mb="md">Spacing Examples</Typography>
              
              <Box bg="primary" p="xs" mb="sm" borderRadius="sm">
                <Typography style={{ color: 'white', fontSize: '12px' }}>xs padding</Typography>
              </Box>
              
              <Box bg="success" p="sm" mb="sm" borderRadius="sm">
                <Typography style={{ color: 'white', fontSize: '12px' }}>sm padding</Typography>
              </Box>
              
              <Box bg="warning" p="md" mb="sm" borderRadius="sm">
                <Typography style={{ color: 'white', fontSize: '12px' }}>md padding</Typography>
              </Box>
              
              <Box bg="danger" p="lg" borderRadius="sm">
                <Typography style={{ color: 'white', fontSize: '12px' }}>lg padding</Typography>
              </Box>
            </Box>

            <Box display="flex" style={{ gap: '16px', alignItems: 'flex-start' }}>
              <Box bg="info" p="md" borderRadius="md" mx="sm">
                <Typography style={{ color: 'white', fontSize: '12px' }}>Horizontal margin</Typography>
              </Box>
              
              <Box bg="secondary" p="md" borderRadius="md" my="lg">
                <Typography style={{ fontSize: '12px' }}>Vertical margin</Typography>
              </Box>
            </Box>
          </>
        </ExampleContainer>

        {/* Form Layout */}
        <ExampleContainer
          title="Form Layout"
          description="Using Box for form layouts and structure."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Box 
  bg="surface" 
  p="lg" 
  borderRadius="lg" 
  shadow="md" 
  maxWidth={400}
  mx="auto"
>
  <Typography variant="h5" mb="lg">Contact Form</Typography>
  
  <Box mb="md">
    <Input placeholder="Your Name" />
  </Box>
  
  <Box mb="md">
    <Input placeholder="Email Address" type="email" />
  </Box>
  
  <Box mb="lg">
    <Input placeholder="Message" />
  </Box>
  
  <Box display="flex" style={{ gap: '8px', justifyContent: 'flex-end' }}>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Send Message</Button>
  </Box>
</Box>`}
        >
          <>
            <Box 
              bg="surface" 
              p="lg" 
              borderRadius="lg" 
              shadow="md" 
              maxWidth={400}
              mx="auto"
            >
              <Typography variant="h5" mb="lg">Contact Form</Typography>
              
              <Box mb="md">
                <Input placeholder="Your Name" />
              </Box>
              
              <Box mb="md">
                <Input placeholder="Email Address" type="email" />
              </Box>
              
              <Box mb="lg">
                <Input placeholder="Message" />
              </Box>
              
              <Box display="flex" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Send Message</Button>
              </Box>
            </Box>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Box</strong> component. 
          You can use these properties to control layout, spacing, styling, and behavior.</p>
        <APITable props={boxProps} />
      </div>

      <div className="docs-section">
        <h2>Spacing Scale</h2>
        <p>The Box component uses a consistent spacing scale for padding and margin values:</p>
        <Box bg="surface" p="md" borderRadius="md" mt="md">
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>none:</strong> 0px</li>
            <li><strong>xs:</strong> 4px</li>
            <li><strong>sm:</strong> 8px</li>
            <li><strong>md:</strong> 16px</li>
            <li><strong>lg:</strong> 24px</li>
            <li><strong>xl:</strong> 32px</li>
            <li><strong>auto:</strong> automatic (for margins only)</li>
          </ul>
        </Box>
      </div>

      <div className="docs-section">
        <h2>Design Tokens</h2>
        <p>Box uses design tokens for consistent theming across light and dark modes:</p>
        <Box bg="surface" p="md" borderRadius="md" mt="md">
          <Typography variant="h6" mb="sm">Background Colors</Typography>
          <ul style={{ margin: 0, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><strong>primary:</strong> var(--primary-color)</li>
            <li><strong>secondary:</strong> var(--secondary-color)</li>
            <li><strong>success:</strong> var(--success-color)</li>
            <li><strong>warning:</strong> var(--warning-color)</li>
            <li><strong>danger:</strong> var(--danger-color)</li>
            <li><strong>info:</strong> var(--info-color)</li>
            <li><strong>surface:</strong> var(--surface-color)</li>
            <li><strong>muted:</strong> var(--muted-color)</li>
          </ul>
          
          <Typography variant="h6" mb="sm">Border Colors</Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>border:</strong> var(--border-color)</li>
            <li><strong>muted:</strong> var(--muted-color)</li>
            <li>All background color variants are also available for borders</li>
          </ul>
        </Box>
      </div>
    </div>
  );
};
