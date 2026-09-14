"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    darkMode: true,
    background: "#090d16",
    primaryColor: "#f97316",
    primaryTextColor: "#ffffff",
    lineColor: "#38bdf8",
    secondaryColor: "#1e293b",
    tertiaryColor: "#0f172a",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  securityLevel: "loose",
});

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!chart) return;
      setIsLoading(true);
      setErrorMsg(null);

      try {
        // Hapus whitespace berlebih di awal & akhir
        const cleanChart = chart.trim();
        const uniqueId = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        
        const { svg } = await mermaid.render(uniqueId, cleanChart);
        
        if (isMounted) {
          setSvgContent(svg);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error("Mermaid Render Error:", err);
        if (isMounted) {
          setErrorMsg(err?.message || "Gagal merender diagram Mermaid.");
          setIsLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (errorMsg) {
    return (
      <div className="p-4 rounded-xl border border-red-900/50 bg-red-950/20 text-red-400 font-mono text-xs">
        <p className="font-bold mb-1">⚠️ Syntax Error Mermaid:</p>
        <p className="text-red-300/80">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-x-auto flex items-center justify-center min-h-[300px] ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
            Rendering Topology Graph...
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:rounded-lg"
      />
    </div>
  );
};