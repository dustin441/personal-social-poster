# Personal Social Poster Landing Page

Next.js/Vercel sales page for the Personal Profile Posting Automation Kit.

## Local development

```bash
npm install
npm run dev
```

## Stripe setup options

The checkout button supports two launch paths.

### Fastest: Stripe Payment Link

Set this Vercel environment variable:

```bash
STRIPE_PAYMENT_LINK_URL=https://buy.stripe.com/...
```

The button will send buyers directly to that Payment Link.

Important: configure the Payment Link's after-payment redirect URL in Stripe to:

```text
https://YOUR_DOMAIN/success?session_id={CHECKOUT_SESSION_ID}
```

### Better: Stripe Checkout API

Set these Vercel environment variables:

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN
```

The app will create a Stripe Checkout Session and redirect to `/success?session_id=...` after payment.

## Digital product download

Recommended MVP fulfillment:

1. Upload the kit ZIP somewhere private/shareable, such as Google Drive, Dropbox, Cloudflare R2, S3, or another file host.
2. Set this Vercel environment variable:

```bash
KIT_DOWNLOAD_URL=https://your-download-link
```

The `/api/download` route verifies Stripe payment first, then redirects paid buyers to `KIT_DOWNLOAD_URL`.

Alternative: add a ZIP at `private/personal-profile-posting-kit.zip`. Do not do this if the GitHub repo is public, because the ZIP would be visible in the repository.

## Required Vercel settings

- Framework preset: Next.js
- Root directory: `./`
- Build command: default / `next build`
- Install command: default / `npm install`

## Launch checklist

- [ ] Create Stripe product: Personal Profile Posting Automation Kit
- [ ] Create one-time price, recommended beta price: $97
- [ ] Add `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` to Vercel, or add `STRIPE_PAYMENT_LINK_URL`
- [ ] Add `NEXT_PUBLIC_SITE_URL` to Vercel
- [ ] Add `KIT_DOWNLOAD_URL` to Vercel
- [ ] Deploy on Vercel
- [ ] Run a test payment in Stripe test mode first
- [ ] Confirm success page verifies payment
- [ ] Confirm ZIP download works
- [ ] Switch Stripe env vars to live mode before running ads
