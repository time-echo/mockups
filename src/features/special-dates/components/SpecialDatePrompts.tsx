"use client";

import React from "react";
import {
  Check,
  AlignLeft,
  Type,
  CircleDot,
  CheckSquare,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { SpecialDatePrompt, SpecialDatePromptType } from "@/types/timeecho";

export interface SpecialDatePromptsProps {
  prompts: SpecialDatePrompt[];
  selectedSlugs: Set<string>;
  onTogglePrompt: (slug: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

function PromptTypeIcon({ type }: { type: SpecialDatePromptType }) {
  switch (type) {
    case "text":
      return <Type size={11} className="shrink-0" />;
    case "radio":
      return <CircleDot size={11} className="shrink-0" />;
    case "checkbox":
      return <CheckSquare size={11} className="shrink-0" />;
    case "scale":
      return <SlidersHorizontal size={11} className="shrink-0" />;
    case "textarea":
    default:
      return <AlignLeft size={11} className="shrink-0" />;
  }
}

export function SpecialDatePrompts({
  prompts,
  selectedSlugs,
  onTogglePrompt,
  onSelectAll,
  onClearAll,
}: SpecialDatePromptsProps) {
  const { t } = useTimeEcho();
  const allSelected =
    prompts.length > 0 && prompts.every((p) => selectedSlugs.has(p.slug));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 text-[11px] font-letter">
        <span className="uppercase tracking-wider font-semibold text-foreground-muted">
          {t("specialDates.selectedCount", { count: selectedSlugs.size })}
        </span>
        <div className="flex items-center gap-3">
          {!allSelected && (
            <button
              type="button"
              onClick={onSelectAll}
              className="text-ink hover:text-wax underline underline-offset-4 uppercase tracking-wider font-semibold cursor-pointer transition-colors"
            >
              {t("specialDates.selectAll")}
            </button>
          )}
          {selectedSlugs.size > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-foreground-muted hover:text-wax uppercase tracking-wider font-semibold cursor-pointer transition-colors"
            >
              {t("specialDates.clearSelection")}
            </button>
          )}
        </div>
      </div>

      <div
        role="group"
        aria-label={t("specialDates.modalTitle")}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {prompts.map((prompt) => {
          const isSelected = selectedSlugs.has(prompt.slug);
          return (
            <label
              key={prompt.slug}
              className={cn(
                "flex items-start gap-3 p-3.5 rounded-xs border transition-all cursor-pointer select-none min-h-[44px]",
                isSelected
                  ? "border-wax bg-wax/5"
                  : "border-crease bg-parchment hover:border-wax/50 hover:bg-manila/40",
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onTogglePrompt(prompt.slug)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 w-4 h-4 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors",
                  isSelected
                    ? "bg-wax border-wax text-on-wax"
                    : "border-crease bg-transparent",
                )}
              >
                {isSelected && <Check size={11} strokeWidth={3} />}
              </span>

              <div className="space-y-1.5 min-w-0 flex-1">
                <p className="font-letter text-xs sm:text-sm text-foreground leading-relaxed">
                  {prompt.question}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-letter uppercase tracking-wider text-ink bg-manila/80 border border-manila-border rounded-xs px-1.5 py-0.5">
                    <PromptTypeIcon type={prompt.questionType} />
                    <span>{t(`specialDates.types.${prompt.questionType}`)}</span>
                  </span>
                  {prompt.options.length > 0 && (
                    <span className="text-[10px] font-letter text-foreground-muted truncate">
                      {prompt.options.map((o) => o.label).join(" · ")}
                    </span>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
