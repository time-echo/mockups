"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { Slider } from "@/components/ui/Slider";
import { SpecialDatePrompt } from "@/types/timeecho";
import { PromptAnswerDraftValue } from "../utils/promptAnswers";

export interface SpecialDatePromptFieldProps {
  prompt: SpecialDatePrompt;
  index: number;
  value: PromptAnswerDraftValue;
  onChange: (value: PromptAnswerDraftValue) => void;
  onRemove: () => void;
}

export function SpecialDatePromptField({
  prompt,
  index,
  value,
  onChange,
  onRemove,
}: SpecialDatePromptFieldProps) {
  const { t } = useTimeEcho();
  const fieldId = `sd-prompt-${prompt.slug}`;
  const indexLabel = String(index + 1).padStart(2, "0");

  const renderControl = () => {
    switch (prompt.questionType) {
      case "text":
        return (
          <input
            id={fieldId}
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            maxLength={prompt.config.maxLength || 200}
            placeholder={prompt.config.placeholder || ""}
            className="w-full paper-sheet rounded-xs px-3 py-2.5 min-h-[44px] text-base sm:text-xs border border-crease font-letter text-foreground placeholder:text-foreground-muted/70 focus:border-wax focus:outline-none"
          />
        );

      case "radio": {
        const selected = typeof value === "string" ? value : "";
        return (
          <div
            role="radiogroup"
            aria-labelledby={`${fieldId}-label`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {prompt.options.map((opt) => {
              const isChecked = selected === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-xs border text-xs font-letter cursor-pointer transition-all select-none",
                    isChecked
                      ? "border-wax bg-wax/8 text-foreground font-semibold"
                      : "border-crease bg-parchment text-foreground-muted hover:border-wax/50 hover:text-foreground",
                  )}
                >
                  <input
                    type="radio"
                    name={fieldId}
                    value={opt.value}
                    checked={isChecked}
                    onChange={() => onChange(opt.value)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                      isChecked ? "border-wax" : "border-crease",
                    )}
                  >
                    {isChecked && (
                      <span className="w-2 h-2 rounded-full bg-wax" />
                    )}
                  </span>
                  <span className="leading-snug">{opt.label}</span>
                </label>
              );
            })}
          </div>
        );
      }

      case "checkbox": {
        const selectedValues = Array.isArray(value) ? value : [];
        const maxSelections = prompt.config.maxSelections;
        const reachedLimit = Boolean(
          maxSelections && selectedValues.length >= maxSelections,
        );

        const toggleOption = (optVal: string) => {
          if (selectedValues.includes(optVal)) {
            onChange(selectedValues.filter((v) => v !== optVal));
          } else if (!reachedLimit) {
            onChange([...selectedValues, optVal]);
          }
        };

        return (
          <div className="space-y-2">
            {maxSelections && (
              <p className="text-[10px] font-letter uppercase tracking-wider text-foreground-muted">
                {t("specialDates.maxSelectionsHint", { max: maxSelections })}
              </p>
            )}
            <div
              role="group"
              aria-labelledby={`${fieldId}-label`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {prompt.options.map((opt) => {
                const isChecked = selectedValues.includes(opt.value);
                const isDisabled = !isChecked && reachedLimit;
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-xs border text-xs font-letter transition-all select-none",
                      isChecked
                        ? "border-wax bg-wax/8 text-foreground font-semibold cursor-pointer"
                        : isDisabled
                          ? "border-crease/50 bg-parchment/40 text-foreground-muted/50 cursor-not-allowed"
                          : "border-crease bg-parchment text-foreground-muted hover:border-wax/50 hover:text-foreground cursor-pointer",
                    )}
                  >
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => toggleOption(opt.value)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-4 h-4 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors",
                        isChecked
                          ? "bg-wax border-wax text-on-wax"
                          : "border-crease bg-transparent",
                      )}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span className="leading-snug">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      }

      case "scale": {
        const min = prompt.config.min ?? 1;
        const max = prompt.config.max ?? 5;
        const numericVal =
          typeof value === "number" ? value : Math.ceil((min + max) / 2);

        return (
          <div className="paper-sheet rounded-xs px-3 py-2.5 border border-crease space-y-1">
            <Slider
              min={min}
              max={max}
              value={numericVal}
              onChange={(val) => onChange(val)}
              label={t("specialDates.types.scale")}
              accentColor="wax"
            />
            {(prompt.config.minLabel || prompt.config.maxLabel) && (
              <div className="flex justify-between items-center text-[10px] font-letter text-foreground-muted pt-0.5">
                <span>{prompt.config.minLabel || min}</span>
                <span>{prompt.config.maxLabel || max}</span>
              </div>
            )}
          </div>
        );
      }

      case "textarea":
      default:
        return (
          <textarea
            id={fieldId}
            rows={3}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            maxLength={prompt.config.maxLength || 600}
            placeholder={prompt.config.placeholder || ""}
            className="w-full paper-sheet rounded-xs p-3 text-base sm:text-xs leading-relaxed border border-crease font-letter text-foreground placeholder:text-foreground-muted/70 focus:border-wax focus:outline-none"
          />
        );
    }
  };

  return (
    <div className="paper-sheet rounded-xs p-3.5 sm:p-4 border border-crease space-y-2.5 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-letter font-semibold text-foreground-muted">
              {indexLabel}.
            </span>
            <span className="text-[10px] font-letter uppercase tracking-wider text-ink bg-manila border border-manila-border rounded-xs px-1.5 py-0.5">
              {t(`specialDates.types.${prompt.questionType}`)}
            </span>
          </div>
          <label
            id={`${fieldId}-label`}
            htmlFor={
              prompt.questionType === "text" ||
              prompt.questionType === "textarea"
                ? fieldId
                : undefined
            }
            className="block font-letter text-xs font-semibold text-foreground leading-relaxed"
          >
            {prompt.question}
          </label>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label={t("specialDates.removePrompt")}
          title={t("specialDates.removePrompt")}
          className="p-1.5 rounded-xs text-foreground-muted hover:text-wax hover:bg-manila/60 transition-colors cursor-pointer shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {renderControl()}
    </div>
  );
}
