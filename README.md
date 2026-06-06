# ProfilePilot Kit Landing Page

Next.js/Vercel sales page for the ProfilePilot Kit.

## Local development

```bash
npm install
npm run dev
```

## Stripe setup

The checkout page uses Stripe Embedded Checkout so the buyer stays on the site instead of being sent to a generic Stripe-hosted page.

Set these Vercel environment variables:

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN
```

The app creates an embedded Stripe Checkout Session at `/checkout` and returns the buyer to `/success?session_id=...` after payment.

## Digital product download

Recommended MVP fulfillment:

1. Upload the kit ZIP somewhere private/shareable, such as Google Drive, Dropbox, Cloudflare R2, S3, or another file host.
2. Set this Vercel environment variable:

```bash
KIT_DOWNLOAD_URL=https://your-download-link
```

The `/api/download` route verifies Stripe payment first, then redirects paid buyers to `KIT_DOWNLOAD_URL`.

Alternative: add a ZIP at `private/profilepilot-kit.zip`. Do not do this if the GitHub repo is public, because the ZIP would be visible in the repository.

## Required Vercel settings

- Framework preset: Next.js
- Root directory: `./`
- Build command: default / `next build`
- Install command: default / `npm install`

## Launch checklist

- [ ] Create Stripe product: ProfilePilot Kit
- [ ] Create one-time price, recommended beta price: $97
- [ ] Add `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to Vercel
- [ ] Add `NEXT_PUBLIC_SITE_URL` to Vercel
- [ ] Add `KIT_DOWNLOAD_URL` to Vercel
- [ ] Deploy on Vercel
- [ ] Run a test payment in Stripe test mode first
- [ ] Confirm success page verifies payment
- [ ] Confirm ZIP download works
- [ ] Switch Stripe env vars to live mode before running ads
