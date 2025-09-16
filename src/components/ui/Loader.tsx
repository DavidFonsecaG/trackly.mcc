import { useEffect, useState } from "react";

const Loader = () => {
    const [scaleIn, setScaleIn] = useState(false);

    useEffect(() => {
        setScaleIn(true);
    }, []);

    return (
        <div className="z-100 flex items-center justify-center fixed inset-0 w-full h-full top-0">
            <div 
                style={{
                    transform: scaleIn ? "scale(1)" : "scale(0.7)",
                    transition: "transform 0.3s ease-out"
                }}
                className="flex size-20 rounded-full bg-primary items-center justify-center animate-pulse [animation-duration:3s]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-card animate-spin [animation-duration:4s]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
        </div>
    );
};

export default Loader;