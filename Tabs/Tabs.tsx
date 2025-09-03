import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { X, Plus } from 'lucide-react';
import './Tabs.css';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  children?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  tabs: TabItem[];
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  type?: 'line' | 'card';
  indicator?: {
    size?: number;
    align?: 'start' | 'center' | 'end';
  };
  extraContent?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  closable?: boolean;
  addable?: boolean;
  renderTabBar?: (
    tabBarExtraContent: React.ReactNode,
    DefaultTabBar: React.ComponentType<any>
  ) => React.ReactNode;
  draggable?: boolean;
  onEdit?: (targetKey: string, action: 'add' | 'remove') => void;
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  tabs = [],
  size = 'md',
  centered = false,
  position = 'top',
  type = 'line',
  indicator,
  extraContent,
  closable = false,
  addable = false,
  renderTabBar,
  draggable = false,
  onEdit,
  onTabClick,
  className = '',
  style,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(() => {
    if (controlledActiveKey !== undefined) return controlledActiveKey;
    if (defaultActiveKey !== undefined) return defaultActiveKey;
    return tabs.find(tab => !tab.disabled)?.key || tabs[0]?.key || '';
  });

  const tabListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

  const handleTabChange = useCallback((key: string) => {
    if (!isControlled) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  }, [isControlled, onChange]);

  const handleTabClick = useCallback((key: string, event: React.MouseEvent) => {
    const tab = tabs.find(t => t.key === key);
    if (tab?.disabled) return;

    onTabClick?.(key, event);
    if (key !== activeKey) {
      handleTabChange(key);
    }
  }, [tabs, activeKey, handleTabChange, onTabClick]);

  const handleTabClose = useCallback((key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit?.(key, 'remove');
  }, [onEdit]);

  const handleAddTab = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit?.('', 'add');
  }, [onEdit]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex(tab => tab.key === activeKey);
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        do {
          targetIndex = targetIndex > 0 ? targetIndex - 1 : tabs.length - 1;
        } while (tabs[targetIndex]?.disabled && targetIndex !== currentIndex);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        do {
          targetIndex = targetIndex < tabs.length - 1 ? targetIndex + 1 : 0;
        } while (tabs[targetIndex]?.disabled && targetIndex !== currentIndex);
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        while (tabs[targetIndex]?.disabled && targetIndex < tabs.length - 1) {
          targetIndex++;
        }
        break;
      case 'End':
        event.preventDefault();
        targetIndex = tabs.length - 1;
        while (tabs[targetIndex]?.disabled && targetIndex > 0) {
          targetIndex--;
        }
        break;
      case 'Delete':
      case 'Escape':
        if (closable && tabs.find(t => t.key === activeKey)?.closable !== false) {
          event.preventDefault();
          handleTabClose(activeKey, event as any);
        }
        break;
      default:
        return;
    }

    if (targetIndex !== currentIndex && tabs[targetIndex]) {
      handleTabChange(tabs[targetIndex].key);
    }
  }, [tabs, activeKey, handleTabChange, handleTabClose, closable]);

  // Update indicator position
  useEffect(() => {
    if (type !== 'line' || !tabListRef.current || !indicatorRef.current) return;

    const activeTab = tabListRef.current.querySelector(`[data-key="${activeKey}"]`) as HTMLElement;
    if (!activeTab) return;

    const tabList = tabListRef.current;
    const isVertical = position === 'left' || position === 'right';
    
    if (isVertical) {
      const top = activeTab.offsetTop;
      const height = activeTab.offsetHeight;
      setIndicatorStyle({
        transform: `translateY(${top}px)`,
        height: `${height}px`,
        width: `${indicator?.size || 2}px`,
      });
    } else {
      const left = activeTab.offsetLeft;
      const width = activeTab.offsetWidth;
      setIndicatorStyle({
        transform: `translateX(${left}px)`,
        width: `${width}px`,
        height: `${indicator?.size || 2}px`,
      });
    }
  }, [activeKey, tabs, position, type, indicator]);

  // Build class names
  const isVertical = position === 'left' || position === 'right';
  const baseClass = 'ui-tabs';
  const sizeClass = `ui-tabs--${size}`;
  const positionClass = `ui-tabs--${position}`;
  const typeClass = `ui-tabs--${type}`;
  const centeredClass = centered ? 'ui-tabs--centered' : '';
  const verticalClass = isVertical ? 'ui-tabs--vertical' : '';

  const classes = [baseClass, sizeClass, positionClass, typeClass, centeredClass, verticalClass, className]
    .filter(Boolean)
    .join(' ');

  const renderTabList = () => {
    const tabElements = tabs.map((tab) => {
      const isActive = tab.key === activeKey;
      const tabClass = [
        'ui-tabs-tab',
        isActive ? 'ui-tabs-tab--active' : '',
        tab.disabled ? 'ui-tabs-tab--disabled' : '',
        (closable || tab.closable) && type === 'card' ? 'ui-tabs-tab--closable' : '',
      ].filter(Boolean).join(' ');

      return (
        <div
          key={tab.key}
          className={tabClass}
          data-key={tab.key}
          role="tab"
          tabIndex={isActive ? 0 : -1}
          aria-selected={isActive}
          aria-disabled={tab.disabled}
          aria-controls={`ui-tabpanel-${tab.key}`}
          onClick={(e) => handleTabClick(tab.key, e)}
        >
          <span className="ui-tabs-tab-content">
            {tab.icon && <span className="ui-tabs-tab-icon">{tab.icon}</span>}
            <span className="ui-tabs-tab-label">{tab.label}</span>
          </span>
          {(closable || tab.closable) && type === 'card' && (
            <button
              type="button"
              className="ui-tabs-tab-close"
              onClick={(e) => handleTabClose(tab.key, e)}
              aria-label={`Close ${tab.label}`}
              tabIndex={-1}
            >
              <X size={12} />
            </button>
          )}
        </div>
      );
    });

    return (
      <div className="ui-tabs-nav">
        {extraContent?.left && (
          <div className="ui-tabs-extra ui-tabs-extra--left">
            {extraContent.left}
          </div>
        )}
        <div className="ui-tabs-nav-wrap">
          <div
            ref={tabListRef}
            className="ui-tabs-nav-list"
            role="tablist"
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
          >
            {tabElements}
            {addable && type === 'card' && (
              <button
                type="button"
                className="ui-tabs-tab ui-tabs-tab--add"
                onClick={handleAddTab}
                aria-label="Add tab"
              >
                <Plus size={14} />
              </button>
            )}
            {type === 'line' && (
              <div
                ref={indicatorRef}
                className="ui-tabs-ink-bar"
                style={indicatorStyle}
              />
            )}
          </div>
        </div>
        {extraContent?.right && (
          <div className="ui-tabs-extra ui-tabs-extra--right">
            {extraContent.right}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    const activeTab = tabs.find(tab => tab.key === activeKey);
    if (!activeTab || !activeTab.children) return null;

    return (
      <div
        className="ui-tabs-content"
        id={`ui-tabpanel-${activeKey}`}
        role="tabpanel"
        aria-labelledby={`ui-tab-${activeKey}`}
        tabIndex={0}
      >
        <div className="ui-tabs-tabpane ui-tabs-tabpane--active">
          {activeTab.children}
        </div>
      </div>
    );
  };

  const tabBar = renderTabList();
  const finalTabBar = renderTabBar ? renderTabBar(null, () => tabBar) : tabBar;

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
      style={style}
    >
      {(position === 'top' || position === 'left') && finalTabBar}
      {renderContent()}
      {(position === 'bottom' || position === 'right') && finalTabBar}
    </div>
  );
});

Tabs.displayName = 'Tabs';
