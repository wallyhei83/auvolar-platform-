# Auvolar Commercial-Ready B2B Platform

A comprehensive B2B e-commerce platform for LED lighting products, featuring BigCommerce integration, case management, quotes, and AI support.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│            BigCommerce B2B Edition                  │
│   (Products, Inventory, Pricing, Checkout, Orders)  │
└────────────────────────┬────────────────────────────┘
                         │ API
┌────────────────────────▼────────────────────────────┐
│              Custom Portal App                       │
│  ┌──────────────┐  ┌───────────────┐  ┌───────────┐ │
│  │ Customer     │  │ Admin         │  │ AI        │ │
│  │ Portal       │  │ Console       │  │ Support   │ │
│  └──────────────┘  └───────────────┘  └───────────┘ │
└────────────────────────┬────────────────────────────┘
                         │
     ┌───────────┬───────┴────────┬───────────┐
     ▼           ▼                ▼           ▼
  QBO API    TaxJar/Avalara   ShipStation    GA4
```

## Project Structure

```
auvolar-platform/
├── apps/
│   └── portal/          # Next.js Customer Portal + Admin Console
├── packages/
│   └── shared/          # Shared types, utilities, constants
├── services/
│   └── integrations/    # Integration workers (QBO, Tax, Shipping)
└── docs/                # Documentation and runbooks
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (Neon recommended for production)

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/portal/.env.example apps/portal/.env
# Edit .env with your credentials

# Initialize database
pnpm db:generate
pnpm db:push
pnpm db:seed

# Start development server
pnpm dev
```

## Environment Variables

See `apps/portal/.env.example` for required variables:

- **Database**: `DATABASE_URL`
- **Auth**: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- **BigCommerce**: `BC_STORE_HASH`, `BC_ACCESS_TOKEN`, `BC_CLIENT_ID`, `BC_CLIENT_SECRET`
- **QuickBooks**: `QBO_CLIENT_ID`, `QBO_CLIENT_SECRET`, `QBO_REALM_ID`
- **Tax**: `TAXJAR_API_KEY` or `AVALARA_*`
- **Shipping**: `SHIPSTATION_API_KEY`, `SHIPSTATION_API_SECRET`
- **AI**: `OPENAI_API_KEY`

## Modules

### Customer Portal
- View orders and tracking
- Submit RFQ/BOM/RMA requests
- Track case status
- Manage projects
- Upload tax exempt documents

### Admin Console
- Case queue management
- Quote creation and management
- Tax exempt document review
- QBO sync monitoring
- AI knowledge base management

### Case Types
- **RFQ**: Request for Quote
- **BOM**: Bill of Materials upload
- **RMA**: Return Merchandise Authorization
- **SHIPPING_DAMAGE**: Shipping damage claims
- **PHOTOMETRIC**: Lighting layout requests
- **REBATE**: Utility rebate assistance
- **NET_TERMS**: Net payment terms application
- **SUPPORT**: General support requests

## Deployment

See `docs/DEPLOYMENT.md` for detailed instructions.

### Vercel (Recommended)

```bash
vercel --prod
```

## License

Proprietary - Auvolar LLC
