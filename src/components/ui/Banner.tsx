import { X } from "lucide-react";

interface BannerProps {
    text: string;
    action: () => void;
};

const Banner: React.FC<BannerProps> = ({
    text,
    action,
}) => {
    return (
        <div className="flex p-2 w-full text-white text-center text-xs bg-primary items-center">
            <div className="w-full">
                <span>{text}</span>
            </div>
            <X onClick={action} className="w-4 h-4 cursor-pointer"/>
        </div>
    );
};

export default Banner;