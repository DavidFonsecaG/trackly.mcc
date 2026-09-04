import apiClient from "./apiClient";
import type { TrackerConfig } from "../types";

export const fetchConfig = async (): Promise<TrackerConfig> => {
    const res = await apiClient.get("/config");
    return res.data;
};

export const updateConfigOnServer = async (config: TrackerConfig): Promise<TrackerConfig> => {
    const res = await apiClient.post("/config/update", config);
    return res.data;
};
