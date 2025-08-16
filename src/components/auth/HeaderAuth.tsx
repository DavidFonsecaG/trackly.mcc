import { Link } from "react-router-dom";

interface HeaderAuthTypes {
    data: {title: string, subtitle: string, url: string, alternative: string};
}
const HeaderAuth: React.FC<HeaderAuthTypes> = ({
    data
}) => {
    return (
        <div className="text-center">
            <div className="flex mb-4 items-center justify-center">
                <Link to="/" className="flex size-10 rounded-full bg-primary items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </Link>
            </div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">{data.title}</h2>
            <p className="mt-2 text-sm leading-6 text-primary/50">
                {data.subtitle + " "}
                <Link
                to={data.url}
                className="font-semibold leading-6 text-primary hover:text-primary/70"
                >
                {data.alternative}
                </Link>
            </p>
        </div>
    );
};

export default HeaderAuth;