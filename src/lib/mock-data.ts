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

// ── Customers ────────────────────────────────────────────────────────────
export const customers = [
  { id: "cust-001", name: "Ama Boateng", phone: "+233 24 000 1122", email: "ama@boateng.com", tags: ["VIP", "Retail"], status: "Active", lastActive: "2 mins ago", assignedAgent: "Kofi Asante", source: "WhatsApp", stage: "Qualified", avatar: null },
  { id: "cust-002", name: "Kojo Mensah", phone: "+233 55 142 7788", email: "kojo.mensah@mail.com", tags: ["Support"], status: "Active", lastActive: "15 mins ago", assignedAgent: "Abena Osei", source: "SMS", stage: "Support", avatar: null },
  { id: "cust-003", name: "Naa Logistics", phone: "+233 30 221 7810", email: "info@naalogistics.com", tags: ["Enterprise", "Logistics"], status: "Active", lastActive: "1 hour ago", assignedAgent: "Kwame Darko", source: "Web chat", stage: "Enterprise lead", avatar: null },
  { id: "cust-004", name: "Bright Foods", phone: "+233 20 889 1201", email: "orders@brightfoods.gh", tags: ["F&B", "Bulk"], status: "Active", lastActive: "3 hours ago", assignedAgent: "Kofi Asante", source: "SMS", stage: "Invoice request", avatar: null },
  { id: "cust-005", name: "Kumasi Tutors", phone: "+233 27 991 4533", email: "admin@kumasitutors.com", tags: ["Education"], status: "Inactive", lastActive: "2 days ago", assignedAgent: null, source: "WhatsApp", stage: "New", avatar: null },
  { id: "cust-006", name: "Adjoa Frimpong", phone: "+233 24 556 7890", email: "adjoa.f@gmail.com", tags: ["Retail"], status: "Active", lastActive: "30 mins ago", assignedAgent: "Abena Osei", source: "WhatsApp", stage: "Qualified", avatar: null },
  { id: "cust-007", name: "Cape Coast Textiles", phone: "+233 33 200 1100", email: "sales@cctextiles.com", tags: ["Enterprise", "Textiles"], status: "Active", lastActive: "5 hours ago", assignedAgent: "Kwame Darko", source: "SMS", stage: "Negotiation", avatar: null },
  { id: "cust-008", name: "Yaw Agyemang", phone: "+233 20 111 2233", email: "yaw.a@outlook.com", tags: ["Freelancer"], status: "Active", lastActive: "1 day ago", assignedAgent: null, source: "WhatsApp", stage: "New", avatar: null },
  { id: "cust-009", name: "Accra Pharmacy Ltd", phone: "+233 30 445 6677", email: "info@accrapharmacy.com", tags: ["Healthcare", "VIP"], status: "Active", lastActive: "20 mins ago", assignedAgent: "Kofi Asante", source: "SMS", stage: "Customer", avatar: null },
  { id: "cust-010", name: "Efua Owusu", phone: "+233 27 888 9900", email: "efua.owusu@yahoo.com", tags: ["Retail"], status: "Churned", lastActive: "14 days ago", assignedAgent: null, source: "WhatsApp", stage: "Lost", avatar: null },
  { id: "cust-011", name: "Tema Steel Works", phone: "+233 22 334 5566", email: "ops@temasteelworks.gh", tags: ["Enterprise", "Manufacturing"], status: "Active", lastActive: "4 hours ago", assignedAgent: "Kwame Darko", source: "Web chat", stage: "Enterprise lead", avatar: null },
  { id: "cust-012", name: "Kweku Appiah", phone: "+233 50 112 3344", email: "kweku.appiah@mail.com", tags: ["Freelancer"], status: "Active", lastActive: "6 hours ago", assignedAgent: "Abena Osei", source: "SMS", stage: "Qualified", avatar: null },
];

