import type { ISubscription } from "./Subscription";

export interface IApp {
    id: string;
    name: string;
    platform: string;
    developerEmail: string;
    apiKey: string;
    createdAt: string;
    subscriptions: ISubscription[];
}

export interface IAppAnalytics {
    totalRevenue: number;
    subscriptions: number;
}