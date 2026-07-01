// ── Metrics ──────────────────────────────────────────────────────────────
export const dashboardMetrics = [
  { id: "total-customers", label: "Total Customers", value: "2,847", change: "+12.4%", trend: "up" as const, icon: "users" },
  { id: "new-customers", label: "New This Month", value: "186", change: "+8.2%", trend: "up" as const, icon: "user-plus" },
  { id: "ai-conversations", label: "AI Conversations", value: "1,432", change: "+24.6%", trend: "up" as const, icon: "bot" },
  { id: "human-conversations", label: "Human Conversations", value: "312", change: "-5.1%", trend: "down" as const, icon: "message-square" },
  { id: "revenue", label: "Revenue", value: "GHS 48.2k", change: "+21.3%", trend: "up" as const, icon: "wallet" },
  { id: "sms-usage", label: "SMS Sent", value: "8,241", change: "+15.7%", trend: "up" as const, icon: "smartphone" },
  { id: "whatsapp-usage", label: "WhatsApp Messages", value: "12,847", change: "+32.1%", trend: "up" as const, icon: "message-circle" },
  { id: "ai-usage", label: "AI Tokens Used", value: "2.4M", change: "+18.9%", trend: "up" as const, icon: "sparkles" },
];

export const crmMetrics = [
  { label: "Active customers", value: "1,248", change: "+12%" },
  { label: "Open conversations", value: "84", change: "+8%" },
  { label: "Conversion rate", value: "18.6%", change: "+3%" },
  { label: "Monthly revenue", value: "GHS 9.4k", change: "+21%" },
];

export const subscriptionStatus = {
  plan: "Business",
  status: "Active",
  nextBilling: "Jul 10, 2026",
  smsUsed: 6842,
  smsLimit: 10000,
  whatsappUsed: 8241,
  whatsappLimit: 15000,
  aiTokensUsed: 2400000,
  aiTokensLimit: 5000000,
  seatsUsed: 7,
  seatsLimit: 10,
};

// ── Chart Data ───────────────────────────────────────────────────────────
export const customerGrowthData = [
  { month: "Jan", customers: 1842 },
  { month: "Feb", customers: 1956 },
  { month: "Mar", customers: 2087 },
  { month: "Apr", customers: 2234 },
  { month: "May", customers: 2541 },
  { month: "Jun", customers: 2847 },
];

export const messageVolumeData = [
  { month: "Jan", sms: 4200, whatsapp: 6800, ai: 3100 },
  { month: "Feb", sms: 4800, whatsapp: 7200, ai: 3800 },
  { month: "Mar", sms: 5100, whatsapp: 8100, ai: 4500 },
  { month: "Apr", sms: 5900, whatsapp: 9400, ai: 5200 },
  { month: "May", sms: 7200, whatsapp: 10800, ai: 6800 },
  { month: "Jun", sms: 8241, whatsapp: 12847, ai: 8400 },
];

export const revenueData = [
  { month: "Jan", revenue: 28400 },
  { month: "Feb", revenue: 31200 },
  { month: "Mar", revenue: 34800 },
  { month: "Apr", revenue: 38100 },
  { month: "May", revenue: 42600 },
  { month: "Jun", revenue: 48200 },
];

export const aiPerformanceData = {
  resolved: 68,
  escalated: 22,
  pending: 10,
};


export const teamRoles = [
  {
    name: "Owner",
    description: "Full access to all features including billing and organization settings",
    permissions: { manageOrg: true, billing: true, manageTeam: true, manageCustomers: true, manageConversations: true, viewAnalytics: true, manageAI: true, managePayments: true },
  },
  {
    name: "Admin",
    description: "Manage customers, conversations, team members, and AI settings",
    permissions: { manageOrg: false, billing: false, manageTeam: true, manageCustomers: true, manageConversations: true, viewAnalytics: true, manageAI: true, managePayments: true },
  },
  {
    name: "Manager",
    description: "Manage assigned teams and view analytics",
    permissions: { manageOrg: false, billing: false, manageTeam: false, manageCustomers: true, manageConversations: true, viewAnalytics: true, manageAI: false, managePayments: false },
  },
  {
    name: "Agent",
    description: "Respond to customers and manage assigned conversations",
    permissions: { manageOrg: false, billing: false, manageTeam: false, manageCustomers: false, manageConversations: true, viewAnalytics: false, manageAI: false, managePayments: false },
  },
  {
    name: "Viewer",
    description: "Read-only access to dashboards and reports",
    permissions: { manageOrg: false, billing: false, manageTeam: false, manageCustomers: false, manageConversations: false, viewAnalytics: true, manageAI: false, managePayments: false },
  },
];


