import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Empty, EmptyConfigProvider } from "./Empty";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";
import { Typography } from "../Typography/Typography";
import { Flex } from "../Flex/Flex";
import { Card } from "./Card";
import { Search, FileX, Database, Inbox, Package, ShoppingCart } from "lucide-react";

const emptyProps: APITableRow[] = [
  {
    property: "image",
    description: "Customize image. Can be a ReactNode, string (URL), or boolean. Set to false to hide image.",
    type: "ReactNode | string | boolean",
    default: "Empty.PRESENTED_IMAGE_DEFAULT",
  },
  {
    property: "imageStyle",
    description: "Style for the image element.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "description",
    description: "Customize description. Can be a ReactNode, string, or boolean. Set to false to hide description.",
    type: "ReactNode | string | boolean",
    default: "'No data'",
  },
  {
    property: "children",
    description: "Additional content to display below the description (typically buttons or actions).",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name for the empty component.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the empty component.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the empty state.",
    type: "string",
    default: "-",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the empty state.",
    type: "string",
    default: "-",
  },
];

const configProviderProps: APITableRow[] = [
  {
    property: "config.image",
    description: "Global default image for all Empty components.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "config.description",
    description: "Global default description for all Empty components.",
    type: "ReactNode",
    default: "-",
  },
];

