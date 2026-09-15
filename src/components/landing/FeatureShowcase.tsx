"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";

interface FeatureShowcaseProps {
  tag: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  features?: string[];
  reverse?: boolean;
  children?: ReactNode;
}

export function FeatureShowcase({
  tag,
  title,
  description,
  href,
  ctaText,
  imageSrc,
  imageAlt,
  features,
  reverse = false,
  children,
}: FeatureShowcaseProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
          reverse ? "lg:grid-flow-dense" : ""
        }`}
      >
        {/* Text Content */}
        <div className={`space-y-6 ${reverse ? "lg:col-start-2" : ""}`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#412D15]/20 px-4 py-1.5 text-xs font-semibold text-[#E1DCC9]/90 ring-1 ring-[#412D15]/50 uppercase tracking-wider">
            {tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E1DCC9] tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#E1DCC9]/60 leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Feature bullets */}
          {features && features.length > 0 && (
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-[#412D15]/30 flex items-center justify-center">
                    <Check className="h-3 w-3 text-[#E1DCC9]" />
                  </div>
                  <span className="text-sm text-[#E1DCC9]/70">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {children}

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#E1DCC9] hover:text-[#E1DCC9]/80 transition-colors group mt-2"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Screenshot */}
        <div className={`${reverse ? "lg:col-start-1" : ""}`}>
          <div className="relative group">
            {/* Hover glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-[#412D15]/20 via-transparent to-[#412D15]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative rounded-2xl border border-[#412D15]/50 bg-[#1F150C]/40 p-2 sm:p-2.5 backdrop-blur-sm shadow-xl shadow-[#412D15]/10 group-hover:shadow-2xl group-hover:shadow-[#412D15]/20 transition-all duration-300">
              <div className="relative rounded-xl overflow-hidden border border-[#412D15]/40">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
