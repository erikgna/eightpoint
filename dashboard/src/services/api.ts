import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

const withApiKey = (apiKey: string) => ({ headers: { 'x-api-key': apiKey } });

export const getAppInfo = async (apiKey: string) => {
    const res = await axios.get(`${API_BASE}/apps/me`, withApiKey(apiKey));
    return res.data;
};

export const getAnalytics = async (apiKey: string) => {
    const res = await axios.get(`${API_BASE}/apps/analytics`, withApiKey(apiKey));
    return res.data;
};

export const getActiveSubscriptions = async (
    apiKey: string,
    page = 1,
    limit = 10
) => {
    const res = await axios.get(
        `${API_BASE}/subscriptions?page=${page}&limit=${limit}`,
        withApiKey(apiKey)
    );
    return res.data;
};
