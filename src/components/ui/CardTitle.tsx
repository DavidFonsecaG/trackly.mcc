interface CardTitleTypes {
    title: string;
};

const CardTitle: React.FC<CardTitleTypes> = ({
    title,
}) => {
    return (
        <div className="flex items-center p-3">
            <h2 className="md:text-lg font-semibold">{title}</h2>
        </div>
    )
};

export default CardTitle;