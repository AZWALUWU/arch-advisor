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
        <label className="text-sm font-semibold text-slate-200">{title}</label>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
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
                  ? "border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500"
                  : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <span className="text-sm font-medium">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-slate-400 mt-1">{opt.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
