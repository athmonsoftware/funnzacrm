import type {
  AnalyticsFilterState,
  AnalyticsMetric,
  AnalyticsSeriesPoint,
  Permission,
} from "@/types/platform";

export type AnalyticsWidgetKind =
  | "kpi"
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "heatmap"
  | "table"
  | "timeline"
  | "word-cloud"
  | "trend-comparison";

export type AnalyticsWidgetDefinition = {
  id: string;
  title: string;
  description: string;
  kind: AnalyticsWidgetKind;
  permission: Permission;
  filters: Array<keyof AnalyticsFilterState>;
  exportable: boolean;
  realtime: boolean;
};

export const analyticsWidgets: AnalyticsWidgetDefinition[] = [
  {
    id: "customer-health",
    title: "Customer health",
    description: "Total, new, active, churn risk, satisfaction, and segment movement.",
    kind: "trend-comparison",
    permission: "analytics.read",
    filters: ["dateRange", "organizationId", "branchId", "departmentId", "segmentId"],
    exportable: true,
    realtime: true,
  },
  {
    id: "conversation-performance",
    title: "Conversation performance",
    description: "Message volume, response rate, response time, resolution time, and channels.",
    kind: "area",
    permission: "analytics.read",
    filters: ["dateRange", "channel", "branchId", "campaignId"],
    exportable: true,
    realtime: true,
  },
  {
    id: "ai-operations",
    title: "AI operations",
    description: "Confidence, escalation, token consumption, model usage, and fallback quality.",
    kind: "bar",
    permission: "ai.manage",
    filters: ["dateRange", "aiModel", "departmentId"],
    exportable: true,
    realtime: true,
  },
  {
    id: "campaigns",
    title: "Campaign performance",
    description: "Delivery success, failures, response lift, conversions, and A/B placeholders.",
    kind: "table",
    permission: "analytics.read",
    filters: ["dateRange", "campaignId", "channel", "segmentId"],
    exportable: true,
    realtime: false,
  },
  {
    id: "geo-distribution",
    title: "Geographic distribution",
    description: "Branch, city, country, and regional demand patterns.",
    kind: "heatmap",
    permission: "analytics.read",
    filters: ["dateRange", "organizationId", "branchId"],
    exportable: true,
    realtime: false,
  },
];

export type AnalyticsDashboardPayload = {
  filters: AnalyticsFilterState;
  metrics: AnalyticsMetric[];
  series: Record<string, AnalyticsSeriesPoint[]>;
};

