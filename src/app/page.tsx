export default function FunzaCRMPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-12 md:mb-20">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Funza CRM
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Smart business infrastructure for the future.
            </p>
          </div>

          <a
            href="/dashboard"
            className="hidden md:inline-flex items-center rounded-2xl bg-white text-slate-900 px-5 py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Open Dashboard
          </a>
        </nav>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-2 text-sm text-slate-300 mb-6">
              🚀 Under Active Development
            </div>

            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Welcome to
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                {" "}Funza CRM
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              We are still building and under development, but this is a peek into what the future of business management for companies, SMEs, and personal accounts will look like.
            </p>

            <p className="text-slate-400 leading-relaxed mb-10 max-w-xl">
              Funza CRM is designed to simplify operations, automate workflows, and give businesses a modern AI-powered experience built for growth, scalability, and productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-base font-semibold shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                Explore Dashboard Demo
              </a>

              <button className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-4 text-base font-medium text-slate-200 hover:bg-white/10 transition-all duration-300">
                Coming Soon
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Fake Dashboard Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="text-sm text-slate-400">
                  Dashboard Preview
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="p-5 md:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                    <p className="text-slate-400 text-sm mb-2">Revenue</p>
                    <h3 className="text-2xl font-bold">$42.8K</h3>
                    <p className="text-emerald-400 text-sm mt-2">+18% growth</p>
                  </div>

                  <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                    <p className="text-slate-400 text-sm mb-2">Customers</p>
                    <h3 className="text-2xl font-bold">1,284</h3>
                    <p className="text-cyan-400 text-sm mt-2">Active users</p>
                  </div>

                  <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                    <p className="text-slate-400 text-sm mb-2">Automation</p>
                    <h3 className="text-2xl font-bold">92%</h3>
                    <p className="text-purple-400 text-sm mt-2">Efficiency rate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 rounded-2xl bg-slate-900/70 border border-white/10 p-5 min-h-[220px]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-semibold text-lg">Analytics</h4>
                        <p className="text-sm text-slate-400">
                          Real-time business insights
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300">
                        Live Data
                      </div>
                    </div>

                    <div className="flex items-end gap-3 h-32">
                      {[40, 70, 55, 90, 65, 120, 95].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-500 to-cyan-300"
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                    <h4 className="font-semibold text-lg mb-5">
                      AI Activity
                    </h4>

                    <div className="space-y-4">
                      {[
                        "Lead follow-up completed",
                        "Invoice automation triggered",
                        "Customer support assisted",
                        "New client pipeline created",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-xl bg-white/5 p-3"
                        >
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                          <p className="text-sm text-slate-300">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <a
            href="/dashboard"
            className="flex w-full items-center justify-center rounded-2xl bg-white text-slate-900 px-6 py-4 font-semibold shadow-lg"
          >
            Open Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
