import { X } from "lucide-react";
import React from "react";

export type Variant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  variant: Variant;
  title: string;
  message?: string;
}

const VARIANT_CONFIG: Record<Variant, { dot: string }> = {
  success: { dot: "bg-green-600" },
  warning: { dot: "bg-yellow-600" },
  error: { dot: "bg-red-600" },
  info: { dot: "bg-blue-600" },
};

interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const config = VARIANT_CONFIG[toast.variant];

  return (
    <div
      className="bg-white border border-gray-300 shadow-sm flex items-start w-full max-w-lg min-w-xs p-4 ps-0 rounded-lg"
      role="alert"
    >
      <div className="mr-3 mt-1 shrink-0">
        <span className={`w-3 h-3 rounded-full ${config.dot}`} />
      </div>

      <div className="mr-2">
        <h6 className="text-slate-900 text-sm font-semibold">{toast.title}</h6>
        {toast.message && (
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="ml-auto text-gray-400 hover:text-red-500"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ToastItem;
