import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Card } from "./Card";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { Tabs } from "../Tabs/Tabs";
import { Settings, Edit, Ellipsis, Heart, MessageCircle, Share2, User, Mail, Phone, Globe } from "lucide-react";
import { APITable, type APITableRow } from "../Shared/APITable";

const cardProps: APITableRow[] = [
  {
    property: "title",
    description: "Card title content.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "extra",
    description: "Extra content in the top-right corner of the card.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "bordered",
    description: "Toggle card border.",
    type: "boolean",
    default: "true",
  },
  {
    property: "hoverable",
    description: "Lift up when hovering card.",
    type: "boolean",
    default: "false",
  },
  {
    property: "loading",
    description: "Shows a loading indicator when true.",
    type: "boolean",
    default: "false",
  },
  {
    property: "size",
    description: "Size of card.",
    type: "'default' | 'small'",
    default: "'default'",
  },
  {
    property: "cover",
    description: "Card cover content, usually an image.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "actions",
    description: "Array of action elements, displayed at the bottom of the card.",
    type: "ReactNode[]",
    default: "-",
  },
  {
    property: "bodyStyle",
    description: "Inline style to apply to the card body.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "headStyle",
    description: "Inline style to apply to the card head.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "type",
    description: "Card style type.",
    type: "'default' | 'inner'",
    default: "'default'",
  },
  {
    property: "className",
    description: "Additional class name for the card.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the card.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Card content.",
    type: "ReactNode",
    default: "-",
  },
];

const cardMetaProps: APITableRow[] = [
  {
    property: "avatar",
    description: "Avatar or icon element.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "title",
    description: "Title content.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "description",
    description: "Description content.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style.",
    type: "React.CSSProperties",
    default: "-",
  },
];

