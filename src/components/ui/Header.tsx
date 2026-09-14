import Link from "next/link";
import { Cpu, Sparkles, FileCode, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Arch<span className="text-orange-500">Advisor</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/assess"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            >
              <Layers className="h-3.5 w-3.5 text-orange-400" />
              <span>Architecture Evaluator</span>
            </Link>

            <Link
              href="/prd"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            >
              <FileCode className="h-3.5 w-3.5 text-amber-400" />
              <span>MVP PRD Builder</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-800 lg:flex">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Powered by Gemini 3.6</span>
          </div>

          <a
            href="https://github.com/AZWALUWU"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <FaGithub className="h-4 w-4" />
            <span>Open Source</span>
          </a>
        </div>
      </div>
    </header>
  );
}
