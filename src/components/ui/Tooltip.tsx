import { useEffect } from "react";

interface TooltipProps {
  x: number;
  y: number;
  onWaive: () => void;
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, onWaive, onClose }) => {
  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <div
      className="fixed z-50 w-30 bg-card border rounded-lg shadow-lg p-1 cursor-pointer"
      style={{ top: y, left: (x - 120) }}
      onClick={(e) => {
        e.stopPropagation();
        onWaive();
        onClose();
      }}
    >
        <div className="px-3 py-1 text-xs rounded-md hover:bg-background">Add Note</div>
        <div className="px-3 py-1 text-xs rounded-md hover:bg-background">Waive</div>
    </div>
  );
};

export default Tooltip;