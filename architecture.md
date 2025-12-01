# Architecture Documentation - Ghar Ka Khana

## System Architecture Overview

Ghar Ka Khana is a modern web application built with Next.js 15, implementing a serverless architecture with client-side rendering for optimal performance and scalability.

## Architecture Diagram


┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Homepage   │  │  Menu Page   │  │  Checkout    │           │
│  │   (React)    │  │   (React)    │  │   (React)    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│         │                  │                  │                 │
│         └──────────────────┼──────────────────┘                 │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             │ HTTPS
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                    Vercel Edge Network                           │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              Next.js Application Server                  │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │    │
│  │  │   API Routes │  │  Server      │  │  Static      │    │    │
│  │  │   (Node.js)  │  │  Components  │  │  Generation  │    │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │    │
│  └──────────────────────────────────────────────────────────┘    │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │  Razorpay   │ │  Webhook    │ │  Static     │
        │  API        │ │  Handler    │ │  Assets     │
        │  (External) │ │  (Internal) │ │  (CDN)      │
        └─────────────┘ └─────────────┘ └─────────────┘


## System Components

### 1. Frontend Layer

#### Client-Side Components
- **Homepage** (`app/page.tsx`): Landing page with hero section, features, and call-to-action
- **Menu Page** (`app/menu/page.tsx`): Meal plan selection with pricing and features
- **Checkout Page** (`app/checkout/page.tsx`): Multi-step checkout flow
- **Payment Pages**: Success and failure pages for payment status

#### UI Components (`components/`)
- **Payment Components**: `PaymentForm`, `PaymentStatus`, `OrderSummary`
- **UI Components**: Buttons, Cards, Inputs, Badges (shadcn/ui based)
- **Theme Provider**: Dark/light mode support

### 2. API Layer

#### Payment API Routes (`app/api/payments/`)
- **POST `/api/payments/create`**: Creates payment request with Razorpay
- **POST `/api/payments/verify`**: Verifies payment status

#### Webhook Handler (`app/api/webhooks/payment/`)
- **POST `/api/webhooks/payment`**: Receives and processes Razorpay webhooks

### 3. Service Layer

#### Payment Service (`lib/services/payment-service.ts`)
- **PaymentService**: Main service class handling payment operations
- **RazorpayGateway**: Gateway implementation for Razorpay API
- **PaymentServiceFactory**: Factory pattern for creating service instances
- **PaymentUtils**: Utility functions for formatting and validation

### 4. Data Layer

#### Menu Plans (`lib/data/menu-plans.ts`)
- Menu plan definitions with pricing
- Plan comparison and recommendation utilities
- Pricing calculation functions

#### Configuration (`lib/config/payment-config.ts`)
- Centralized payment configuration
- Environment variable management
- Configuration validation

### 5. Type Definitions (`lib/types/payment.ts`)
- Comprehensive TypeScript interfaces
- Payment request/response types
- Order and customer data structures
- Webhook and validation types

## Data Flow

### Payment Flow

```
1. User selects meal plan
   ↓
2. Checkout page collects customer info
   ↓
3. Order created with unique ID
   ↓
4. Payment form initialized
   ↓
5. POST /api/payments/create
   ↓
6. PaymentService.createPayment()
   ↓
7. RazorpayGateway.createPayment()
   ↓
8. Razorpay API call
   ↓
9. Payment URL returned
   ↓
10. User redirected to Razorpay
    ↓
11. Payment processed by Razorpay
    ↓
12. Webhook POST /api/webhooks/payment
    ↓
13. Signature verification
    ↓
14. Payment status updated
    ↓
15. Order status updated
    ↓
16. User redirected to success/failure page
```

### Order Creation Flow

```
1. User fills checkout form
   ↓
2. Form validation (client-side)
   ↓
3. Order object created
   ↓
4. Order ID generated (GK_timestamp_random)
   ↓
5. Pricing calculated
   ↓
6. Order state updated
   ↓
7. Payment step initiated
```

## Services

### 1. Payment Gateway Service
- **Provider**: Razorpay
- **Methods**: Cards, UPI, Net Banking, Wallets
- **Currency**: INR only
- **Environment**: Sandbox (development) / Production

### 2. Webhook Service
- **Endpoint**: `/api/webhooks/payment`
- **Security**: HMAC-SHA256 signature verification
- **Events**: `payment.captured`, `payment.failed`
- **Processing**: Asynchronous order status updates

