import React, { useState } from "react";
import { 
  Mail, 
  Bell, 
  Settings, 
  ShoppingCart, 
  CreditCard, 
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  Download,
  Edit,
  Trash2,
  Plus,
  Minus,
  User,
  MapPin,
  Phone
} from "lucide-react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Stack } from "./Stack";
import { Flex } from "../Flex/Flex";
import { Button } from "../Button/Button";
import { Input, Password, TextArea } from "../Input/Input";
import { Checkbox } from "../Checkbox/Checkbox";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { Switch } from "../Switch/Switch";
import { Badge } from "../Badge/Badge";
import { Avatar } from "../Avatar/Avatar";
import { Divider } from "../Divider/Divider";
import { Typography } from "../Typography/Typography";
import { Label } from "../Label/Label";
import { FormField } from "../FormField/FormField";
import { Tooltip } from "../Tooltip/Tooltip";
import { APITable, type APITableRow } from "../Shared/APITable";

const stackProps: APITableRow[] = [
  {
    property: "direction",
    description: "The direction of the stack. 'vertical' creates a column layout, 'horizontal' creates a row layout.",
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
  },
  {
    property: "gap",
    description: "Space between stack items. Can be a number (px) or string (any CSS unit).",
    type: "number | string",
    default: "-",
  },
  {
    property: "align",
    description: "How stack items are aligned along the cross axis.",
    type: "'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'",
    default: "-",
  },
  {
    property: "justify",
    description: "How stack items are distributed along the main axis.",
    type: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'",
    default: "-",
  },
  {
    property: "wrap",
    description: "Whether stack items should wrap to new lines when they overflow.",
    type: "boolean",
    default: "false",
  },
  {
    property: "fullWidth",
    description: "Whether the stack should take full width of its parent.",
    type: "boolean",
    default: "false",
  },
  {
    property: "as",
    description: "The HTML element to render. Useful for semantic markup.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "className",
    description: "Additional class name for the stack container.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the stack container.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "The elements to be arranged in the stack.",
    type: "ReactNode",
    default: "-",
  },
];

// Demo card component for examples
const DemoCard: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'default' | 'primary' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
}> = ({ 
  children, 
  variant = 'default',
  size = 'medium'
}) => {
  const baseStyles = {
    borderRadius: 'var(--border-radius)',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    border: '1px solid var(--border-color)',
    transition: 'all 0.2s ease',
  };

  const variants = {
    default: { 
      backgroundColor: 'var(--background-secondary)', 
      color: 'var(--text-primary)',
      borderColor: 'var(--border-color)'
    },
    primary: { 
      backgroundColor: 'var(--color-primary-50)', 
      color: 'var(--color-primary-700)',
      borderColor: 'var(--color-primary-200)'
    },
    success: { 
      backgroundColor: 'var(--color-success-50)', 
      color: 'var(--color-success-700)',
      borderColor: 'var(--color-success-200)'
    },
    warning: { 
      backgroundColor: 'var(--color-warning-50)', 
      color: 'var(--color-warning-700)',
      borderColor: 'var(--color-warning-200)'
    }
  };
  
  const sizes = {
    small: { padding: 'var(--spacing-2) var(--spacing-3)', fontSize: '12px', minHeight: '32px' },
    medium: { padding: 'var(--spacing-3) var(--spacing-4)', fontSize: '14px', minHeight: '40px' },
    large: { padding: 'var(--spacing-4) var(--spacing-5)', fontSize: '16px', minHeight: '48px' }
  };

  return (
    <div 
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size]
      }}
    >
      {children}
    </div>
  );
};

