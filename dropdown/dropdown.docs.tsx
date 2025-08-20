import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Dropdown, DropdownButton, MenuItem } from "./Dropdown";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { Typography } from "../Typography/Typography";
import { APITable, type APITableRow } from "../Shared/APITable";
import { 
  User, 
  Settings, 
  Download, 
  Edit, 
  Delete, 
  Copy, 
  Share2, 
  Heart, 
  MoreHorizontal,
  ChevronDown,
  FileText,
  Image,
  Music,
  Video
} from "lucide-react";

const { Text } = Typography;

const dropdownProps: APITableRow[] = [
  {
    property: "menu",
    description: "The menu configuration object containing items and behavior settings.",
    type: "{ items: MenuItem[]; selectable?: boolean; selectedKeys?: string[]; onSelect?: Function }",
    default: "-",
  },
  {
    property: "trigger",
    description: "The trigger mode which executes the dropdown action.",
    type: "'hover' | 'click' | 'contextMenu' | Array<'hover' | 'click' | 'contextMenu'>",
    default: "'hover'",
  },
  {
    property: "placement",
    description: "Placement of popup menu.",
    type: "'top' | 'bottom' | 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft'",
    default: "'bottom'",
  },
  {
    property: "arrow",
    description: "Whether the dropdown arrow should be shown.",
    type: "boolean | { pointAtCenter?: boolean }",
    default: "false",
  },
  {
    property: "disabled",
    description: "Whether the dropdown menu is disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "open",
    description: "Whether the dropdown menu is currently open (controlled mode).",
    type: "boolean",
    default: "-",
  },
  {
    property: "onOpenChange",
    description: "Callback executed when dropdown open state changes.",
    type: "(open: boolean, info?: { source: 'trigger' | 'menu' | 'outside' }) => void",
    default: "-",
  },
  {
    property: "autoClose",
    description: "Whether to close dropdown when menu item is clicked.",
    type: "boolean",
    default: "true",
  },
  {
    property: "popupClassName",
    description: "The class name of the dropdown root element.",
    type: "string",
    default: "-",
  },
  {
    property: "popupStyle",
    description: "The style of the dropdown root element.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "popupRender",
    description: "Customize dropdown content.",
    type: "(menu: React.ReactNode) => React.ReactNode",
    default: "-",
  },
  {
    property: "getPopupContainer",
    description: "To set the container of the dropdown menu.",
    type: "() => HTMLElement",
    default: "() => document.body",
  },
];

const menuItemProps: APITableRow[] = [
  {
    property: "key",
    description: "The unique identifier of the menu item.",
    type: "string",
    default: "-",
  },
  {
    property: "label",
    description: "The label content of the menu item.",
    type: "React.ReactNode",
    default: "-",
  },
  {
    property: "icon",
    description: "The icon of the menu item.",
    type: "React.ReactNode",
    default: "-",
  },
  {
    property: "disabled",
    description: "Whether the menu item is disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "danger",
    description: "Whether the menu item is in danger state.",
    type: "boolean",
    default: "false",
  },
  {
    property: "type",
    description: "The type of the menu item.",
    type: "'item' | 'divider' | 'group'",
    default: "'item'",
  },
  {
    property: "children",
    description: "Sub-menu items for group type.",
    type: "MenuItem[]",
    default: "-",
  },
  {
    property: "onClick",
    description: "Callback executed when menu item is clicked.",
    type: "(info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => void",
    default: "-",
  },
];

const dropdownButtonProps: APITableRow[] = [
  {
    property: "icon",
    description: "The icon on the right side of the button.",
    type: "React.ReactNode",
    default: "<ChevronDown />",
  },
  {
    property: "loading",
    description: "Whether the button is in loading state.",
    type: "boolean",
    default: "false",
  },
  {
    property: "size",
    description: "The size of the button.",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: "onClick",
    description: "Callback executed when the left button is clicked.",
    type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
    default: "-",
  },
  {
    property: "onMenuClick",
    description: "Callback executed when menu item is clicked.",
    type: "(info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => void",
    default: "-",
  },
];