export const customerSegments = [
  { id: "seg-001", name: "High-Value Customers", description: "Customers with lifetime value > GHS 5,000", count: 124, color: "#10b981" },
  { id: "seg-002", name: "At-Risk Churn", description: "Inactive for 7+ days with open issues", count: 38, color: "#ef4444" },
  { id: "seg-003", name: "New This Month", description: "Customers acquired in the last 30 days", count: 186, color: "#6366f1" },
  { id: "seg-004", name: "Enterprise Leads", description: "Organizations in enterprise pipeline", count: 22, color: "#f59e0b" },
  { id: "seg-005", name: "WhatsApp Active", description: "Customers primarily using WhatsApp", count: 842, color: "#22c55e" },
];

export const customerTags = [
  { id: "tag-001", name: "VIP", color: "#f59e0b", count: 45 },
  { id: "tag-002", name: "Enterprise", color: "#6366f1", count: 22 },
  { id: "tag-003", name: "Retail", color: "#10b981", count: 312 },
  { id: "tag-004", name: "Support", color: "#ef4444", count: 67 },
  { id: "tag-005", name: "Freelancer", color: "#8b5cf6", count: 128 },
  { id: "tag-006", name: "Education", color: "#06b6d4", count: 54 },
  { id: "tag-007", name: "Healthcare", color: "#ec4899", count: 41 },
  { id: "tag-008", name: "F&B", color: "#f97316", count: 89 },
  { id: "tag-009", name: "Logistics", color: "#14b8a6", count: 33 },
  { id: "tag-010", name: "Bulk", color: "#a855f7", count: 76 },
];

