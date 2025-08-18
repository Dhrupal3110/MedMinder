import React, { useState } from "react";
import { Typography } from "../Typography/Typography";
import { Stack } from "../Stack/Stack";
import { Flex } from "../Flex/Flex";
import { IconButton } from "../IconButton/IconButton";
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
  Mail,
  Trash2
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
    { label: 'Home', href: '/', onClick: () => handleNavigate('/') },
    { label: 'Dashboard', href: '/dashboard', onClick: () => handleNavigate('/dashboard') },
    { label: 'Users', href: '/dashboard/users', onClick: () => handleNavigate('/dashboard/users') },
    { label: 'Profile' },
  ];

  // Items with icons
  const iconItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} />, onClick: () => handleNavigate('/') },
    { label: 'Users', href: '/users', icon: <Users size={14} />, onClick: () => handleNavigate('/users') },
    { label: 'Profile', icon: <User size={14} /> },
  ];

  // Items with params
  const paramItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} />, onClick: () => handleNavigate('/') },
    { label: 'Products', href: '/products', icon: <Package size={14} />, onClick: () => handleNavigate('/products') },
    { label: 'Category: Electronics', href: '/products/electronics', onClick: () => handleNavigate('/products/electronics') },
    { label: 'Item: Smartphone', href: '/products/electronics/smartphone', onClick: () => handleNavigate('/products/electronics/smartphone') },
    { label: 'Model: iPhone 15 Pro' },
  ];

  // Items with dropdown
  const dropdownItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} />, onClick: () => handleNavigate('/') },
    { 
      label: 'Documents', 
      href: '/documents',
      icon: <FileText size={14} />,
      onClick: () => handleNavigate('/documents'),
      dropdown: {
        items: [
          { label: 'Recent Documents', href: '/documents/recent', onClick: () => handleNavigate('/documents/recent') },
          { label: 'Shared Documents', href: '/documents/shared', onClick: () => handleNavigate('/documents/shared') },
          { label: 'Archived Documents', href: '/documents/archived', onClick: () => handleNavigate('/documents/archived') },
        ]
      }
    },
    { 
      label: 'Projects',
      href: '/projects',
      icon: <Folder size={14} />,
      onClick: () => handleNavigate('/projects'),
      dropdown: {
        items: [
          { label: 'Active Projects', href: '/projects/active', onClick: () => handleNavigate('/projects/active') },
          { label: 'Completed Projects', href: '/projects/completed', onClick: () => handleNavigate('/projects/completed') },
          { label: 'Template Projects', href: '/projects/templates', onClick: () => handleNavigate('/projects/templates') },
        ]
      }
    },
    { label: 'Current Project', icon: <BookOpen size={14} /> },
  ];

  // Items with custom separators
  const customSeparatorItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', separator: <ArrowRight size={12} />, onClick: () => handleNavigate('/') },
    { label: 'Shop', href: '/shop', separator: '|', onClick: () => handleNavigate('/shop') },
    { label: 'Electronics', href: '/shop/electronics', separator: <Slash size={12} />, onClick: () => handleNavigate('/shop/electronics') },
    { label: 'Smartphones', href: '/shop/electronics/smartphones', separator: '→', onClick: () => handleNavigate('/shop/electronics/smartphones') },
    { label: 'iPhone 15 Pro' },
  ];

  // Generate dynamic breadcrumbs from current path
  const generateBreadcrumbsFromPath = (path: string): BreadcrumbItem[] => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: <Home size={14} />, onClick: () => handleNavigate('/') }
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

  // Max items example
  const longPathItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Home size={14} />, onClick: () => handleNavigate('/') },
    { label: 'Company', href: '/company', onClick: () => handleNavigate('/company') },
    { label: 'Departments', href: '/company/departments', onClick: () => handleNavigate('/company/departments') },
    { label: 'Engineering', href: '/company/departments/engineering', onClick: () => handleNavigate('/company/departments/engineering') },
    { label: 'Frontend', href: '/company/departments/engineering/frontend', onClick: () => handleNavigate('/company/departments/engineering/frontend') },
    { label: 'React Team', href: '/company/departments/engineering/frontend/react', onClick: () => handleNavigate('/company/departments/engineering/frontend/react') },
    { label: 'Projects', href: '/company/departments/engineering/frontend/react/projects', onClick: () => handleNavigate('/company/departments/engineering/frontend/react/projects') },
    { label: 'Component Library' },
  ];

  return (
    <Stack spacing="xl">
      <Stack spacing="md">
        <Typography variant="h1">Breadcrumb</Typography>
        <Typography variant="body" color="secondary">
          A breadcrumb displays the current page's location within a navigational hierarchy. 
          Breadcrumbs help users understand where they are in the application and provide a way to navigate back to previous levels.
        </Typography>
      </Stack>

      <Stack spacing="md">
        <Typography variant="h2">When To Use</Typography>
        <Stack spacing="sm">
          <Typography variant="body">• When the system has more than two layers in a hierarchy.</Typography>
          <Typography variant="body">• When you need to inform the user of where they are in the application.</Typography>
          <Typography variant="body">• When the user needs to navigate back to a higher level.</Typography>
          <Typography variant="body">• For websites with complex navigation structures or deep page hierarchies.</Typography>
          <Typography variant="body">• In conjunction with page headers to provide additional context.</Typography>
        </Stack>
      </Stack>

      <Stack spacing="lg">
        <Typography variant="h2">Examples</Typography>

        {/* Basic Usage */}
        <Stack spacing="md">
          <Typography variant="h3">Basic Usage</Typography>
          <Typography variant="body" color="secondary">
            The simplest breadcrumb example with text-based navigation.
          </Typography>
          <Stack spacing="sm" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Breadcrumb items={basicItems} />
          </Stack>
        </Stack>

        {/* With Icons */}
        <Stack spacing="md">
          <Typography variant="h3">With an Icon</Typography>
          <Typography variant="body" color="secondary">
            Each breadcrumb item can have an icon to provide better visual context.
          </Typography>
          <Stack spacing="sm" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Breadcrumb items={iconItems} />
          </Stack>
        </Stack>

        {/* With Params */}
        <Stack spacing="md">
          <Typography variant="h3">With Params</Typography>
          <Typography variant="body" color="secondary">
            Demonstrate route parameters and dynamic breadcrumb paths.
          </Typography>
          <Stack spacing="sm" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Breadcrumb items={paramItems} />
          </Stack>
        </Stack>

        {/* Configure Separator */}
        <Stack spacing="md">
          <Typography variant="h3">Configure the Separator</Typography>
          <Typography variant="body" color="secondary">
            Customize the separator globally via the separator prop.
          </Typography>
          <Stack spacing="md" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">Separator: ">"</Typography>
              <Breadcrumb items={basicItems} separator=">" />
            </Stack>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">Separator: "|"</Typography>
              <Breadcrumb items={basicItems} separator="|" />
            </Stack>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">Separator: "/"</Typography>
              <Breadcrumb items={basicItems} separator="/" />
            </Stack>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">Separator: Arrow Icon</Typography>
              <Breadcrumb items={basicItems} separator={<ArrowRight size={12} />} />
            </Stack>
          </Stack>
        </Stack>

        {/* Breadcrumbs with Dropdown Menu */}
        <Stack spacing="md">
          <Typography variant="h3">Breadcrumbs with Dropdown Menu</Typography>
          <Typography variant="body" color="secondary">
            Show breadcrumb items that contain dropdown menus for additional navigation options.
          </Typography>
          <Stack spacing="sm" style={{ padding: '20px 20px 60px 20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Breadcrumb items={dropdownItems} />
            <Typography variant="caption" color="secondary">
              Hover over "Documents" or "Projects" to see dropdown menus
            </Typography>
          </Stack>
        </Stack>

        {/* Configuring the Separator Independently */}
        <Stack spacing="md">
          <Typography variant="h3">Configuring the Separator Independently</Typography>
          <Typography variant="body" color="secondary">
            Customize separator for each breadcrumb item separately using the separator property.
          </Typography>
          <Stack spacing="sm" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Breadcrumb items={customSeparatorItems} />
          </Stack>
        </Stack>

        {/* Debug Routes */}
        <Stack spacing="md">
          <Typography variant="h3">Debug Routes</Typography>
          <Typography variant="body" color="secondary">
            Interactive breadcrumb that shows route debugging and navigation tracking.
          </Typography>
          <Stack spacing="md" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Flex justify="space-between" align="center">
              <Typography variant="body" weight="medium">Current Path: {currentPath}</Typography>
              <IconButton
                icon={<Trash2 size={16} />}
                variant="outline"
                size="sm"
                onClick={clearDebug}
                aria-label="Clear debug routes"
              />
            </Flex>
            
            <Breadcrumb items={generateBreadcrumbsFromPath(currentPath)} />
            
            {debugRoutes.length > 0 && (
              <Stack spacing="xs">
                <Typography variant="body" weight="medium">Debug Routes:</Typography>
                <Stack spacing="xs" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                  {debugRoutes.map((route, index) => (
                    <Typography key={index} variant="caption" color="secondary" style={{ fontFamily: 'monospace' }}>
                      {route}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            )}

            <Stack spacing="xs">
              <Typography variant="caption" weight="medium">Try navigating:</Typography>
              <Flex wrap="wrap" gap="xs">
                <IconButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/dashboard')}
                >
                  Dashboard
                </IconButton>
                <IconButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/settings/account')}
                >
                  Settings
                </IconButton>
                <IconButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/shop/electronics/laptops/macbook-pro')}
                >
                  Deep Path
                </IconButton>
                <IconButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/admin/users/permissions/roles')}
                >
                  Admin
                </IconButton>
              </Flex>
            </Stack>
          </Stack>
        </Stack>

        {/* Max Items with Ellipsis */}
        <Stack spacing="md">
          <Typography variant="h3">Max Items with Ellipsis</Typography>
          <Typography variant="body" color="secondary">
            When there are too many items, use maxItems to collapse the middle items into an ellipsis.
          </Typography>
          <Stack spacing="md" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">Without maxItems (shows all 8 items):</Typography>
              <Breadcrumb items={longPathItems} />
            </Stack>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">With maxItems={4} (collapses middle items):</Typography>
              <Breadcrumb items={longPathItems} maxItems={4} />
            </Stack>
            <Stack spacing="sm">
              <Typography variant="caption" color="secondary">With maxItems={3} (more aggressive collapse):</Typography>
              <Breadcrumb items={longPathItems} maxItems={3} />
            </Stack>
          </Stack>
        </Stack>

        {/* Custom Item Render */}
        <Stack spacing="md">
          <Typography variant="h3">Custom Item Render</Typography>
          <Typography variant="body" color="secondary">
            Use the itemRender prop to completely customize how breadcrumb items are rendered.
          </Typography>
          <Stack spacing="sm" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Breadcrumb
              items={iconItems}
              itemRender={(item, index, items) => {
                const isLast = index === items.length - 1;
                return (
                  <Flex align="center" gap="xs" style={{ 
                    padding: '4px 8px', 
                    backgroundColor: isLast ? '#f0f9ff' : 'transparent',
                    borderRadius: '4px',
                    border: isLast ? '1px solid #0ea5e9' : 'none'
                  }}>
                    {item.icon}
                    <Typography variant="body" weight={isLast ? "medium" : "normal"}>
                      {item.label}
                    </Typography>
                  </Flex>
                );
              }}
            />
          </Stack>
        </Stack>

        {/* Interactive Example */}
        <Stack spacing="md">
          <Typography variant="h3">Interactive Example</Typography>
          <Typography variant="body" color="secondary">
            A more complex example showing various breadcrumb features working together.
          </Typography>
          <Stack spacing="md" style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Flex align="center" gap="md">
              <Typography variant="body" weight="medium">Navigate to:</Typography>
              <Flex wrap="wrap" gap="xs">
                <IconButton
                  icon={<Calendar size={14} />}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/calendar/events/meeting/details')}
                >
                  Calendar
                </IconButton>
                <IconButton
                  icon={<Mail size={14} />}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/inbox/important/email/thread')}
                >
                  Email
                </IconButton>
                <IconButton
                  icon={<ShoppingCart size={14} />}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/store/cart/checkout/payment')}
                >
                  Store
                </IconButton>
                <IconButton
                  icon={<Settings size={14} />}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/settings/appearance/theme')}
                >
                  Settings
                </IconButton>
              </Flex>
            </Flex>
            
            <Breadcrumb 
              items={generateBreadcrumbsFromPath(currentPath)} 
              maxItems={5}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="md">
        <Typography variant="h2">API Reference</Typography>
        
        <Stack spacing="md">
          <Typography variant="h3">Breadcrumb Props</Typography>
          <APITable rows={breadcrumbProps} />
        </Stack>

        <Stack spacing="md">
          <Typography variant="h3">BreadcrumbItem Props</Typography>
          <APITable rows={breadcrumbItemProps} />
        </Stack>
      </Stack>

      <Stack spacing="md">
        <Typography variant="h2">Accessibility</Typography>
        <Stack spacing="sm">
          <Typography variant="body">• The breadcrumb uses semantic HTML5 `nav` and `ol` elements for proper screen reader support.</Typography>
          <Typography variant="body">• The current page item includes `aria-current="page"` for accessibility.</Typography>
          <Typography variant="body">• Separators are marked with `aria-hidden="true"` to prevent screen readers from announcing them.</Typography>
          <Typography variant="body">• The navigation has a default `aria-label` of "breadcrumb" which can be customized.</Typography>
          <Typography variant="body">• Disabled items are properly marked and cannot be activated via keyboard or mouse.</Typography>
          <Typography variant="body">• All interactive elements are keyboard accessible and follow standard tabbing behavior.</Typography>
        </Stack>
      </Stack>

      <Stack spacing="md">
        <Typography variant="h2">Best Practices</Typography>
        <Stack spacing="sm">
          <Typography variant="body">• Keep breadcrumb labels concise and descriptive.</Typography>
          <Typography variant="body">• The current page should not be clickable (omit the href prop).</Typography>
          <Typography variant="body">• Use icons sparingly and consistently throughout the breadcrumb trail.</Typography>
          <Typography variant="body">• Consider using maxItems for very deep navigation hierarchies to prevent layout issues.</Typography>
          <Typography variant="body">• Ensure separators are visually distinct but not overwhelming.</Typography>
          <Typography variant="body">• Place breadcrumbs near the top of the page content, typically below the main navigation.</Typography>
          <Typography variant="body">• Don't use breadcrumbs as the primary navigation method - they should supplement main navigation.</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BreadcrumbDocs;
