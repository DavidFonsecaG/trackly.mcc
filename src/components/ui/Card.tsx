interface CardTypes {
    className?: string;
    children: React.ReactNode 
}

const Card: React.FC<CardTypes> = ({
   className,
   children, 
}) => {
    return (
        <div className={`flex flex-col w-full p-3 shadow-sm bg-card rounded-3xl ${className}`}>
            { children }
        </div>
    )
};

export default Card;