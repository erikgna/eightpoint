export interface SDKOptions {
    baseUrl?: string;
    apiKey?: string;
}

export interface CreateSubscriptionDto {
    userId: string;
    planId: string;
    amount: number;
    currency: string;
    status: string;
}

export interface CreateAppDto {
    name: string;
    platform: string;
    developerEmail: string;
}

export interface SubscriptionPayload {
    id: string;
    appId: string;
    userId: string;
    planId: string;
    amount: number;
    currency: string;
    createdAt: string;
    app?: AppPayload;
}

export interface AppPayload {
    id: string;
    name: string;
    platform: string;
    developerEmail: string;
    apiKey: string;
    createdAt: string;
    subscriptions: SubscriptionPayload[];
}

export interface AppAnalyticsPayload {
    totalRevenue: number;
    subscriptions: number;
}

export interface CreateSubscriptionItemDto {
    name: string;
    description?: string;
    type: string;
    price: number;
}

export interface SubscriptionItemPayload {
    id: string;
    subscriptionId: string;
    name: string;
    description?: string;
    type: string;
    price: number;
    createdAt: string;
}