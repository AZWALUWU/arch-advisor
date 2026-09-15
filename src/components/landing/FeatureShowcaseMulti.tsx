"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MultiImage {
  src: string;
  alt: string;
}

interface FeatureShowcaseMultiProps {
  tag: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
  images: MultiImage[];
}

export function FeatureShowcaseMulti({
  tag,
  title,
  description,
  href,
  ctaText,
  images,
}: FeatureShowcaseMultiProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#412D15]/20 px-4 py-1.5 text-xs font-semibold text-[#E1DCC9]/90 ring-1 ring-[#412D15]/50 uppercase tracking-wider">
            {tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E1DCC9] tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#E1DCC9]/60 leading-relaxed max-w-lg">
            {description}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#E1DCC9] hover:text-[#E1DCC9]/80 transition-colors group mt-2"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative group ${idx === 0 ? "col-span-2" : ""}`}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-[#412D15]/15 to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className={`relative rounded-xl border border-[#412D15]/40 bg-[#1F150C]/40 p-1.5 backdrop-blur-sm shadow-lg shadow-[#412D15]/5 group-hover:shadow-xl group-hover:shadow-[#412D15]/10 transition-all duration-300 ${
                idx === 0 ? "" : ""
              }`}>
                <div className="relative rounded-lg overflow-hidden border border-[#412D15]/30">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={idx === 0 ? 350 : 250}
                    className={`w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ${
                      idx === 0 ? "h-auto" : "h-[140px] sm:h-[180px]"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
