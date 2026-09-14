"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Download, RefreshCw } from "lucide-react";

interface ArchitectureDiagramProps {
  mermaidSyntax: string;
}

export function ArchitectureDiagram({ mermaidSyntax }: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    });

    const renderDiagram = async () => {
      setIsLoading(true);
      try {
        const cleanSyntax = mermaidSyntax
          .replace(/```mermaid/g, "")
          .replace(/```/g, "")
          .trim();

        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, cleanSyntax || "graph TD\nNode1[No Diagram Generated]");
        setSvgContent(svg);
      } catch (err) {
        console.error("Mermaid Render Error:", err);
        setSvgContent("<div class='text-red-400 p-4 text-sm'>Gagal merender diagram SVG.</div>");
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [mermaidSyntax]);

  const downloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aws-architecture-diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">AWS Architecture Topo Diagram</h3>
          <p className="text-xs text-slate-400">Visualization of the recommended network and service schema</p>
        </div>
        <button
          onClick={downloadSvg}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
        >
          <Download className="h-4 w-4" />
          <span>Export SVG</span>
        </button>
      </div>

      <div className="flex items-center justify-center min-h-[300px] overflow-x-auto p-4 bg-slate-950/50 rounded-xl border border-slate-800/80">
        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <RefreshCw className="h-4 w-4 animate-spin text-orange-500" />
            <span>Rendering diagram...</span>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
    </div>
  );
}
