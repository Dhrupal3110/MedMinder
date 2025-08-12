import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Container } from "./Container";
import { Typography } from "../Typography/Typography";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { Avatar } from "../Avatar/Avatar";
import { Input } from "../Input/Input";
import { Box } from "../Box/Box";
import { Stack } from "../Stack/Stack";
import { Flex } from "../Flex/Flex";
import { Divider } from "../Divider/Divider";
import { APITable, type APITableRow } from "../Shared/APITable";
import { 
  Layout, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Settings, 
  Users, 
  Star, 
  ChevronRight,
  Globe,
  Zap
} from "lucide-react";

const containerProps: APITableRow[] = [
  {
    property: "maxWidth",
    description: "Maximum width constraint for the container. Can be a string (CSS value) or number (pixels).",
    type: "string | number",
    default: "var(--container-max-width)",
  },
  {
    property: "padding",
    description: "Custom padding for the container. Overrides responsive padding.",
    type: "string | number",
    default: "Responsive (var(--container-padding))",
  },
  {
    property: "as",
    description: "The HTML element to render as.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "center",
    description: "Whether to horizontally center the container.",
    type: "boolean",
    default: "true",
  },
  {
    property: "fluid",
    description: "Whether to use full width without max-width constraint.",
    type: "boolean",
    default: "false",
  },
  {
    property: "className",
    description: "Additional class name for the container.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the container.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Content to render inside the container.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the container.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the container.",
    type: "string",
    default: "-",
  },
];

const containerMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the container element (when focusable).",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the container element.",
    type: "() => void",
    default: "-",
  },
];

