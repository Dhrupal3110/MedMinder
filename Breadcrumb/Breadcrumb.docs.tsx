import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { 
  Home, 
  User, 
  Settings, 
  FileText, 
  Folder, 
  ChevronRight, 
  Slash, 
  ArrowRight,
  Users,
  BookOpen,
  Package,
  ShoppingCart,
  Calendar,
  Mail
} from "lucide-react";
import { APITable, type APITableRow } from "../Shared/APITable";

const breadcrumbProps: APITableRow[] = [
  {
    property: "items",
    description: "Array of breadcrumb items to display.",
    type: "BreadcrumbItem[]",
    default: "[]",
  },
  {
    property: "separator",
    description: "Separator between breadcrumb items. Can be text, icon, or custom React element.",
    type: "ReactNode",
    default: "<ChevronRight />",
  },
  {
    property: "maxItems",
    description: "Maximum number of items to display before collapsing with ellipsis.",
    type: "number",
    default: "-",
  },
  {
    property: "itemRender",
    description: "Custom render function for breadcrumb items.",
    type: "(item: BreadcrumbItem, index: number, items: BreadcrumbItem[]) => ReactNode",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name for the breadcrumb container.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the breadcrumb container.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the breadcrumb navigation.",
    type: "string",
    default: "'breadcrumb'",
  },
];

const breadcrumbItemProps: APITableRow[] = [
  {
    property: "label",
    description: "The text or content to display for the breadcrumb item.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "href",
    description: "URL for the breadcrumb item link.",
    type: "string",
    default: "-",
  },
  {
    property: "icon",
    description: "Icon to display before the breadcrumb text.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "disabled",
    description: "Whether the breadcrumb item is disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "separator",
    description: "Custom separator for this specific item (overrides global separator).",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "onClick",
    description: "Click handler for the breadcrumb item.",
    type: "(event: React.MouseEvent<HTMLAnchorElement>) => void",
    default: "-",
  },
  {
    property: "dropdown",
    description: "Dropdown menu configuration for the breadcrumb item.",
    type: "{ items: Array<{ label: ReactNode; href?: string; onClick?: () => void }> }",
    default: "-",
  },
];

