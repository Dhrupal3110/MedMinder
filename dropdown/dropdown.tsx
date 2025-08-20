Dropdown.css';

export type DropdownPlacement = 'top' | 'bottom' | 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
export type DropdownTrigger = 'hover' | 'click' | 'contextMenu';

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  type?: 'item' | 'divider' | 'group';
  children?: MenuItem[];
  onClick?: (info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => void;
}

export interface DropdownArrowConfig {
  pointAtCenter?: boolean;
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  menu?: {
    items: MenuItem[];
    selectable?: boolean;
    selectedKeys?: string[];
    onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
  };
  children?: React.ReactNode;
  trigger?: DropdownTrigger | DropdownTrigger[];
  placement?: DropdownPlacement;
  arrow?: boolean | DropdownArrowConfig;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean, info?: { source: 'trigger' | 'menu' | 'outside' }) => void;
  autoClose?: boolean;
  getPopupContainer?: () => HTMLElement;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  popupRender?: (menu: React.ReactNode) => React.ReactNode;
  destroyPopupOnHide?: boolean;
}

export interface DropdownButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMenuClick?: (info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => void;
  menu?: DropdownProps['menu'];
  placement?: DropdownPlacement;
  arrow?: boolean | DropdownArrowConfig;
  disabled?: boolean;
  trigger?: DropdownTrigger | DropdownTrigger[];
  autoClose?: boolean;
}