export const EmptyDocs: React.FC = () => {
  const [showCustomExample, setShowCustomExample] = useState(false);

  const handleRefresh = () => {
    setShowCustomExample(false);
    setTimeout(() => setShowCustomExample(true), 100);
  };

  const customImage = (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      opacity: 0.6,
      color: 'var(--empty-img-color)'
    }}>
      <Package size={48} />
    </div>
  );

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Empty</h1>
        <p>Empty state placeholder component for displaying when there's no data to show. Provides users with a clear understanding of the current state and guidance on how to proceed.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When there is no data provided or the data source is empty.</li>
          <li>When a list, table, or search result returns no items.</li>
          <li>When a page or section is waiting for content to be loaded.</li>
          <li>To guide users on how to populate empty states with helpful actions.</li>
          <li>As a placeholder during initial application states or after data clearing operations.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="Simplest usage with default image and description."
          style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}
          code={`<Empty />`}
        >
          <Card style={{ padding: '24px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Empty />
          </Card>
        </ExampleContainer>

        {/* Choose image */}
        <ExampleContainer
          title="Choose Image"
          description="Choose another style of image by setting image to Empty.PRESENTED_IMAGE_SIMPLE."
          style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}
          code={`// Default image
<Empty />

// Simple image
<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

// Custom icon
<Empty 
  image={<Search size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
  description="No search results"
/>`}
        >
          <>
            <Card style={{ padding: '24px', minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '200px' }}>
              <Flex direction="column" align="center" gap="8px">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Default Image</Typography>
                <Empty />
              </Flex>
            </Card>
            
            <Card style={{ padding: '24px', minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '200px' }}>
              <Flex direction="column" align="center" gap="8px">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Simple Image</Typography>
                <Empty image={(Empty as any).PRESENTED_IMAGE_SIMPLE} />
              </Flex>
            </Card>
            
            <Card style={{ padding: '24px', minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '200px' }}>
              <Flex direction="column" align="center" gap="8px">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Custom Icon</Typography>
                <Empty 
                  image={<Search size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
                  description="No search results"
                />
              </Flex>
            </Card>
          </>
        </ExampleContainer>

        {/* Customize */}
        <ExampleContainer
          title="Customize"
          description="Customize image source, image size, description, and extra content (e.g., a Button)."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`// Custom image with URL
<Empty
  image="https://via.placeholder.com/100x100?text=Empty"
  description="Custom empty state"
>
  <Button>Reload Data</Button>
</Empty>

// Custom ReactNode image
<Empty
  image={<Package size={64} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
  description={
    <span>
      No packages found. <br />
      <Typography.Text type="secondary">Try adjusting your filters</Typography.Text>
    </span>
  }
  imageStyle={{ marginBottom: '8px' }}
>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
    <Button>Create Package</Button>
    <Button variant="outline">Clear Filters</Button>
  </div>
</Empty>`}
        >
          <>
            <Card style={{ padding: '32px' }}>
              <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>Custom Image URL</Typography>
              <Empty
                image="https://via.placeholder.com/80x80/e6f7ff/1890ff?text=📦"
                description="Custom empty state with external image"
              >
                <Button onClick={handleRefresh}>Reload Data</Button>
              </Empty>
            </Card>

            <Card style={{ padding: '32px' }}>
              <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>Custom ReactNode Image</Typography>
              <Empty
                image={<Package size={64} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
                description={
                  <div style={{ textAlign: 'center' }}>
                    <div>No packages found.</div>
                    <Typography variant="body2" style={{ color: 'var(--empty-description-color)', marginTop: '4px' }}>
                      Try adjusting your filters or create a new package
                    </Typography>
                  </div>
                }
                imageStyle={{ marginBottom: '8px' }}
              >
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button>Create Package</Button>
                  <Button>Clear Filters</Button>
                </div>
              </Empty>
            </Card>
          </>
        </ExampleContainer>

        {/* ConfigProvider */}
        <ExampleContainer
          title="ConfigProvider"
          description="Use EmptyConfigProvider to set a global Empty style for all Empty components within the provider."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`<EmptyConfigProvider 
  config={{
    image: <Database size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />,
    description: "No data available in the system"
  }}
>
  {/* All Empty components within this provider will use the global config */}
  <Empty />
  
  {/* You can still override the global config */}
  <Empty description="Custom description overrides global config" />
</EmptyConfigProvider>`}
        >
          <Card style={{ padding: '32px' }}>
            <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>With ConfigProvider</Typography>
            <EmptyConfigProvider 
              config={{
                image: <Database size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />,
                description: "No data available in the system"
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="caption" style={{ fontWeight: 500, marginBottom: '12px', display: 'block' }}>
                    Uses Global Config
                  </Typography>
                  <Empty />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="caption" style={{ fontWeight: 500, marginBottom: '12px', display: 'block' }}>
                    Overrides Description
                  </Typography>
                  <Empty description="Custom description overrides global config" />
                </div>
              </div>
            </EmptyConfigProvider>
          </Card>
        </ExampleContainer>

        {/* No description */}
        <ExampleContainer
          title="No Description"
          description="Usage with no description by setting description to false."
          style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}
          code={`// No description with default image
<Empty description={false} />

// No description with simple image
<Empty 
  image={Empty.PRESENTED_IMAGE_SIMPLE} 
  description={false} 
/>

// Only custom icon, no description
<Empty 
  image={<Inbox size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
  description={false}
/>`}
        >
          <>
            <Card style={{ padding: '24px', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '180px' }}>
              <Flex direction="column" align="center" gap="8px">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Default, No Description</Typography>
                <Empty description={false} />
              </Flex>
            </Card>
            
            <Card style={{ padding: '24px', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '180px' }}>
              <Flex direction="column" align="center" gap="8px">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Simple, No Description</Typography>
                <Empty 
                  image={(Empty as any).PRESENTED_IMAGE_SIMPLE} 
                  description={false} 
                />
              </Flex>
            </Card>
            
            <Card style={{ padding: '24px', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '180px' }}>
              <Flex direction="column" align="center" gap="8px">
                <Typography variant="caption" style={{ fontWeight: 500 }}>Icon Only</Typography>
                <Empty 
                  image={<Inbox size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
                  description={false}
                />
              </Flex>
            </Card>
          </>
        </ExampleContainer>

        {/* Different Scenarios */}
        <ExampleContainer
          title="Different Use Cases"
          description="Various empty states for different scenarios and contexts."
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}
          code={`// Search results
<Empty 
  image={<Search size={48} />}
  description="No search results found"
>
  <Button>Clear Search</Button>
</Empty>

// Shopping cart
<Empty 
  image={<ShoppingCart size={48} />}
  description="Your cart is empty"
>
  <Button>Start Shopping</Button>
</Empty>

// File list
<Empty 
  image={<FileX size={48} />}
  description="No files uploaded"
>
  <Button>Upload Files</Button>
</Empty>`}
        >
          <>
            <Card style={{ padding: '24px', minHeight: '200px' }}>
              <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>Search Results</Typography>
              <Empty 
                image={<Search size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
                description="No search results found"
              >
                <Button size="sm">Clear Search</Button>
              </Empty>
            </Card>

            <Card style={{ padding: '24px', minHeight: '200px' }}>
              <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>Shopping Cart</Typography>
              <Empty 
                image={<ShoppingCart size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
                description="Your cart is empty"
              >
                <Button size="sm">Start Shopping</Button>
              </Empty>
            </Card>

            <Card style={{ padding: '24px', minHeight: '200px' }}>
              <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>File List</Typography>
              <Empty 
                image={<FileX size={48} style={{ color: 'var(--empty-img-color)', opacity: 0.6 }} />}
                description="No files uploaded"
              >
                <Button size="sm">Upload Files</Button>
              </Empty>
            </Card>
          </>
        </ExampleContainer>

        {/* Advanced Customization */}
        <ExampleContainer
          title="Advanced Customization"
          description="Advanced customization with multiple actions and complex descriptions."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`<Empty
  image={
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8
      }}>
        <Inbox size={32} color="white" />
      </div>
    </div>
  }
  description={
    <div style={{ textAlign: 'center', maxWidth: '300px' }}>
      <Typography variant="h6" style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body2" style={{ color: 'var(--empty-description-color)' }}>
        Get started by creating your first project or importing existing data. 
        You can also explore our templates to jump-start your workflow.
      </Typography>
    </div>
  }
>
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
    <Button>Create Project</Button>
    <Button>Import Data</Button>
    <Button>View Templates</Button>
  </div>
</Empty>`}
        >
          <Card style={{ padding: '40px' }}>
            <Empty
              image={
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.8
                  }}>
                    <Inbox size={32} color="white" />
                  </div>
                </div>
              }
              description={
                <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                  <Typography variant="h6" style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                    Welcome to Your Dashboard
                  </Typography>
                  <Typography variant="body2" style={{ color: 'var(--empty-description-color)' }}>
                    Get started by creating your first project or importing existing data. 
                    You can also explore our templates to jump-start your workflow.
                  </Typography>
                </div>
              }
            >
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button>Create Project</Button>
                <Button>Import Data</Button>
                <Button>View Templates</Button>
              </div>
            </Empty>
          </Card>
        </ExampleContainer>

        {/* Responsive Demonstration */}
        <ExampleContainer
          title="Responsive Behavior"
          description="Empty component adapts to different container sizes and screen dimensions."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`// Small container
<div style={{ width: '200px', height: '150px', border: '1px solid #d9d9d9' }}>
  <Empty size="small" description="Compact view" />
</div>

// Large container
<div style={{ width: '100%', minHeight: '300px' }}>
  <Empty description="Full width view" />
</div>`}
        >
          <>
            <Flex gap="16px" align="flex-start" style={{ flexWrap: 'wrap' }}>
              <div>
                <Typography variant="caption" style={{ fontWeight: 500, marginBottom: '8px', display: 'block' }}>
                  Small Container
                </Typography>
                <Card style={{ width: '200px', height: '150px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Empty 
                    image={(Empty as any).PRESENTED_IMAGE_SIMPLE} 
                    description="Compact"
                    style={{ margin: '8px 0' }}
                  />
                </Card>
              </div>

              <div style={{ flex: 1, minWidth: '300px' }}>
                <Typography variant="caption" style={{ fontWeight: 500, marginBottom: '8px', display: 'block' }}>
                  Large Container
                </Typography>
                <Card style={{ width: '100%', minHeight: '200px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Empty 
                    description="Full width responsive view"
                    imageStyle={{ width: '72px', height: '72px' }}
                  >
                    <Button>Take Action</Button>
                  </Empty>
                </Card>
              </div>
            </Flex>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Empty</strong> component. 
          You can use these properties to control behavior, appearance, and content.</p>
        <APITable props={emptyProps} />
      </div>

      <div className="docs-section">
        <h2>EmptyConfigProvider</h2>
        <p>The <strong>EmptyConfigProvider</strong> allows you to set global defaults for all Empty components within its scope.</p>
        <APITable props={configProviderProps} />
      </div>

      <div className="docs-section">
        <h2>Static Properties</h2>
        <p>The Empty component provides static image constants for convenience:</p>
        <div style={{ background: 'var(--background-secondary)', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <div><strong>Empty.PRESENTED_IMAGE_DEFAULT</strong>: Default empty box illustration</div>
          <div><strong>Empty.PRESENTED_IMAGE_SIMPLE</strong>: Simple circular icon illustration</div>
        </div>
      </div>

      <div className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Provide context:</strong> Use meaningful descriptions that explain why the state is empty.</li>
          <li><strong>Offer actions:</strong> Include buttons or links to help users populate the empty state.</li>
          <li><strong>Choose appropriate images:</strong> Use relevant icons or illustrations that match your app's context.</li>
          <li><strong>Keep it positive:</strong> Frame empty states as opportunities rather than failures.</li>
          <li><strong>Be consistent:</strong> Use EmptyConfigProvider for consistent styling across your application.</li>
          <li><strong>Consider loading states:</strong> Use Empty for true empty states, not loading states.</li>
          <li><strong>Responsive design:</strong> Ensure empty states work well on all screen sizes.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Design Tokens</h2>
        <p>The following CSS custom properties are available for theming the Empty component:</p>
        <div style={{ background: 'var(--background-secondary)', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <div>--empty-color: Primary empty component color</div>
          <div>--empty-img-color: Empty image/icon color</div>
          <div>--empty-text-color: Empty text color</div>
          <div>--empty-description-color: Description text color</div>
          <div>--empty-bg-color: Background color for illustrations</div>
          <div>--empty-border-color: Border color for illustrations</div>
        </div>
      </div>
    </div>
  );
};
