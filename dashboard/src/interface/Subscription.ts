import type { IApp } from "./App";

export interface ISubscription {
    id: string;
    appId: string;
    userId: string;
    planId: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    app?: IApp;
}
