# Funza AI CRM Frontend Architecture

## Scope

This project is Kelvin's frontend workspace for the Funza AI admin CRM. It is separated from Joel's backend/API work and Elizabeth's AI/conversation service work.

## Current Screens

- Dashboard
- Conversation inbox
- Customers/leads
- Analytics
- Subscription
- Billing history
- Profile management
- Business onboarding
- Authentication UI
- Notification tray

## Reusable Components

Shared primitives live in `src/components/ui.tsx`:

- `Button`
- `Card`
- `SectionHeader`
- `Badge`
- `TextInput`
- `ProgressBar`

## Integration Boundary

The UI currently uses mock data from `src/lib/mock-data.ts`. Backend calls should be added through `src/lib/api-client.ts` once Joel's API routes are finalized.

Expected future endpoints:

- Auth: login, register, refresh token, forgot password
- Business: create profile, update profile, verification state
- Customers: list, search, update stage
- Conversations: list, read, send reply
- Billing: subscription plans, invoices, payment initialization

## Current Completion Status

Kelvin's frontend assignment is now complete as a standalone CRM UI deliverable. It is ready to push for team review and ready to integrate with Joel's backend after API contracts are finalized.

Remaining integration work:

- Replace mock data with API calls
- Wire auth forms to real login/register/reset endpoints
- Add protected route/session behavior after JWT flow is available
- Connect inbox replies to the conversation API
- Connect billing/subscription actions to payment endpoints
- Validate final responsive behavior against live backend data

## Design Direction

The CRM should feel operational and admin-focused: clear navigation, dense tables, fast scanning, and responsive layouts for laptop and mobile use.