export const ContainerDocs: React.FC = () => {
  const [containerType, setContainerType] = useState<'fixed' | 'fluid'>('fixed');
  const [showResponsive, setShowResponsive] = useState(false);

  const toggleContainerType = () => {
    setContainerType(prev => prev === 'fixed' ? 'fluid' : 'fixed');
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Container</h1>
        <p>A layout wrapper component that centers and constrains content with responsive horizontal padding. Container provides consistent content width and spacing across different screen sizes.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>As the main layout wrapper for page content to ensure consistent maximum width and centering.</li>
          <li>When you need responsive horizontal padding that adapts to different screen sizes.</li>
          <li>For creating sections or areas that need to be contained within a specific width.</li>
          <li>As a building block for responsive layouts and grid systems.</li>
          <li>When you want to maintain consistent content boundaries across your application.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="Simple container with default max-width and centering."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Container>
  <Typography variant="h4">Welcome to our application</Typography>
  <Typography variant="body1">
    This content is contained within a responsive container with 
    automatic centering and appropriate padding.
  </Typography>
</Container>`}
        >
          <>
            <Container>
              <Typography variant="h4">Welcome to our application</Typography>
              <Typography variant="body1">
                This content is contained within a responsive container with 
                automatic centering and appropriate padding.
              </Typography>
            </Container>
          </>
        </ExampleContainer>

        {/* Multiple Components */}
        <ExampleContainer
          title="Container with Multiple Components"
          description="Container wrapping various components for a complete layout."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Container>
  <Flex justify="space-between" align="center" style={{ marginBottom: '24px' }}>
    <Typography variant="h3">Dashboard</Typography>
    <Badge count={3} variant="primary">
      <Settings size={20} />
    </Badge>
  </Flex>
  
  <Stack spacing="lg">
    <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
      <Flex align="center" style={{ gap: '16px', marginBottom: '16px' }}>
        <Avatar src="https://via.placeholder.com/40" alt="User" />
        <div>
          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
            Administrator
          </Typography>
        </div>
      </Flex>
      
      <Divider style={{ margin: '16px 0' }} />
      
      <Flex style={{ gap: '12px' }}>
        <Button variant="primary" size="sm">
          Edit Profile
        </Button>
        <Button variant="secondary" size="sm">
          View Settings
        </Button>
      </Flex>
    </Box>
    
    <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <Box border="solid" borderColor="border" p="lg" borderRadius="md">
        <Flex align="center" style={{ gap: '8px', marginBottom: '12px' }}>
          <Users size={16} />
          <Typography variant="h6">Active Users</Typography>
        </Flex>
        <Typography variant="h4">2,547</Typography>
        <Typography variant="body2" style={{ color: 'var(--success-color)' }}>
          +12% from last week
        </Typography>
      </Box>
      
      <Box border="solid" borderColor="border" p="lg" borderRadius="md">
        <Flex align="center" style={{ gap: '8px', marginBottom: '12px' }}>
          <Star size={16} />
          <Typography variant="h6">Rating</Typography>
        </Flex>
        <Typography variant="h4">4.9</Typography>
        <Typography variant="body2" style={{ color: 'var(--warning-color)' }}>
          Excellent feedback
        </Typography>
      </Box>
    </Box>
  </Stack>
</Container>`}
        >
          <>
            <Container>
              <Flex justify="space-between" align="center" style={{ marginBottom: '24px' }}>
                <Typography variant="h3">Dashboard</Typography>
                <Badge count={3} variant="primary">
                  <Settings size={20} />
                </Badge>
              </Flex>
              
              <Stack spacing="lg">
                <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
                  <Flex align="center" style={{ gap: '16px', marginBottom: '16px' }}>
                    <Avatar src="https://via.placeholder.com/40" alt="User" />
                    <div>
                      <Typography variant="h6">John Doe</Typography>
                      <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                        Administrator
                      </Typography>
                    </div>
                  </Flex>
                  
                  <Divider style={{ margin: '16px 0' }} />
                  
                  <Flex style={{ gap: '12px' }}>
                    <Button variant="primary" size="sm">
                      Edit Profile
                    </Button>
                    <Button variant="secondary" size="sm">
                      View Settings
                    </Button>
                  </Flex>
                </Box>
                
                <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <Box border="solid" borderColor="border" p="lg" borderRadius="md">
                    <Flex align="center" style={{ gap: '8px', marginBottom: '12px' }}>
                      <Users size={16} />
                      <Typography variant="h6">Active Users</Typography>
                    </Flex>
                    <Typography variant="h4">2,547</Typography>
                    <Typography variant="body2" style={{ color: 'var(--success-color)' }}>
                      +12% from last week
                    </Typography>
                  </Box>
                  
                  <Box border="solid" borderColor="border" p="lg" borderRadius="md">
                    <Flex align="center" style={{ gap: '8px', marginBottom: '12px' }}>
                      <Star size={16} />
                      <Typography variant="h6">Rating</Typography>
                    </Flex>
                    <Typography variant="h4">4.9</Typography>
                    <Typography variant="body2" style={{ color: 'var(--warning-color)' }}>
                      Excellent feedback
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Container>
          </>
        </ExampleContainer>

        {/* Background and Custom Styling */}
        <ExampleContainer
          title="Container with Background and Custom Styling"
          description="Container with background color, custom padding, and styling."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Container 
  style={{ 
    backgroundColor: 'var(--surface-color)', 
    borderRadius: '12px',
    boxShadow: 'var(--shadow-md)'
  }}
  padding="2rem"
>
  <Typography variant="h4" style={{ marginBottom: '16px' }}>
    Featured Content
  </Typography>
  
  <Stack spacing="md">
    <Typography variant="body1">
      This container has a custom background color, border radius, and shadow 
      to create a card-like appearance with enhanced visual separation.
    </Typography>
    
    <Flex style={{ gap: '12px' }}>
      <Button variant="primary">Get Started</Button>
      <Button variant="secondary">Learn More</Button>
    </Flex>
  </Stack>
</Container>`}
        >
          <>
            <Container 
              style={{ 
                backgroundColor: 'var(--surface-color)', 
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)'
              }}
              padding="2rem"
            >
              <Typography variant="h4" style={{ marginBottom: '16px' }}>
                Featured Content
              </Typography>
              
              <Stack spacing="md">
                <Typography variant="body1">
                  This container has a custom background color, border radius, and shadow 
                  to create a card-like appearance with enhanced visual separation.
                </Typography>
                
                <Flex style={{ gap: '12px' }}>
                  <Button variant="primary">Get Started</Button>
                  <Button variant="secondary">Learn More</Button>
                </Flex>
              </Stack>
            </Container>
          </>
        </ExampleContainer>

        {/* Fluid vs Fixed */}
        <ExampleContainer
          title="Fluid vs Fixed Container"
          description="Comparison between fluid (full-width) and fixed (max-width) containers."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [containerType, setContainerType] = useState<'fixed' | 'fluid'>('fixed');

<Container fluid={containerType === 'fluid'}>
  <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
    <Typography variant="h5">
      {containerType === 'fluid' ? 'Fluid Container' : 'Fixed Container'}
    </Typography>
    <Button onClick={toggleContainerType} size="sm">
      Switch to {containerType === 'fluid' ? 'Fixed' : 'Fluid'}
    </Button>
  </Flex>
  
  <Typography variant="body1" style={{ marginBottom: '16px' }}>
    {containerType === 'fluid' 
      ? 'This container spans the full width of its parent with no max-width constraint.'
      : 'This container has a max-width and centers itself within the available space.'
    }
  </Typography>
  
  <Box 
    bg={containerType === 'fluid' ? 'warning' : 'primary'} 
    p="md" 
    borderRadius="md"
  >
    <Typography style={{ color: 'white' }}>
      Container type: {containerType}
    </Typography>
  </Box>
</Container>`}
        >
          <>
            <Container fluid={containerType === 'fluid'}>
              <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
                <Typography variant="h5">
                  {containerType === 'fluid' ? 'Fluid Container' : 'Fixed Container'}
                </Typography>
                <Button onClick={toggleContainerType} size="sm">
                  Switch to {containerType === 'fluid' ? 'Fixed' : 'Fluid'}
                </Button>
              </Flex>
              
              <Typography variant="body1" style={{ marginBottom: '16px' }}>
                {containerType === 'fluid' 
                  ? 'This container spans the full width of its parent with no max-width constraint.'
                  : 'This container has a max-width and centers itself within the available space.'
                }
              </Typography>
              
              <Box 
                bg={containerType === 'fluid' ? 'warning' : 'primary'} 
                p="md" 
                borderRadius="md"
              >
                <Typography style={{ color: 'white' }}>
                  Container type: {containerType}
                </Typography>
              </Box>
            </Container>
          </>
        </ExampleContainer>

        {/* Responsive Example */}
        <ExampleContainer
          title="Responsive Container"
          description="Container with responsive behavior and adaptive content."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Container maxWidth="800px">
  <Typography variant="h4" style={{ marginBottom: '24px', textAlign: 'center' }}>
    Responsive Design
  </Typography>
  
  <Stack spacing="lg">
    <Box display="grid" style={{ 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '16px' 
    }}>
      <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
        <Flex align="center" style={{ gap: '12px', marginBottom: '12px' }}>
          <Monitor size={20} />
          <Typography variant="h6">Desktop</Typography>
        </Flex>
        <Typography variant="body2">
          Full featured experience with all components visible
        </Typography>
      </Box>
      
      <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
        <Flex align="center" style={{ gap: '12px', marginBottom: '12px' }}>
          <Tablet size={20} />
          <Typography variant="h6">Tablet</Typography>
        </Flex>
        <Typography variant="body2">
          Optimized layout with adjusted spacing and sizing
        </Typography>
      </Box>
      
      <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
        <Flex align="center" style={{ gap: '12px', marginBottom: '12px' }}>
          <Smartphone size={20} />
          <Typography variant="h6">Mobile</Typography>
        </Flex>
        <Typography variant="body2">
          Compact design with stacked elements and minimal padding
        </Typography>
      </Box>
    </Box>
    
    <Box bg="muted" p="lg" borderRadius="md">
      <Typography variant="body1" style={{ textAlign: 'center' }}>
        The container automatically adjusts its padding based on screen size:
        <br />
        <strong>Mobile:</strong> 8px • <strong>Tablet:</strong> 16px • <strong>Desktop:</strong> 24px
      </Typography>
    </Box>
  </Stack>
