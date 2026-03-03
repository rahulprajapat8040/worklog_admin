"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import ToastItem, { Toast, Variant } from "./ToastItem";

type Position =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

interface ToastContextValue {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

const positionClasses: Record<Position, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export const ToastProvider = ({
  children,
  position = "top-right",
}: {
  children: ReactNode;
  position?: Position;
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (variant: Variant, title: string, message?: string) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, variant, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        toast: {
          success: (t, m) => showToast("success", t, m),
          error: (t, m) => showToast("error", t, m),
          info: (t, m) => showToast("info", t, m),
          warning: (t, m) => showToast("warning", t, m),
        },
      }}
    >
      {children}

      <div className={`fixed z-50 space-y-3 ${positionClasses[position]}`}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx.toast;
};