export const DropdownDocs: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['option1']);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [customMenuOpen, setCustomMenuOpen] = useState(false);

  // Basic menu items
  const basicItems: MenuItem[] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings size={16} />,
    },
    {
      key: 'logout',
      label: 'Logout',
    },
  ];

  // Menu items with extra nodes
  const extraNodeItems: MenuItem[] = [
    {
      key: 'save',
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '120px' }}>
          <span>Save</span>
          <Text style={{ fontSize: '12px', color: '#999' }}>Ctrl+S</Text>
        </div>
      ),
      icon: <Download size={16} />,
    },
    {
      key: 'edit',
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '120px' }}>
          <span>Edit</span>
          <Text style={{ fontSize: '12px', color: '#999' }}>Ctrl+E</Text>
        </div>
      ),
      icon: <Edit size={16} />,
    },
    {
      key: 'copy',
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '120px' }}>
          <span>Copy</span>
          <Text style={{ fontSize: '12px', color: '#999' }}>Ctrl+C</Text>
        </div>
      ),
      icon: <Copy size={16} />,
    },
  ];

  // Menu items with dividers and disabled items
  const complexItems: MenuItem[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <Edit size={16} />,
    },
    {
      key: 'copy',
      label: 'Copy',
      icon: <Copy size={16} />,
    },
    {
      key: 'divider1',
      type: 'divider',
    },
    {
      key: 'share',
      label: 'Share',
      icon: <Share2 size={16} />,
    },
    {
      key: 'favorite',
      label: 'Add to Favorites',
      icon: <Heart size={16} />,
      disabled: true,
    },
    {
      key: 'divider2',
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Delete size={16} />,
      danger: true,
    },
  ];

  // Selectable menu items
  const selectableItems: MenuItem[] = [
    {
      key: 'option1',
      label: 'Option 1',
    },
    {
      key: 'option2',
      label: 'Option 2',
    },
    {
      key: 'option3',
      label: 'Option 3',
    },
    {
      key: 'divider1',
      type: 'divider',
    },
    {
      key: 'option4',
      label: 'Option 4',
    },
  ];

  // Context menu items
  const contextMenuItems: MenuItem[] = [
    {
      key: 'open',
      label: 'Open',
      icon: <FileText size={16} />,
    },
    {
      key: 'rename',
      label: 'Rename',
      icon: <Edit size={16} />,
    },
    {
      key: 'divider1',
      type: 'divider',
    },
    {
      key: 'cut',
      label: 'Cut',
    },
    {
      key: 'copy',
      label: 'Copy',
      icon: <Copy size={16} />,
    },
    {
      key: 'paste',
      label: 'Paste',
      disabled: true,
    },
    {
      key: 'divider2',
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Delete size={16} />,
      danger: true,
    },
  ];

  // Group menu items
  const groupItems: MenuItem[] = [
    {
      key: 'documents',
      label: 'Documents',
      type: 'group',
      children: [
        {
          key: 'text',
          label: 'Text Document',
          icon: <FileText size={16} />,
        },
        {
          key: 'image',
          label: 'Image',
          icon: <Image size={16} />,
        },
      ],
    },
    {
      key: 'media',
      label: 'Media',
      type: 'group',
      children: [
        {
          key: 'music',
          label: 'Music',
          icon: <Music size={16} />,
        },
        {
          key: 'video',
          label: 'Video',
          icon: <Video size={16} />,
        },
      ],
    },
  ];

  const handleMenuClick = (info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => {
    console.log('Menu item clicked:', info);
  };

  const handleSelectableMenuSelect = (info: { key: string; selectedKeys: string[] }) => {
    setSelectedKeys(info.selectedKeys);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Dropdown</h1>
        <p>A dropdown list appears when a user clicks or hovers over a trigger. Dropdowns are used to display a list of actions, options, or navigation items.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you need to provide the user with a list of actions or options.</li>
          <li>Use dropdown menus to organize many related actions in a limited space.</li>
          <li>When you want to hide secondary actions or less commonly used features.</li>
          <li>Perfect for navigation menus, action menus, and context-sensitive options.</li>
          <li>Can be triggered by hover, click, or right-click interactions.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="The most basic dropdown menu."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`const items = [
  { key: 'profile', label: 'Profile', icon: <User size={16} /> },
  { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  { key: 'logout', label: 'Logout' },
];

<Dropdown menu={{ items }} trigger="click">
  <Button>
    Hover me
    <ChevronDown size={16} />
  </Button>
</Dropdown>`}
        >
          <>
            <Dropdown 
              menu={{ items: basicItems, onSelect: handleMenuClick as any }} 
              trigger="hover"
            >
              <Button>
                Hover me
                <ChevronDown size={16} />
              </Button>
            </Dropdown>

            <Dropdown 
              menu={{ items: basicItems, onSelect: handleMenuClick as any }} 
              trigger="click"
            >
              <Button>
                Click me
                <ChevronDown size={16} />
              </Button>
            </Dropdown>
          </>
        </ExampleContainer>

        {/* Extra node */}
        <ExampleContainer
          title="Extra node"
          description="The dropdown menu with shortcuts or extra information."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`const items = [
  {
    key: 'save',
    label: (
      <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '120px' }}>
        <span>Save</span>
        <Text style={{ fontSize: '12px', color: '#999' }}>Ctrl+S</Text>
      </div>
    ),
    icon: <Download size={16} />,
  },
  // ... more items
];`}
        >
          <Dropdown 
            menu={{ items: extraNodeItems, onSelect: handleMenuClick as any }} 
            trigger="click"
          >
            <Button>
              Actions
              <ChevronDown size={16} />
            </Button>
          </Dropdown>
        </ExampleContainer>

        {/* Placement */}
        <ExampleContainer
          title="Placement"
          description="Support 6 placements."
          style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
          code={`<Dropdown menu={{ items }} placement="bottom">
  <Button>Bottom</Button>
</Dropdown>
<Dropdown menu={{ items }} placement="bottomLeft">
  <Button>Bottom Left</Button>
</Dropdown>
<Dropdown menu={{ items }} placement="bottomRight">
  <Button>Bottom Right</Button>
</Dropdown>`}
        >
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <Dropdown menu={{ items: basicItems }} placement="topLeft" trigger="click">
                <Button size="sm">Top Left</Button>
              </Dropdown>
              <Dropdown menu={{ items: basicItems }} placement="top" trigger="click">
                <Button size="sm">Top</Button>
              </Dropdown>
              <Dropdown menu={{ items: basicItems }} placement="topRight" trigger="click">
                <Button size="sm">Top Right</Button>
              </Dropdown>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Dropdown menu={{ items: basicItems }} placement="bottomLeft" trigger="click">
                <Button size="sm">Bottom Left</Button>
              </Dropdown>
              <Dropdown menu={{ items: basicItems }} placement="bottom" trigger="click">
                <Button size="sm">Bottom</Button>
              </Dropdown>
              <Dropdown menu={{ items: basicItems }} placement="bottomRight" trigger="click">
                <Button size="sm">Bottom Right</Button>
              </Dropdown>
            </div>
          </>
        </ExampleContainer>

        {/* Arrow */}
        <ExampleContainer
          title="Arrow"
          description="You could display an arrow."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Dropdown menu={{ items }} arrow>
  <Button>With Arrow</Button>
