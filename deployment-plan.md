# 🚀 Deployment Plan – In-App Subscription SDK System

This guide describes how to deploy the complete system including:

- SDK (TypeScript package)
- Backend (NestJS + PostgreSQL)
- Frontend (React + Vite + Ant Design)
- CLI Tool
- Database

---

## 📦 Project Structure

```
iap-system/
├── sdk/
├── backend/
├── dashboard/
├── docker/
└── infra/
```

---

## 🧩 Components Overview

| Component    | Tech                      | Deployment Option                    |
| ------------ | ------------------------- | ------------------------------------ |
| **SDK**      | TypeScript                | npm registry or CDN                  |
| **Backend**  | NestJS + PostgreSQL       | Docker / Railway / Fly.io / AWS      |
| **Frontend** | React + Vite + Ant Design | Vercel / Netlify / S3 + CloudFront   |
| **Database** | PostgreSQL                | Supabase / Neon / Railway            |
| **CLI**      | Node.js CLI               | Global npm install or GitHub release |

---

## 🗄 PostgreSQL Setup

### Option 1: Local with Docker

```bash
docker run --name iap-postgres \
  -e POSTGRES_USER=iap_user \
  -e POSTGRES_PASSWORD=iap_password \
  -e POSTGRES_DB=iap_db \
  -p 5432:5432 \
  -d postgres
```

### Option 2: Hosted

Use a managed database like Supabase, Neon, or Railway.

## 📦 SDK Deployment

### 🚀 Publish SDK to NPM

```
cd sdk
npm publish --access public
```

### 🔽 Or CDN Hosting (Optional)

```
<script src="https://cdn.example.com/sdk.js"></script>
```

### 📦 Developer Usage

```
pnpm install sdk
```

## 🛠 CLI Tool Deployment

### ✅ Local Install

```
cd cli
pnpm install
pnpm link
```

Use the CLI:

```
cli register --name "My App"
```

### 📦 Publish to NPM (Optional)

```
npm publish --access public
```

## 🔐 Security & Monitoring

| Concern       | Strategy                                           |
| ------------- | -------------------------------------------------- |
| API Auth      | API Key in Authorization header                    |
| HTTPS         | Enforced via CDN or reverse proxy                  |
| Rate limiting | Use middleware (e.g. NestJS rate-limiter)          |
| Logging       | Store events in DB or pipe to service like Logtail |
| Monitoring    | Tools like Sentry, LogRocket, or PostHog           |
| DB Backups    | Use Railway/Neon/Supabase backup plans             |