export const BreadcrumbDocs: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard/users/profile');
  const [debugRoutes, setDebugRoutes] = useState<string[]>([]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setDebugRoutes(prev => [...prev, `Navigated to: ${path}`]);
  };

  const clearDebug = () => {
    setDebugRoutes([]);
  };

  // Basic items
  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/dashboard/users' },
    { label: 'Profile' },
  ];

  // Items with icons
  const iconItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} /> },
    { label: 'Users', href: '/users', icon: <Users size={14} /> },
    { label: 'Profile', icon: <User size={14} /> },
  ];

  // Items with params
  const paramItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} /> },
    { label: 'Products', href: '/products', icon: <Package size={14} /> },
    { label: 'Category: Electronics', href: '/products/electronics' },
    { label: 'Item: Smartphone', href: '/products/electronics/smartphone' },
    { label: 'Model: iPhone 15 Pro' },
  ];

  // Items with dropdown
  const dropdownItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} /> },
    { 
      label: 'Documents', 
      href: '/documents',
      icon: <FileText size={14} />,
      dropdown: {
        items: [
          { label: 'Recent Documents', href: '/documents/recent' },
          { label: 'Shared Documents', href: '/documents/shared' },
          { label: 'Archived Documents', href: '/documents/archived' },
        ]
      }
    },
    { 
      label: 'Projects',
      href: '/projects',
      icon: <Folder size={14} />,
      dropdown: {
        items: [
          { label: 'Active Projects', href: '/projects/active' },
          { label: 'Completed Projects', href: '/projects/completed' },
          { label: 'Template Projects', href: '/projects/templates' },
        ]
      }
    },
    { label: 'Current Project', icon: <BookOpen size={14} /> },
  ];

  // Items with custom separators
  const customSeparatorItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', separator: <ArrowRight size={12} /> },
    { label: 'Shop', href: '/shop', separator: '|' },
    { label: 'Electronics', href: '/shop/electronics', separator: <Slash size={12} /> },
    { label: 'Smartphones', href: '/shop/electronics/smartphones', separator: '→' },
    { label: 'iPhone 15 Pro' },
  ];

  // Generate dynamic breadcrumbs from current path
  const generateBreadcrumbsFromPath = (path: string): BreadcrumbItem[] => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: <Home size={14} /> }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
        onClick: isLast ? undefined : () => handleNavigate(currentPath),
      });
    });

    return breadcrumbs;
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Breadcrumb</h1>
        <p>A breadcrumb displays the current page's location within a navigational hierarchy. Breadcrumbs help users understand where they are in the application and provide a way to navigate back to previous levels.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When the system has more than two layers in a hierarchy.</li>
          <li>When you need to inform the user of where they are in the application.</li>
          <li>When the user needs to navigate back to a higher level.</li>
          <li>For websites with complex navigation structures or deep page hierarchies.</li>
          <li>In conjunction with page headers to provide additional context.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Usage */}
        <ExampleContainer
          title="Basic Usage"
          description="The simplest breadcrumb example with text-based navigation."
          code={`const basicItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Profile' }, // Current page, no href
];

<Breadcrumb items={basicItems} />`}
        >
          <Breadcrumb items={basicItems} />
        </ExampleContainer>

        {/* With Icons */}
        <ExampleContainer
          title="With an Icon"
          description="Each breadcrumb item can have an icon to provide better visual context."
          code={`const iconItems = [
  { label: 'Home', href: '/', icon: <Home size={14} /> },
  { label: 'Users', href: '/users', icon: <Users size={14} /> },
  { label: 'Profile', icon: <User size={14} /> },
];

<Breadcrumb items={iconItems} />`}
        >
          <Breadcrumb items={iconItems} />
        </ExampleContainer>

        {/* With Params */}
        <ExampleContainer
          title="With Params"
          description="Demonstrate route parameters and dynamic breadcrumb paths."
          code={`const paramItems = [
  { label: 'Home', href: '/', icon: <Home size={14} /> },
  { label: 'Products', href: '/products', icon: <Package size={14} /> },
  { label: 'Category: Electronics', href: '/products/electronics' },
  { label: 'Item: Smartphone', href: '/products/electronics/smartphone' },
  { label: 'Model: iPhone 15 Pro' }, // Current item
];

<Breadcrumb items={paramItems} />`}
        >
          <Breadcrumb items={paramItems} />
        </ExampleContainer>

        {/* Configure Separator */}
        <ExampleContainer
          title="Configure the Separator"
          description="Customize the separator globally via the separator prop."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`// Different separator examples
<Breadcrumb items={basicItems} separator=">" />
<Breadcrumb items={basicItems} separator="|" />
<Breadcrumb items={basicItems} separator="/" />
<Breadcrumb items={basicItems} separator={<ArrowRight size={12} />} />`}
        >
          <>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Separator: ">"</div>
              <Breadcrumb items={basicItems} separator=">" />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Separator: "|"</div>
              <Breadcrumb items={basicItems} separator="|" />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Separator: "/"</div>
              <Breadcrumb items={basicItems} separator="/" />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Separator: Arrow Icon</div>
              <Breadcrumb items={basicItems} separator={<ArrowRight size={12} />} />
            </div>
          </>
        </ExampleContainer>

        {/* Breadcrumbs with Dropdown Menu */}
        <ExampleContainer
          title="Breadcrumbs with Dropdown Menu"
          description="Show breadcrumb items that contain dropdown menus for additional navigation options."
          code={`const dropdownItems = [
  { label: 'Home', href: '/', icon: <Home size={14} /> },
  { 
    label: 'Documents', 
    href: '/documents',
    icon: <FileText size={14} />,
    dropdown: {
      items: [
        { label: 'Recent Documents', href: '/documents/recent' },
        { label: 'Shared Documents', href: '/documents/shared' },
        { label: 'Archived Documents', href: '/documents/archived' },
      ]
    }
  },
  { 
    label: 'Projects',
    href: '/projects',
    icon: <Folder size={14} />,
    dropdown: {
      items: [
        { label: 'Active Projects', href: '/projects/active' },
        { label: 'Completed Projects', href: '/projects/completed' },
        { label: 'Template Projects', href: '/projects/templates' },
      ]
    }
  },
  { label: 'Current Project', icon: <BookOpen size={14} /> },
];

<Breadcrumb items={dropdownItems} />`}
        >
          <div style={{ paddingBottom: '60px' }}>
            <Breadcrumb items={dropdownItems} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              Hover over "Documents" or "Projects" to see dropdown menus
            </div>
          </div>
        </ExampleContainer>

        {/* Custom Separators for Each Item */}
        <ExampleContainer
          title="Configuring the Separator Independently"
          description="Customize separator for each breadcrumb item separately using the separator property."
          code={`const customSeparatorItems = [
  { label: 'Home', href: '/', separator: <ArrowRight size={12} /> },
  { label: 'Shop', href: '/shop', separator: '|' },
  { label: 'Electronics', href: '/shop/electronics', separator: <Slash size={12} /> },
  { label: 'Smartphones', href: '/shop/electronics/smartphones', separator: '→' },
  { label: 'iPhone 15 Pro' }, // No separator for last item
];

<Breadcrumb items={customSeparatorItems} />`}
        >
          <Breadcrumb items={customSeparatorItems} />
        </ExampleContainer>

        {/* Debug Routes */}
        <ExampleContainer
          title="Debug Routes"
          description="Interactive breadcrumb that shows route debugging and navigation tracking."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [currentPath, setCurrentPath] = useState('/dashboard/users/profile');
const [debugRoutes, setDebugRoutes] = useState([]);

