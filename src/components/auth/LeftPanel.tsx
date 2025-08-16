import { Link } from "react-router-dom";

const LeftPanel = () => {
    return (
        <div className="hidden lg:block w-2/4 py-4 pl-4">
            <div className="flex flex-col h-full w-full bg-primary rounded-3xl text-white p-8">
                <Link to="/" className="flex gap-3 text-2xl items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    <span>Trackly</span>
                </Link>
                <div className="flex flex-col w-full h-full items-center justify-center text-center p-4">
                    <div className="rounded-xl mb-4">
                        <img className="rounded-xl" src="cover-1.png" alt="cover" />
                    </div>
                    <span className="text-xl">The easiest way to manage your <br/> student's applications.</span>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;