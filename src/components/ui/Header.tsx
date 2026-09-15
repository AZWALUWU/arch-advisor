import Link from "next/link";
import { Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#412D15]/50 bg-[#000000]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1F150C] text-[#E1DCC9] ring-1 ring-[#412D15]/60 group-hover:ring-[#412D15] group-hover:bg-[#412D15]/30 transition-all duration-200">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-[#E1DCC9]">
            Arch<span className="text-[#E1DCC9]/80">Advisor</span>
          </span>
        </Link>

        {/* Open Source */}
        <a
          href="https://github.com/AZWALUWU"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#1F150C] transition-all duration-200 border border-transparent hover:border-[#412D15]/40"
        >
          <FaGithub className="h-4 w-4" />
          <span className="hidden sm:inline">Open Source</span>
        </a>
      </div>
    </header>
  );
}
