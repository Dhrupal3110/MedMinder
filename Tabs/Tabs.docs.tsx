import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Tabs, TabItem } from "./Tabs";
import { 
  User, 
  Settings, 
  Bell, 
  Mail, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Download,
  Filter,
  Plus,
  Search
} from "lucide-react";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { APITable, type APITableRow } from "../Shared/APITable";

const tabsProps: APITableRow[] = [
  {
    property: "defaultActiveKey",
    description: "Initial active tab key (uncontrolled mode).",
    type: "string",
    default: "-",
  },
  {
    property: "activeKey",
    description: "Currently active tab key (controlled mode).",
    type: "string",
    default: "-",
  },
  {
    property: "onChange",
    description: "Callback executed when active tab changes.",
    type: "(activeKey: string) => void",
    default: "-",
  },
  {
    property: "tabs",
    description: "Array of tab configurations.",
    type: "TabItem[]",
    default: "[]",
  },
  {
    property: "size",
    description: "Size of the tabs. Can be 'sm', 'md', or 'lg'.",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: "centered",
    description: "Whether to center the tab navigation.",
    type: "boolean",
    default: "false",
  },
  {
    property: "position",
    description: "Position of the tab navigation.",
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  {
    property: "type",
    description: "Style type of the tabs.",
    type: "'line' | 'card'",
    default: "'line'",
  },
  {
    property: "indicator",
    description: "Custom indicator configuration for line type tabs.",
    type: "{ size?: number; align?: 'start' | 'center' | 'end' }",
    default: "-",
  },
  {
    property: "extraContent",
    description: "Extra content to display on left/right of tab navigation.",
    type: "{ left?: ReactNode; right?: ReactNode }",
    default: "-",
  },
  {
    property: "closable",
    description: "Whether tabs can be closed (only applies to card type).",
    type: "boolean",
    default: "false",
  },
  {
    property: "addable",
    description: "Whether new tabs can be added (only applies to card type).",
    type: "boolean",
    default: "false",
  },
  {
    property: "renderTabBar",
    description: "Custom render function for the tab bar.",
    type: "(tabBarExtraContent: ReactNode, DefaultTabBar: ComponentType) => ReactNode",
    default: "-",
  },
  {
    property: "draggable",
    description: "Whether tabs can be reordered by dragging.",
    type: "boolean",
    default: "false",
  },
  {
    property: "onEdit",
    description: "Callback when tab is added or removed.",
    type: "(targetKey: string, action: 'add' | 'remove') => void",
    default: "-",
  },
  {
    property: "onTabClick",
    description: "Callback when tab is clicked.",
    type: "(key: string, event: React.MouseEvent) => void",
    default: "-",
  },
  {
    property: "className",
    description: "Additional CSS class for the tabs container.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline styles for the tabs container.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the tab list.",
    type: "string",
    default: "-",
  },
];

const tabItemProps: APITableRow[] = [
  {
    property: "key",
    description: "Unique identifier for the tab.",
    type: "string",
    default: "Required",
  },
  {
    property: "label",
    description: "Display label for the tab.",
    type: "ReactNode",
    default: "Required",
  },
  {
    property: "icon",
    description: "Icon to display before the label.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "disabled",
    description: "Whether the tab is disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "closable",
    description: "Whether this specific tab can be closed.",
    type: "boolean",
    default: "-",
  },
  {
    property: "children",
    description: "Content to render in the tab panel.",
    type: "ReactNode",
    default: "-",
  },
];

export const TabsDocs: React.FC = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [cardTabs, setCardTabs] = useState<TabItem[]>([
    { 
      key: "1", 
      label: "Tab 1", 
      children: <div>Content of Tab Pane 1</div> 
    },
    { 
      key: "2", 
      label: "Tab 2", 
      children: <div>Content of Tab Pane 2</div> 
    },
    { 
      key: "3", 
      label: "Tab 3", 
      closable: false,
      children: <div>Content of Tab Pane 3 (not closable)</div> 
    },
  ]);
  const [editableActiveKey, setEditableActiveKey] = useState("1");

  // Basic tabs
  const basicTabs: TabItem[] = [
    {
      key: "1",
      label: "Tab 1",
      children: <div style={{ padding: "16px" }}>Content of Tab Pane 1</div>,
    },
    {
      key: "2",
      label: "Tab 2",
      children: <div style={{ padding: "16px" }}>Content of Tab Pane 2</div>,
    },
    {
      key: "3",
      label: "Tab 3",
      children: <div style={{ padding: "16px" }}>Content of Tab Pane 3</div>,
    },
  ];

  // Disabled tabs
  const disabledTabs: TabItem[] = [
    {
      key: "1",
      label: "Tab 1",
      children: <div style={{ padding: "16px" }}>Tab 1 is accessible</div>,
    },
    {
      key: "2",
      label: "Tab 2 (disabled)",
      disabled: true,
      children: <div style={{ padding: "16px" }}>Tab 2 content</div>,
    },
    {
      key: "3",
      label: "Tab 3",
      children: <div style={{ padding: "16px" }}>Tab 3 is accessible</div>,
    },
  ];

  // Icon tabs
  const iconTabs: TabItem[] = [
    {
      key: "profile",
      label: "Profile",
      icon: <User size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Profile Settings</h3>
          <p>Manage your profile information and preferences.</p>
        </div>
      ),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Application Settings</h3>
          <p>Configure application behavior and preferences.</p>
        </div>
      ),
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <Bell size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Notification Settings</h3>
          <p>Control how and when you receive notifications.</p>
        </div>
      ),
    },
    {
      key: "messages",
      label: "Messages",
      icon: <Mail size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Message Center</h3>
          <p>View and manage your messages.</p>
        </div>
      ),
    },
  ];

  // Scrollable tabs
  const scrollableTabs: TabItem[] = [
    { key: "tab1", label: "Tab 1", children: <div style={{ padding: "16px" }}>Content 1</div> },
    { key: "tab2", label: "Tab 2", children: <div style={{ padding: "16px" }}>Content 2</div> },
    { key: "tab3", label: "Tab 3", children: <div style={{ padding: "16px" }}>Content 3</div> },
    { key: "tab4", label: "Tab 4", children: <div style={{ padding: "16px" }}>Content 4</div> },
    { key: "tab5", label: "Tab 5", children: <div style={{ padding: "16px" }}>Content 5</div> },
    { key: "tab6", label: "Tab 6", children: <div style={{ padding: "16px" }}>Content 6</div> },
    { key: "tab7", label: "Tab 7", children: <div style={{ padding: "16px" }}>Content 7</div> },
    { key: "tab8", label: "Tab 8", children: <div style={{ padding: "16px" }}>Content 8</div> },
    { key: "tab9", label: "Tab 9", children: <div style={{ padding: "16px" }}>Content 9</div> },
    { key: "tab10", label: "Tab 10", children: <div style={{ padding: "16px" }}>Content 10</div> },
  ];

  // Media tabs
  const mediaTabs: TabItem[] = [
    {
      key: "documents",
      label: "Documents",
      icon: <FileText size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Document Library</h3>
          <p>Browse and manage your documents.</p>
        </div>
      ),
    },
    {
      key: "images",
      label: "Images",
      icon: <Image size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Image Gallery</h3>
          <p>View and organize your images.</p>
        </div>
      ),
    },
    {
      key: "videos",
      label: "Videos",
      icon: <Video size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Video Collection</h3>
          <p>Watch and manage your videos.</p>
        </div>
      ),
    },
    {
      key: "music",
      label: "Music",
      icon: <Music size={16} />,
      children: (
        <div style={{ padding: "16px" }}>
          <h3>Music Library</h3>
          <p>Listen to and organize your music.</p>
        </div>
      ),
    },
  ];

  const handleEditableChange = (key: string) => {
    setEditableActiveKey(key);
  };

  const handleEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const newKey = `tab-${Date.now()}`;
      const newTab: TabItem = {
        key: newKey,
        label: `New Tab`,
        children: <div style={{ padding: "16px" }}>Content of {newKey}</div>,
      };
      setCardTabs(prev => [...prev, newTab]);
      setEditableActiveKey(newKey);
    } else if (action === 'remove') {
      const newTabs = cardTabs.filter(tab => tab.key !== targetKey);
      setCardTabs(newTabs);
      
      if (editableActiveKey === targetKey && newTabs.length > 0) {
        setEditableActiveKey(newTabs[0].key);
      }
    }
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Tabs</h1>
        <p>Tabs make it easy to switch between different views. They organize related content across multiple panels, showing one panel at a time.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you want to organize content in a way that saves space and reduces cognitive load.</li>
          <li>When you have multiple categories, views, or panels of related information.</li>
          <li>Perfect for settings pages, dashboards, forms with multiple steps, or content categorization.</li>
          <li>Use tabs to provide navigation between related sections without leaving the page context.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic */}
        <ExampleContainer
          title="Basic"
          description="The most basic usage of tabs. Click on tabs to switch content."
          code={`const tabs = [
  {
    key: "1",
    label: "Tab 1",
    children: <div>Content of Tab Pane 1</div>,
  },
  {
    key: "2",
    label: "Tab 2", 
    children: <div>Content of Tab Pane 2</div>,
  },
  {
    key: "3",
    label: "Tab 3",
    children: <div>Content of Tab Pane 3</div>,
  },
];

<Tabs defaultActiveKey="1" tabs={tabs} />`}
        >
          <Tabs defaultActiveKey="1" tabs={basicTabs} />
        </ExampleContainer>

        {/* Disabled */}
        <ExampleContainer
          title="Disabled"
          description="Tab can be disabled, making it unclickable."
          code={`const tabs = [
  {
    key: "1",
    label: "Tab 1",
    children: <div>Tab 1 is accessible</div>,
  },
  {
    key: "2",
    label: "Tab 2 (disabled)",
    disabled: true,
    children: <div>Tab 2 content</div>,
  },
  {
    key: "3", 
    label: "Tab 3",
    children: <div>Tab 3 is accessible</div>,
  },
];

<Tabs defaultActiveKey="1" tabs={tabs} />`}
        >
          <Tabs defaultActiveKey="1" tabs={disabledTabs} />
        </ExampleContainer>

        {/* Centered */}
        <ExampleContainer
          title="Centered"
          description="Tabs can be centered in the container."
          code={`<Tabs 
  defaultActiveKey="1" 
  tabs={tabs}
  centered 
/>`}
        >
          <Tabs defaultActiveKey="1" tabs={basicTabs} centered />
        </ExampleContainer>

        {/* Icon */}
        <ExampleContainer
          title="Icon"
          description="Tabs can display icons alongside labels for better visual hierarchy."
          code={`const iconTabs = [
  {
    key: "profile",
    label: "Profile",
    icon: <User size={16} />,
    children: <div>Profile Settings</div>,
  },
  {
    key: "settings",
    label: "Settings", 
    icon: <Settings size={16} />,
    children: <div>Application Settings</div>,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: <Bell size={16} />,
    children: <div>Notification Settings</div>,
  },
];

<Tabs defaultActiveKey="profile" tabs={iconTabs} />`}
        >
          <Tabs defaultActiveKey="profile" tabs={iconTabs} />
        </ExampleContainer>

        {/* Slide */}
        <ExampleContainer
          title="Slide"
          description="When there are too many tabs, they will scroll horizontally."
          code={`const manyTabs = [
  { key: "tab1", label: "Tab 1", children: <div>Content 1</div> },
  { key: "tab2", label: "Tab 2", children: <div>Content 2</div> },
  // ... more tabs
  { key: "tab10", label: "Tab 10", children: <div>Content 10</div> },
];

<Tabs defaultActiveKey="tab1" tabs={manyTabs} />`}
          style={{ maxWidth: "400px" }}
        >
          <div style={{ maxWidth: "400px" }}>
            <Tabs defaultActiveKey="tab1" tabs={scrollableTabs} />
          </div>
        </ExampleContainer>

        {/* Extra content */}
        <ExampleContainer
          title="Extra Content"
          description="Add extra actions or content on the left or right side of the tab navigation."
          code={`<Tabs 
  defaultActiveKey="documents"
  tabs={mediaTabs}
  extraContent={{
    left: <Button size="sm" icon={<Download />}>Export</Button>,
    right: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" icon={<Filter />}>Filter</Button>
        <Button size="sm" icon={<Search />}>Search</Button>
      </div>
    )
  }}
/>`}
        >
          <Tabs 
            defaultActiveKey="documents"
            tabs={mediaTabs}
            extraContent={{
              left: <Button size="sm" icon={<Download size={14} />}>Export</Button>,
              right: (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="sm" icon={<Filter size={14} />}>Filter</Button>
                  <Button size="sm" icon={<Search size={14} />}>Search</Button>
                </div>
              )
            }}
          />
        </ExampleContainer>

        {/* Size */}
        <ExampleContainer
          title="Size"
          description="Tabs come in three sizes: small, medium (default), and large."
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          code={`<Tabs size="sm" defaultActiveKey="1" tabs={tabs} />
<Tabs size="md" defaultActiveKey="1" tabs={tabs} />
<Tabs size="lg" defaultActiveKey="1" tabs={tabs} />`}
        >
          <>
            <div>
              <h4>Small</h4>
              <Tabs size="sm" defaultActiveKey="1" tabs={basicTabs} />
            </div>
            <div>
              <h4>Medium (Default)</h4>
              <Tabs size="md" defaultActiveKey="1" tabs={basicTabs} />
            </div>
            <div>
              <h4>Large</h4>
              <Tabs size="lg" defaultActiveKey="1" tabs={basicTabs} />
            </div>
          </>
        </ExampleContainer>

        {/* Position */}
        <ExampleContainer
          title="Position"
          description="Tabs can be positioned on any side: top, bottom, left, or right. On mobile, vertical tabs automatically switch to top."
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          code={`<Tabs position="top" defaultActiveKey="1" tabs={tabs} />
<Tabs position="bottom" defaultActiveKey="1" tabs={tabs} />
<Tabs position="left" defaultActiveKey="1" tabs={tabs} />
<Tabs position="right" defaultActiveKey="1" tabs={tabs} />`}
        >
          <>
            <div>
              <h4>Top (Default)</h4>
              <Tabs position="top" defaultActiveKey="1" tabs={basicTabs} />
            </div>
            <div>
              <h4>Bottom</h4>
              <Tabs position="bottom" defaultActiveKey="1" tabs={basicTabs} />
            </div>
            <div style={{ height: "200px" }}>
              <h4>Left</h4>
              <Tabs position="left" defaultActiveKey="1" tabs={basicTabs} />
            </div>
            <div style={{ height: "200px" }}>
              <h4>Right</h4>
              <Tabs position="right" defaultActiveKey="1" tabs={basicTabs} />
            </div>
          </>
        </ExampleContainer>

        {/* Card type */}
        <ExampleContainer
          title="Card Type"
          description="Card-style tabs with background and rounded corners."
          code={`<Tabs 
  type="card" 
  defaultActiveKey="1" 
  tabs={tabs} 
/>`}
        >
          <Tabs type="card" defaultActiveKey="1" tabs={iconTabs} />
        </ExampleContainer>

        {/* Add & close tab */}
        <ExampleContainer
          title="Add & Close Tab"
          description="Card tabs that can be added and closed dynamically."
          code={`const [tabs, setTabs] = useState([
  { key: "1", label: "Tab 1", children: <div>Content 1</div> },
  { key: "2", label: "Tab 2", children: <div>Content 2</div> },
  { key: "3", label: "Tab 3", closable: false, children: <div>Content 3</div> },
]);

const handleEdit = (targetKey: string, action: 'add' | 'remove') => {
  if (action === 'add') {
    const newTab = {
      key: \`tab-\${Date.now()}\`,
      label: 'New Tab',
      children: <div>New content</div>,
    };
    setTabs(prev => [...prev, newTab]);
  } else {
    setTabs(prev => prev.filter(tab => tab.key !== targetKey));
  }
};

<Tabs
  type="card"
  activeKey={activeKey}
  onChange={setActiveKey}
  tabs={tabs}
  closable
  addable
  onEdit={handleEdit}
/>`}
        >
          <Tabs
            type="card"
            activeKey={editableActiveKey}
            onChange={handleEditableChange}
            tabs={cardTabs}
            closable
            addable
            onEdit={handleEdit}
          />
        </ExampleContainer>

        {/* Customized trigger */}
        <ExampleContainer
          title="Customized Trigger"
          description="Hide the default add button and use a custom trigger."
          code={`<div>
  <div style={{ marginBottom: '16px' }}>
    <Button 
      icon={<Plus />} 
      onClick={() => handleEdit('', 'add')}
      size="sm"
    >
      Add Tab
    </Button>
  </div>
  <Tabs
    type="card"
    activeKey={activeKey}
    onChange={setActiveKey}
    tabs={tabs}
    closable
    onEdit={handleEdit}
  />
</div>`}
        >
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Button 
                icon={<Plus size={14} />} 
                onClick={() => handleEdit('', 'add')}
                size="sm"
              >
                Add Custom Tab
              </Button>
            </div>
            <Tabs
              type="card"
              activeKey={editableActiveKey}
              onChange={handleEditableChange}
              tabs={cardTabs}
              closable
              onEdit={handleEdit}
            />
          </div>
        </ExampleContainer>

        {/* Controlled vs Uncontrolled */}
        <ExampleContainer
          title="Controlled vs Uncontrolled"
          description="Tabs can be controlled (with activeKey) or uncontrolled (with defaultActiveKey)."
          code={`// Controlled
const [activeKey, setActiveKey] = useState("1");
<Tabs 
  activeKey={activeKey}
  onChange={setActiveKey}
  tabs={tabs}
/>

// Uncontrolled
<Tabs 
  defaultActiveKey="1"
  tabs={tabs}
/>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h4>Controlled (activeKey: {activeKey})</h4>
              <div style={{ marginBottom: '8px' }}>
                <Button size="sm" onClick={() => setActiveKey("1")}>Set Tab 1</Button>
                <Button size="sm" onClick={() => setActiveKey("2")} style={{ marginLeft: '8px' }}>Set Tab 2</Button>
                <Button size="sm" onClick={() => setActiveKey("3")} style={{ marginLeft: '8px' }}>Set Tab 3</Button>
              </div>
              <Tabs 
                activeKey={activeKey}
                onChange={setActiveKey}
                tabs={basicTabs}
              />
            </div>
            <div>
              <h4>Uncontrolled</h4>
              <Tabs 
                defaultActiveKey="1"
                tabs={basicTabs}
              />
            </div>
          </div>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Tabs</strong> component. 
          You can use these properties to control behavior, appearance, and interactivity.</p>
        <APITable props={tabsProps} />
      </div>

      <div className="docs-section">
        <h2>TabItem</h2>
        <p>Configuration for individual tab items in the tabs array.</p>
        <APITable props={tabItemProps} />
      </div>
    </div>
  );
};