</Dropdown>
<Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
  <Button>Point At Center</Button>
</Dropdown>`}
        >
          <>
            <Dropdown menu={{ items: basicItems }} arrow trigger="click">
              <Button>
                With Arrow
                <ChevronDown size={16} />
              </Button>
            </Dropdown>

            <Dropdown menu={{ items: basicItems }} arrow={{ pointAtCenter: true }} trigger="click">
              <Button>
                Point At Center
                <ChevronDown size={16} />
              </Button>
            </Dropdown>
          </>
        </ExampleContainer>

        {/* Other elements */}
        <ExampleContainer
          title="Other elements"
          description="Divider and disabled menu item."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`const items = [
  { key: 'edit', label: 'Edit', icon: <Edit size={16} /> },
  { key: 'copy', label: 'Copy', icon: <Copy size={16} /> },
  { key: 'divider1', type: 'divider' },
  { key: 'share', label: 'Share', icon: <Share2 size={16} /> },
  { key: 'favorite', label: 'Add to Favorites', disabled: true },
  { key: 'divider2', type: 'divider' },
  { key: 'delete', label: 'Delete', danger: true },
];`}
        >
          <Dropdown menu={{ items: complexItems }} trigger="click">
            <Button>
              Complex Menu
              <ChevronDown size={16} />
            </Button>
          </Dropdown>
        </ExampleContainer>

        {/* Button with dropdown menu */}
        <ExampleContainer
          title="Button with dropdown menu"
          description="A button on the left and a dropdown menu on the right."
          style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
          code={`<DropdownButton
  menu={{ items }}
  onClick={() => console.log('Button clicked')}
  onMenuClick={handleMenuClick}
