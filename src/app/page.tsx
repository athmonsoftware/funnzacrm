"use client";

import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Inbox,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  authScreens,
  billingHistory,
  conversations,
  crmMetrics,
  customers,
  notifications,
  onboardingSteps,
  subscriptionPlans,
} from "@/lib/mock-data";
import { Badge, Button, Card, ProgressBar, SectionHeader, TextInput } from "@/components/ui";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "customers", label: "Customers", icon: UsersRound },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "subscription", label: "Subscription", icon: WalletCards },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "onboarding", label: "Onboarding", icon: ShieldCheck },
] as const;

type ViewId = (typeof navItems)[number]["id"];

export default function Home() {
  const [activeView, setActiveView] = useState<ViewId>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return customers;
    return customers.filter((customer) =>
      [customer.name, customer.phone, customer.stage, customer.source]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [query]);

  const ActiveIcon = navItems.find((item) => item.id === activeView)?.icon ?? LayoutDashboard;

  function selectView(view: ViewId) {
    setActiveView(view);
    setMobileMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#14213d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-[#dfe5ec] bg-[#101828] text-white lg:block">
          <Sidebar activeView={activeView} onSelect={selectView} />
        </aside>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <aside className="h-full w-[min(84vw,320px)] bg-[#101828] text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Brand />
                <button
                  className="grid size-10 place-items-center rounded-md border border-white/10 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  type="button"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <Sidebar activeView={activeView} onSelect={selectView} compactHeader />
            </aside>
          </div>
        ) : null}

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-[#dfe5ec] bg-white/95 backdrop-blur">
            <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
              <button
                className="grid size-10 place-items-center rounded-md border border-[#d8e0e8] text-[#14213d] lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#e8f6ef] text-[#047857]">
                  <ActiveIcon size={19} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                    Funza AI CRM
                  </p>
                  <h1 className="truncate text-lg font-semibold sm:text-xl">
                    {navItems.find((item) => item.id === activeView)?.label}
                  </h1>
                </div>
              </div>
              <button
                className="relative grid size-10 place-items-center rounded-md border border-[#d8e0e8] text-[#14213d]"
                onClick={() => setNotificationsOpen((open) => !open)}
                type="button"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-[#ef4444]" />
              </button>
              {notificationsOpen ? <NotificationPanel /> : null}
            </div>
          </header>

          <div className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            {activeView === "dashboard" ? <Dashboard onView={selectView} /> : null}
            {activeView === "inbox" ? (
              <InboxView
                selectedConversation={selectedConversation}
                onSelect={setSelectedConversation}
              />
            ) : null}
            {activeView === "customers" ? (
              <CustomersView
                customers={filteredCustomers}
                query={query}
                onQueryChange={setQuery}
              />
            ) : null}
            {activeView === "analytics" ? <AnalyticsView /> : null}
            {activeView === "subscription" ? <SubscriptionView /> : null}
            {activeView === "billing" ? <BillingView /> : null}
            {activeView === "profile" ? <ProfileView /> : null}
            {activeView === "onboarding" ? <OnboardingView /> : null}
          </div>
        </section>
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-md bg-[#16a34a] font-bold text-white">
        F
      </div>
      <div>
        <p className="font-semibold leading-tight">Funza AI</p>
        <p className="text-xs text-white/55">Admin CRM</p>
      </div>
    </div>
  );
}

function Sidebar({
  activeView,
  onSelect,
  compactHeader = false,
}: {
  activeView: ViewId;
  onSelect: (view: ViewId) => void;
  compactHeader?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      {!compactHeader ? (
        <div className="border-b border-white/10 px-6 py-6">
          <Brand />
        </div>
      ) : null}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition ${
                active
                  ? "bg-white text-[#101828]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => onSelect(item.id)}
              type="button"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="rounded-md bg-white/8 p-4">
          <p className="text-sm font-semibold">Business tier</p>
          <p className="mt-1 text-xs leading-5 text-white/60">
            Ready for Joel&apos;s API once endpoints are live.
          </p>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onView }: { onView: (view: ViewId) => void }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {crmMetrics.map((metric) => (
          <Card key={metric.label} className="p-5">
            <p className="text-sm text-[#64748b]">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold tracking-normal">{metric.value}</p>
              <Badge>{metric.change}</Badge>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <SectionHeader
            title="Recent conversations"
            action={<Button tone="secondary" onClick={() => onView("inbox")}>Open inbox</Button>}
          />
          <div className="divide-y divide-[#edf1f5]">
            {conversations.slice(0, 4).map((conversation) => (
              <div
                key={conversation.id}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-semibold">{conversation.customer}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-[#64748b]">
                    {conversation.preview}
                  </p>
                </div>
                <Badge tone="gray">{conversation.channel}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Onboarding progress"
            action={<Button tone="secondary" onClick={() => onView("onboarding")}>Review</Button>}
          />
          <div className="space-y-3 p-5">
            <ProgressBar value={17} />
            {onboardingSteps.slice(0, 5).map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                <CheckCircle2
                  className={step.done ? "text-[#16a34a]" : "text-[#cbd5e1]"}
                  size={18}
                />
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

function InboxView({
  selectedConversation,
  onSelect,
}: {
  selectedConversation: (typeof conversations)[number];
  onSelect: (conversation: (typeof conversations)[number]) => void;
}) {
  return (
    <section className="grid min-h-[calc(100vh-132px)] gap-5 xl:grid-cols-[380px_1fr]">
      <Card>
        <SectionHeader title="Conversation inbox" />
        <div className="divide-y divide-[#edf1f5]">
          {conversations.map((conversation) => {
            const selected = selectedConversation.id === conversation.id;
            return (
              <button
                key={conversation.id}
                className={`block w-full px-5 py-4 text-left transition ${
                  selected ? "bg-[#eef7f1]" : "hover:bg-[#f8fafc]"
                }`}
                onClick={() => onSelect(conversation)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{conversation.customer}</p>
                  <span className="text-xs text-[#64748b]">{conversation.time}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-[#64748b]">
                  {conversation.preview}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="flex min-h-[560px] flex-col">
        <div className="border-b border-[#edf1f5] px-5 py-4">
          <p className="font-semibold">{selectedConversation.customer}</p>
          <p className="mt-1 text-sm text-[#64748b]">
            {selectedConversation.channel} conversation
          </p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {selectedConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[82%] rounded-md px-4 py-3 text-sm leading-6 ${
                message.role === "agent"
                  ? "ml-auto bg-[#101828] text-white"
                  : "bg-[#f1f5f9] text-[#14213d]"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="border-t border-[#edf1f5] p-4">
          <div className="flex gap-3">
            <input
              className="h-11 min-w-0 flex-1 rounded-md border border-[#d8e0e8] px-3 text-sm outline-none focus:border-[#16a34a]"
              placeholder="Type a reply..."
            />
            <Button>Send</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

function CustomersView({
  customers: visibleCustomers,
  query,
  onQueryChange,
}: {
  customers: typeof customers;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-3 border-b border-[#edf1f5] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customers and leads</h2>
          <p className="mt-1 text-sm text-[#64748b]">Track stages, source channels, and last activity.</p>
        </div>
        <label className="flex h-11 w-full items-center gap-2 rounded-md border border-[#d8e0e8] px-3 lg:w-80">
          <Search size={17} className="text-[#64748b]" />
          <input
            className="min-w-0 flex-1 text-sm outline-none"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search customers"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Phone</th>
              <th className="px-5 py-3 font-semibold">Stage</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Last active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf1f5]">
            {visibleCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-5 py-4 font-semibold">{customer.name}</td>
                <td className="px-5 py-4 font-mono text-xs">{customer.phone}</td>
                <td className="px-5 py-4">
                  <Badge>{customer.stage}</Badge>
                </td>
                <td className="px-5 py-4">{customer.source}</td>
                <td className="px-5 py-4 text-[#64748b]">{customer.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AnalyticsView() {
  return (
    <section className="grid gap-5 lg:grid-cols-3">
      {["Messages by channel", "Lead conversion", "AI response quality"].map((title, index) => (
        <Card key={title} className="p-5">
          <h2 className="font-semibold">{title}</h2>
          <div className="mt-6 flex h-56 items-end gap-3">
            {[54, 72, 38, 88, 64, 79].map((height, barIndex) => (
              <div
                key={`${title}-${barIndex}`}
                className="flex flex-1 items-end rounded-t-md bg-[#e2e8f0]"
                style={{ height: `${height + index * 3}%` }}
              >
                <div className="h-2/3 w-full rounded-t-md bg-[#16a34a]" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </section>
  );
}

function SubscriptionView() {
  return (
    <section className="grid gap-5 lg:grid-cols-3">
      {subscriptionPlans.map((plan) => (
        <Card
          key={plan.name}
          className={`p-5 ${
            plan.current ? "border-[#16a34a]" : "border-[#dfe5ec]"
          }`}
        >
          <p className="text-sm font-semibold text-[#64748b]">{plan.name}</p>
          <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
          <div className="mt-5 space-y-3">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#16a34a]" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button tone={plan.current ? "ghost" : "secondary"} className="mt-6 w-full">
            {plan.current ? "Current plan" : "Choose plan"}
          </Button>
        </Card>
      ))}
    </section>
  );
}

function BillingView() {
  return (
    <Card>
      <SectionHeader title="Billing history" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
            <tr>
              <th className="px-5 py-3">Invoice</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf1f5]">
            {billingHistory.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-5 py-4 font-mono text-xs">{invoice.id}</td>
                <td className="px-5 py-4">{invoice.date}</td>
                <td className="px-5 py-4">{invoice.plan}</td>
                <td className="px-5 py-4 font-semibold">{invoice.amount}</td>
                <td className="px-5 py-4">
                  <Badge>{invoice.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ProfileView() {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="p-5">
        <div className="grid size-16 place-items-center rounded-md bg-[#e8f6ef] text-2xl font-bold text-[#047857]">
          K
        </div>
        <h2 className="mt-4 text-xl font-semibold">Kelvin</h2>
        <p className="mt-1 text-sm text-[#64748b]">Frontend CRM owner</p>
        <div className="mt-5 space-y-3 text-sm">
          <ProfileLine label="Role" value="Admin designer" />
          <ProfileLine label="Project" value="Funza AI CRM" />
          <ProfileLine label="Status" value="Building frontend" />
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Business profile</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {["Business name", "Industry", "Primary phone", "Support email"].map((label) => (
            <TextInput key={label} label={label} />
          ))}
        </div>
        <Button className="mt-5">Save profile</Button>
      </Card>
    </section>
  );
}

function OnboardingView() {
  return (
    <Card>
      <SectionHeader title="Business onboarding" />
      <div className="divide-y divide-[#edf1f5]">
        {onboardingSteps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-4 px-5 py-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-md text-sm font-semibold ${
                step.done ? "bg-[#16a34a] text-white" : "bg-[#f1f5f9] text-[#64748b]"
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{step.label}</p>
              <p className="mt-1 text-sm text-[#64748b]">{step.detail}</p>
            </div>
            <ChevronRight className="text-[#94a3b8]" size={18} />
          </div>
        ))}
      </div>
    </Card>
  );
}


function NotificationPanel() {
  return (
    <Card className="absolute right-4 top-14 z-40 w-[calc(100vw-32px)] max-w-sm shadow-xl sm:right-6">
      <SectionHeader title="Notifications" description="CRM activity and integration blockers" />
      <div className="divide-y divide-[#edf1f5]">
        {notifications.map((item) => (
          <div key={item.id} className="space-y-2 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{item.title}</p>
              <Badge tone={item.tone as "green" | "blue" | "red" | "gray" | "amber"}>New</Badge>
            </div>
            <p className="text-sm leading-6 text-[#64748b]">{item.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#edf1f5] pb-3 last:border-0">
      <span className="text-[#64748b]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
