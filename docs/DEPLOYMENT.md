# Deployment Guide

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (Neon recommended for Vercel)
- BigCommerce store with API access
- (Optional) QuickBooks Online account
- (Optional) TaxJar or Avalara account
- (Optional) ShipStation or Shippo account

## Local Development

### 1. Clone and Install

```bash
git clone <repository-url>
cd auvolar-platform
pnpm install
```

### 2. Environment Setup

```bash
cp apps/portal/.env.example apps/portal/.env
```

Edit `.env` with your credentials. At minimum, you need:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random 32+ char string (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)

### 3. Database Setup

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed sample data
pnpm db:seed
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

**Test accounts:**
- Admin: wally@auvolar.com / admin123
- Customer: contractor@example.com / customer123

## Production Deployment (Vercel)

### 1. Vercel Project Setup

1. Import repository to Vercel
2. Set root directory to `apps/portal`
3. Framework preset: Next.js (auto-detected)

### 2. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

**Required:**
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.com
```

**BigCommerce (when ready):**
```
BC_STORE_HASH=your-store-hash
BC_ACCESS_TOKEN=your-access-token
BC_CLIENT_ID=your-client-id
BC_CLIENT_SECRET=your-client-secret
```

**Integrations (as needed):**
```
QBO_CLIENT_ID=...
QBO_CLIENT_SECRET=...
TAXJAR_API_KEY=...
SHIPSTATION_API_KEY=...
SHIPSTATION_API_SECRET=...
OPENAI_API_KEY=...
SENDGRID_API_KEY=...
```

### 3. Database

**Neon (Recommended):**
1. Create account at neon.tech
2. Create new project
3. Copy connection string to `DATABASE_URL`
4. Enable connection pooling for production

### 4. Deploy

```bash
vercel --prod
```

Or push to main branch for automatic deployment.

### 5. Post-Deploy

1. Run migrations: `pnpm db:push` (via Vercel CLI or manually)
2. Seed initial data if needed
3. Verify admin login works

## BigCommerce Setup

### 1. Create API Credentials

1. Go to BigCommerce Admin → Settings → API → Store-level API accounts
2. Create new API account with these scopes:
   - Products: read
   - Orders: read, write
   - Customers: read, write
   - Content: read
   
3. Copy credentials to environment variables

### 2. Configure Webhooks (Optional)

For real-time order sync, set up webhooks:
- `store/order/created`
- `store/order/updated`
- `store/order/statusUpdated`

## QuickBooks Online Setup

### 1. Create App

1. Go to developer.intuit.com
2. Create new app (Accounting API)
3. Get Client ID and Secret

### 2. OAuth Flow

1. Visit `/admin/integrations` in your portal
2. Click "Connect QuickBooks"
3. Complete OAuth authorization
4. Tokens are stored securely

### 3. Configure Mappings

In Admin → Integrations → QuickBooks:
- Map income account
- Map tax liability account
- Map shipping account
- Map discount account

## Monitoring

### Logs

- Vercel: Dashboard → Deployments → Logs
- Database: Neon Dashboard → Operations

### Health Checks

- `/api/health` - Basic health check
- `/admin/integrations` - Integration status

## Troubleshooting

### Database Connection Issues

1. Check `DATABASE_URL` format
2. Ensure IP allowlist includes Vercel IPs
3. Try connection pooling URL (Neon: add `-pooler` to host)

### Auth Issues

1. Verify `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches your domain
3. Check callback URLs in OAuth apps

### Build Failures

1. Check Node.js version (needs 20+)
2. Run `pnpm install` locally and commit lockfile
3. Check for TypeScript errors: `pnpm build`