const Menu: React.FC<{
  items: MenuItem[];
  selectable?: boolean;
  selectedKeys?: string[];
  onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
  onItemClick?: (info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => void;
  level?: number;
}> = ({ items, selectable = false, selectedKeys = [], onSelect, onItemClick, level = 0 }) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(selectedKeys);

  useEffect(() => {
    setInternalSelectedKeys(selectedKeys);
  }, [selectedKeys]);

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.disabled) return;

    const keyPath = [item.key];
    
    if (selectable && item.type !== 'divider') {
      const newSelectedKeys = internalSelectedKeys.includes(item.key)
        ? internalSelectedKeys.filter(k => k !== item.key)
        : [...internalSelectedKeys, item.key];
      
      setInternalSelectedKeys(newSelectedKeys);
      onSelect?.({ key: item.key, selectedKeys: newSelectedKeys });
    }

    item.onClick?.({ key: item.key, keyPath, item, domEvent: e });
    onItemClick?.({ key: item.key, keyPath, item, domEvent: e });
  };

  return (
    <div className={`ui-dropdown-menu ui-dropdown-menu--level-${level}`} role="menu">
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <div key={item.key || index} className="ui-dropdown-divider" role="separator" />;
        }

        if (item.type === 'group') {
          return (
            <div key={item.key || index} className="ui-dropdown-group">
              <div className="ui-dropdown-group-title">{item.label}</div>
              {item.children && (
                <Menu
                  items={item.children}
                  selectable={selectable}
                  selectedKeys={selectedKeys}
                  onSelect={onSelect}
                  onItemClick={onItemClick}
                  level={level + 1}
                />
              )}
            </div>
          );
        }

        const isSelected = selectable && internalSelectedKeys.includes(item.key);

        return (
          <div
            key={item.key}
            className={`ui-dropdown-item ${item.disabled ? 'ui-dropdown-item--disabled' : ''} ${
              item.danger ? 'ui-dropdown-item--danger' : ''
            } ${isSelected ? 'ui-dropdown-item--selected' : ''}`}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            aria-disabled={item.disabled}
            onClick={(e) => handleItemClick(item, e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemClick(item, e as any);
              }
            }}
          >
            {item.icon && <span className="ui-dropdown-item-icon">{item.icon}</span>}
            <span className="ui-dropdown-item-label">{item.label}</span>
            {selectable && isSelected && (
              <span className="ui-dropdown-item-checkmark">✓</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  menu,
  children,
  trigger = 'hover',
  placement = 'bottom',
  arrow = false,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  autoClose = true,
  getPopupContainer,
  popupClassName = '',
  popupStyle,
  popupRender,
  destroyPopupOnHide = false,
  className = '',
  style,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const setOpen = useCallback((open: boolean, source: 'trigger' | 'menu' | 'outside' = 'trigger') => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalOpen(open);
    }
    onOpenChange?.(open, { source });
  }, [disabled, isControlled, onOpenChange]);

  const handleMouseEnter = () => {
    if (triggers.includes('hover')) {
      clearTimeout(timeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggers.includes('hover')) {
      timeoutRef.current = setTimeout(() => setOpen(false), 100);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (triggers.includes('click')) {
      e.preventDefault();
      setOpen(!isOpen);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (triggers.includes('contextMenu')) {
      e.preventDefault();
      setContextMenuPosition({ x: e.clientX, y: e.clientY });
      setOpen(true);
    }
  };

  const handleMenuItemClick = (info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => {
    if (autoClose && !info.item.children?.length) {
      setOpen(false, 'menu');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setOpen(false);
    }
  };

  // Handle outside clicks
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && 
          popupRef.current && 
          !triggerRef.current.contains(e.target as Node) && 
          !popupRef.current.contains(e.target as Node)) {
        setOpen(false, 'outside');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  // Calculate popup position
  const getPopupStyle = (): React.CSSProperties => {
    if (triggers.includes('contextMenu') && contextMenuPosition) {
      return {
        position: 'fixed',
        left: contextMenuPosition.x,
        top: contextMenuPosition.y,
        zIndex: 1050,
        ...popupStyle,
      };
    }

    const styles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1050,
      ...popupStyle,
    };

    switch (placement) {
      case 'top':
        styles.bottom = '100%';
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        styles.marginBottom = '4px';
        break;
      case 'topLeft':
        styles.bottom = '100%';
        styles.left = '0';
        styles.marginBottom = '4px';
        break;
      case 'topRight':
        styles.bottom = '100%';
        styles.right = '0';
        styles.marginBottom = '4px';
        break;
      case 'bottom':
        styles.top = '100%';
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        styles.marginTop = '4px';
        break;
      case 'bottomLeft':
        styles.top = '100%';
        styles.left = '0';
        styles.marginTop = '4px';
        break;
      case 'bottomRight':
        styles.top = '100%';
        styles.right = '0';
        styles.marginTop = '4px';
        break;
    }

    return styles;
  };

  const renderMenu = () => {
    if (!menu?.items) return null;

    return (
      <Menu
        items={menu.items}
        selectable={menu.selectable}
        selectedKeys={menu.selectedKeys}
        onSelect={menu.onSelect}
        onItemClick={handleMenuItemClick}
      />
    );
  };

  const renderPopup = () => {
    if (!isOpen && destroyPopupOnHide) return null;

    const menuContent = renderMenu();
    const finalContent = popupRender ? popupRender(menuContent) : menuContent;

    return (
      <div
        ref={popupRef}
        className={`ui-dropdown-popup ${popupClassName} ${arrow ? 'ui-dropdown-popup--arrow' : ''} ui-dropdown-popup--${placement} ${isOpen ? 'ui-dropdown-popup--open' : ''}`}
        style={getPopupStyle()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => e.stopPropagation()}
      >
        {arrow && <div className="ui-dropdown-arrow" />}
        {finalContent}
      </div>
    );
  };

  const containerProps = getPopupContainer ? {} : { style: { position: 'relative', display: 'inline-block' } };

  return (
    <div
      {...props}
      {...containerProps}
      ref={ref}
      className={`ui-dropdown ${className}`}
      style={style}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={triggerRef}
        className="ui-dropdown-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
      {getPopupContainer ? 
        ReactDOM.createPortal(renderPopup(), getPopupContainer()) : 
        renderPopup()
      }
    </div>
  );
});

export const DropdownButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(({
  children,
  icon = <ChevronDown size={14} />,
  loading = false,
  size = 'md',
  onClick,
  onMenuClick,
  menu,
  placement = 'bottomRight',
  arrow = false,
  disabled = false,
  trigger = 'click',
  autoClose = true,
  className = '',
  style,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = (info: { key: string; keyPath: string[]; item: MenuItem; domEvent: React.MouseEvent }) => {
    onMenuClick?.(info);
    if (autoClose) {
      setIsOpen(false);
    }
  };

  const sizeClass = `ui-dropdown-button--${size}`;

  return (
    <div className={`ui-dropdown-button-group ${className}`} style={style}>
      <button
        {...props}
        ref={ref}
        className={`ui-dropdown-button-main ${sizeClass} ${disabled ? 'ui-dropdown-button--disabled' : ''}`}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? <span className="ui-dropdown-button-loading">⟳</span> : children}
      </button>
      <Dropdown
        menu={menu ? {
          ...menu,
          onSelect: menu.onSelect,
        } : undefined}
        trigger={trigger}
        placement={placement}
        arrow={arrow}
        disabled={disabled}
        open={isOpen}
        onOpenChange={setIsOpen}
        autoClose={autoClose}
      >
        <button
          className={`ui-dropdown-button-dropdown ${sizeClass} ${disabled ? 'ui-dropdown-button--disabled' : ''}`}
          disabled={disabled || loading}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled && !loading) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {loading ? <span className="ui-dropdown-button-loading">⟳</span> : icon}
        </button>
      </Dropdown>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
DropdownButton.displayName = 'DropdownButton';
