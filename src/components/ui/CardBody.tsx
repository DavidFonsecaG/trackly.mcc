import type { ReactNode } from "react";

const CardBody = ({ children } : { children: ReactNode }) => {
    return (
        <div className="pt-3">
            <div className="flex flex-col p-5 pt-0 gap-8">
                { children }
            </div>
        </div>
    )
};

export default CardBody;