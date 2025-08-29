import React, { forwardRef } from 'react';
import './Card.css';

export interface CardMetaProps {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CardMeta: React.FC<CardMetaProps> = ({
  avatar,
  title,
  description,
  className = '',
  style
}) => {
  return (
    <div className={`ui-card-meta ${className}`} style={style}>
      {avatar && <div className="ui-card-meta-avatar">{avatar}</div>}
      <div className="ui-card-meta-detail">
        {title && <div className="ui-card-meta-title">{title}</div>}
        {description && <div className="ui-card-meta-description">{description}</div>}
      </div>
    </div>
  );
};

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  size?: 'default' | 'small';
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  type?: 'default' | 'inner';
}

const CardComponent = forwardRef<HTMLElement, CardProps>(({
  title,
  extra,
  bordered = true,
  hoverable = false,
  loading = false,
  size = 'default',
  cover,
  actions,
  bodyStyle,
  headStyle,
  className = '',
  style,
  children,
  type = 'default',
  ...props
}, ref) => {
  
  // Build class names
  const baseClass = 'ui-card';
  const sizeClass = size !== 'default' ? `ui-card--${size}` : '';
  const borderedClass = !bordered ? 'ui-card--no-border' : '';
  const hoverableClass = hoverable ? 'ui-card--hoverable' : '';
  const loadingClass = loading ? 'ui-card--loading' : '';
  const typeClass = type !== 'default' ? `ui-card--${type}` : '';

  const classes = [baseClass, sizeClass, borderedClass, hoverableClass, loadingClass, typeClass, className]
    .filter(Boolean)
    .join(' ');

  const hasHeader = title || extra;
  const hasActions = actions && actions.length > 0;

  if (loading) {
    return (
      <section
        {...props}
        ref={ref}
        className={classes}
        style={style}
        aria-busy="true"
        aria-label="Loading card content"
      >
        <div className="ui-card-loading">
          <div className="ui-card-loading-content">
            <div className="ui-card-loading-header">
              <div className="ui-card-loading-skeleton ui-card-loading-skeleton--title"></div>
              <div className="ui-card-loading-skeleton ui-card-loading-skeleton--extra"></div>
            </div>
            <div className="ui-card-loading-body">
              <div className="ui-card-loading-skeleton ui-card-loading-skeleton--line"></div>
              <div className="ui-card-loading-skeleton ui-card-loading-skeleton--line"></div>
              <div className="ui-card-loading-skeleton ui-card-loading-skeleton--line ui-card-loading-skeleton--short"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      {...props}
      ref={ref}
      className={classes}
      style={style}
    >
      {cover && (
        <div className="ui-card-cover">
          {cover}
        </div>
      )}
      
      {hasHeader && (
        <header className="ui-card-head" style={headStyle}>
          <div className="ui-card-head-wrapper">
            {title && <div className="ui-card-head-title">{title}</div>}
            {extra && <div className="ui-card-extra">{extra}</div>}
          </div>
        </header>
      )}
      
      <div className="ui-card-body" style={bodyStyle}>
        {children}
      </div>
      
      {hasActions && (
        <footer className="ui-card-actions">
          <ul className="ui-card-actions-list">
            {actions.map((action, index) => (
              <li key={index} className="ui-card-actions-item">
                {action}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </section>
  );
});

interface CardType extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLElement>> {
  Meta: React.FC<CardMetaProps>;
}

export const Card = CardComponent as CardType;
Card.displayName = 'Card';
Card.Meta = CardMeta;
Card.Meta = CardMeta;
