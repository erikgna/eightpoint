# In-App Subscription SDK & Developer Dashboard

This project provides:

- **Backend:** NestJS + PostgreSQL API for app registration, subscription validation, and analytics.
- **SDK:** TypeScript SDK for mobile apps to integrate in-app purchases and subscriptions.
- **CLI:** Command-line tool to interact with the SDK.
- **Frontend:** React + Vite + Ant Design dashboard for developers to view app analytics.
- **Docker:** Multi-stage production-optimized Dockerfiles and a `docker-compose.yml` for easy local setup.

---

## Table of Contents

- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Backend API Usage](#backend-api-usage)
- [SDK Usage Examples](#sdk-usage-examples)
- [CLI Usage](#cli-usage)
- [Frontend Usage](#frontend-usage)

---

## Local Setup

### Prerequisites

- Node.js (v20+ recommended)
- pnpm
- Docker & Docker Compose
- PostgreSQL (optional if using Docker)

### PostgreSQL

1. With Docker installed in your machine, run the command:

```bash
docker run --name iap-postgres \
  -e POSTGRES_USER=iap_user \
  -e POSTGRES_PASSWORD=iap_password \
  -e POSTGRES_DB=iap_db \
  -p 5432:5432 \
  -d postgres
```

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` file (see [Environment Variables](#environment-variables)).

4. Run database migrations (if applicable) or ensure your PostgreSQL is running.

5. Migrate schemas:

```bash
pnpm prisma migrate dev
```

6. Start the backend server:

```bash
pnpm run start:dev
```

### Frontend

1. Navigate to the frontend folder:

```bash
cd dashboard
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` file (see [Environment Variables](#environment-variables)).

4. Start the frontend dev server:

```bash
pnpm run dev
```

---

## Environment Variables

Copy `.env.example` file and rename to `.env`:

---

## Running with Docker (Recommended for Local Testing)

Make sure Docker and Docker Compose are installed.

From project root, run:

```bash
docker-compose up --build
```

- Backend: http://localhost:3000
- Frontend: http://localhost
- Postgres exposed on 5432

---

## Backend API Usage

### Register a New App

```
POST /apps
Body:
{
"name": "MyCoolApp",
"platform": "android",
"developerEmail": "dev@example.com"
}
```

Response includes the app ID and generated API key.

---

### Get App

```
GET /apps/me
Headers:
x-api-key: <app_api_key>
```

Response:

```
{
    "id": "766229f3-63c2-487a-b133-7186111c07c8",
    "name": "MyCoolApp1",
    "platform": "android",
    "developerEmail": "dev1@example.com",
    "apiKey": "9e5c998e-620f-46bb-ad1d-db48f63bde2b",
    "createdAt": "2025-05-22T01:19:06.700Z"
}
```

---

### Validate and Log Subscription Event

```
POST /subscriptions
Headers:
x-api-key: <app_api_key>
Body:
{
"userId": "user123",
"planId": "premium",
"amount": 9.99,
"currency": "USD",
"status": "active"
}
```

---

### Get App Analytics

```
GET /apps/analytics
Headers:
x-api-key: <app_api_key>
```

Response:

```
{
"totalRevenue": 1234.56,
"activeSubscriptions": 42
}
```

---

### Get Subscriptions

```
GET /subscriptions
Headers:
x-api-key: <app_api_key>
```

Response:

```
{
    "data": [
        {
            "id": "b62122ee-dc49-478b-9fac-25a364826cc0",
            "appId": "766229f3-63c2-487a-b133-7186111c07c8",
            "userId": "user123",
            "planId": "premium",
            "amount": 9.99,
            "currency": "USD",
            "createdAt": "2025-05-22T12:25:35.504Z",
            "status": "active"
        }
    ],
    "total": 1,
    "page": 1,
    "lastPage": 1
}
```

## SDK

1. Navigate to the SDK folder:

```bash
cd sdk
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` file (see [Environment Variables](#environment-variables)).

4. Build the SDK:

```bash
pnpm run build
```

5. Now you can use it in your projects by running:

```bash
pnpm install <path-of-sdk>
```

### SDK Usage Examples

```typescript
import {
  initializeSDK,
  createSubscription,
  getActiveSubscriptions,
  getCurrentApp,
  getAnalytics,
} from "iap-sdk";

initializeSDK("9e5c998e-620f-46bb-ad1d-db48f63bde2b", "http://localhost:3000");

async function run() {
  await createSubscription({
    planId: "plan_123",
    userId: "user123",
    amount: 12.5,
    currency: "USD",
  });

  const subscriptions = await getActiveSubscriptions();
  console.log(subscriptions);

  const app = await getCurrentApp();
  console.log(app);

  const analytics = await getAnalytics();
  console.log(analytics);
}

run();
```

## CLI Usage

Build CLI:

```bash
cd cli
pnpm run build

export IPA_SDK_API_URL=http://localhost:3000
export IPA_SDK_API_KEY=<your-api-key>
```

Example:

```bash
node ./dist subscribe --user-id user_001 --plan-id plan_001 --amount 1 --currency USD --status active
```

## Frontend Usage

- The React frontend provides a dashboard for developers to:

  - View app registration info.

  - See analytics: total revenue, active subscriptions.

- Runs on port 80 on Docker mode and 5173 on dev mode.
