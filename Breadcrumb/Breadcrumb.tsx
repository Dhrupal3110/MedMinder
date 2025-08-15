import React, { forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  dropdown?: {
    items: Array<{
      label: React.ReactNode;
      href?: string;
      onClick?: () => void;
    }>;
  };
}

export interface BreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemRender?: (item: BreadcrumbItem, index: number, items: BreadcrumbItem[]) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items = [],
  separator = <ChevronRight size={14} />,
  maxItems,
  itemRender,
  className = '',
  style,
  'aria-label': ariaLabel = 'breadcrumb',
  ...props
}, ref) => {

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, item: BreadcrumbItem, index: number) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    
    // Don't navigate if it's the last item (current page)
    if (index === items.length - 1 && !item.href) {
      event.preventDefault();
    }
    
    item.onClick?.(event);
  };

  const renderDropdown = (item: BreadcrumbItem, index: number) => {
    if (!item.dropdown?.items?.length) return null;
    
    return (
      <div className="ui-breadcrumb-dropdown">
        <div className="ui-breadcrumb-dropdown-content">
          {item.dropdown.items.map((dropdownItem, dropdownIndex) => (
            <div key={dropdownIndex} className="ui-breadcrumb-dropdown-item">
              {dropdownItem.href ? (
                <a
                  href={dropdownItem.href}
                  className="ui-breadcrumb-dropdown-link"
                  onClick={(e) => {
                    dropdownItem.onClick?.();
                  }}
                >
                  {dropdownItem.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="ui-breadcrumb-dropdown-button"
                  onClick={dropdownItem.onClick}
                >
                  {dropdownItem.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderItem = (item: BreadcrumbItem, index: number, allItems: BreadcrumbItem[]) => {
    if (itemRender) {
      return itemRender(item, index, allItems);
    }

    const isLast = index === allItems.length - 1;
    const itemClasses = [
      'ui-breadcrumb-link',
      item.disabled ? 'ui-breadcrumb-link--disabled' : '',
      isLast ? 'ui-breadcrumb-link--current' : '',
      item.dropdown ? 'ui-breadcrumb-link--dropdown' : ''
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
        <span className="ui-breadcrumb-text">{item.label}</span>
        {item.dropdown && <ChevronRight size={12} className="ui-breadcrumb-dropdown-icon" />}
      </>
    );

    if (isLast && !item.href) {
      return (
        <span
          className={itemClasses}
          aria-current="page"
        >
          {content}
        </span>
      );
    }

    return (
      <div className="ui-breadcrumb-item-wrapper">
        <a
          href={item.href || '#'}
          className={itemClasses}
          onClick={(e) => handleItemClick(e, item, index)}
          aria-current={isLast ? 'page' : undefined}
        >
          {content}
        </a>
        {item.dropdown && renderDropdown(item, index)}
      </div>
    );
  };

  const renderSeparator = (item: BreadcrumbItem, index: number) => {
    if (index === items.length - 1) return null;
    
    const separatorContent = item.separator !== undefined ? item.separator : separator;
    
    return (
      <span className="ui-breadcrumb-separator" aria-hidden="true">
        {separatorContent}
      </span>
    );
  };

  const processedItems = maxItems && items.length > maxItems
    ? [
        ...items.slice(0, 1),
        { label: '...', disabled: true },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  const baseClass = 'ui-breadcrumb';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <nav
      {...props}
      ref={ref}
      className={classes}
      style={style}
      aria-label={ariaLabel}
    >
      <ol className="ui-breadcrumb-list">
        {processedItems.map((item, index) => (
          <li key={index} className="ui-breadcrumb-item">
            {renderItem(item, index, processedItems)}
            {renderSeparator(item, index)}
          </li>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
