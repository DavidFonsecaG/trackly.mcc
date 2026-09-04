import { createContext, useContext, type ReactNode } from "react";
import type { ApplicationType, TrackerConfig } from "../types";
import { useTrackerConfigProvider } from "../hooks/useTrackerConfigProvider";

interface TrackerConfigContextType {
    config: TrackerConfig;
    loading: boolean;
    saveConfig: (config: TrackerConfig) => void;
    getType: (id: string) => ApplicationType | undefined;
}

const TrackerConfigContext = createContext<TrackerConfigContextType | undefined>(undefined);

export const TrackerConfigProvider = ({ children }: { children: ReactNode }) => {
    const value = useTrackerConfigProvider();
    return <TrackerConfigContext.Provider value={value}>{children}</TrackerConfigContext.Provider>;
};

export const useTrackerConfig = (): TrackerConfigContextType => {
    const context = useContext(TrackerConfigContext);
    if (!context) {
        throw new Error("useTrackerConfig must be used within a TrackerConfigProvider");
    }
    return context;
};
