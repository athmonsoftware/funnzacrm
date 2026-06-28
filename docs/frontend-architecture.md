# Funza AI Customer Product Analytics Dashboard

## 1. Frontend Architecture

Funza uses one App Router dashboard shell for every tenant, role, and plan. Modules are registered in `src/config/modules.ts` and filtered by `src/features/access/module-access.ts` using role permissions, subscription tier, feature flags, and tenant scope. The current repo runs Next `16.2.6`, so implementation should continue to follow the bundled App Router docs in `node_modules/next/dist/docs/`.

## 2. Folder Structure

```txt
src/app/(auth)              Auth routes and recovery flows
src/app/(app)               Unified tenant dashboard routes
src/app/api                 Route handlers for server-side integration points
src/components/ui           Low-level shadcn-style primitives
src/components              Product shell and composed components
src/config                  Module registry, RBAC, feature gates
src/features/access         Permission, feature, route, and module guard helpers
src/features/analytics      Analytics schemas and widget definitions
src/features/organizations  Tenant and organization context helpers
src/hooks                   Client hooks shared across modules
src/lib                     API, auth, email, payment, mock-data, utilities
src/types                   Shared platform contracts
```

## 3. Route Structure

`(app)` is the single dashboard boundary. Role-specific experiences are rendered by permissions, not by separate dashboards.

```txt
/dashboard                  Executive operating overview
/analytics                  Customer product analytics center
/customers                  CRM directory and import workflow
/inbox                      Unified SMS and WhatsApp conversation center
/ai                         AI management, prompts, knowledge base, usage
/payments                   Transactions, invoices, receipts, subscriptions
/billing                    Plan, usage, wallet, overage, add-ons
/team                       Members, roles, teams, invitations
/settings                   Organization, security, integrations, API keys
/superAdmin                 Platform controls, gated to super_admin
```

## 4. Component Hierarchy

`RootLayout` owns fonts, global CSS, and toast infrastructure. `(app)/layout.tsx` owns the dashboard shell, `WorkspaceProvider`, sidebar, and top navbar. Pages compose reusable cards, metrics, charts, tables, empty states, and forms from `src/components/ui.tsx` and `src/components/ui/*`.

## 5. State Management Architecture

Server components should fetch stable tenant/module data. Client state should be local for form controls, filters, command palette state, and optimistic UI. When Zustand is added, keep tenant-independent UI state in `src/stores/ui-store.ts` and tenant-scoped filters in feature stores. When TanStack Query is added, key every query by `organizationId`, `workspaceId`, and optional `branchId`.

## 6. RBAC Implementation

Roles and permissions are defined in `src/types/platform.ts` and `src/config/access-control.ts`. Guards should be layered: route guard for authenticated sessions, tenant guard for organization/workspace scope, permission guard for action visibility, and feature guard for subscription capabilities.

## 7. Multi-Tenant Strategy

Every API request must include tenant context from the active organization/workspace and optional branch, department, or team. The frontend should never infer cross-tenant access from route params alone; it should validate params with `canAccessTenant` before rendering scoped data.

## 8. Feature Gate Strategy

Tier capabilities live in `tierFeatureFlags`. Starter gets core CRM, SMS, and basic analytics. Business adds WhatsApp placeholders, AI knowledge base, campaign builder, advanced analytics, and scheduled reports. Enterprise adds branch isolation, compliance, developer APIs, and platform controls.

## 9. Dashboard Layouts

The global shell should remain dense and operational: sidebar navigation, sticky top navbar, workspace switcher, organization switcher, breadcrumbs, global search, command palette, notification center, theme toggle, and profile menu. Analytics pages use KPI rows, filter bars, chart bands, drill-down tables, timelines, and export controls.

## 10. Page Breakdowns

Analytics includes total/new/active customers, messages sent/received, response rate, average response time, escalation rate, satisfaction, confidence, revenue, sentiment, delivery success, churn prediction, token usage, issue ranking, trends, and geography. CRM includes list, profile tabs, imports, segments, tags, notes, activity logs. Inbox includes unified thread view, AI suggestions, confidence, assignment, escalation, internal notes, and delivery status.

## 11. Shared Component System

Use primitives for buttons, cards, badges, inputs, progress bars, skeletons, tables, filters, page states, command palette items, chart containers, and guard fallbacks. Every module page should expose loading, skeleton, empty, error, and ready states.

## 12. Suggested Hooks

`useTenantContext`, `usePermission`, `useFeatureGate`, `useAnalyticsFilters`, `useDebouncedSearch`, `useExportJob`, `useRealtimeChannel`, `useCommandPalette`, `useOptimisticMutation`, and `usePaginatedResource`.

## 13. Example Interfaces

Core contracts live in `src/types/platform.ts`: `UserAccessContext`, `TenantScope`, `DashboardModule`, `AnalyticsMetric`, `AnalyticsFilterState`, and `AnalyticsSeriesPoint`.

## 14. Example Analytics Schemas

Widget contracts live in `src/features/analytics/schema.ts`. They model KPI, line, area, bar, pie, heatmap, table, timeline, word-cloud, and trend-comparison widgets with permissions, filters, exportability, and realtime support.

## 15. UI Patterns

Use segmented controls for channel and date filters, icon buttons for command actions, toggles for feature flags, tabs for customer profiles, dense tables for audit/API logs, and drawers or modals for focused create/edit flows. Keep operational pages compact, scannable, and mobile-first.

## 16. Loading And Error States

Every route should render a route-level skeleton while fetching, an empty state with a concrete next action, an error state with retry, and a permission fallback when access is denied. Mutations should use optimistic updates only when rollback behavior is clear.

## 17. Production Scalability

Adopt typed REST clients per module, query keys scoped by tenant, server-side pagination for large tables, virtualized rows for logs and conversations, websocket-ready subscriptions for inbox and analytics, centralized telemetry, WCAG keyboard paths, and audit logging around gated administrative actions.

