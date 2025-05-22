import { useState, useEffect } from "react";
import { Input, Card, Table, Typography, message } from "antd";
import { getAnalytics, getAppInfo, getActiveSubscriptions } from "../services/api";
import type { IApp, IAppAnalytics } from "../interface/App";
import type { ISubscription } from "../interface/Subscription";

const { Paragraph } = Typography;

const Dashboard = () => {
    const [apiKey, setApiKey] = useState("");
    const [appInfo, setAppInfo] = useState<IApp | null>(null);
    const [analytics, setAnalytics] = useState<IAppAnalytics | null>(null);
    const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0 });

    const fetchAppData = async () => {
        try {
            if (!apiKey.trim()) return message.warning("API key is required.");

            setLoading(true);
            const [appRes, analyticsRes] = await Promise.all([
                getAppInfo(apiKey),
                getAnalytics(apiKey),
            ]);

            setAppInfo(appRes);
            setAnalytics(analyticsRes);
        } catch (err) {
            message.error("Failed to load app info or analytics.");
        } finally {
            setLoading(false);
        }
    };

    const fetchSubscriptions = async (page = 1) => {
        try {
            setLoading(true);
            const res = await getActiveSubscriptions(apiKey, page, pagination.limit);
            setSubscriptions(res.data);
            setPagination((prev) => ({ ...prev, total: res.total }));
        } catch {
            message.error("Failed to load subscriptions.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        resetStates();
        await fetchAppData();
        setPagination((prev) => ({ ...prev, page: 1 }));
        await fetchSubscriptions();
    };

    const resetStates = () => {
        setAppInfo(null);
        setAnalytics(null);
        setSubscriptions([]);
    }

    useEffect(() => {
        if (apiKey) fetchSubscriptions(pagination.page);
    }, [pagination.page]);

    return (
        <>
            <Card title="Enter API Key" style={{ marginBottom: 24 }}>
                <Input.Search
                    placeholder="Enter your API key"
                    enterButton="Load"
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                    onSearch={handleSearch}
                    loading={loading}
                />
            </Card>

            {appInfo && (
                <Card title="App Info" style={{ marginBottom: 24 }}>
                    <Paragraph><strong>ID:</strong> {appInfo.id}</Paragraph>
                    <Paragraph><strong>Name:</strong> {appInfo.name}</Paragraph>
                    <Paragraph><strong>Developer Email:</strong> {appInfo.developerEmail}</Paragraph>
                    <Paragraph><strong>Platform:</strong> {appInfo.platform}</Paragraph>
                    <Paragraph><strong>Created At:</strong> {appInfo.createdAt}</Paragraph>
                </Card>
            )}

            {analytics && (
                <Card title="Analytics" style={{ marginBottom: 24 }}>
                    <Paragraph><strong>Total Revenue:</strong> ${analytics.totalRevenue}</Paragraph>
                    <Paragraph><strong>Subscriptions:</strong> {analytics.subscriptions}</Paragraph>
                </Card>
            )}

            {subscriptions && subscriptions.length > 0 && (
                <Card title="Active Subscriptions">
                    <Table
                        rowKey="id"
                        dataSource={subscriptions}
                        loading={loading}
                        pagination={{
                            current: pagination.page,
                            total: pagination.total,
                            pageSize: pagination.limit,
                            onChange: (page) => setPagination((prev) => ({ ...prev, page }))
                        }}
                        expandable={{
                            expandedRowRender: (record: ISubscription) => {
                                return (
                                    <Table
                                        rowKey="id"
                                        dataSource={record.subscriptionItems || []}
                                        pagination={false}
                                        size="small"
                                        columns={[
                                            { title: "Name", dataIndex: "name" },
                                            { title: "Type", dataIndex: "type" },
                                            { title: "Description", dataIndex: "description" },
                                            { title: "Price", dataIndex: "price" },
                                        ]}
                                    />
                                );
                            },
                            rowExpandable: (record) => (record.subscriptionItems && record.subscriptionItems.length > 0) ?? false,
                        }}
                        columns={[
                            { title: "User ID", dataIndex: "userId" },
                            { title: "Plan ID", dataIndex: "planId" },
                            { title: "Amount", dataIndex: "amount" },
                            { title: "Currency", dataIndex: "currency" },
                            { title: "Status", dataIndex: "status" },
                            { title: "Created At", dataIndex: "createdAt" },
                        ]}
                    />
                </Card>
            )}
        </>
    );
};

export default Dashboard;