const handleNavigate = (path: string) => {
  setCurrentPath(path);
  setDebugRoutes(prev => [...prev, \`Navigated to: \${path}\`]);
};

const generateBreadcrumbsFromPath = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: <Home size={14} /> }
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += \`/\${segment}\`;
    const isLast = index === segments.length - 1;
    
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath,
      onClick: isLast ? undefined : () => handleNavigate(currentPath),
    });
  });

  return breadcrumbs;
};

<Breadcrumb items={generateBreadcrumbsFromPath(currentPath)} />`}
        >
          <>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                Current Path: {currentPath}
              </div>
              <Breadcrumb items={generateBreadcrumbsFromPath(currentPath)} />
            </div>
            
            <div>
              <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                Quick Navigation:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onClick={() => handleNavigate('/')}
                >
                  Home
                </button>
                <button 
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onClick={() => handleNavigate('/dashboard')}
                >
                  Dashboard
                </button>
                <button 
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onClick={() => handleNavigate('/dashboard/users/profile/settings')}
                >
                  Deep Path
                </button>
                <button 
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onClick={() => handleNavigate('/products/electronics/smartphones/iphone/15-pro')}
                >
                  Very Deep Path
                </button>
              </div>
            </div>

            {debugRoutes.length > 0 && (
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '8px' 
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Debug Log:</div>
                  <button 
                    style={{ 
                      padding: '2px 6px', 
                      border: '1px solid #ff4d4f', 
                      borderRadius: '4px',
                      background: '#fff',
                      color: '#ff4d4f',
                      cursor: 'pointer',
                      fontSize: '11px'
                    }}
                    onClick={clearDebug}
                  >
                    Clear
                  </button>
                </div>
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '8px', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}>
                  {debugRoutes.map((route, index) => (
                    <div key={index} style={{ marginBottom: '2px' }}>
                      [{new Date().toLocaleTimeString()}] {route}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        </ExampleContainer>

        {/* Max Items */}
        <ExampleContainer
          title="Max Items with Ellipsis"
          description="Limit the number of visible breadcrumb items with ellipsis for long paths."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const longPathItems = [
  { label: 'Home', href: '/', icon: <Home size={14} /> },
  { label: 'Dashboard', href: '/dashboard', icon: <Settings size={14} /> },
  { label: 'Management', href: '/dashboard/management' },
  { label: 'Users', href: '/dashboard/management/users', icon: <Users size={14} /> },
  { label: 'Groups', href: '/dashboard/management/users/groups' },
  { label: 'Permissions', href: '/dashboard/management/users/groups/permissions' },
  { label: 'Role Assignment' },
];

<Breadcrumb items={longPathItems} maxItems={4} />`}
        >
          <>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                Full breadcrumb (7 items):
              </div>
              <Breadcrumb items={[
                { label: 'Home', href: '/', icon: <Home size={14} /> },
                { label: 'Dashboard', href: '/dashboard', icon: <Settings size={14} /> },
                { label: 'Management', href: '/dashboard/management' },
                { label: 'Users', href: '/dashboard/management/users', icon: <Users size={14} /> },
                { label: 'Groups', href: '/dashboard/management/users/groups' },
                { label: 'Permissions', href: '/dashboard/management/users/groups/permissions' },
                { label: 'Role Assignment' },
              ]} />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                With maxItems={4}:
              </div>
              <Breadcrumb 
                items={[
                  { label: 'Home', href: '/', icon: <Home size={14} /> },
                  { label: 'Dashboard', href: '/dashboard', icon: <Settings size={14} /> },
                  { label: 'Management', href: '/dashboard/management' },
                  { label: 'Users', href: '/dashboard/management/users', icon: <Users size={14} /> },
                  { label: 'Groups', href: '/dashboard/management/users/groups' },
                  { label: 'Permissions', href: '/dashboard/management/users/groups/permissions' },
                  { label: 'Role Assignment' },
                ]}
                maxItems={4} 
              />
            </div>
          </>
        </ExampleContainer>

        {/* Real-world Examples */}
        <ExampleContainer
          title="Real-world Examples"
          description="Common breadcrumb patterns used in different application contexts."
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          code={`// E-commerce example
const ecommerceItems = [
  { label: 'Home', href: '/', icon: <Home size={14} /> },
  { label: 'Electronics', href: '/electronics' },
  { label: 'Smartphones', href: '/electronics/smartphones' },
  { label: 'iPhone 15 Pro', href: '/electronics/smartphones/iphone-15-pro' },
  { label: 'Space Black 256GB' },
];

// Admin panel example
const adminItems = [
  { label: 'Admin', href: '/admin', icon: <Settings size={14} /> },
  { label: 'Users', href: '/admin/users', icon: <Users size={14} /> },
  { label: 'John Doe', href: '/admin/users/john-doe', icon: <User size={14} /> },
  { label: 'Profile Settings' },
];

// Documentation example  
const docsItems = [
  { label: 'Docs', href: '/docs', icon: <BookOpen size={14} /> },
  { label: 'Components', href: '/docs/components' },
  { label: 'Navigation', href: '/docs/components/navigation' },
  { label: 'Breadcrumb' },
];