</Container>`}
        >
          <>
            <Container maxWidth="800px">
              <Typography variant="h4" style={{ marginBottom: '24px', textAlign: 'center' }}>
                Responsive Design
              </Typography>
              
              <Stack spacing="lg">
                <Box display="grid" style={{ 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '16px' 
                }}>
                  <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
                    <Flex align="center" style={{ gap: '12px', marginBottom: '12px' }}>
                      <Monitor size={20} />
                      <Typography variant="h6">Desktop</Typography>
                    </Flex>
                    <Typography variant="body2">
                      Full featured experience with all components visible
                    </Typography>
                  </Box>
                  
                  <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
                    <Flex align="center" style={{ gap: '12px', marginBottom: '12px' }}>
                      <Tablet size={20} />
                      <Typography variant="h6">Tablet</Typography>
                    </Flex>
                    <Typography variant="body2">
                      Optimized layout with adjusted spacing and sizing
                    </Typography>
                  </Box>
                  
                  <Box bg="surface" p="lg" borderRadius="md" shadow="sm">
                    <Flex align="center" style={{ gap: '12px', marginBottom: '12px' }}>
                      <Smartphone size={20} />
                      <Typography variant="h6">Mobile</Typography>
                    </Flex>
                    <Typography variant="body2">
                      Compact design with stacked elements and minimal padding
                    </Typography>
                  </Box>
                </Box>
                
                <Box bg="muted" p="lg" borderRadius="md">
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    The container automatically adjusts its padding based on screen size:
                    <br />
                    <strong>Mobile:</strong> 8px • <strong>Tablet:</strong> 16px • <strong>Desktop:</strong> 24px
                  </Typography>
                </Box>
              </Stack>
            </Container>
          </>
        </ExampleContainer>

        {/* Form Layout */}
        <ExampleContainer
          title="Form Layout Container"
          description="Using Container for form layouts with proper spacing and structure."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Container maxWidth="600px" as="form">
  <Typography variant="h4" style={{ marginBottom: '24px', textAlign: 'center' }}>
    Contact Us
  </Typography>
  
  <Stack spacing="lg">
    <Stack spacing="md">
      <Input placeholder="Full Name" />
      <Input placeholder="Email Address" type="email" />
      <Input placeholder="Phone Number" type="tel" />
      <Input placeholder="Subject" />
      <Input placeholder="Your message..." />
    </Stack>
    
    <Divider />
    
    <Box bg="surface" p="md" borderRadius="md">
      <Typography variant="body2" style={{ 
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        By submitting this form, you agree to our privacy policy.
      </Typography>
      
      <Flex justify="center" style={{ gap: '12px' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Send Message</Button>
      </Flex>
    </Box>
  </Stack>
</Container>`}
        >
          <>
            <Container maxWidth="600px" as="form">
              <Typography variant="h4" style={{ marginBottom: '24px', textAlign: 'center' }}>
                Contact Us
              </Typography>
              
              <Stack spacing="lg">
                <Stack spacing="md">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Phone Number" type="tel" />
                  <Input placeholder="Subject" />
                  <Input placeholder="Your message..." />
                </Stack>
                
                <Divider />
                
                <Box bg="surface" p="md" borderRadius="md">
                  <Typography variant="body2" style={{ 
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}>
                    By submitting this form, you agree to our privacy policy.
                  </Typography>
                  
                  <Flex justify="center" style={{ gap: '12px' }}>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Send Message</Button>
                  </Flex>
                </Box>
              </Stack>
            </Container>
          </>
        </ExampleContainer>

        {/* Semantic Container */}
        <ExampleContainer
          title="Semantic HTML Container"
          description="Using Container with different semantic HTML elements."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`{/* Main content container */}
<Container as="main" aria-label="Main content">
  <Typography variant="h3">Welcome to Our Platform</Typography>
  <Typography variant="body1">
    This is the main content area of our application.
  </Typography>
</Container>

{/* Article container */}
<Container as="article" maxWidth="700px">
  <Typography variant="h4">Article Title</Typography>
  <Typography variant="body1">
    This container represents an article with focused content width.
  </Typography>
</Container>

{/* Section container */}
<Container as="section" aria-labelledby="features-heading">
  <Typography variant="h4" id="features-heading">Features</Typography>
  <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
    <Box bg="surface" p="md" borderRadius="md">
      <Flex align="center" style={{ gap: '8px', marginBottom: '8px' }}>
        <Globe size={16} />
        <Typography variant="h6">Global</Typography>
      </Flex>
      <Typography variant="body2">Available worldwide</Typography>
    </Box>
    
    <Box bg="surface" p="md" borderRadius="md">
      <Flex align="center" style={{ gap: '8px', marginBottom: '8px' }}>
        <Zap size={16} />
        <Typography variant="h6">Fast</Typography>
      </Flex>
      <Typography variant="body2">Lightning quick performance</Typography>
    </Box>
  </Box>
</Container>`}
        >
          <>
            {/* Main content container */}
            <Container as="main" aria-label="Main content">
              <Typography variant="h3">Welcome to Our Platform</Typography>
              <Typography variant="body1">
                This is the main content area of our application.
              </Typography>
            </Container>

            {/* Article container */}
            <Container as="article" maxWidth="700px">
              <Typography variant="h4">Article Title</Typography>
              <Typography variant="body1">
                This container represents an article with focused content width.
              </Typography>
            </Container>

            {/* Section container */}
            <Container as="section" aria-labelledby="features-heading">
              <Typography variant="h4" id="features-heading">Features</Typography>
              <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <Box bg="surface" p="md" borderRadius="md">
                  <Flex align="center" style={{ gap: '8px', marginBottom: '8px' }}>
                    <Globe size={16} />
                    <Typography variant="h6">Global</Typography>
                  </Flex>
                  <Typography variant="body2">Available worldwide</Typography>
                </Box>
                
                <Box bg="surface" p="md" borderRadius="md">
                  <Flex align="center" style={{ gap: '8px', marginBottom: '8px' }}>
                    <Zap size={16} />
                    <Typography variant="h6">Fast</Typography>
                  </Flex>
                  <Typography variant="body2">Lightning quick performance</Typography>
                </Box>
              </Box>
            </Container>
          </>
        </ExampleContainer>

        {/* Nested Containers */}
        <ExampleContainer
          title="Nested Containers"
          description="Demonstrating proper nesting of containers for complex layouts."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`<Container>
  <Typography variant="h3" style={{ textAlign: 'center', marginBottom: '32px' }}>
    Our Services
  </Typography>
  
  <Stack spacing="xl">
    <Container maxWidth="800px">
      <Box bg="primary" p="lg" borderRadius="lg">
        <Typography variant="h4" style={{ color: 'white', marginBottom: '16px' }}>
          Premium Service
        </Typography>
        <Typography style={{ color: 'white' }}>
          This nested container provides focused content width within the main container.
        </Typography>
      </Box>
    </Container>
    
    <Container maxWidth="600px">
      <Box bg="success" p="lg" borderRadius="lg">
        <Typography variant="h4" style={{ color: 'white', marginBottom: '16px' }}>
          Standard Service
        </Typography>
        <Typography style={{ color: 'white' }}>
          A narrower nested container for more focused content presentation.
        </Typography>
      </Box>
    </Container>
    
    <Container fluid>
      <Box bg="warning" p="lg" borderRadius="lg">
        <Typography variant="h4" style={{ color: 'white', marginBottom: '16px' }}>
          Full Width Service
        </Typography>
        <Typography style={{ color: 'white' }}>
          This fluid nested container spans the full width of the parent container.
        </Typography>
      </Box>
    </Container>
  </Stack>
</Container>`}
        >
          <>
            <Container>
              <Typography variant="h3" style={{ textAlign: 'center', marginBottom: '32px' }}>
                Our Services
              </Typography>
              
              <Stack spacing="xl">
                <Container maxWidth="800px">
                  <Box bg="primary" p="lg" borderRadius="lg">
                    <Typography variant="h4" style={{ color: 'white', marginBottom: '16px' }}>
                      Premium Service
                    </Typography>
                    <Typography style={{ color: 'white' }}>
                      This nested container provides focused content width within the main container.
                    </Typography>
                  </Box>
                </Container>
                
                <Container maxWidth="600px">
                  <Box bg="success" p="lg" borderRadius="lg">
                    <Typography variant="h4" style={{ color: 'white', marginBottom: '16px' }}>
                      Standard Service
                    </Typography>
                    <Typography style={{ color: 'white' }}>
                      A narrower nested container for more focused content presentation.
                    </Typography>
                  </Box>
                </Container>
                
                <Container fluid>
                  <Box bg="warning" p="lg" borderRadius="lg">
                    <Typography variant="h4" style={{ color: 'white', marginBottom: '16px' }}>
                      Full Width Service
                    </Typography>
                    <Typography style={{ color: 'white' }}>
                      This fluid nested container spans the full width of the parent container.
                    </Typography>
                  </Box>
                </Container>
              </Stack>
            </Container>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Container</strong> component. 
          You can use these properties to control layout, width constraints, and behavior.</p>
        <APITable props={containerProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Container</strong> component via ref. 
          They allow you to programmatically control the container's behavior.</p>
        <APITable props={containerMethods} />
      </div>

      <div className="docs-section">
        <h2>Responsive Breakpoints</h2>
        <p>The Container component uses a responsive padding system that adapts to different screen sizes:</p>
        <Box bg="surface" p="md" borderRadius="md" mt="md">
          <Stack spacing="sm">
            <Flex align="center" style={{ gap: '12px' }}>
              <Smartphone size={16} />
              <Typography variant="body2">
                <strong>Mobile (≤ 576px):</strong> 8px horizontal padding
              </Typography>
            </Flex>
            <Flex align="center" style={{ gap: '12px' }}>
              <Tablet size={16} />
              <Typography variant="body2">
                <strong>Tablet (577px - 768px):</strong> 16px horizontal padding
              </Typography>
            </Flex>
            <Flex align="center" style={{ gap: '12px' }}>
              <Monitor size={16} />
              <Typography variant="body2">
                <strong>Desktop (≥ 769px):</strong> 24px horizontal padding
              </Typography>
            </Flex>
          </Stack>
        </Box>
      </div>

      <div className="docs-section">
        <h2>Design Tokens</h2>
        <p>Container uses design tokens for consistent theming across light and dark modes:</p>
        <Box bg="surface" p="md" borderRadius="md" mt="md">
          <Typography variant="h6" mb="sm">CSS Variables</Typography>
          <ul style={{ margin: 0, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><strong>--container-max-width:</strong> Default maximum width (1200px)</li>
            <li><strong>--container-padding:</strong> Default horizontal padding (16px)</li>
            <li><strong>--container-padding-sm:</strong> Small screen padding (8px)</li>
            <li><strong>--container-padding-lg:</strong> Large screen padding (24px)</li>
            <li><strong>--container-margin:</strong> Auto centering margin (0 auto)</li>
          </ul>
          
          <Typography variant="h6" mb="sm">Predefined Max-Width Classes</Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>ui-container--xs:</strong> 540px max-width</li>
            <li><strong>ui-container--sm:</strong> 720px max-width</li>
            <li><strong>ui-container--md:</strong> 960px max-width</li>
            <li><strong>ui-container--lg:</strong> 1140px max-width</li>
            <li><strong>ui-container--xl:</strong> 1320px max-width</li>
          </ul>
        </Box>
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <Box bg="surface" p="md" borderRadius="md" mt="md">
          <Stack spacing="sm">
            <Typography variant="body2">
              <strong>✅ Do:</strong> Use Container as the primary layout wrapper for page content
            </Typography>
            <Typography variant="body2">
              <strong>✅ Do:</strong> Combine with other layout components like Box, Stack, and Flex for complex layouts
            </Typography>
            <Typography variant="body2">
              <strong>✅ Do:</strong> Use semantic HTML elements with the `as` prop for better accessibility
            </Typography>
            <Typography variant="body2">
              <strong>✅ Do:</strong> Consider using fluid containers for hero sections or full-width content
            </Typography>
            <Typography variant="body2">
              <strong>❌ Don't:</strong> Nest containers unnecessarily - use Box for internal spacing instead
            </Typography>
            <Typography variant="body2">
              <strong>❌ Don't:</strong> Override the responsive padding unless you have specific design requirements
            </Typography>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