// ── Conversations ────────────────────────────────────────────────────────
export const conversations = [
  {
    id: "conv-001",
    customer: "Ama Boateng",
    customerId: "cust-001",
    channel: "WhatsApp" as const,
    status: "open" as const,
    preview: "I want to upgrade to the business plan and connect my WhatsApp number.",
    time: "9:42 AM",
    unread: true,
    assignedAgent: "Kofi Asante",
    aiClassification: "Sales Inquiry",
    priority: "high" as const,
    messages: [
      { id: "m1", role: "customer" as const, text: "Hello, can I upgrade to business today?", time: "9:30 AM" },
      { id: "m2", role: "ai" as const, text: "Hi Ama! I'd be happy to help you with the upgrade. The Business plan includes unlimited contacts, team collaboration tools, and WhatsApp automation. Would you like me to walk you through the process?", time: "9:30 AM" },
      { id: "m3", role: "customer" as const, text: "Yes please. I also want WhatsApp automation for orders.", time: "9:35 AM" },
      { id: "m4", role: "ai" as const, text: "Great choice! WhatsApp automation is included in the Business plan. Let me connect you with our sales team to finalize the upgrade and set up your automation workflows.", time: "9:35 AM" },
      { id: "m5", role: "agent" as const, text: "Hi Ama, this is Kofi from the sales team. I can help you upgrade right away. Let me send you the payment link.", time: "9:42 AM" },
    ],
    aiSuggestions: [
      "I've sent the payment link to your WhatsApp. Please check and confirm once done.",
      "Would you also like me to set up the order automation template for you?",
      "Your upgrade will be active within 5 minutes of payment confirmation.",
    ],
    summary: "Customer wants to upgrade from Starter to Business plan. Interested in WhatsApp order automation. AI handled initial inquiry, escalated to sales agent Kofi Asante.",
  },
  {
    id: "conv-002",
    customer: "Kojo Mensah",
    customerId: "cust-002",
    channel: "SMS" as const,
    status: "open" as const,
    preview: "The AI assistant answered my customer but did not include the receipt.",
    time: "10:18 AM",
    unread: true,
    assignedAgent: "Abena Osei",
    aiClassification: "Support Issue",
    priority: "medium" as const,
    messages: [
      { id: "m1", role: "customer" as const, text: "The receipt was not sent after payment.", time: "10:10 AM" },
      { id: "m2", role: "ai" as const, text: "I'm sorry about that, Kojo. Let me check the transaction status for you. Can you provide the payment reference number?", time: "10:10 AM" },
      { id: "m3", role: "customer" as const, text: "It's TXN-2026-0584. My customer paid via MoMo.", time: "10:15 AM" },
      { id: "m4", role: "agent" as const, text: "I am checking the billing event and transaction status.", time: "10:18 AM" },
    ],
    aiSuggestions: [
      "I've found the transaction. The receipt generation failed due to a timeout. I'm resending it now.",
      "The receipt has been sent to the customer's phone number ending in 7788.",
      "Would you like me to set up automatic receipt delivery for all MoMo payments?",
    ],
    summary: "Customer reporting missing receipt for MoMo payment TXN-2026-0584. AI identified the issue, agent Abena investigating.",
  },
  {
    id: "conv-003",
    customer: "Naa Logistics",
    customerId: "cust-003",
    channel: "WhatsApp" as const,
    status: "open" as const,
    preview: "Can your CRM manage multiple branches and assign support agents?",
    time: "11:03 AM",
    unread: false,
    assignedAgent: "Kwame Darko",
    aiClassification: "Enterprise Inquiry",
    priority: "high" as const,
    messages: [
      { id: "m1", role: "customer" as const, text: "We have three branches. Can each branch see only its own tickets?", time: "10:50 AM" },
      { id: "m2", role: "ai" as const, text: "Great question! Our Enterprise plan supports multi-branch management with department-level access controls. Each branch can have its own team with scoped visibility. Would you like to learn more?", time: "10:50 AM" },
      { id: "m3", role: "customer" as const, text: "Yes. We need Accra, Kumasi, and Takoradi branches separated.", time: "10:55 AM" },
      { id: "m4", role: "agent" as const, text: "Hi! I'm Kwame from Enterprise sales. I can set up a demo workspace with your 3 branches. When are you available for a 30-min walkthrough?", time: "11:03 AM" },
    ],
    aiSuggestions: [
      "I've prepared a demo workspace with 3 branches: Accra, Kumasi, and Takoradi. Ready when you are.",
      "Our Enterprise plan starts at GHS 149/month per branch. Would you like a custom quote?",
      "I can schedule a demo for you. What day works best this week?",
    ],
    summary: "Enterprise prospect with 3 branches needs multi-location CRM. AI qualified as enterprise lead, escalated to Kwame Darko.",
  },
  {
    id: "conv-004",
    customer: "Bright Foods",
    customerId: "cust-004",
    channel: "SMS" as const,
    status: "closed" as const,
    preview: "Customer asked for invoice generation after placing a bulk order.",
    time: "12:26 PM",
    unread: false,
    assignedAgent: "Kofi Asante",
    aiClassification: "Invoice Request",
    priority: "low" as const,
    messages: [
      { id: "m1", role: "customer" as const, text: "Can Funza create an invoice from this order?", time: "12:20 PM" },
      { id: "m2", role: "ai" as const, text: "Yes! I can generate an invoice for your bulk order. Let me pull up the details and create it for you right away.", time: "12:20 PM" },
      { id: "m3", role: "agent" as const, text: "Invoice INV-2026-0312 has been generated and sent to orders@brightfoods.gh.", time: "12:26 PM" },
    ],
    aiSuggestions: [],
    summary: "Bulk order invoice request. Generated INV-2026-0312 and sent to customer.",
  },
  {
    id: "conv-005",
    customer: "Adjoa Frimpong",
    customerId: "cust-006",
    channel: "WhatsApp" as const,
    status: "open" as const,
    preview: "Asking about loyalty program and discount codes for repeat purchases.",
    time: "1:15 PM",
    unread: true,
    assignedAgent: "Abena Osei",
    aiClassification: "Product Inquiry",
    priority: "medium" as const,
    messages: [
      { id: "m1", role: "customer" as const, text: "Do you have any loyalty discounts? I've been ordering every week.", time: "1:10 PM" },
      { id: "m2", role: "ai" as const, text: "Thank you for being a loyal customer, Adjoa! 🎉 I can see you've made 12 orders in the last 3 months. Let me check what special offers are available for you.", time: "1:10 PM" },
      { id: "m3", role: "customer" as const, text: "That would be great. I also referred two friends last month.", time: "1:13 PM" },
      { id: "m4", role: "ai" as const, text: "That's wonderful! Let me connect you with our loyalty team to set up your VIP rewards. You'll get early access to deals and referral bonuses.", time: "1:15 PM" },
    ],
    aiSuggestions: [
      "As a VIP customer with 12 orders, you qualify for our 15% loyalty discount. I'll apply it to your next order.",
      "Your friend referrals earned you GHS 50 in credits. Would you like to use them now?",
      "I'd love to invite you to our exclusive VIP WhatsApp group for early deals!",
    ],
    summary: "Repeat customer asking about loyalty rewards. 12 orders in 3 months, 2 referrals. AI qualifying for VIP program.",
  },
  {
    id: "conv-006",
    customer: "Accra Pharmacy Ltd",
    customerId: "cust-009",
    channel: "SMS" as const,
    status: "open" as const,
    preview: "Need help setting up automated prescription refill reminders.",
    time: "2:30 PM",
    unread: false,
    assignedAgent: "Kofi Asante",
    aiClassification: "Feature Request",
    priority: "medium" as const,
    messages: [
      { id: "m1", role: "customer" as const, text: "We want to send automatic SMS reminders when prescriptions are due for refill.", time: "2:20 PM" },
      { id: "m2", role: "ai" as const, text: "That's a great use case! Our automation engine can send scheduled SMS reminders based on prescription dates. I'll need some details about your workflow to set this up.", time: "2:22 PM" },
      { id: "m3", role: "customer" as const, text: "Typically 3 days before the refill date. We have about 2,000 active prescriptions.", time: "2:28 PM" },
      { id: "m4", role: "agent" as const, text: "I can help configure this. We'll set up a CSV import for your prescription data and create an automation rule for 3-day advance reminders.", time: "2:30 PM" },
    ],
    aiSuggestions: [
      "I've drafted an automation template for prescription reminders. Would you like to review it?",
      "For 2,000 prescriptions, you'll need approximately 2,000 SMS credits per cycle. Your current plan covers this.",
      "Would you also like to add a follow-up message if they don't respond within 24 hours?",
    ],
    summary: "Pharmacy needs automated prescription refill reminders via SMS for 2,000 active prescriptions. 3-day advance notice.",
  },
];

