import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  action: {
    name: string,
    func: () => void,
  };
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, action, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="absolute bottom-5 right-5 flex w-xs p-4 text-sm bg-card shadow-lg rounded-2xl items-center justify-between transition-opacity duration-300">
      <div className="flex items-center gap-2">
        <p>{message}</p>
        <p onClick={action.func} className="text-blue-500 cursor-pointer">{action.name}</p>
      </div>
      <span className="cursor-pointer" onClick={onClose}>
        <X className="w-4 h-4" />
      </span>
    </div>
  );
};

export default Toast;
