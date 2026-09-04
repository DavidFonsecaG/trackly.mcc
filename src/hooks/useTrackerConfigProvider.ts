import { useEffect, useState } from "react";
import type { ApplicationType, TrackerConfig } from "../types";
import { defaultTrackerConfig } from "../config/trackerDefaults";
import { fetchConfig, updateConfigOnServer } from "../services/configService";
import { useAuth } from "../context/AuthContext";

export const useTrackerConfigProvider = () => {
    const { user } = useAuth();
    const [config, setConfig] = useState<TrackerConfig>(defaultTrackerConfig);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            if (!user) {
                if (mounted) {
                    setConfig(defaultTrackerConfig);
                    setLoading(false);
                }
                return;
            }
            try {
                const c = await fetchConfig();
                if (mounted) setConfig(c);
            } catch (err: any) {
                console.error("Failed to fetch tracker config:", err?.response?.data?.message || err?.message || err);
                if (mounted) setConfig(defaultTrackerConfig);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [user]);

    // Optimistically updates local config and persists it (logged-in only;
    // demo mode keeps changes in memory).
    const saveConfig = async (next: TrackerConfig) => {
        setConfig(next);
        if (!user) return;
        try {
            const saved = await updateConfigOnServer(next);
            setConfig(saved);
        } catch (err: any) {
            console.error("Failed to save tracker config:", err?.response?.data?.message || err?.message || err);
        }
    };

    const getType = (id: string): ApplicationType | undefined =>
        config.applicationTypes.find((t) => t.id === id);

    return { config, loading, saveConfig, getType } as const;
};
