import React, { forwardRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import './Spin.css';

export interface SpinProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  spinning?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tip?: string;
  delay?: number;
  indicator?: React.ReactNode;
  percent?: number | 'auto';
  wrapperClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  fullscreen?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Spin = forwardRef<HTMLDivElement, SpinProps>(({
  spinning = true,
  size = 'md',
  tip,
  delay = 0,
  indicator,
  percent,
  wrapperClassName = '',
  className = '',
  style,
  children,
  fullscreen = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const [isSpinning, setIsSpinning] = useState(delay === 0 ? spinning : false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (spinning && delay > 0) {
      timer = setTimeout(() => {
        setIsSpinning(true);
        setIsVisible(true);
      }, delay);
    } else if (spinning) {
      setIsSpinning(true);
      setIsVisible(true);
    } else {
      setIsSpinning(false);
      // Keep visible for a brief moment to allow for smooth transition
      if (delay > 0) {
        setTimeout(() => setIsVisible(false), 200);
      } else {
        setIsVisible(false);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [spinning, delay]);

  // Build class names
  const baseClass = 'ui-spin';
  const sizeClass = `ui-spin--${size}`;
  const fullscreenClass = fullscreen ? 'ui-spin--fullscreen' : '';
  const classes = [baseClass, sizeClass, fullscreenClass, className]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = children 
    ? [`ui-spin-wrapper`, isSpinning ? 'ui-spin-wrapper--spinning' : '', wrapperClassName]
        .filter(Boolean)
        .join(' ')
    : '';

  // Default indicator with proper spinning class
  const getDefaultIndicator = () => {
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    return (
      <Loader2 
        size={iconSize} 
        className="ui-spin-icon ui-spin-rotating"
        style={{ display: 'inline-block' }}
      />
    );
  };

  const spinIndicator = indicator ? (
    <div className="ui-spin-indicator ui-spin-rotating" style={{ display: 'inline-block' }}>
      {indicator}
    </div>
  ) : getDefaultIndicator();

  // Progress circle calculations
  const getProgressProps = () => {
    if (typeof percent !== 'number') return null;
    
    const radius = size === 'sm' ? 8 : size === 'lg' ? 12 : 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    
    return {
      radius,
      circumference,
      strokeDashoffset,
      size: radius * 2 + 4, // Add padding for stroke
    };
  };

  const progressProps = getProgressProps();

  // Determine aria-label
  const getAriaLabel = (): string => {
    if (ariaLabel) return ariaLabel;
    if (tip) return `Loading: ${tip}`;
    return 'Loading';
  };

  // Render progress indicator
  const renderProgressIndicator = () => {
    if (!progressProps) return spinIndicator;
    
    const { radius, circumference, strokeDashoffset, size: svgSize } = progressProps;
    
    return (
      <div className="ui-spin-progress">
        <svg width={svgSize} height={svgSize} className="ui-spin-progress-circle">
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className="ui-spin-progress-trail"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className="ui-spin-progress-path"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
          />
        </svg>
        {percent !== 'auto' && (
          <span className="ui-spin-progress-text">{percent}%</span>
        )}
      </div>
    );
  };

  // Render the spinner content
  const renderSpinContent = () => {
    if (!isSpinning && !isVisible) return null;

    return (
      <div
        className={classes}
        style={style}
        aria-busy={isSpinning}
        aria-live="polite"
        aria-label={getAriaLabel()}
        aria-describedby={ariaDescribedBy}
        role="status"
      >
        <div className="ui-spin-content">
          {percent !== undefined ? renderProgressIndicator() : spinIndicator}
          {tip && (
            <div className="ui-spin-tip" id={ariaDescribedBy}>
              {tip}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Fullscreen mode
  if (fullscreen) {
    return (
      <>
        {(isSpinning || isVisible) && (
          <div className="ui-spin-overlay" ref={ref} {...props}>
            {renderSpinContent()}
          </div>
        )}
      </>
    );
  }

  // If no children, render standalone spinner
  if (!children) {
    return (
      <div ref={ref} {...props}>
        {renderSpinContent()}
      </div>
    );
  }

  // Render with children (embedded mode)
  return (
    <div 
      ref={ref}
      className={wrapperClasses}
      style={style}
      {...props}
    >
      {children}
      {renderSpinContent()}
    </div>
  );
});

Spin.displayName = 'Spin';
