import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import { Toast, ToastProps } from './Toast';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextValue {
  showToast: (options: Omit<ToastProps, 'onClose'> & { id?: string }) => string;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastItem extends ToastProps {
  id: string;
  isVisible: boolean;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts(current =>
      current.map(toast =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    setTimeout(() => {
      setToasts(current => current.filter(toast => toast.id !== id));
    }, 300); // match your exit animation time
  }, []);

  const showToast = useCallback(
    (options: Omit<ToastProps, 'onClose'> & { id?: string }): string => {
      const id =
        options.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      setToasts(current => {
        const filtered = current.length >= maxToasts ? current.slice(1) : current;

        return [
          ...filtered,
          {
            ...options,
            id,
            isVisible: true,
            onClose: () => hideToast(id),
          },
        ];
      });

      return id;
    },
    [hideToast, maxToasts]
  );

  const hideAllToasts = useCallback(() => {
    setToasts(current =>
      current.map(toast => ({ ...toast, isVisible: false }))
    );

    setTimeout(() => {
      setToasts([]);
    }, 300);
  }, []);

  const contextValue: ToastContextValue = {
    showToast,
    hideToast,
    hideAllToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className={`ui-toast-container ui-toast-container--${position}`}>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
