import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Toast, type ToastType } from "./Toast";
import { Button } from "../Button/Button";
import { APITable, type APITableRow } from "../Shared/APITable";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

const toastProps: APITableRow[] = [
  {
    property: "message",
    description: "The content to display in the toast. Can be a string or React node.",
    type: "string | ReactNode",
    default: "-",
  },
  {
    property: "type",
    description: "The type of toast which determines the icon and color scheme.",
    type: "'success' | 'error' | 'info' | 'warning'",
    default: "-",
  },
  {
    property: "duration",
    description: "Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss.",
    type: "number",
    default: "5000",
  },
  {
    property: "dismissible",
    description: "Whether the toast can be manually dismissed with a close button.",
    type: "boolean",
    default: "true",
  },
  {
    property: "onClose",
    description: "Callback function when the toast is closed (manually or automatically).",
    type: "() => void",
    default: "-",
  },
  {
    property: "icon",
    description: "Custom icon to override the default type icon.",
    type: "ReactNode",
    default: "Auto-determined by type",
  },
  {
    property: "isVisible",
    description: "Controls toast visibility externally for custom animation control.",
    type: "boolean",
    default: "-",
  },
  {
    property: "className",
    description: "Additional CSS class name for the toast.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the toast.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "aria-label",
    description: "Accessible label for the toast notification.",
    type: "string",
    default: "Auto-generated from type and message",
  },
  {
    property: "aria-describedby",
    description: "ID of element that describes the toast.",
    type: "string",
    default: "-",
  },
];

const toastMethods: APITableRow[] = [
  {
    property: "focus",
    description: "Focus the toast element (specifically the close button if dismissible).",
    type: "() => void",
    default: "-",
  },
  {
    property: "blur",
    description: "Blur the toast element.",
    type: "() => void",
    default: "-",
  },
];