// ── Payments & Transactions ──────────────────────────────────────────────
export const transactions = [
  { id: "TXN-2026-0601", customer: "Ama Boateng", amount: "GHS 249.00", status: "successful" as const, channel: "MTN MoMo", date: "Jun 5, 2026", description: "Business Plan Upgrade" },
  { id: "TXN-2026-0598", customer: "Naa Logistics", amount: "GHS 1,490.00", status: "successful" as const, channel: "Bank Transfer", date: "Jun 4, 2026", description: "Enterprise Annual Plan" },
  { id: "TXN-2026-0595", customer: "Bright Foods", amount: "GHS 99.00", status: "successful" as const, channel: "Telecel Cash", date: "Jun 3, 2026", description: "Starter Plan Renewal" },
  { id: "TXN-2026-0592", customer: "Adjoa Frimpong", amount: "GHS 49.00", status: "pending" as const, channel: "MTN MoMo", date: "Jun 3, 2026", description: "SME Plan Payment" },
  { id: "TXN-2026-0588", customer: "Cape Coast Textiles", amount: "GHS 249.00", status: "successful" as const, channel: "AirtelTigo Cash", date: "Jun 2, 2026", description: "Business Plan" },
  { id: "TXN-2026-0584", customer: "Kojo Mensah", amount: "GHS 99.00", status: "failed" as const, channel: "MTN MoMo", date: "Jun 1, 2026", description: "Starter Plan Renewal" },
  { id: "TXN-2026-0580", customer: "Accra Pharmacy Ltd", amount: "GHS 249.00", status: "successful" as const, channel: "Bank Transfer", date: "May 31, 2026", description: "Business Plan Renewal" },
  { id: "TXN-2026-0575", customer: "Tema Steel Works", amount: "GHS 1,490.00", status: "successful" as const, channel: "Bank Transfer", date: "May 30, 2026", description: "Enterprise Annual Plan" },
  { id: "TXN-2026-0571", customer: "Kumasi Tutors", amount: "GHS 0.00", status: "successful" as const, channel: "Free Tier", date: "May 28, 2026", description: "Free Plan Activation" },
  { id: "TXN-2026-0568", customer: "Yaw Agyemang", amount: "GHS 49.00", status: "pending" as const, channel: "MTN MoMo", date: "May 27, 2026", description: "SME Plan Payment" },
];

