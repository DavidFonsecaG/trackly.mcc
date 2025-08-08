import { type RefObject } from 'react';

interface CardTypes {
    ref?: RefObject<HTMLDivElement | null>
    className?: string;
    children: React.ReactNode 
}

const Card: React.FC<CardTypes> = ({
    ref,
    className,
    children, 
}) => {
    return (
        <div ref={ref} className={`flex flex-col w-full p-3 shadow-sm bg-card rounded-3xl ${className}`}>
            { children }
        </div>
    )
};

export default Card;