>
  Actions
</DropdownButton>`}
        >
          <>
            <DropdownButton
              menu={{ items: basicItems }}
              onClick={() => console.log('Button clicked')}
              onMenuClick={handleMenuClick}
            >
              Actions
            </DropdownButton>

            <DropdownButton
              menu={{ items: complexItems }}
              onClick={() => console.log('Primary action')}
              onMenuClick={handleMenuClick}
              size="sm"
            >
              Small
            </DropdownButton>

            <DropdownButton
              menu={{ items: basicItems }}
              onClick={() => console.log('Large button')}
              onMenuClick={handleMenuClick}
              size="lg"
            >
              Large
            </DropdownButton>

            <DropdownButton
              menu={{ items: basicItems }}
              loading={true}
              disabled
            >
              Loading
            </DropdownButton>
          </>
        </ExampleContainer>

        {/* Custom dropdown */}
        <ExampleContainer
          title="Custom dropdown"
          description="Customize dropdown content via popupRender."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Dropdown
  popupRender={(menu) => (
    <div style={{ padding: '16px', background: '#fff', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
      <Typography.Text strong>Custom Header</Typography.Text>
      <Divider style={{ margin: '8px 0' }} />
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <Button size="sm" style={{ width: '100%' }}>
        Custom Action
      </Button>
    </div>
  )}
  menu={{ items: basicItems }}
  trigger="click"
>
  <Button>Custom Dropdown</Button>
</Dropdown>`}
        >
          <Dropdown
            popupRender={(menu) => (
              <div style={{ 
                padding: '16px', 
                background: 'var(--bg-primary)', 
                borderRadius: '6px', 
                boxShadow: 'var(--dropdown-shadow)',
                border: '1px solid var(--dropdown-border)'
              }}>
                <Text strong>Custom Header</Text>
                <Divider style={{ margin: '8px 0' }} />
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Button size="sm" style={{ width: '100%' }}>
                  Custom Action
                </Button>
              </div>
            )}
            menu={{ items: basicItems }}
            trigger="click"
          >
            <Button>Custom Dropdown</Button>
          </Dropdown>
        </ExampleContainer>

        {/* The way of hiding menu */}
        <ExampleContainer
          title="The way of hiding menu"
          description="Configure autoClose to prevent automatic closing."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Dropdown menu={{ items }} autoClose={false}>
  <Button>Won't Close</Button>
</Dropdown>
<Dropdown menu={{ items }} autoClose={true}>
  <Button>Auto Close</Button>
