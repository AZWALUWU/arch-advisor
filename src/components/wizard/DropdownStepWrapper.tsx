"use client";

import { ReactNode } from "react";

interface OptionItem {
  value: string;
  label: string;
  description?: string;
}

interface DropdownFieldProps {
  title: string;
  description?: string;
  options: OptionItem[];
  selectedValue: string;
  onSelect: (val: string) => void;
}

export function DropdownField({
  title,
  description,
  options,
  selectedValue,
  onSelect,
}: DropdownFieldProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-semibold text-[#E1DCC9]">{title}</label>
        {description && <p className="text-xs text-[#E1DCC9]/70 mt-0.5">{description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                isSelected
                  ? "border-[#E1DCC9] bg-[#412D15] text-[#E1DCC9] ring-1 ring-[#E1DCC9]"
                  : "border-[#412D15] bg-[#1F150C]/80 text-[#E1DCC9]/80 hover:border-[#E1DCC9]/50 hover:bg-[#1F150C]"
              }`}
            >
              <span className="text-sm font-medium">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-[#E1DCC9]/70 mt-1">{opt.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
