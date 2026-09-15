import { Layers, GitBranch, FileCode } from "lucide-react";

const stats = [
  {
    icon: GitBranch,
    value: "3-in-1",
    label: "AI-Powered Tools",
    description: "PRD, Roadmap, and AWS Architecture in one platform",
  },
  {
    icon: Layers,
    value: "Minutes",
    label: "Not Days",
    description: "Go from idea to production-ready architecture",
  },
  {
    icon: FileCode,
    value: "Free",
    label: "To Start",
    description: "No credit card required, generate instantly",
  },
];

export function StatsBar() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative group text-center space-y-3 p-6 rounded-2xl border border-transparent hover:border-[#412D15]/40 hover:bg-[#1F150C]/30 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#412D15]/20 text-[#E1DCC9] mb-1 group-hover:bg-[#412D15]/30 transition-colors">
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#E1DCC9] tracking-tight">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-[#E1DCC9] uppercase tracking-wider">
              {stat.label}
            </div>
            <p className="text-sm text-[#E1DCC9]/50 leading-relaxed">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
