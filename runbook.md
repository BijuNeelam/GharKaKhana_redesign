# Deployment & Runbook - Ghar Ka Khana

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Running Tests](#running-tests)
3. [Building for Production](#building-for-production)
4. [Deployment to Staging](#deployment-to-staging)
5. [Deployment to Production](#deployment-to-production)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git
- Razorpay account (for payment testing)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd GharKaKhana_redesign
```

### Step 2: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Razorpay Configuration (Sandbox)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_test_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Environment
NODE_ENV=development
```

### Step 4: Start Development Server
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### Step 5: Verify Installation
- Open browser to `http://localhost:3000`
- Navigate through menu pages
- Test checkout flow (use Razorpay test credentials)

## Running Tests

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

### Build Verification
```bash
npm run build
```

## Building for Production

### Step 1: Update Environment Variables
Update `.env.local` with production values:

```env
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key
RAZORPAY_WEBHOOK_SECRET=your_production_webhook_secret
NEXT_PUBLIC_BASE_URL=https://gharkakhana.life
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

### Step 2: Build Application
```bash
npm run build
```

### Step 3: Start Production Server
```bash
npm start
```

## Deployment to Staging

### Using Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Link Project
```bash
vercel link
```

#### Step 4: Configure Environment Variables
```bash
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add RAZORPAY_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_BASE_URL
vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
```

#### Step 5: Deploy to Staging
```bash
vercel
```

### Using GitHub Actions

The repository is configured for automatic deployment via Vercel when changes are pushed to the main branch.

#### Manual Deployment via GitHub Actions
1. Push changes to `main` branch
2. Vercel automatically detects changes and deploys
3. Check deployment status at: `https://vercel.com/rev2607s-projects/v0-ghar-ka-khana-redesign`

## Deployment to Production

### Pre-Deployment Checklist
- [ ] All environment variables configured in Vercel dashboard
- [ ] Production Razorpay keys configured
- [ ] Webhook URL set in Razorpay dashboard: `https://gharkakhana.life/api/webhooks/payment`
- [ ] SSL certificate enabled (automatic with Vercel)
- [ ] Payment flow tested in staging
- [ ] Error tracking configured (if applicable)

### Step 1: Configure Production Environment in Vercel
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add all required environment variables for Production
3. Ensure `NODE_ENV=production`

### Step 2: Deploy to Production
```bash
vercel --prod
```

### Step 3: Verify Deployment
1. Check application at production URL
2. Test payment flow with test credentials
3. Verify webhook endpoint is accessible
4. Monitor error logs in Vercel dashboard

### Step 4: Configure Razorpay Webhook
1. Login to Razorpay Dashboard
2. Navigate to Settings → Webhooks
3. Add webhook URL: `https://gharkakhana.life/api/webhooks/payment`
4. Select events: `payment.captured`, `payment.failed`
5. Save webhook secret and update `RAZORPAY_WEBHOOK_SECRET` in Vercel

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_live_xxxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret Key | `your_secret_key` |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Webhook Secret | `your_webhook_secret` |
| `NEXT_PUBLIC_BASE_URL` | Application Base URL | `https://gharkakhana.life` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Razorpay Key (for client) | `rzp_live_xxxxxxxxxxxxx` |
| `NODE_ENV` | Environment mode | `production` or `development` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |

## Troubleshooting

### Issue: Payment Gateway Not Working

**Symptoms**: Payment form loads but payment fails

**Solutions**:
1. Verify Razorpay keys are correct in environment variables
2. Check Razorpay dashboard for API key status
3. Ensure webhook URL is accessible
4. Check browser console for errors
5. Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` matches `RAZORPAY_KEY_ID`

### Issue: Webhook Not Receiving Events

**Symptoms**: Payments succeed but order status not updated

**Solutions**:
1. Verify webhook URL is correctly configured in Razorpay dashboard
2. Check webhook secret matches in environment variables
3. Test webhook endpoint manually:
   ```bash
   curl -X POST https://gharkakhana.life/api/webhooks/payment \
     -H "Content-Type: application/json" \
     -H "X-Razorpay-Signature: <signature>" \
     -d '{"event":"payment.captured","payload":{...}}'
   ```
4. Check Vercel function logs for webhook errors

### Issue: Build Fails

**Symptoms**: `npm run build` fails with errors

**Solutions**:
1. Clear `.next` directory: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npx tsc --noEmit`
4. Verify all dependencies are installed
5. Check for missing environment variables

### Issue: Environment Variables Not Loading

**Symptoms**: Application uses default/empty values

**Solutions**:
1. Ensure `.env.local` file exists in root directory
2. Restart development server after adding variables
3. For production, verify variables in Vercel dashboard
4. Check variable names match exactly (case-sensitive)
5. Ensure `NEXT_PUBLIC_*` prefix for client-side variables

### Issue: Deployment Fails on Vercel

**Symptoms**: Vercel deployment shows build errors

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are in `package.json` (not just `devDependencies`)
4. Check for TypeScript/ESLint errors locally first
5. Verify Node.js version compatibility (18+)

## Monitoring

### Vercel Analytics
- Access via Vercel Dashboard
- Monitor deployment status, build times, and errors
- View function logs and performance metrics

### Payment Monitoring
- Razorpay Dashboard: Monitor transactions, success rates
- Check webhook delivery status
- Review failed payment logs

### Application Monitoring
- Check Vercel function logs for API route errors
- Monitor browser console for client-side errors
- Review payment status tracking in application

## Rollback Procedure

### If Production Deployment Fails

1. **Immediate Rollback**:
   ```bash
   vercel rollback
   ```

2. **Manual Rollback via Vercel Dashboard**:
   - Go to Deployments
   - Find last successful deployment
   - Click "..." → "Promote to Production"

3. **Git-based Rollback**:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Razorpay documentation: https://razorpay.com/docs
- Next.js documentation: https://nextjs.org/docs




