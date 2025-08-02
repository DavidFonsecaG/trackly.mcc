const Card = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="flex flex-col w-full p-3 shadow-sm bg-card rounded-3xl">
            { children }
        </div>
    )
};

export default Card;