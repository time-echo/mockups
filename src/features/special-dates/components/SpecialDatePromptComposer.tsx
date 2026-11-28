"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { SpecialDateItem, SpecialDatePrompt } from "@/types/timeecho";
import { SpecialDateIllustration } from "./SpecialDateIllustration";
import { SpecialDatePromptField } from "./SpecialDatePromptField";
import {
  PromptAnswerDraftMap,
  PromptAnswerDraftValue,
} from "../utils/promptAnswers";

export interface SpecialDatePromptComposerProps {
  specialDate: SpecialDateItem;
  prompts: SpecialDatePrompt[];
  drafts: PromptAnswerDraftMap;
  onChangeAnswer: (slug: string, value: PromptAnswerDraftValue) => void;
  onRemovePrompt: (slug: string) => void;
  onClearAll: () => void;
}

export function SpecialDatePromptComposer({
  specialDate,
  prompts,
  drafts,
  onChangeAnswer,
  onRemovePrompt,
  onClearAll,
}: SpecialDatePromptComposerProps) {
  const { t } = useTimeEcho();

  if (prompts.length === 0) return null;

  return (
    <div
      id="special-date-composer-annex"
      className="archival-folder rounded-xs border border-manila-border border-l-4 border-l-wax p-4 sm:p-5 space-y-4 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3 border-b border-manila-border pb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xs paper-sheet border border-crease flex items-center justify-center shrink-0">
            <SpecialDateIllustration
              illustrationKey={specialDate.illustrationKey}
              className="w-7 h-7 text-wax"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-[10px] font-letter uppercase tracking-widest font-semibold text-wax block">
              {t("specialDates.annexBadge")}
            </span>
            <h3 className="font-serif-editorial text-lg font-semibold text-foreground leading-snug">
              {t("specialDates.annexTitle", { title: specialDate.title })}
            </h3>
            <p className="text-[11px] font-letter text-foreground-muted leading-relaxed">
              {t("specialDates.annexSubtitle")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 text-[10px] font-letter uppercase tracking-wider font-semibold text-foreground-muted hover:text-wax transition-colors cursor-pointer shrink-0 py-1"
        >
          <Trash2 size={12} />
          <span>{t("specialDates.clearAllPrompts")}</span>
        </button>
      </div>

      <div className="space-y-3">
        {prompts.map((prompt, index) => (
          <SpecialDatePromptField
            key={prompt.slug}
            prompt={prompt}
            index={index}
            value={drafts[prompt.slug]}
            onChange={(val) => onChangeAnswer(prompt.slug, val)}
            onRemove={() => onRemovePrompt(prompt.slug)}
          />
        ))}
      </div>
    </div>
  );
}
