# Funza AI CRM Admin

Standalone frontend project for Kelvin's Funza AI CRM workstream.

## What Is Built

- CRM dashboard template
- Sidebar and mobile navigation
- Authentication UI for sign in, registration, and password reset
- Business onboarding UI
- Profile management UI
- Conversation inbox UI
- Customer and lead table
- Analytics dashboard template
- Subscription and billing history UI
- Notification tray
- Reusable UI primitives in `src/components/ui.tsx`
- Mock data layer in `src/lib/mock-data.ts`
- API client placeholder in `src/lib/api-client.ts`

## What Is Mocked

This frontend is ready for backend integration, but it does not yet call Joel's APIs. Data is currently mocked so the team can review the CRM experience and connect endpoints once backend contracts are complete.

## Run Locally

```bash
npm install
npm run dev -- -H 127.0.0.1 -p 3001
```

Open `http://127.0.0.1:3001`.

Port `3000` may be blocked on this Windows machine, so `3001` is the safer local port.

## Verify

```bash
npm run lint
npm run build
```

Both commands should pass before pushing.
