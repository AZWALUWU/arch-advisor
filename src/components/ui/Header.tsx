import Link from "next/link";
import { Cpu, Sparkles, FileCode, Layers, GitBranch } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#412D15] bg-[#000000]/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F150C] text-[#E1DCC9] ring-1 ring-[#412D15]">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#E1DCC9]">
              Arch<span className="text-[#E1DCC9]">Advisor</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/assess"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#E1DCC9]/80 hover:text-[#E1DCC9] hover:bg-[#1F150C] rounded-lg transition-colors"
            >
              <Layers className="h-3.5 w-3.5 text-[#E1DCC9]" />
              <span>Architecture Evaluator</span>
            </Link>

            <Link
              href="/prd"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#E1DCC9]/80 hover:text-[#E1DCC9] hover:bg-[#1F150C] rounded-lg transition-colors"
            >
              <FileCode className="h-3.5 w-3.5 text-[#E1DCC9]" />
              <span>MVP PRD Builder</span>
            </Link>

            <Link
              href="/roadmap"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#E1DCC9]/80 hover:text-[#E1DCC9] hover:bg-[#1F150C] rounded-lg transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5 text-[#E1DCC9]" />
              <span>Vibe Roadmap</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full bg-[#1F150C] px-3 py-1 text-xs text-[#E1DCC9]/80 ring-1 ring-[#412D15] lg:flex">
            <Sparkles className="h-3.5 w-3.5 text-[#E1DCC9]" />
            <span>Powered by Gemini 3.6</span>
          </div>

          <a
            href="https://github.com/AZWALUWU"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#1F150C] px-3 py-1.5 text-xs font-medium text-[#E1DCC9] hover:bg-[#412D15] transition-colors border border-[#412D15]"
          >
            <FaGithub className="h-4 w-4" />
            <span>Open Source</span>
          </a>
        </div>
      </div>
    </header>
  );
}
