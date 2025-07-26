import React, { useEffect } from "react";
import { CircleAlert, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

interface ToastProps {
    message: string;
    action?: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, action, duration = 3000 }) => {
    const { setNotification } = useAppContext();

    const onClose = () => {
        setNotification(null);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
        onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="absolute bottom-5 right-5 flex w-xs p-4 text-sm bg-card border shadow-lg rounded-2xl items-center justify-between transition-opacity duration-800">
        <div className="flex items-center gap-2">
            <CircleAlert className="w-4 h-4" />
            <p>
            {message}
            {action && (
                <span onClick={action} className="text-blue-500 cursor-pointer">
                {" "}
                undo?
                </span>
            )}
            </p>
        </div>
        <span className="cursor-pointer" onClick={onClose}>
            <X className="w-4 h-4" />
        </span>
        </div>
    );
};

export default Toast;