export const invoices = [
  { id: "INV-2026-0312", customer: "Bright Foods", amount: "GHS 4,800.00", status: "Paid", dueDate: "Jun 15, 2026", issuedDate: "Jun 1, 2026" },
  { id: "INV-2026-0298", customer: "Naa Logistics", amount: "GHS 12,500.00", status: "Sent", dueDate: "Jun 20, 2026", issuedDate: "May 28, 2026" },
  { id: "INV-2026-0285", customer: "Accra Pharmacy Ltd", amount: "GHS 2,400.00", status: "Paid", dueDate: "Jun 10, 2026", issuedDate: "May 25, 2026" },
  { id: "INV-2026-0271", customer: "Cape Coast Textiles", amount: "GHS 8,200.00", status: "Overdue", dueDate: "May 30, 2026", issuedDate: "May 15, 2026" },
  { id: "INV-2026-0260", customer: "Tema Steel Works", amount: "GHS 15,800.00", status: "Paid", dueDate: "May 25, 2026", issuedDate: "May 10, 2026" },
];

export const receipts = [
  { id: "REC-2026-0601", customer: "Ama Boateng", amount: "GHS 249.00", date: "Jun 5, 2026", invoiceId: null, paymentMethod: "MTN MoMo" },
  { id: "REC-2026-0598", customer: "Naa Logistics", amount: "GHS 1,490.00", date: "Jun 4, 2026", invoiceId: "INV-2026-0298", paymentMethod: "Bank Transfer" },
  { id: "REC-2026-0595", customer: "Bright Foods", amount: "GHS 99.00", date: "Jun 3, 2026", invoiceId: "INV-2026-0312", paymentMethod: "Telecel Cash" },
  { id: "REC-2026-0588", customer: "Cape Coast Textiles", amount: "GHS 249.00", date: "Jun 2, 2026", invoiceId: null, paymentMethod: "AirtelTigo Cash" },
  { id: "REC-2026-0580", customer: "Accra Pharmacy Ltd", amount: "GHS 249.00", date: "May 31, 2026", invoiceId: "INV-2026-0285", paymentMethod: "Bank Transfer" },
];

export const billingHistory = [
  { id: "INV-1008", date: "May 10, 2026", plan: "Business", amount: "GHS 249", status: "Paid" },
  { id: "INV-1007", date: "Apr 10, 2026", plan: "Business", amount: "GHS 249", status: "Paid" },
  { id: "INV-1006", date: "Mar 10, 2026", plan: "Business", amount: "GHS 249", status: "Paid" },
];

