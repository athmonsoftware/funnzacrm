export const crmMetrics = [
  { label: "Active customers", value: "1,248", change: "+12%" },
  { label: "Open conversations", value: "84", change: "+8%" },
  { label: "Conversion rate", value: "18.6%", change: "+3%" },
  { label: "Monthly revenue", value: "GHS 9.4k", change: "+21%" },
];

export const conversations = [
  {
    id: "conv-001",
    customer: "Ama Boateng",
    channel: "WhatsApp",
    preview: "I want to upgrade to the business plan and connect my WhatsApp number.",
    time: "9:42 AM",
    messages: [
      { id: "m1", role: "customer", text: "Hello, can I upgrade to business today?" },
      { id: "m2", role: "agent", text: "Yes. I can help you review the plan and payment steps." },
      { id: "m3", role: "customer", text: "I also want WhatsApp automation for orders." },
    ],
  },
  {
    id: "conv-002",
    customer: "Kojo Mensah",
    channel: "SMS",
    preview: "The AI assistant answered my customer but did not include the receipt.",
    time: "10:18 AM",
    messages: [
      { id: "m1", role: "customer", text: "The receipt was not sent after payment." },
      { id: "m2", role: "agent", text: "I am checking the billing event and transaction status." },
    ],
  },
  {
    id: "conv-003",
    customer: "Naa Logistics",
    channel: "Web chat",
    preview: "Can your CRM manage multiple branches and assign support agents?",
    time: "11:03 AM",
    messages: [
      { id: "m1", role: "customer", text: "We have three branches. Can each branch see only its own tickets?" },
      { id: "m2", role: "agent", text: "Branch-level access is planned for the business tier." },
    ],
  },
  {
    id: "conv-004",
    customer: "Bright Foods",
    channel: "SMS",
    preview: "Customer asked for invoice generation after placing a bulk order.",
    time: "12:26 PM",
    messages: [
      { id: "m1", role: "customer", text: "Can Funza create an invoice from this order?" },
      { id: "m2", role: "agent", text: "Invoice automation is part of the CRM workflow backlog." },
    ],
  },
];

export const customers = [
  { id: "cust-001", name: "Ama Boateng", phone: "+233 24 000 1122", stage: "Qualified", source: "WhatsApp", lastActive: "Today" },
  { id: "cust-002", name: "Kojo Mensah", phone: "+233 55 142 7788", stage: "Support", source: "SMS", lastActive: "Today" },
  { id: "cust-003", name: "Naa Logistics", phone: "+233 30 221 7810", stage: "Enterprise lead", source: "Web chat", lastActive: "Yesterday" },
  { id: "cust-004", name: "Bright Foods", phone: "+233 20 889 1201", stage: "Invoice request", source: "SMS", lastActive: "2 days ago" },
  { id: "cust-005", name: "Kumasi Tutors", phone: "+233 27 991 4533", stage: "New", source: "WhatsApp", lastActive: "4 days ago" },
];

export const onboardingSteps = [
  { label: "Create business profile", detail: "Capture business name, industry, contact details, and owner.", done: true },
  { label: "Verify contact channels", detail: "Prepare email, SMS, and WhatsApp verification screens.", done: false },
  { label: "Choose subscription tier", detail: "Show free, starter, and business plan options.", done: false },
  { label: "Connect payment method", detail: "Leave UI ready for MoMo or card payment APIs.", done: false },
  { label: "Invite team members", detail: "Add placeholders for future role-based access.", done: false },
  { label: "Launch inbox", detail: "Route SMS, WhatsApp, and web messages into one workspace.", done: false },
];

export const subscriptionPlans = [
  {
    name: "Free",
    price: "GHS 0",
    current: false,
    features: ["Limited AI conversations", "Basic customer records", "SMS support"],
  },
  {
    name: "Starter",
    price: "GHS 99",
    current: true,
    features: ["Conversation inbox", "Customer stages", "Basic analytics"],
  },
  {
    name: "Business",
    price: "GHS 249",
    current: false,
    features: ["Workflow automation", "Advanced analytics", "Team permissions"],
  },
];

export const billingHistory = [
  { id: "INV-1008", date: "May 10, 2026", plan: "Starter", amount: "GHS 99", status: "Paid" },
  { id: "INV-1007", date: "Apr 10, 2026", plan: "Starter", amount: "GHS 99", status: "Paid" },
  { id: "INV-1006", date: "Mar 10, 2026", plan: "Starter", amount: "GHS 99", status: "Paid" },
];

export const notifications = [
  {
    id: "note-001",
    title: "Business verification pending",
    detail: "2 accounts need document review once Joel's verification API is ready.",
    tone: "amber",
  },
  {
    id: "note-002",
    title: "SMS inbox volume up",
    detail: "Open conversations increased by 8% this week.",
    tone: "green",
  },
  {
    id: "note-003",
    title: "Payment setup waiting",
    detail: "MoMo initialization endpoint is still a backend dependency.",
    tone: "blue",
  },
];

export const authScreens = [
  {
    id: "login",
    title: "Sign in",
    subtitle: "Access the CRM workspace",
    primaryAction: "Sign in",
    fields: ["Email address", "Password"],
  },
  {
    id: "register",
    title: "Create business account",
    subtitle: "Start onboarding a company workspace",
    primaryAction: "Create account",
    fields: ["Full name", "Business name", "Email address", "Password"],
  },
  {
    id: "forgot",
    title: "Reset password",
    subtitle: "Send a recovery link to the account owner",
    primaryAction: "Send reset link",
    fields: ["Email address"],
  },
];
