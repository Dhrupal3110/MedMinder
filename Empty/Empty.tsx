import React, { forwardRef, createContext, useContext } from 'react';
import { InboxIcon } from 'lucide-react';
import './Empty.css';

// Default empty images
const PRESENTED_IMAGE_DEFAULT = (
  <svg
    width="64"
    height="41"
    viewBox="0 0 64 41"
    xmlns="http://www.w3.org/2000/svg"
    className="ui-empty-default-image"
  >
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse className="ui-empty-ellipse" cx="32" cy="33" rx="32" ry="7" />
      <g fillRule="nonzero" stroke="currentColor">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          className="ui-empty-path"
        />
      </g>
    </g>
  </svg>
);

const PRESENTED_IMAGE_SIMPLE = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    className="ui-empty-simple-image"
  >
    <g fill="none" fillRule="evenodd">
      <circle className="ui-empty-circle" cx="24" cy="24" r="24" />
      <InboxIcon size={20} className="ui-empty-inbox-icon" />
    </g>
  </svg>
);

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: React.ReactNode | string | boolean;
  imageStyle?: React.CSSProperties;
  description?: React.ReactNode | string | boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Context for global configuration
interface EmptyConfigContextProps {
  image?: React.ReactNode;
  description?: React.ReactNode;
}

const EmptyConfigContext = createContext<EmptyConfigContextProps>({});

export const useEmptyConfig = () => useContext(EmptyConfigContext);

// ConfigProvider component for global Empty configuration
export const EmptyConfigProvider: React.FC<{
  children: React.ReactNode;
  config?: EmptyConfigContextProps;
}> = ({ children, config = {} }) => {
  return (
    <EmptyConfigContext.Provider value={config}>
      {children}
    </EmptyConfigContext.Provider>
  );
};

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(({
  image,
  imageStyle,
  description = 'No data',
  children,
  className = '',
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const config = useEmptyConfig();

  // Build class names
  const baseClass = 'ui-empty';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Determine image to display
  const getImage = () => {
    // If image is explicitly false, show no image
    if (image === false) return null;
    
    // If image is provided, use it
    if (image !== undefined) {
      if (typeof image === 'string') {
        return <img src={image} alt="Empty" className="ui-empty-custom-image" style={imageStyle} />;
      }
      return <div className="ui-empty-image-wrapper" style={imageStyle}>{image}</div>;
    }

    // Use config image if available
    if (config.image) {
      return <div className="ui-empty-image-wrapper" style={imageStyle}>{config.image}</div>;
    }

    // Default image
    return <div className="ui-empty-image-wrapper" style={imageStyle}>{PRESENTED_IMAGE_DEFAULT}</div>;
  };

  // Determine description to display
  const getDescription = () => {
    // If description is explicitly false, show no description
    if (description === false) return null;
    
    // If description is provided, use it
    if (description !== undefined) {
      if (typeof description === 'string') {
        return <div className="ui-empty-description">{description}</div>;
      }
      return <div className="ui-empty-description">{description}</div>;
    }

    // Use config description if available
    if (config.description) {
      return <div className="ui-empty-description">{config.description}</div>;
    }

    // Default description
    return <div className="ui-empty-description">No data</div>;
  };

  // Determine aria-label
  const getAriaLabel = (): string => {
    if (ariaLabel) return ariaLabel;
    if (typeof description === 'string') return `Empty state: ${description}`;
    return 'Empty state';
  };

  const imageElement = getImage();
  const descriptionElement = getDescription();

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      role="status"
      aria-label={getAriaLabel()}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      <div className="ui-empty-content">
        {imageElement && (
          <div className="ui-empty-image">
            {imageElement}
          </div>
        )}
        
        {descriptionElement && (
          <div className="ui-empty-text">
            {descriptionElement}
          </div>
        )}
        
        {children && (
          <div className="ui-empty-footer">
            {children}
          </div>
        )}
      </div>
    </div>
  );
});

Empty.displayName = 'Empty';

// Static properties for convenience
(Empty as any).PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT;
(Empty as any).PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE;