### 3. Static Asset Service
- **Provider**: Vercel CDN
- **Assets**: Images, videos, fonts
- **Optimization**: Automatic image optimization via Next.js

## CI/CD Pipeline

### GitHub Actions (Automatic via Vercel)

```
1. Code pushed to main branch
   ↓
2. Vercel detects changes
   ↓
3. Build process initiated
   ↓
4. Dependencies installed (npm install)
   ↓
5. TypeScript compilation
   ↓
6. Next.js build (npm run build)
   ↓
7. Static pages generated
   ↓
8. Serverless functions packaged
   ↓
9. Deployment to Vercel Edge Network
   ↓
10. Health checks performed
    ↓
11. DNS updated (if first deployment)
    ↓
12. Application live
```

### Manual Deployment Steps

1. **Local Build Test**:
   ```bash
   npm run build
   npm start
   ```

2. **Vercel CLI Deployment**:
   ```bash
   vercel --prod
   ```

3. **Environment Variables**: Configured in Vercel dashboard

## Environment Variables

### Required Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `RAZORPAY_KEY_ID` | Razorpay API authentication | `rzp_live_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret | `secret_xxxxx` |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature verification | `webhook_secret_xxxxx` |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | `https://gharkakhana.life` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Client-side Razorpay key | `rzp_live_xxxxx` |
| `NODE_ENV` | Environment mode | `production` |

### Variable Scope

- **Server-side only**: `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- **Client-side accessible**: `NEXT_PUBLIC_*` variables
- **Both**: `RAZORPAY_KEY_ID`, `NEXT_PUBLIC_BASE_URL`

## Security Architecture

### 1. Authentication & Authorization
- **Payment Gateway**: Basic Auth with API keys
- **Webhooks**: HMAC-SHA256 signature verification
- **API Routes**: Server-side only, no client exposure

### 2. Data Protection
- **Sensitive Data**: Never stored client-side
- **Payment Details**: Handled by Razorpay (PCI DSS compliant)
- **Environment Variables**: Secured in Vercel dashboard

### 3. Input Validation
- **Client-side**: React form validation
- **Server-side**: Payment service validation
- **Type Safety**: TypeScript interfaces

## Scalability Considerations

### Current Architecture
- **Serverless Functions**: Auto-scaling on Vercel
- **Static Assets**: CDN distribution
- **Database**: None (stateless design)

### Future Enhancements
- **Database Integration**: For order persistence
- **Caching Layer**: Redis for frequently accessed data
- **Load Balancing**: Automatic via Vercel Edge Network
- **Microservices**: Separate payment service if needed

## Monitoring & Logging

### Application Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: Available in Vercel dashboard
- **Error Tracking**: Console logging (can integrate Sentry)

### Payment Monitoring
- **Razorpay Dashboard**: Transaction monitoring
- **Webhook Logs**: Function execution logs
- **Success Rates**: Tracked via payment status

## Technology Stack

### Frontend
- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Payment**: Razorpay SDK

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain support

### Development Tools
- **Language**: TypeScript
- **Package Manager**: npm/pnpm
- **Version Control**: Git
- **CI/CD**: Vercel (automatic)

## Deployment Architecture

### Production Environment
- **Region**: Global (Vercel Edge Network)
- **SSL**: Automatic HTTPS
- **DNS**: Vercel-managed or custom
- **Backup**: Git-based (automatic)

### Staging Environment
- **URL**: Preview deployments for each PR
- **Environment**: Separate from production
- **Testing**: Sandbox payment credentials

## API Endpoints

### Public Endpoints
- `GET /` - Homepage
- `GET /menu` - Menu page
- `GET /checkout` - Checkout page
- `GET /payment/success` - Payment success page
- `GET /payment/failure` - Payment failure page

### API Endpoints
- `POST /api/payments/create` - Create payment
- `POST /api/payments/verify` - Verify payment
- `POST /api/webhooks/payment` - Webhook handler

## Error Handling

### Client-Side
- React error boundaries
- Form validation errors
- Payment error display

### Server-Side
- Try-catch blocks in API routes
- Error logging to console
- Structured error responses

### Payment Errors
- Validation errors (400)
- Gateway errors (500)
- Network errors (retry logic)

## Performance Optimizations

1. **Static Generation**: Pre-rendered pages for better performance
2. **Image Optimization**: Next.js automatic image optimization
3. **Code Splitting**: Automatic via Next.js
4. **CDN Caching**: Static assets cached globally
5. **Serverless Functions**: Auto-scaling based on demand