export const StackDocs: React.FC = () => {
  const [dynamicGap, setDynamicGap] = useState(16);
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    newsletter: false,
    theme: 'light'
  });

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };

  const removeItem = () => {
    setItems(prev => prev.slice(0, -1));
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <Typography variant="h1">Stack</Typography>
        <Typography variant="body" color="secondary">
          A layout component for arranging elements in a single direction with consistent spacing. 
          Stack provides a semantic way to create vertical or horizontal layouts with proper spacing between items.
        </Typography>
      </div>

      <div className="docs-section">
        <Typography variant="h2">When To Use</Typography>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <li>Creating consistent vertical spacing in forms, cards, or content areas</li>
          <li>Arranging buttons or actions in horizontal groups with uniform spacing</li>
          <li>Building simple one-dimensional layouts where you need predictable spacing</li>
          <li>When you need semantic spacing that adapts to design system tokens</li>
          <li>Replacing margin-based spacing patterns with gap-based layouts for better consistency</li>
        </ul>
      </div>

      <div className="docs-section">
        <Typography variant="h2">Examples</Typography>

        {/* Basic Usage */}
        <ExampleContainer
          title="Basic Usage"
          description="Simple vertical and horizontal stacks with default spacing."
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}
          code={`// Vertical stack (default)
<Stack gap={12}>
  <DemoCard>First item</DemoCard>
  <DemoCard>Second item</DemoCard>
  <DemoCard>Third item</DemoCard>
</Stack>

// Horizontal stack
<Stack direction="horizontal" gap={12}>
  <DemoCard>First</DemoCard>
  <DemoCard>Second</DemoCard>
  <DemoCard>Third</DemoCard>
</Stack>`}
        >
          <Stack gap="var(--spacing-8)">
            <div>
              <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>
                Vertical Stack (default)
              </Typography>
              <Stack gap={12}>
                <DemoCard>First item</DemoCard>
                <DemoCard>Second item</DemoCard>
                <DemoCard>Third item</DemoCard>
              </Stack>
            </div>
            
            <div>
              <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>
                Horizontal Stack
              </Typography>
              <Stack direction="horizontal" gap={12}>
                <DemoCard>First</DemoCard>
                <DemoCard>Second</DemoCard>
                <DemoCard>Third</DemoCard>
              </Stack>
            </div>
          </Stack>
        </ExampleContainer>

        {/* Form Layout */}
        <ExampleContainer
          title="Form Layout"
          description="Using Stack for consistent form field spacing with proper form components."
          style={{ maxWidth: '400px' }}
          code={`<Stack gap={16} fullWidth>
  <FormField label="First Name" required>
    <Input 
      value={formData.firstName}
      onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
      placeholder="Enter your first name"
    />
  </FormField>
  
  <FormField label="Email" required>
    <Input 
      type="email"
      value={formData.email}
      onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
      placeholder="Enter your email"
    />
  </FormField>
  
  <FormField label="Password" required>
    <Password 
      value={formData.password}
      onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
      placeholder="Enter your password"
    />
  </FormField>
  
  <Checkbox 
    checked={formData.newsletter}
    onChange={(checked) => setFormData(prev => ({...prev, newsletter: checked}))}
  >
    Subscribe to newsletter
  </Checkbox>
  
  <Stack direction="horizontal" gap={8} justify="flex-end">
    <Button variant="outlined">Cancel</Button>
    <Button>Submit</Button>
  </Stack>
</Stack>`}
        >
          <div style={{ 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--border-radius-lg)', 
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--background-primary)'
          }}>
            <Stack gap={16} fullWidth>
              <FormField label="First Name" required>
                <Input 
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                  placeholder="Enter your first name"
                />
              </FormField>
              
              <FormField label="Email" required>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  placeholder="Enter your email"
                />
              </FormField>
              
              <FormField label="Password" required>
                <Password 
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                  placeholder="Enter your password"
                />
              </FormField>
              
              <Checkbox 
                checked={formData.newsletter}
                onChange={(checked) => setFormData(prev => ({...prev, newsletter: checked}))}
              >
                Subscribe to newsletter
              </Checkbox>
              
              <Stack direction="horizontal" gap={8} justify="flex-end">
                <Button variant="outlined" size="small">Cancel</Button>
                <Button size="small">Submit</Button>
              </Stack>
            </Stack>
          </div>
        </ExampleContainer>

        {/* Button Groups */}
        <ExampleContainer
          title="Button Groups & Actions"
          description="Horizontal stacks for button groups and icon actions with badges."
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}
          code={`// Primary actions
<Stack direction="horizontal" gap={8}>
  <Button>Save</Button>
  <Button variant="outlined">Cancel</Button>
  <Button variant="outlined">Draft</Button>
</Stack>

// Icon buttons with badges
<Stack direction="horizontal" gap={4} align="center">
  <Tooltip content="Messages">
    <Badge count={3}>
      <Button variant="outlined" size="small" icon={<Mail size={16} />} />
    </Badge>
  </Tooltip>
  <Tooltip content="Notifications">
    <Badge dot variant="success">
      <Button variant="outlined" size="small" icon={<Bell size={16} />} />
    </Badge>
  </Tooltip>
  <Tooltip content="Settings">
    <Button variant="outlined" size="small" icon={<Settings size={16} />} />
  </Tooltip>
</Stack>`}
        >
          <Stack gap="var(--spacing-6)">
            <div>
              <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>
                Primary Actions
              </Typography>
              <Stack direction="horizontal" gap={8}>
                <Button>Save</Button>
                <Button variant="outlined">Cancel</Button>
                <Button variant="outlined">Draft</Button>
              </Stack>
            </div>
            
            <div>
              <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>
                Icon Buttons with Badges
              </Typography>
              <Stack direction="horizontal" gap={4} align="center">
                <Tooltip content="Messages">
                  <Badge count={3}>
                    <Button variant="outlined" size="small" icon={<Mail size={16} />} />
                  </Badge>
                </Tooltip>
                <Tooltip content="Notifications">
                  <Badge dot variant="success">
                    <Button variant="outlined" size="small" icon={<Bell size={16} />} />
                  </Badge>
                </Tooltip>
                <Tooltip content="Settings">
                  <Button variant="outlined" size="small" icon={<Settings size={16} />} />
                </Tooltip>
              </Stack>
            </div>
          </Stack>
        </ExampleContainer>

        {/* Gap Variations */}
        <ExampleContainer
          title="Gap Variations"
          description="Different spacing options for various use cases using design tokens."
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}
          code={`<Stack gap="var(--spacing-1)">    // Tight spacing (4px)
<Stack gap="var(--spacing-3)">    // Comfortable spacing (12px)  
<Stack gap="var(--spacing-6)">    // Relaxed spacing (24px)
<Stack gap="2rem">                // Custom spacing`}
        >
          <Stack gap="var(--spacing-6)">
            {[
              { gap: 'var(--spacing-1)', label: 'Tight (4px)', variant: 'primary' as const },
              { gap: 'var(--spacing-3)', label: 'Comfortable (12px)', variant: 'default' as const },
              { gap: 'var(--spacing-6)', label: 'Relaxed (24px)', variant: 'success' as const },
              { gap: '2rem', label: 'Custom (2rem)', variant: 'warning' as const },
            ].map(({ gap, label, variant }) => (
              <div key={String(gap)}>
                <Typography variant="caption" style={{ marginBottom: 'var(--spacing-2)', color: 'var(--text-secondary)', display: 'block' }}>
                  {label}
                </Typography>
                <Stack gap={gap}>
                  <DemoCard variant={variant} size="small">Item A</DemoCard>
                  <DemoCard variant={variant} size="small">Item B</DemoCard>
                  <DemoCard variant={variant} size="small">Item C</DemoCard>
                </Stack>
              </div>
            ))}
          </Stack>
        </ExampleContainer>

        {/* User Profile Card */}
        <ExampleContainer
          title="User Profile Card"
          description="Complex layout combining Stack with Avatar, Badge, and Typography components."
          code={`<Stack gap={16} fullWidth>
  <Stack direction="horizontal" gap={12} align="center">
    <Badge dot variant="success" placement="bottom-right">
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" 
        alt="User" 
        size="large" 
      />
    </Badge>
    <Stack gap={4}>
      <Typography variant="h3">John Smith</Typography>
      <Typography variant="body" color="secondary">Senior Developer</Typography>
      <Stack direction="horizontal" gap={8} align="center">
        <MapPin size={14} />
        <Typography variant="caption">San Francisco, CA</Typography>
      </Stack>
    </Stack>
  </Stack>
  
  <Divider />
  
  <Stack gap={12}>
    <Stack direction="horizontal" gap={16}>
      <Stack align="center" gap={4}>
        <Typography variant="h4">127</Typography>
        <Typography variant="caption" color="secondary">Posts</Typography>
      </Stack>
      <Stack align="center" gap={4}>
        <Typography variant="h4">1.2K</Typography>
        <Typography variant="caption" color="secondary">Followers</Typography>
      </Stack>
      <Stack align="center" gap={4}>
        <Typography variant="h4">543</Typography>
        <Typography variant="caption" color="secondary">Following</Typography>
      </Stack>
    </Stack>
    
    <Stack direction="horizontal" gap={8} justify="center">
      <Button size="small">Follow</Button>
      <Button variant="outlined" size="small" icon={<MessageCircle size={16} />} />
    </Stack>
  </Stack>
</Stack>`}
        >
          <div style={{ 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--border-radius-lg)', 
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--background-primary)',
            maxWidth: '320px'
          }}>
            <Stack gap={16} fullWidth>
              <Stack direction="horizontal" gap={12} align="center">
                <Badge dot variant="success" placement="bottom-right">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" 
                    alt="User" 
                    size="large" 
                  />
                </Badge>
                <Stack gap={4}>
                  <Typography variant="h3">John Smith</Typography>
                  <Typography variant="body" color="secondary">Senior Developer</Typography>
                  <Stack direction="horizontal" gap={8} align="center">
                    <MapPin size={14} color="var(--text-secondary)" />
                    <Typography variant="caption">San Francisco, CA</Typography>
                  </Stack>
                </Stack>
              </Stack>
              
              <Divider />
              
              <Stack gap={12}>
                <Stack direction="horizontal" gap={16} justify="space-around">
                  <Stack align="center" gap={4}>
                    <Typography variant="h4">127</Typography>
                    <Typography variant="caption" color="secondary">Posts</Typography>
                  </Stack>
                  <Stack align="center" gap={4}>
                    <Typography variant="h4">1.2K</Typography>
                    <Typography variant="caption" color="secondary">Followers</Typography>
                  </Stack>
                  <Stack align="center" gap={4}>
                    <Typography variant="h4">543</Typography>
                    <Typography variant="caption" color="secondary">Following</Typography>
                  </Stack>
                </Stack>
                
                <Stack direction="horizontal" gap={8} justify="center">
                  <Button size="small">Follow</Button>
                  <Button variant="outlined" size="small" icon={<MessageCircle size={16} />} />
                </Stack>
              </Stack>
            </Stack>
          </div>
        </ExampleContainer>

        {/* Settings Panel */}
        <ExampleContainer
          title="Settings Panel"
          description="Vertical layout with switches, radio groups, and form controls."
          code={`<Stack gap={24} fullWidth>
  <Stack gap={16}>
    <Typography variant="h3">Preferences</Typography>
    
    <Stack gap={12}>
      <Flex justify="space-between" align="center">
        <Stack gap={4}>
          <Label>Email Notifications</Label>
          <Typography variant="caption" color="secondary">
            Get notified about important updates
          </Typography>
        </Stack>
        <Switch defaultChecked />
      </Flex>
      
      <Flex justify="space-between" align="center">
        <Stack gap={4}>
          <Label>Push Notifications</Label>
          <Typography variant="caption" color="secondary">
            Receive push notifications on your device
          </Typography>
        </Stack>
        <Switch />
      </Flex>
    </Stack>
  </Stack>
  
  <Divider />
  
  <Stack gap={16}>
    <Typography variant="h3">Theme</Typography>
    <RadioGroup
      value={formData.theme}
      onChange={(value) => setFormData(prev => ({...prev, theme: value}))}
      options={[
        { value: 'light', label: 'Light Mode' },
        { value: 'dark', label: 'Dark Mode' },
        { value: 'auto', label: 'Auto (System)' }
      ]}
    />
  </Stack>
</Stack>`}
        >
          <div style={{ 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--border-radius-lg)', 
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--background-primary)',
            maxWidth: '400px'
          }}>
            <Stack gap={24} fullWidth>
              <Stack gap={16}>
                <Typography variant="h3">Preferences</Typography>
                
                <Stack gap={12}>
                  <Flex justify="space-between" align="center">
                    <Stack gap={4}>
                      <Label>Email Notifications</Label>
                      <Typography variant="caption" color="secondary">
                        Get notified about important updates
                      </Typography>
                    </Stack>
                    <Switch defaultChecked />
                  </Flex>
                  
                  <Flex justify="space-between" align="center">
                    <Stack gap={4}>
                      <Label>Push Notifications</Label>
                      <Typography variant="caption" color="secondary">
                        Receive push notifications on your device
                      </Typography>
                    </Stack>
                    <Switch />
                  </Flex>
                </Stack>
              </Stack>
              
              <Divider />
              
              <Stack gap={16}>
                <Typography variant="h3">Theme</Typography>
                <RadioGroup
                  value={formData.theme}
                  onChange={(value) => setFormData(prev => ({...prev, theme: value}))}
                  options={[
                    { value: 'light', label: 'Light Mode' },
                    { value: 'dark', label: 'Dark Mode' },
                    { value: 'auto', label: 'Auto (System)' }
                  ]}
                />
              </Stack>
            </Stack>
          </div>
        </ExampleContainer>

        {/* Alignment Examples */}
        <ExampleContainer
          title="Alignment & Distribution"
          description="Controlling alignment of items within the stack."
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}
          code={`// Vertical stack alignment
<Stack align="flex-start">
<Stack align="center">
<Stack align="flex-end">

// Horizontal stack distribution  
<Stack direction="horizontal" justify="space-between">
<Stack direction="horizontal" justify="center">`}
        >
          <div>
            <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>
              Vertical Alignment
            </Typography>
            <Stack gap="var(--spacing-4)">
              {['flex-start', 'center', 'flex-end'].map((alignment) => (
                <div key={alignment}>
                  <Typography variant="caption" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--spacing-1)', display: 'block' }}>
                    {alignment}
                  </Typography>
                  <div style={{ 
                    border: '1px dashed var(--border-color)', 
                    padding: 'var(--spacing-2)', 
                    width: '200px',
                    backgroundColor: 'var(--background-secondary)'
                  }}>
                    <Stack align={alignment as any} gap={8}>
                      <DemoCard size="small">Short</DemoCard>
                      <DemoCard size="small">Medium length</DemoCard>
                      <DemoCard size="small">A</DemoCard>
                    </Stack>
                  </div>
                </div>
              ))}
            </Stack>
          </div>
          
          <div>
            <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>
              Horizontal Distribution
            </Typography>
            <Stack gap="var(--spacing-4)">
              {[
                { justify: 'flex-start', label: 'flex-start' },
                { justify: 'center', label: 'center' },
                { justify: 'space-between', label: 'space-between' }
              ].map(({ justify, label }) => (
                <div key={justify}>
                  <Typography variant="caption" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--spacing-1)', display: 'block' }}>
                    {label}
                  </Typography>
                  <div style={{ 
                    border: '1px dashed var(--border-color)', 
                    padding: 'var(--spacing-2)', 
                    width: '200px',
                    backgroundColor: 'var(--background-secondary)'
                  }}>
                    <Stack direction="horizontal" justify={justify as any} gap={4}>
                      <DemoCard size="small">A</DemoCard>
                      <DemoCard size="small">B</DemoCard>
                      <DemoCard size="small">C</DemoCard>
                    </Stack>
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        </ExampleContainer>

        {/* Wrapping Example */}
        <ExampleContainer
          title="Wrapping Behavior"
          description="Stack items can wrap to new lines when space is limited."
          code={`<Stack direction="horizontal" wrap gap={8} style={{ width: '240px' }}>
  <Button size="small">Action 1</Button>
  <Button size="small">Action 2</Button>
  <Button size="small">Action 3</Button>
  <Button size="small">Action 4</Button>
  <Button size="small">Action 5</Button>
</Stack>`}
        >
          <div style={{ 
            border: '1px dashed var(--border-color)', 
            borderRadius: 'var(--border-radius)', 
            padding: 'var(--spacing-4)', 
            width: '260px',
            backgroundColor: 'var(--background-secondary)'
          }}>
            <Stack direction="horizontal" wrap gap={8}>
              <Button size="small">Action 1</Button>
              <Button size="small">Action 2</Button>
              <Button size="small">Action 3</Button>
              <Button size="small">Action 4</Button>
              <Button size="small">Action 5</Button>
            </Stack>
          </div>
        </ExampleContainer>

        {/* Interactive Demo */}
        <ExampleContainer
          title="Interactive Demo"
          description="Experiment with different Stack configurations."
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}
          code={`const [gap, setGap] = useState(16);
const [direction, setDirection] = useState('vertical');
const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

<Stack 
  direction={direction} 
  gap={gap}
  style={{ minHeight: '120px', padding: '16px', border: '1px dashed #ccc' }}
>
  {items.map(item => <DemoCard key={item}>{item}</DemoCard>)}
</Stack>`}
        >
          <Stack gap="var(--spacing-5)">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: 'var(--spacing-4)' 
            }}>
              <FormField label={`Gap: ${dynamicGap}px`}>
                <Input
                  type="range"
                  min="0"
                  max="40"
                  value={dynamicGap}
                  onChange={(e) => setDynamicGap(Number(e.target.value))}
                />
              </FormField>
              
              <FormField label="Direction">
                <RadioGroup
                  value={direction}
                  onChange={(value) => setDirection(value as 'vertical' | 'horizontal')}
                  options={[
                    { value: 'vertical', label: 'Vertical' },
                    { value: 'horizontal', label: 'Horizontal' }
                  ]}
                />
              </FormField>
              
              <FormField label={`Items: ${items.length}`}>
                <Stack direction="horizontal" gap={4}>
                  <Button size="small" icon={<Plus size={16} />} onClick={addItem}>
                    Add
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    icon={<Minus size={16} />} 
                    onClick={removeItem} 
                    disabled={items.length <= 1}
                  >
                    Remove
                  </Button>
                </Stack
