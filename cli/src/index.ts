import { Command } from 'commander';
import { createApp, createSubscription, createSubscriptionItem, deleteSubscriptionItem, getActiveSubscriptions, getAnalytics, getCurrentApp, getSubscriptionItems } from 'iap-sdk';

const program = new Command();

program
    .name('iap-sdk-cli')
    .description('CLI to test the In-App Subscription SDK')
    .version('1.0.0');

program
    .command('subscribe')
    .description('Subscribe to a plan')
    .requiredOption('--user-id <id>', 'User ID')
    .requiredOption('--plan-id <id>', 'Plan ID')
    .requiredOption('--amount <amount>', 'Amount')
    .requiredOption('--currency <code>', 'Currency')
    .requiredOption('--status <status>', 'Status')
    .action(async (options) => {
        try {
            const result = await createSubscription({
                userId: options.userId,
                planId: options.planId,
                amount: parseFloat(options.amount),
                currency: options.currency,
                status: options.status
            });
            console.log('Subscription successful:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('get-app')
    .description('Get current app by API key')
    .action(async () => {
        try {
            const result = await getCurrentApp();
            console.log('App:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('create-app')
    .description('Create a new app')
    .requiredOption('--name <name>', 'App name')
    .requiredOption('--platform <platform>', 'App platform')
    .requiredOption('--developer-email <email>', 'Developer email')
    .action(async (options) => {
        try {
            const result = await createApp({
                name: options.name,
                platform: options.platform,
                developerEmail: options['developerEmail'],
            });
            console.log('App created:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('get-analytics')
    .description('Get app analytics')
    .action(async () => {
        try {
            const result = await getAnalytics();
            console.log('Analytics:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('list-subscriptions')
    .description('List active subscriptions')
    .option('--page <page>', 'Page number', '1')
    .option('--limit <limit>', 'Page size limit', '10')
    .action(async (options) => {
        try {
            const result = await getActiveSubscriptions(
                parseInt(options.page),
                parseInt(options.limit)
            );
            console.log('Active Subscriptions:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('create-subscription-item')
    .description('Create a subscription item for a subscription')
    .requiredOption('--subscription-id <id>', 'Subscription ID')
    .requiredOption('--name <name>', 'Item name')
    .requiredOption('--type <type>', 'Item type')
    .requiredOption('--price <price>', 'Item price')
    .option('--description <description>', 'Item description')
    .action(async (options) => {
        try {
            const result = await createSubscriptionItem(options.subscriptionId, {
                name: options.name,
                type: options.type,
                description: options.description || '',
                price: parseFloat(options.price)
            });
            console.log('Subscription item created:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('list-subscription-items')
    .description('List items of a subscription')
    .requiredOption('--subscription-id <id>', 'Subscription ID')
    .option('--page <page>', 'Page number', '1')
    .option('--limit <limit>', 'Page size limit', '10')
    .action(async (options) => {
        try {
            const result = await getSubscriptionItems(
                options.subscriptionId,
                parseInt(options.page),
                parseInt(options.limit)
            );
            console.log('Subscription Items:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program
    .command('delete-subscription-item')
    .description('Delete a subscription item by ID')
    .requiredOption('--subscription-id <subscription>', 'Subscription ID')
    .requiredOption('--item-id <id>', 'Item ID to delete')
    .action(async (options) => {
        try {
            const result = await deleteSubscriptionItem(options.subscriptionId, options.itemId);
            console.log('Subscription item deleted:', result);
        } catch (err: any) {
            console.error('Error:', err.message);
        }
    });

program.parseAsync(process.argv);