// ── AI Center ────────────────────────────────────────────────────────────
export const aiAssistantConfig = {
  name: "Funza AI",
  personality: "Friendly and Professional",
  tone: "Warm",
  language: "English",
  status: "Active",
  businessRules: [
    "Always greet customers by name when available",
    "Escalate to human agent if customer sentiment is negative after 2 messages",
    "Include payment links when customer asks about pricing",
    "Never share other customers' information",
    "Always confirm order details before processing payments",
  ],
};

export const knowledgeBaseItems = [
  { id: "kb-001", name: "Product Catalog 2026", type: "PDF", size: "2.4 MB", uploadDate: "Jun 1, 2026", status: "Ready" as const, pages: 48 },
  { id: "kb-002", name: "Pricing FAQ", type: "Document", size: "156 KB", uploadDate: "May 28, 2026", status: "Ready" as const, pages: 12 },
  { id: "kb-003", name: "Return Policy", type: "PDF", size: "340 KB", uploadDate: "May 25, 2026", status: "Ready" as const, pages: 6 },
  { id: "kb-004", name: "Shipping Guidelines", type: "Document", size: "220 KB", uploadDate: "May 20, 2026", status: "Processing" as const, pages: 8 },
  { id: "kb-005", name: "Customer Support Scripts", type: "PDF", size: "1.1 MB", uploadDate: "May 15, 2026", status: "Ready" as const, pages: 32 },
  { id: "kb-006", name: "Payment Methods Guide", type: "FAQ", size: "84 KB", uploadDate: "May 10, 2026", status: "Ready" as const, pages: 4 },
];

export const aiUsageMetrics = {
  messagesProcessed: 14320,
  messagesProcessedChange: "+24.6%",
  tokensConsumed: 2400000,
  tokensConsumedChange: "+18.9%",
  accuracy: 94.2,
  accuracyChange: "+1.8%",
  resolutionRate: 78.5,
  resolutionRateChange: "+3.2%",
  avgResponseTime: "1.2s",
  escalationRate: 21.5,
  costPerConversation: "GHS 0.42",
};

export const aiPrompts = [
  { id: "prompt-001", name: "Welcome Message", description: "First message sent when a customer initiates contact", content: "Hello! 👋 Welcome to {business_name}. I'm {ai_name}, your AI assistant. How can I help you today?" },
  { id: "prompt-002", name: "Escalation Rules", description: "When and how to transfer conversations to human agents", content: "Escalate to human agent when:\n- Customer explicitly requests human support\n- Sentiment drops below threshold after 2 messages\n- Payment disputes or refund requests\n- Technical issues requiring account access" },
  { id: "prompt-003", name: "Payment Rules", description: "How to handle payment-related inquiries", content: "For payment inquiries:\n- Always verify customer identity first\n- Provide payment link for subscription upgrades\n- For refunds, escalate to billing team\n- Confirm amounts in GHS before processing" },
  { id: "prompt-004", name: "Support Rules", description: "General customer support guidelines", content: "Support guidelines:\n- Respond within 30 seconds\n- Use customer's name in every response\n- Offer solutions before escalating\n- Log all issues for analytics" },
];

// ── Analytics ────────────────────────────────────────────────────────────
export const analyticsCustomer = {
  growth: [1842, 1956, 2087, 2234, 2541, 2847],
  retention: 87.4,
  retentionChange: "+2.1%",
  churn: 4.8,
  churnChange: "-0.6%",
  newVsReturning: { new: 186, returning: 2661 },
};

