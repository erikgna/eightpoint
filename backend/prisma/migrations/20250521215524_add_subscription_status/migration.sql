-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'unactive', 'on_hold', 'processing');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'active';