export const subscriptionPlans = [
  { name: "Free", price: "GHS 0", priceSuffix: "/month", current: false, features: ["50 contacts", "100 AI messages/month", "SMS support", "1 user seat"], color: "#94a3b8" },
  { name: "Starter", price: "GHS 99", priceSuffix: "/month", current: false, features: ["500 contacts", "1,000 AI messages/month", "SMS + WhatsApp", "3 user seats", "Basic analytics"], color: "#6366f1" },
  { name: "Business", price: "GHS 249", priceSuffix: "/month", current: true, features: ["5,000 contacts", "10,000 AI messages/month", "All channels", "10 user seats", "Advanced analytics", "API access", "Automations"], color: "#10b981" },
  { name: "Enterprise", price: "GHS 499", priceSuffix: "/month", current: false, features: ["Unlimited contacts", "Unlimited AI messages", "All channels", "Unlimited seats", "Enterprise analytics", "SSO + Audit logs", "Dedicated support", "Custom integrations"], color: "#f59e0b" },
];

// ── Team ─────────────────────────────────────────────────────────────────
export const teamMembers = [
  { id: "user-001", name: "Joel Ekeng", email: "joel@funzacrm.com", role: "Owner" as const, status: "Online" as const, lastActive: "Now", avatar: null },
  { id: "user-002", name: "Kofi Asante", email: "kofi@funzacrm.com", role: "Admin" as const, status: "Online" as const, lastActive: "Now", avatar: null },
  { id: "user-003", name: "Abena Osei", email: "abena@funzacrm.com", role: "Manager" as const, status: "Online" as const, lastActive: "5 mins ago", avatar: null },
  { id: "user-004", name: "Kwame Darko", email: "kwame@funzacrm.com", role: "Agent" as const, status: "Away" as const, lastActive: "1 hour ago", avatar: null },
  { id: "user-005", name: "Esi Adjei", email: "esi@funzacrm.com", role: "Agent" as const, status: "Offline" as const, lastActive: "3 hours ago", avatar: null },
  { id: "user-006", name: "Yaw Boateng", email: "yaw@funzacrm.com", role: "Agent" as const, status: "Online" as const, lastActive: "Now", avatar: null },
  { id: "user-007", name: "Akua Mensah", email: "akua@funzacrm.com", role: "Viewer" as const, status: "Offline" as const, lastActive: "1 day ago", avatar: null },
];

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

export const teams = [
  { id: "team-001", name: "Sales Team", members: ["user-002", "user-004"], lead: "user-002", description: "Handles inbound leads and enterprise sales" },
  { id: "team-002", name: "Support Team", members: ["user-003", "user-005", "user-006"], lead: "user-003", description: "Customer support and issue resolution" },
  { id: "team-003", name: "Operations", members: ["user-001", "user-007"], lead: "user-001", description: "Business operations and reporting" },
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

// ── Notifications ────────────────────────────────────────────────────────
export const notifications = [
  { id: "note-001", title: "Business verification pending", detail: "2 accounts need document review.", tone: "amber" as const, time: "10 mins ago", read: false },
  { id: "note-002", title: "SMS inbox volume up", detail: "Open conversations increased by 8% this week.", tone: "green" as const, time: "1 hour ago", read: false },
  { id: "note-003", title: "Payment received", detail: "GHS 249 from Ama Boateng - Business Plan upgrade.", tone: "blue" as const, time: "2 hours ago", read: true },
  { id: "note-004", title: "AI accuracy improved", detail: "Resolution rate increased to 78.5% this week.", tone: "green" as const, time: "5 hours ago", read: true },
  { id: "note-005", title: "Failed payment", detail: "Kojo Mensah's MoMo payment of GHS 99 failed.", tone: "red" as const, time: "1 day ago", read: true },
];

export const authScreens = [
  { id: "login", title: "Sign in", subtitle: "Access the CRM workspace", primaryAction: "Sign in", fields: ["Email address", "Password"] },
  { id: "register", title: "Create business account", subtitle: "Start onboarding a company workspace", primaryAction: "Create account", fields: ["Full name", "Business name", "Email address", "Password"] },
  { id: "forgot", title: "Reset password", subtitle: "Send a recovery link to the account owner", primaryAction: "Send reset link", fields: ["Email address"] },
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
