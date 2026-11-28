"use client";

import React from "react";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import {
  LetterPromptAnswer,
  LetterSpecialDateSummary,
} from "@/types/timeecho";
import { SpecialDateIllustration } from "./SpecialDateIllustration";

export interface SpecialDateAnswersDisplayProps {
  specialDate?: LetterSpecialDateSummary | null;
  promptAnswers: LetterPromptAnswer[];
}

export function SpecialDateAnswersDisplay({
  specialDate,
  promptAnswers,
}: SpecialDateAnswersDisplayProps) {
  const { t } = useTimeEcho();

  if (!promptAnswers || promptAnswers.length === 0) return null;

  return (
    <div className="archival-folder rounded-xs p-6 sm:p-8 space-y-5 border border-manila-border">
      <div className="flex items-start justify-between gap-4 border-b border-manila-border pb-3">
        <div className="space-y-1">
          {specialDate && (
            <span className="postmark-stamp text-[10px] py-0.5 px-2 inline-block mb-1">
              {specialDate.title}
            </span>
          )}
          <h2 className="font-serif-editorial text-xl font-semibold text-foreground">
            {t("specialDates.revealHeading")}
          </h2>
          <p className="text-xs font-letter text-foreground-muted">
            {specialDate
              ? t("specialDates.revealSubtitle", { title: specialDate.title })
              : t("specialDates.revealSubtitleGeneric")}
          </p>
        </div>

        {specialDate && (
          <div className="w-11 h-11 rounded-xs paper-sheet border border-crease flex items-center justify-center shrink-0">
            <SpecialDateIllustration
              illustrationKey={specialDate.illustrationKey}
              className="w-8 h-8 text-wax"
            />
          </div>
        )}
      </div>

      <div className="space-y-3.5">
        {promptAnswers.map((item, idx) => (
          <div
            key={item.id || `${item.promptSlug}-${idx}`}
            className="paper-sheet rounded-xs border border-crease overflow-hidden"
          >
            <div className="bg-manila/40 px-4 py-2 border-b border-crease flex items-center justify-between gap-2 font-letter">
              <span className="text-xs font-semibold text-foreground leading-snug">
                {item.question}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-ink shrink-0">
                {t(`specialDates.types.${item.questionType}`)}
              </span>
            </div>

            <div className="px-4 py-3 font-letter text-xs sm:text-sm text-foreground">
              {"text" in item.answer && (
                <p className="leading-relaxed whitespace-pre-wrap">
                  {item.answer.text}
                </p>
              )}

              {"label" in item.answer && (
                <span className="postmark-stamp text-xs py-1 px-3 inline-block">
                  {item.answer.label}
                </span>
              )}

              {"labels" in item.answer && (
                <div className="flex flex-wrap gap-2">
                  {item.answer.labels.map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center px-2.5 py-1 rounded-xs bg-manila border border-manila-border text-xs text-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {"min" in item.answer && "max" in item.answer && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground-muted">
                      {item.answer.minLabel || item.answer.min}
                    </span>
                    <span className="font-semibold text-wax">
                      {item.answer.value} / {item.answer.max}
                    </span>
                    <span className="text-foreground-muted">
                      {item.answer.maxLabel || item.answer.max}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-crease/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-wax rounded-full"
                      style={{
                        width: `${((item.answer.value - item.answer.min) / Math.max(1, item.answer.max - item.answer.min)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
