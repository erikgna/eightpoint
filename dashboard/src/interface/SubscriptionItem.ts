export interface ISubscriptionItem {
    id: string;
    subscriptionId: string;
    name: string;
    description?: string;
    type: string;
    price: number;
    createdAt: string;
}