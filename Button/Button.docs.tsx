import React, { useState } from 'react';
import { Button } from './Button';
import { ArrowRight, Download, Heart, Plus, Search, Settings } from 'lucide-react';
import { APITable } from '../Shared/APITable';
import { ExampleContainer } from '../Shared/ExampleContainer';
import ComponentHeader from '../Shared/ComponentHeader';

export const ButtonDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark'> = 
    ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'];

  const variants: Array<'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link'> =
    ['solid', 'outlined', 'dashed', 'filled', 'text', 'link'];

  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

  const buttonProps = [
    {
      property: 'color',
      description: 'Set button color',
      type: 'primary | secondary | success | warning | danger | info | light | dark',
      default: 'primary',
      version: ''
    },
    {
      property: 'variant',
      description: 'Set button variant',
      type: 'solid | outlined | dashed | filled | text | link',
      default: 'solid',
      version: ''
    },
    {
      property: 'icon',
      description: 'Set the icon component of button',
      type: 'ReactNode',
      default: '-',
      version: ''
    },
    {
      property: 'iconPosition',
      description: 'Set the icon position of button',
      type: 'start | end',
      default: 'start',
      version: ''
    },
    {
      property: 'shape',
      description: 'Can be used to set the button shape',
      type: 'default | circle | round',
      default: 'default',
      version: ''
    },
    {
      property: 'disabled',
      description: 'Disabled state of button',
      type: 'boolean',
      default: 'false',
      version: ''
    },
    {
      property: 'href',
      description: 'Redirect url of link button',
      type: 'string',
      default: '-',
      version: ''
    },
    {
      property: 'loading',
      description: 'Set the loading status of button',
      type: 'boolean',
      default: 'false',
      version: ''
    },
    {
      property: 'size',
      description: 'Set the size of button',
      type: 'sm | md | lg',
      default: 'md',
      version: ''
    },
    {
      property: 'type',
      description: 'Set the original html type of button',
      type: 'button | submit | reset',
      default: 'button',
      version: ''
    },
    {
      property: 'onClick',
      description: 'Set the handler to handle click event',
      type: '(event) => void',
      default: '-',
      version: ''
    }
  ];

  return (
    <div className='component-docs'>
      <ComponentHeader
        title={'Button'}
        description={`To trigger an operation.`}
      />

      <div className='docs-section'>
        <h2>When to use</h2>
        <p>A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.</p>
        <p>In our design system we provide 6 variants of button:</p>
        <ul>
          <li><strong>Solid button:</strong> used for the main action, there can be at most one primary in a section.</li>
          <li><strong>Outlined button:</strong> used for a series of actions without priority.</li>
          <li><strong>Dashed button:</strong> commonly used for adding more actions.</li>
          <li><strong>Filled button:</strong> used for secondary actions with subtle background.</li>
          <li><strong>Text button:</strong> used for the most secondary button.</li>
          <li><strong>Link button:</strong> used for external links.</li>
        </ul>
        <p>And 3 other properties additionally:</p>
        <ul>
          <li><strong>danger:</strong> used for actions of risk, like deletion or authorization.</li>
          <li><strong>disabled:</strong> used when actions are not available.</li>
          <li><strong>loading:</strong> added a loading spinner in button, avoid multiple submits too.</li>
        </ul>
      </div>

      <div className='docs-section'>
        <h2>Example</h2>

        <ExampleContainer
          title='Color & Variant Combinations'
          description='All color and variant combinations available in the button component.'
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button color='primary' variant='solid'>Solid</Button>
<Button color='primary' variant='outlined'>Outlined</Button>
<Button color='primary' variant='dashed'>Dashed</Button>
<Button color='primary' variant='filled'>Filled</Button>
<Button color='primary' variant='text'>Text</Button>
<Button color='primary' variant='link'>Link</Button>`}
        >
          <>
            {colors.map(color => (
              <div key={color} style={{ marginBottom: '16px' }}>
                <h4 style={{ marginBottom: '8px', textTransform: 'capitalize', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {color} Color
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {variants.map(variant => (
                    <Button key={`${color}-${variant}`} color={color} variant={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Sizes'
          description='Button supports three sizes: small (sm), medium (md, default) and large (lg).'
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button size='sm' color='primary'>Small</Button>
<Button size='md' color='primary'>Medium</Button>
<Button size='lg' color='primary'>Large</Button>`}
        >
          <>
            {colors.map(color => (
              <div key={color} style={{ marginBottom: '16px' }}>
                <h4 style={{ marginBottom: '8px', textTransform: 'capitalize', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {color} - All Sizes
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {sizes.map(size => (
                    <Button key={`${color}-${size}`} size={size} color={color}>
                      {size.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Icon'
          description='Button can have Icon to make the action more intuitive.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button color='primary' icon={<Search />}>Search</Button>
<Button variant='outlined' icon={<Download />}>Download</Button>
<Button variant='outlined' icon={<Plus />}>Add</Button>
<Button color='danger' icon={<Heart />}>Like</Button>`}
        >
          <>
            <Button color='primary' icon={<Search />}>Search</Button>
            <Button variant='outlined' icon={<Download />}>Download</Button>
            <Button variant='outlined' icon={<Plus />}>Add</Button>
            <Button color='danger' icon={<Heart />}>Like</Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Icon Position'
          description='Icon can be placed at the start or end of the button text.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button color='primary' icon={<Search />} iconPosition='start'>Search</Button>
<Button color='primary' icon={<ArrowRight />} iconPosition='end'>Next</Button>
<Button variant='outlined' icon={<Settings />} iconPosition='start'>Settings</Button>
<Button variant='outlined' icon={<Download />} iconPosition='end'>Download</Button>`}
        >
          <>
            <Button color='primary' icon={<Search />} iconPosition='start'>Search</Button>
            <Button color='primary' icon={<ArrowRight />} iconPosition='end'>Next</Button>
            <Button variant='outlined' icon={<Settings />} iconPosition='start'>Settings</Button>
            <Button variant='outlined' icon={<Download />} iconPosition='end'>Download</Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Icon Only'
          description='Button can be icon only by omitting the text content.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button color='primary' icon={<Search />}></Button>
<Button variant='outlined' icon={<Download />}></Button>
<Button color='success' icon={<Plus />}></Button>
<Button variant='outlined' icon={<Settings />}></Button>`}
        >
          <>
            <Button color='primary' icon={<Search />}></Button>
            <Button variant='outlined' icon={<Download />}></Button>
            <Button color='success' icon={<Plus />}></Button>
            <Button variant='outlined' icon={<Settings />}></Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Shape'
          description='Button supports three shapes: default, round and circle.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button color='primary' shape='default'>Default</Button>
<Button color='primary' shape='round'>Round</Button>
<Button color='primary' shape='circle' icon={<Search />}></Button>
<Button color='secondary' shape='circle' icon={<Download />}></Button>
<Button color='danger' shape='circle' icon={<Heart />}></Button>`}
        >
          <>
            <Button color='primary' shape='default'>Default</Button>
            <Button color='primary' shape='round'>Round</Button>
            <Button color='primary' shape='circle' icon={<Search />}></Button>
            <Button color='secondary' shape='circle' icon={<Download />}></Button>
            <Button color='danger' shape='circle' icon={<Heart />}></Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Loading'
          description='A loading indicator can be added to a button by setting the loading property.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}
          code={`<Button loading={loading} color='primary' onClick={handleLoadingClick}>
  {loading ? 'Loading' : 'Click me!'}
</Button>
<Button loading color='secondary'>Loading</Button>
<Button loading variant='outlined'>Loading</Button>`}
        >
          <>
            <Button loading={loading} color='primary' onClick={handleLoadingClick}>
              {loading ? 'Loading' : 'Click me!'}
            </Button>
            <Button loading color='secondary'>Loading</Button>
            <Button loading variant='outlined'>Loading</Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Disabled'
          description='To mark a button as disabled, add the disabled property to the Button.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}
          code={`<Button color='primary'>Primary</Button>
<Button color='primary' disabled>Primary (disabled)</Button>
<Button color='secondary'>Secondary</Button>
<Button color='secondary' disabled>Secondary (disabled)</Button>
<Button color='danger'>Danger</Button>
<Button color='danger' disabled>Danger (disabled)</Button>`}
        >
          <>
            <Button color='primary'>Primary</Button>
            <Button color='primary' disabled>Primary (disabled)</Button>
            <Button color='secondary'>Secondary</Button>
            <Button color='secondary' disabled>Secondary (disabled)</Button>
            <Button color='danger'>Danger</Button>
            <Button color='danger' disabled>Danger (disabled)</Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Type'
          description='Button can be used as submit or reset button by setting the type property.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button type='button'>Button</Button>
<Button type='submit' color='primary'>Submit</Button>
<Button type='reset' color='warning'>Reset</Button>`}
        >
          <>
            <Button type='button'>Button</Button>
            <Button type='submit' color='primary'>Submit</Button>
            <Button type='reset' color='warning'>Reset</Button>
          </>
        </ExampleContainer>

        <ExampleContainer
          title='Link Button'
          description='Link buttons can be used with href attribute for navigation.'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px' }}
          code={`<Button variant='link' href='https://example.com'>External Link</Button>
<Button variant='link' color='info' href='/internal'>Internal Link</Button>
<Button variant='link' color='danger' href='/delete'>Delete Link</Button>`}
        >
          <>
            <Button variant='link' href='https://example.com'>External Link</Button>
            <Button variant='link' color='info' href='/internal'>Internal Link</Button>
            <Button variant='link' color='danger' href='/delete'>Delete Link</Button>
          </>
        </ExampleContainer>
      </div>

      <div className='docs-section'>
        <h2>API</h2>
        <p>To get a customized button, just set color/variant/size/loading/disabled properties.</p>
        <APITable props={buttonProps} />
      </div>
    </div>
  );
};