export const ToastDocs: React.FC = () => {
  const [toasts, setToasts] = useState<Array<{ id: number; type: ToastType; message: string; duration?: number }>>([]);
  const [toastCounter, setToastCounter] = useState(0);
  const [selectedType, setSelectedType] = useState<ToastType>('success');
  const [customMessage, setCustomMessage] = useState('This is a custom toast message');
  const [customDuration, setCustomDuration] = useState(3000);
  const [showPersistentToast, setShowPersistentToast] = useState(false);
  const [showControlledToast, setShowControlledToast] = useState(false);

  const addToast = (type: ToastType, message: string, duration?: number) => {
    const id = toastCounter + 1;
    setToastCounter(id);
    setToasts(prev => [...prev, { id, type, message, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showBasicToast = (type: ToastType) => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      warning: 'Please review your input before proceeding.',
      info: 'New updates are available for download.'
    };
    addToast(type, messages[type]);
  };

  const showCustomToast = () => {
    addToast(selectedType, customMessage, customDuration);
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Toast</h1>
        <p>Toast notifications provide brief messages about app processes at the bottom or top of the screen. They inform users of processes that the app has performed or will perform.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>Provide feedback for user actions like form submissions, file uploads, or API calls.</li>
          <li>Show system notifications that don't require immediate action.</li>
          <li>Display temporary status messages that auto-dismiss after a few seconds.</li>
          <li>Communicate non-critical information that doesn't interrupt the user's workflow.</li>
          <li>Avoid using toasts for critical errors that require user acknowledgment - use modals instead.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>

        {/* Basic Types */}
        <ExampleContainer
          title="Basic Types"
          description="Four toast types for different message contexts."
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
          code={`<Toast type="success" message="Operation completed successfully!" />
<Toast type="error" message="Something went wrong." />
<Toast type="warning" message="Please review your input." />
<Toast type="info" message="New updates available." />`}
        >
          <>
            <Button onClick={() => showBasicToast('success')}>Success Toast</Button>
            <Button onClick={() => showBasicToast('error')}>Error Toast</Button>
            <Button onClick={() => showBasicToast('warning')}>Warning Toast</Button>
            <Button onClick={() => showBasicToast('info')}>Info Toast</Button>
          </>
        </ExampleContainer>

        {/* Static Examples */}
        <ExampleContainer
          title="Static Examples"
          description="Visual examples of each toast type (non-interactive)."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`// These are shown for visual reference
<Toast type="success" message="File uploaded successfully!" />
<Toast type="error" message="Failed to connect to server" />
<Toast type="warning" message="Session will expire in 5 minutes" />
<Toast type="info" message="Remember to save your work regularly" />`}
        >
          <>
            <Toast 
              type="success" 
              message="File uploaded successfully!" 
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="error" 
              message="Failed to connect to server" 
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="warning" 
              message="Session will expire in 5 minutes" 
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="info" 
              message="Remember to save your work regularly" 
              onClose={() => {}} 
              duration={0}
            />
          </>
        </ExampleContainer>

        {/* Custom Icons */}
        <ExampleContainer
          title="Custom Icons"
          description="Override default icons with custom ones."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Toast 
  type="success" 
  message="Profile updated successfully!"
  icon={<CheckCircle size={20} />}
/>

<Toast 
  type="error" 
  message="Network connection failed"
  icon={<XCircle size={20} />}
/>`}
        >
          <>
            <Toast 
              type="success" 
              message="Profile updated successfully!"
              icon={<CheckCircle size={20} />}
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="error" 
              message="Network connection failed"
              icon={<XCircle size={20} />}
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="warning" 
              message="Storage space running low"
              icon={<AlertCircle size={20} />}
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="info" 
              message="System maintenance scheduled"
              icon={<Info size={20} />}
              onClose={() => {}} 
              duration={0}
            />
          </>
        </ExampleContainer>

        {/* Rich Content */}
        <ExampleContainer
          title="Rich Content"
          description="Toast with React node content instead of plain text."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Toast 
  type="success" 
  message={
    <div>
      <strong>Upload Complete!</strong>
      <br />
      <span style={{ fontSize: '14px' }}>3 files processed successfully</span>
    </div>
  }
/>`}
        >
          <>
            <Toast 
              type="success" 
              message={
                <div>
                  <strong>Upload Complete!</strong>
                  <br />
                  <span style={{ fontSize: '14px', opacity: 0.8 }}>3 files processed successfully</span>
                </div>
              }
              onClose={() => {}} 
              duration={0}
            />
            <Toast 
              type="info" 
              message={
                <div>
                  <div style={{ fontWeight: 500 }}>New Message</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>From: john@example.com</div>
                </div>
              }
              onClose={() => {}} 
              duration={0}
            />
          </>
        </ExampleContainer>

        {/* Duration Control */}
        <ExampleContainer
          title="Duration Control"
          description="Control auto-dismiss timing or disable it entirely."
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
          code={`// Quick toast (2 seconds)
<Toast type="info" message="Quick message" duration={2000} />

// Standard toast (5 seconds - default)
<Toast type="success" message="Standard message" duration={5000} />

// Long toast (10 seconds)
<Toast type="warning" message="Important message" duration={10000} />

// Persistent toast (no auto-dismiss)
<Toast type="error" message="Manual dismiss only" duration={0} />`}
        >
          <>
            <Button onClick={() => addToast('info', 'Quick message (2s)', 2000)}>
              2 Second Toast
            </Button>
            <Button onClick={() => addToast('success', 'Standard message (5s)', 5000)}>
              5 Second Toast
            </Button>
            <Button onClick={() => addToast('warning', 'Long message (10s)', 10000)}>
              10 Second Toast
            </Button>
            <Button onClick={() => setShowPersistentToast(true)}>
              Persistent Toast
            </Button>
            {showPersistentToast && (
              <Toast 
                type="error" 
                message="This toast won't auto-dismiss" 
                duration={0}
                onClose={() => setShowPersistentToast(false)}
              />
            )}
          </>
        </ExampleContainer>

        {/* Non-dismissible */}
        <ExampleContainer
          title="Non-dismissible"
          description="Toasts without close buttons for system messages."
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          code={`<Toast 
  type="info" 
  message="System is updating..." 
  dismissible={false}
  duration={0}
/>`}
        >
          <>
            <Toast 
              type="info" 
              message="System is updating... Please wait" 
              dismissible={false}
              duration={0}
              onClose={() => {}}
            />
            <Toast 
              type="warning" 
              message="Maintenance mode active" 
              dismissible={false}
              duration={0}
              onClose={() => {}}
            />
          </>
        </ExampleContainer>

        {/* Controlled Visibility */}
        <ExampleContainer
          title="Controlled Visibility"
          description="External control over toast visibility for custom animations."
          style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          code={`const [isVisible, setIsVisible] = useState(false);

<Toast 
  type="success" 
  message="Controlled toast visibility" 
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>`}
        >
          <>
            <Button onClick={() => setShowControlledToast(true)}>
              Show Controlled Toast
            </Button>
            <Button onClick={() => setShowControlledToast(false)}>
              Hide Controlled Toast
            </Button>
            {showControlledToast && (
              <Toast 
                type="success" 
                message="This toast is externally controlled" 
                isVisible={showControlledToast}
                onClose={() => setShowControlledToast(false)}
                duration={0}
              />
            )}
          </>
        </ExampleContainer>

        {/* Interactive Demo */}
        <ExampleContainer
          title="Interactive Demo"
          description="Create custom toasts with different options."
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          code={`const [type, setType] = useState('success');
const [message, setMessage] = useState('Custom message');
const [duration, setDuration] = useState(3000);

const showToast = () => {
  // Add toast to queue
  addToast(type, message, duration);
};`}
        >
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label style={{ minWidth: '60px' }}>Type:</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {(['success', 'error', 'warning', 'info'] as ToastType[]).map((type) => (
                    <Button
                      key={type}
                      size="sm"
                      variant={selectedType === type ? 'primary' : 'secondary'}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label style={{ minWidth: '60px' }}>Message:</label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  style={{ flex: 1, padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label style={{ minWidth: '60px' }}>Duration:</label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  min="0"
                  step="1000"
                  style={{ width: '100px', padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <span style={{ fontSize: '14px', color: '#666' }}>ms (0 = persistent)</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={showCustomToast}>Show Toast</Button>
                <Button variant="secondary" onClick={clearAllToasts}>Clear All</Button>
              </div>
            </div>
            
            <div style={{ fontSize: '14px', color: '#666' }}>
              Active toasts: {toasts.length}
            </div>
          </>
        </ExampleContainer>

        {/* Toast Queue */}
        <ExampleContainer
          title="Toast Queue System"
          description="Multiple toasts showing queue behavior (scroll down to see active toasts)."
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
          code={`// Show multiple toasts in sequence
const showMultipleToasts = () => {
  addToast('info', 'Starting process...', 2000);
  setTimeout(() => addToast('warning', 'Validating data...', 2000), 500);
  setTimeout(() => addToast('success', 'Process completed!', 3000), 1000);
};`}
        >
          <>
            <Button onClick={() => {
              addToast('info', 'Starting process...', 2000);
              setTimeout(() => addToast('warning', 'Validating data...', 2000), 500);
              setTimeout(() => addToast('success', 'Process completed!', 3000), 1000);
            }}>
              Show Sequence
            </Button>
            <Button onClick={() => {
              addToast('success', 'Item 1 saved');
              addToast('success', 'Item 2 saved');
              addToast('success', 'Item 3 saved');
              addToast('info', 'All items processed');
            }}>
              Bulk Actions
            </Button>
            <Button onClick={() => {
              addToast('error', 'Connection failed');
              addToast('warning', 'Retrying...');
              setTimeout(() => addToast('success', 'Connection restored'), 2000);
            }}>
              Error Recovery
            </Button>
          </>
        </ExampleContainer>
      </div>

      {/* Active Toasts Container */}
      {toasts.length > 0 && (
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '400px'
        }}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      )}

      <div className="docs-section">
        <h2>API</h2>
        <p>This section describes all the available props for the <strong>Toast</strong> component. 
          You can use these properties to control behavior, appearance, and interactivity.</p>
        <APITable props={toastProps} />
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <p>These methods are available on the <strong>Toast</strong> component via ref. 
          They allow you to programmatically control the toast's behavior.</p>
        <APITable props={toastMethods} />
      </div>

      <div className="docs-section">
        <h2>Toast Manager Integration</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4>Recommended Usage Pattern</h4>
            <p>For production applications, consider implementing a Toast Manager or Context:</p>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '4px', 
              overflow: 'auto',
              fontSize: '14px'
            }}>
{`// ToastContext.tsx
export const useToast = () => {
  const addToast = (type, message, options) => {
    // Add to global toast queue
  };
  
  return { addToast };
};

// Usage in components
const { addToast } = useToast();
addToast('success', 'Data saved successfully!');`}
            </pre>
          </div>
          
          <div>
            <h4>Accessibility Guidelines</h4>
            <ul>
              <li>Success and info toasts use <code>aria-live="polite"</code></li>
              <li>Error toasts use <code>aria-live="assertive"</code> and <code>role="alert"</code></li>
              <li>Close buttons have proper ARIA labels</li>
              <li>Keyboard navigation support (Enter/Space to dismiss)</li>
              <li>Screen reader friendly with descriptive labels</li>
            </ul>
          </div>
          
          <div>
            <h4>Best Practices</h4>
            <ul>
              <li>Keep messages concise and actionable</li>
              <li>Use appropriate toast types for the context</li>
              <li>Don't overuse toasts - they can become annoying</li>
              <li>Consider toast positioning for mobile devices</li>
              <li>Provide alternative ways to access information in toasts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