export const analyticsConversation = {
  totalMessages: 29488,
  avgResponseTime: "2.4 min",
  avgResolutionTime: "18 min",
  channelBreakdown: { sms: 28, whatsapp: 44, ai: 28 },
  satisfactionScore: 4.6,
};

export const analyticsAI = {
  automationRate: 78.5,
  escalationRate: 21.5,
  aiSatisfaction: 4.2,
  costSavings: "GHS 12,400",
  topIntents: [
    { intent: "Pricing Inquiry", count: 842, pct: 24 },
    { intent: "Order Status", count: 721, pct: 21 },
    { intent: "Support Request", count: 614, pct: 18 },
    { intent: "Product Info", count: 498, pct: 14 },
    { intent: "Payment Issue", count: 312, pct: 9 },
  ],
};

export const analyticsRevenue = {
  totalRevenue: "GHS 284,600",
  monthlyRevenue: "GHS 48,200",
  conversionRate: 18.6,
  arpu: "GHS 16.92",
  subscriptionGrowth: "+14.2%",
  revenueByPlan: [
    { plan: "Free", revenue: 0, customers: 842 },
    { plan: "Starter", revenue: 48200, customers: 487 },
    { plan: "Business", revenue: 142800, customers: 573 },
    { plan: "Enterprise", revenue: 93600, customers: 63 },
  ],
};

// ── Settings ─────────────────────────────────────────────────────────────
export const organizationSettings = {
  name: "Funza AI Demo",
  industry: "Technology",
  timezone: "Africa/Accra (GMT+0)",
  workspaceType: "SME" as const,
  logo: null,
  address: "123 Independence Ave, Accra, Ghana",
};

export const integrations = [
  { id: "int-001", name: "Stripe", description: "Payment processing", status: "Connected" as const, icon: "credit-card" },
  { id: "int-002", name: "WhatsApp Business", description: "WhatsApp messaging API", status: "Connected" as const, icon: "message-circle" },
  { id: "int-003", name: "MTN MoMo", description: "Mobile money payments", status: "Connected" as const, icon: "smartphone" },
  { id: "int-004", name: "Telecel Cash", description: "Mobile money payments", status: "Disconnected" as const, icon: "smartphone" },
  { id: "int-005", name: "Twilio SMS", description: "SMS messaging", status: "Connected" as const, icon: "phone" },
  { id: "int-006", name: "Flutterwave", description: "Payment gateway (Coming soon)", status: "Coming Soon" as const, icon: "globe" },
];

export const apiKeys = [
  { id: "key-001", name: "Production API Key", key: "fz_live_...8x4k", created: "May 1, 2026", lastUsed: "2 mins ago", status: "Active" as const },
  { id: "key-002", name: "Test API Key", key: "fz_test_...2m9j", created: "Apr 15, 2026", lastUsed: "3 days ago", status: "Active" as const },
  { id: "key-003", name: "Webhook Secret", key: "fz_whk_...7n3p", created: "Mar 20, 2026", lastUsed: "1 hour ago", status: "Active" as const },
];

// ── Quick Actions ────────────────────────────────────────────────────────
export const quickActions = [
  { id: "qa-001", label: "Send Message", description: "Send SMS or WhatsApp message", icon: "send" },
  { id: "qa-002", label: "Create Campaign", description: "Launch a messaging campaign", icon: "megaphone" },
  { id: "qa-003", label: "Add Customer", description: "Add a new customer record", icon: "user-plus" },
  { id: "qa-004", label: "Upload Knowledge", description: "Add to AI knowledge base", icon: "upload" },
  { id: "qa-005", label: "Invite Member", description: "Add a team member", icon: "user-round-plus" },
];

