import { AppAnalyticsPayload, AppPayload, CreateAppDto, CreateSubscriptionDto, CreateSubscriptionItemDto, SubscriptionItemPayload, SubscriptionPayload } from './types';

let API_KEY = process.env.IPA_SDK_API_KEY;
let BASE_URL = process.env.IPA_SDK_API_URL;

export function initializeSDK(apiKey: string, baseUrl: string) {
    API_KEY = apiKey;
    BASE_URL = baseUrl;
}

export async function getActiveSubscriptions(page = 1, limit = 10): Promise<SubscriptionPayload[]> {
    const query = new URLSearchParams({ page: String(page), limit: String(limit) }).toString();
    return sendToBackend(`/subscriptions?${query}`);
}

export async function createSubscription(dto: CreateSubscriptionDto): Promise<SubscriptionPayload> {
    return sendToBackend('/subscriptions', "POST", dto);
}

export async function getCurrentApp(): Promise<AppPayload> {
    return sendToBackend('/apps/me');
}

export async function createApp(dto: CreateAppDto): Promise<AppPayload> {
    return sendToBackend('/apps', 'POST', dto);
}

export async function getAnalytics(): Promise<AppAnalyticsPayload> {
    return sendToBackend('/apps/analytics');
}

export async function createSubscriptionItem(subscriptionId: string, dto: CreateSubscriptionItemDto): Promise<SubscriptionItemPayload> {
    return sendToBackend(`/subscriptions/${subscriptionId}/items`, "POST", dto);
}

export async function getSubscriptionItems(subscriptionId: string, page = 1, limit = 10): Promise<{ data: SubscriptionItemPayload[]; total: number; page: number; lastPage: number }> {
    const query = new URLSearchParams({ page: String(page), limit: String(limit) }).toString();
    return sendToBackend(`/subscriptions/${subscriptionId}/items?${query}`);
}

export async function deleteSubscriptionItem(subscriptionId: string, itemId: string): Promise<SubscriptionItemPayload> {
    return sendToBackend(`/subscriptions/${subscriptionId}/items/${itemId}`, "DELETE");
}

export async function sendToBackend(endpoint: string, method = "GET", payload?: any): Promise<any> {
    if (!API_KEY) throw new Error('SDK not initialized. Call initializeSDK(apiKey)');

    const options: RequestInit = { method, headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY } };
    if (method !== 'GET' && payload) options.body = JSON.stringify(payload);
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) throw new Error(`API Error: ${response.status} ${await response.text()}`);

    return response.json();
}