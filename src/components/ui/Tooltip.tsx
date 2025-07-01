import { useEffect } from "react";

interface TooltipProps {
  x: number;
  y: number;
  actions: { [label: string]: () => void };
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, actions, onClose }) => {
  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <div
      className="fixed z-50 w-30 bg-card border rounded-lg shadow-lg p-1 cursor-pointer"
      style={{ top: y, left: (x - 120) }}
    >
      {Object.entries(actions).map(([label, handler], index) => (
        <div
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            handler();
            onClose();
          }} 
          className="px-3 py-1 text-xs rounded-md hover:bg-background">{label}</div>
      ))}
    </div>
  );
};

export default Tooltip;