export const CardDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const tabItems = [
    { key: "tab1", label: "App", children: "Content of Tab Pane 1" },
    { key: "tab2", label: "Card", children: "Content of Tab Pane 2" },
    { key: "tab3", label: "Article", children: "Content of Tab Pane 3" },
  ];

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Card</h1>
        <p>Simple rectangular container with various content arrangements. Cards contain content and actions about a single subject.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.</li>
          <li>Cards are surfaces that display content and actions on a single topic.</li>
          <li>They should be easy to scan for relevant and actionable information.</li>
          <li>Elements like text and images should be placed on them in a way that clearly indicates hierarchy.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Card */}
        <ExampleContainer
          title="Basic Card"
          description="A basic card containing a title, content, and extra corner content. Supports two sizes: default and small."
          style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
          code={`<Card
  title="Card title"
  extra={<a href="#">More</a>}
>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</Card>

<Card
  title="Small card"
  size="small"
  extra={<Settings size={16} />}
>
  <p>Small card content</p>
</Card>`}
        >
          <>
            <Card
              title="Card title"
              extra={<a href="#" onClick={(e) => e.preventDefault()}>More</a>}
              style={{ width: '300px' }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card
              title="Small card"
              size="small"
              extra={<Settings size={16} />}
              style={{ width: '250px' }}
            >
              <p>Small card content</p>
            </Card>
          </>
        </ExampleContainer>

        {/* No Border */}
        <ExampleContainer
          title="No Border"
          description="A borderless card on a gray background."
          style={{ background: '#f5f5f5', padding: '20px' }}
          code={`<Card title="Card title" bordered={false}>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</Card>`}
        >
          <Card
            title="Card title"
            bordered={false}
            style={{ width: '300px' }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </ExampleContainer>

        {/* Simple Card */}
        <ExampleContainer
          title="Simple Card"
          description="A simple card only containing a content area."
          style={{ display: 'flex', gap: '16px' }}
          code={`<Card style={{ width: 300 }}>
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</Card>`}
        >
          <Card style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </ExampleContainer>

        {/* Customized Content */}
        <ExampleContainer
          title="Customized Content"
          description="Use Card.Meta to support flexible content."
          style={{ display: 'flex', gap: '16px' }}
          code={`<Card
  style={{ width: 300 }}
  cover={
    <img
      alt="example"
      src="https://via.placeholder.com/300x200/4f46e5/ffffff?text=Cover"
    />
  }
  actions={[
    <Settings key="setting" />,
    <Edit key="edit" />,
    <Ellipsis key="ellipsis" />,
  ]}
>
  <Card.Meta
    avatar={<Avatar src="https://via.placeholder.com/40x40/10b981/ffffff?text=A" />}
    title="Card title"
    description="This is the description"
  />
</Card>`}
        >
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://via.placeholder.com/300x200/4f46e5/ffffff?text=Cover"
              />
            }
            actions={[
              <Settings key="setting" />,
              <Edit key="edit" />,
              <Ellipsis key="ellipsis" />,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src="https://via.placeholder.com/40x40/10b981/ffffff?text=A" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </ExampleContainer>

        {/* Card in Column */}
        <ExampleContainer
          title="Card in Column"
          description="Demonstrate cards in a grid/column layout."
          style={{ width: '100%' }}
          code={`<div className="ui-card-grid">
  <Card title="Card title" hoverable>
    <p>Card content</p>
  </Card>
  <Card title="Card title" hoverable>
    <p>Card content</p>
  </Card>
  <Card title="Card title" hoverable>
    <p>Card content</p>
  </Card>
</div>`}
        >
          <div className="ui-card-grid">
            <Card title="Card title" hoverable>
              <p>Card content</p>
            </Card>
            <Card title="Card title" hoverable>
              <p>Card content</p>
            </Card>
            <Card title="Card title" hoverable>
              <p>Card content</p>
            </Card>
            <Card title="Card title" hoverable>
              <p>Card content</p>
            </Card>
          </div>
        </ExampleContainer>

        {/* Loading Card */}
        <ExampleContainer
          title="Loading Card"
          description="Show loading indicator while fetching data."
          style={{ display: 'flex', gap: '16px' }}
          code={`const [loading, setLoading] = useState(false);

<Card loading={loading} title="Card title">
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</Card>

<Button onClick={() => setLoading(!loading)}>
  Toggle Loading
</Button>`}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Card loading={loading} title="Card title" style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Button onClick={toggleLoading}>
              Toggle Loading
            </Button>
          </div>
        </ExampleContainer>

        {/* Grid Card */}
        <ExampleContainer
          title="Grid Card"
          description="Card with grid-style content."
          style={{ display: 'flex', gap: '16px' }}
          code={`<Card title="Grid Card">
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <User size={24} style={{ marginBottom: '8px' }} />
      <div>Users</div>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>1,234</div>
    </div>
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <Mail size={24} style={{ marginBottom: '8px' }} />
      <div>Messages</div>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>567</div>
    </div>
  </div>
</Card>`}
        >
          <Card title="Grid Card" style={{ width: 300 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <User size={24} style={{ marginBottom: '8px', color: 'var(--primary-color)' }} />
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Users</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)' }}>1,234</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <Mail size={24} style={{ marginBottom: '8px', color: 'var(--success-color)' }} />
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Messages</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)' }}>567</div>
              </div>
            </div>
          </Card>
        </ExampleContainer>

        {/* Inner Card */}
        <ExampleContainer
          title="Inner Card"
          description="Nested/inner card inside an ordinary card for multi-level structure."
          style={{ display: 'flex', gap: '16px' }}
          code={`<Card title="Card title">
  <p>Card content</p>
  <Card title="Inner Card" type="inner" size="small">
    <p>Inner card content</p>
  </Card>
</Card>`}
        >
          <Card title="Card title" style={{ width: 350 }}>
            <p>Card content</p>
            <Card title="Inner Card" type="inner" size="small">
              <p>Inner card content</p>
            </Card>
          </Card>
        </ExampleContainer>

        {/* With Tabs */}
        <ExampleContainer
          title="With Tabs"
          description="Card with tabs to host more content."
          style={{ display: 'flex', gap: '16px' }}
          code={`<Card
  title="Card with tabs"
  extra={<Button size="sm">More</Button>}
>
  <Tabs
    items={tabItems}
    activeKey={activeTab}
    onChange={setActiveTab}
  />
</Card>`}
        >
          <Card
            title="Card with tabs"
            extra={<Button size="sm">More</Button>}
            style={{ width: 400 }}
          >
            <Tabs
              items={tabItems}
              activeKey={activeTab}
              onChange={setActiveTab}
            />
          </Card>
        </ExampleContainer>

        {/* Support More Content Configuration */}
        <ExampleContainer
          title="Support More Content Configuration"
          description="Card supporting cover, avatar, title, and description with actions."
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          code={`<Card
  hoverable
  style={{ width: 240 }}
  cover={<img alt="example" src="https://via.placeholder.com/240x160/6366f1/ffffff?text=Cover" />}
  actions={[
    <Heart key="heart" />,
    <MessageCircle key="comment" />,
    <Share2 key="share" />,
  ]}
>
  <Card.Meta
    avatar={<Avatar>U</Avatar>}
    title="Europe Street beat"
    description="www.instagram.com"
  />
</Card>

<Card
  style={{ width: 300 }}
  actions={[
    <User key="user" />,
    <Mail key="mail" />,
    <Phone key="phone" />,
    <Globe key="globe" />,
  ]}
>
  <Card.Meta
    avatar={<Avatar src="https://via.placeholder.com/40x40/f59e0b/ffffff?text=JD" />}
    title="John Doe"
    description="Software Engineer with 5+ years of experience in React and Node.js. Passionate about building scalable web applications."
  />
</Card>`}
        >
          <>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://via.placeholder.com/240x160/6366f1/ffffff?text=Cover" />}
              actions={[
                <Heart key="heart" />,
                <MessageCircle key="comment" />,
                <Share2 key="share" />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar>U</Avatar>}
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>

            <Card
              style={{ width: 300 }}
              actions={[
                <User key="user" />,
                <Mail key="mail" />,
                <Phone key="phone" />,
                <Globe key="globe" />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src="https://via.placeholder.com/40x40/f59e0b/ffffff?text=JD" />}
                title="John Doe"
                description="Software Engineer with 5+ years of experience in React and Node.js. Passionate about building scalable web applications."
              />
            </Card>
          </>
        </ExampleContainer>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <h3>Card</h3>
        <p>This section describes all the available props for the <strong>Card</strong> component.</p>
        <APITable props={cardProps} />
        
        <h3>Card.Meta</h3>
        <p>This section describes all the available props for the <strong>Card.Meta</strong> component.</p>
        <APITable props={cardMetaProps} />
      </div>
    </div>
  );
};