</Dropdown>`}
        >
          <>
            <Dropdown menu={{ items: basicItems }} autoClose={false} trigger="click">
              <Button>
                Won't Close
                <ChevronDown size={16} />
              </Button>
            </Dropdown>

            <Dropdown menu={{ items: basicItems }} autoClose={true} trigger="click">
              <Button>
                Auto Close
                <ChevronDown size={16} />
              </Button>
            </Dropdown>
          </>
        </ExampleContainer>

        {/* Context menu */}
        <ExampleContainer
          title="Context menu"
          description="The dropdown menu with context menu trigger."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Dropdown menu={{ items }} trigger="contextMenu">
  <div style={{ 
    padding: '40px', 
    background: '#f5f5f5', 
    textAlign: 'center',
    borderRadius: '6px',
    border: '2px dashed #d9d9d9'
  }}>
    Right click here
  </div>
</Dropdown>`}
        >
          <Dropdown 
            menu={{ items: contextMenuItems }} 
            trigger="contextMenu"
            open={contextMenuOpen}
            onOpenChange={setContextMenuOpen}
          >
            <div style={{ 
              padding: '40px', 
              background: 'var(--bg-secondary)', 
              textAlign: 'center',
              borderRadius: '6px',
              border: '2px dashed var(--border-color)',
              cursor: 'context-menu',
              userSelect: 'none'
            }}>
              Right click here for context menu
            </div>
          </Dropdown>
        </ExampleContainer>

        {/* Selectable Menu */}
        <ExampleContainer
          title="Selectable Menu"
          description="Configure selectable property to enable selectable ability."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [selectedKeys, setSelectedKeys] = useState(['option1']);

<Dropdown 
  menu={{ 
    items: selectableItems, 
    selectable: true,
    selectedKeys,
    onSelect: ({ selectedKeys }) => setSelectedKeys(selectedKeys)
  }}
>
  <Button>Selectable Menu</Button>
</Dropdown>`}
        >
          <>
            <Dropdown 
              menu={{ 
                items: selectableItems, 
                selectable: true,
                selectedKeys,
                onSelect: handleSelectableMenuSelect
              }}
              trigger="click"
            >
              <Button>
                Selectable Menu
                <ChevronDown size={16} />
              </Button>
            </Dropdown>
            <Text style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Selected: {selectedKeys.join(', ') || 'None'}
            </Text>
          </>
        </ExampleContainer>

        {/* Loading */}
        <ExampleContainer
          title="Loading"
          description="Add a loading state on Dropdown.Button."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<DropdownButton loading menu={{ items }}>
  Loading
</DropdownButton>`}
        >
          <>
            <DropdownButton
              loading
              menu={{ items: basicItems }}
            >
              Loading
            </DropdownButton>

            <DropdownButton
              loading
              menu={{ items: basicItems }}
              size="sm"
            >
              Small Loading
            </DropdownButton>

            <DropdownButton
              loading
              menu={{ items: basicItems }}
              size="lg"
            >
              Large Loading
            </DropdownButton>
          </>
        </ExampleContainer>

        {/* Group Menu */}
        <ExampleContainer
          title="Group Menu"
          description="Menu items can be grouped together."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`const groupItems = [
  {
    key: 'documents',
    label: 'Documents',
    type: 'group',
    children: [
      { key: 'text', label: 'Text Document', icon: <FileText size={16} /> },
      { key: 'image', label: 'Image', icon: <Image size={16} /> },
    ],
  },
  // ... more groups
];`}
        >
          <Dropdown menu={{ items: groupItems }} trigger="click">
            <Button>
              Create New
              <ChevronDown size={16} />
            </Button>
          </Dropdown>
        </ExampleContainer>

        {/* Disabled */}
        <ExampleContainer
          title="Disabled"
          description="Disabled state for dropdowns."
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          code={`<Dropdown menu={{ items }} disabled>
  <Button disabled>Disabled Dropdown</Button>
</Dropdown>
<DropdownButton menu={{ items }} disabled>
  Disabled Button
</DropdownButton>`}
        >
          <>
            <Dropdown menu={{ items: basicItems }} disabled>
              <Button disabled>
                Disabled Dropdown
                <ChevronDown size={16} />
              </Button>
            </Dropdown>

            <DropdownButton
              menu={{ items: basicItems }}
              disabled
            >
              Disabled Button
            </DropdownButton>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        
        <h3>Dropdown</h3>
        <p>This section describes all the available props for the <strong>Dropdown</strong> component.</p>
        <APITable props={dropdownProps} />

        <h3>MenuItem</h3>
        <p>Configuration for menu items in the dropdown.</p>
        <APITable props={menuItemProps} />

        <h3>Dropdown.Button</h3>
        <p>Properties for the <strong>DropdownButton</strong> component.</p>
        <APITable props={dropdownButtonProps} />
      </div>
    </div>
  );
};