// ── Activity Feed ────────────────────────────────────────────────────────
export const recentActivity = [
  { id: "act-001", type: "conversation" as const, message: "AI resolved conversation with Adjoa Frimpong", time: "2 mins ago", icon: "bot" },
  { id: "act-002", type: "payment" as const, message: "Payment of GHS 249 received from Ama Boateng", time: "15 mins ago", icon: "wallet" },
  { id: "act-003", type: "customer" as const, message: "New customer Yaw Agyemang signed up via WhatsApp", time: "1 hour ago", icon: "user-plus" },
  { id: "act-004", type: "team" as const, message: "Kofi Asante assigned to Naa Logistics conversation", time: "2 hours ago", icon: "users" },
  { id: "act-005", type: "ai" as const, message: "Knowledge base updated: Product Catalog 2026", time: "3 hours ago", icon: "sparkles" },
  { id: "act-006", type: "payment" as const, message: "Invoice INV-2026-0312 paid by Bright Foods", time: "5 hours ago", icon: "wallet" },
  { id: "act-007", type: "conversation" as const, message: "Abena Osei closed 12 support tickets", time: "6 hours ago", icon: "check-circle" },
];

// ── Onboarding ───────────────────────────────────────────────────────────
export const onboardingSteps = [
  { label: "Create business profile", detail: "Capture business name, industry, contact details, and owner.", done: true },
  { label: "Verify contact channels", detail: "Prepare email, SMS, and WhatsApp verification screens.", done: false },
  { label: "Choose subscription tier", detail: "Show free, starter, and business plan options.", done: false },
  { label: "Connect payment method", detail: "Leave UI ready for MoMo or card payment APIs.", done: false },
  { label: "Invite team members", detail: "Add placeholders for future role-based access.", done: false },
  { label: "Launch inbox", detail: "Route SMS, WhatsApp, and web messages into one workspace.", done: false },
];

export const billingHistory = [
  { id: "INV-1008", date: "May 10, 2026", plan: "Business", amount: "GHS 249", status: "Paid" },
  { id: "INV-1007", date: "Apr 10, 2026", plan: "Business", amount: "GHS 249", status: "Paid" },
  { id: "INV-1006", date: "Mar 10, 2026", plan: "Business", amount: "GHS 249", status: "Paid" },
];

// ── Notifications ────────────────────────────────────────────────────────
export const notifications = [
  { id: "note-001", title: "Business verification pending", detail: "2 accounts need document review.", tone: "amber" as const, time: "10 mins ago", read: false },
  { id: "note-002", title: "SMS inbox volume up", detail: "Open conversations increased by 8% this week.", tone: "green" as const, time: "1 hour ago", read: false },
  { id: "note-003", title: "Payment received", detail: "GHS 249 from Ama Boateng - Business Plan upgrade.", tone: "blue" as const, time: "2 hours ago", read: true },
  { id: "note-004", title: "AI accuracy improved", detail: "Resolution rate increased to 78.5% this week.", tone: "green" as const, time: "5 hours ago", read: true },
  { id: "note-005", title: "Failed payment", detail: "Kojo Mensah's MoMo payment of GHS 99 failed.", tone: "red" as const, time: "1 day ago", read: true },
];

// ── Super Admin ──────────────────────────────────────────────────────────
export const superAdminMetrics = {
  totalOrganizations: 248,
  activeUsers: 12400,
  monthlyRevenue: "GHS 184,200",
  aiMessages: 842000,
  orgGrowth: "+18.4%",
  userGrowth: "+24.1%",
  revenueGrowth: "+31.2%",
  aiGrowth: "+45.6%",
};

export const superAdminRecentOrgs = [
  { id: "org-001", name: "Accra Pharmacy Ltd", plan: "Business", users: 8, status: "Active", joined: "Jun 1, 2026" },
  { id: "org-002", name: "Naa Logistics", plan: "Enterprise", users: 24, status: "Active", joined: "May 28, 2026" },
  { id: "org-003", name: "Bright Foods", plan: "Starter", users: 3, status: "Active", joined: "May 25, 2026" },
  { id: "org-004", name: "Cape Coast Textiles", plan: "Business", users: 12, status: "Suspended", joined: "May 20, 2026" },
  { id: "org-005", name: "Tema Steel Works", plan: "Enterprise", users: 45, status: "Active", joined: "May 15, 2026" },
];
