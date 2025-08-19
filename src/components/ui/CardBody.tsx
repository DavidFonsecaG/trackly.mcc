
interface CardBodyTypes {
    className?: string;
    children: React.ReactNode 
}

const CardBody: React.FC<CardBodyTypes> = ({
    className,
    children, 
}) => {
    return (
        <div className="pt-3">
            <div className={`flex flex-col p-5 pt-0 gap-8 ${className}`}>
                { children }
            </div>
        </div>
    )
};

export default CardBody;