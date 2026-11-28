"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, Check } from "lucide-react";
import { cn, formatLocaleDate } from "@/lib/utils";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { SpecialDateItem, SpecialDatePrompt } from "@/types/timeecho";
import { getUpcomingSpecialDates } from "../data/specialDatesData";
import { SpecialDateCard } from "./SpecialDateCard";
import {
  SpecialDateIllustration,
  getIllustrationBackdropClass,
} from "./SpecialDateIllustration";
import { SpecialDatePrompts } from "./SpecialDatePrompts";
import { SpecialDatePromptComposer } from "./SpecialDatePromptComposer";
import {
  getInitialDraftForPrompts,
  PromptAnswerDraftMap,
} from "../utils/promptAnswers";

const FEATURED_SLUGS = [
  "new-years-day",
  "valentines-day",
  "mothers-day",
  "graduation-season",
  "christmas",
];

export interface SpecialDatesSectionProps {
  defaultSelectedSlug?: string;
  onUsePrompts?: (
    specialDate: SpecialDateItem,
    selectedPrompts: SpecialDatePrompt[],
  ) => void;
}

export function SpecialDatesSection({
  defaultSelectedSlug = "new-years-day",
  onUsePrompts,
}: SpecialDatesSectionProps) {
  const { locale, t } = useTimeEcho();

  const featuredDates = useMemo(() => {
    const all = getUpcomingSpecialDates(locale, { limit: 12 });
    const bySlug = new Map(all.map((item) => [item.slug, item]));
    return FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
      (item): item is SpecialDateItem => Boolean(item),
    );
  }, [locale]);

  const [selectedSlug, setSelectedSlug] = useState<string>(defaultSelectedSlug);
  const [selectedPromptSlugsByDate, setSelectedPromptSlugsByDate] = useState<
    Record<string, string[]>
  >(() => {
    const initial: Record<string, string[]> = {};
    featuredDates.forEach((d) => {
      initial[d.slug] = d.prompts.slice(0, 2).map((p) => p.slug);
    });
    return initial;
  });
  const [previewAppliedCount, setPreviewAppliedCount] = useState<number | null>(
    null,
  );
  const [inlinePreviewPrompts, setInlinePreviewPrompts] = useState<
    SpecialDatePrompt[]
  >([]);
  const [inlineDrafts, setInlineDrafts] = useState<PromptAnswerDraftMap>({});

  const selectedDate =
    featuredDates.find((d) => d.slug === selectedSlug) || featuredDates[0];

  const visiblePrompts = useMemo(
    () => (selectedDate ? selectedDate.prompts.slice(0, 4) : []),
    [selectedDate],
  );

  const activeSelectedSlugs = useMemo(() => {
    if (!selectedDate) return new Set<string>();
    const stored = selectedPromptSlugsByDate[selectedDate.slug];
    if (stored) return new Set(stored);
    return new Set(visiblePrompts.slice(0, 2).map((p) => p.slug));
  }, [selectedDate, selectedPromptSlugsByDate, visiblePrompts]);

  const handleSelectCard = (item: SpecialDateItem) => {
    setSelectedSlug(item.slug);
    setPreviewAppliedCount(null);
    setInlinePreviewPrompts([]);
  };

  const handleTogglePrompt = (slug: string) => {
    if (!selectedDate) return;
    setPreviewAppliedCount(null);
    setSelectedPromptSlugsByDate((prev) => {
      const current = new Set(
        prev[selectedDate.slug] ??
          visiblePrompts.slice(0, 2).map((p) => p.slug),
      );
      if (current.has(slug)) {
        current.delete(slug);
      } else {
        current.add(slug);
      }
      return { ...prev, [selectedDate.slug]: Array.from(current) };
    });
  };

  const handleSelectAll = () => {
    if (!selectedDate) return;
    setPreviewAppliedCount(null);
    setSelectedPromptSlugsByDate((prev) => ({
      ...prev,
      [selectedDate.slug]: visiblePrompts.map((p) => p.slug),
    }));
  };

  const handleClearAll = () => {
    if (!selectedDate) return;
    setPreviewAppliedCount(null);
    setSelectedPromptSlugsByDate((prev) => ({
      ...prev,
      [selectedDate.slug]: [],
    }));
  };

  const handlePreviewUsePrompts = () => {
    if (!selectedDate || activeSelectedSlugs.size === 0) return;
    const chosen = visiblePrompts.filter((p) =>
      activeSelectedSlugs.has(p.slug),
    );
    setPreviewAppliedCount(chosen.length);

    if (onUsePrompts) {
      onUsePrompts(selectedDate, chosen);
    } else {
      setInlinePreviewPrompts(chosen);
      setInlineDrafts((prev) => getInitialDraftForPrompts(chosen, prev));
    }
  };

  if (!selectedDate) return null;

  const formattedSelectedDate = formatLocaleDate(
    `${selectedDate.occurrenceDate}T12:00:00`,
    locale,
  );

  return (
    <section
      id="special-dates"
      className="space-y-8 max-w-6xl mx-auto scroll-mt-24"
    >
      {/* 1. Section Header */}
      <div className="text-center space-y-2.5 max-w-xl mx-auto">
        <span className="postmark-stamp text-[10px] py-0.5 px-2.5 inline-block">
          {t("specialDates.sectionBadge")}
        </span>
        <h2 className="font-serif-editorial text-3xl sm:text-4xl text-foreground font-semibold">
          {t("specialDates.sectionTitle")}
        </h2>
        <p className="text-xs sm:text-sm font-letter text-foreground-muted leading-relaxed">
          {t("specialDates.sectionSubtitle")}
        </p>
      </div>

      {/* 2. Upcoming Dates Horizontal Row */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {featuredDates.map((item) => (
          <SpecialDateCard
            key={item.slug}
            specialDate={item}
            isSelected={item.slug === selectedDate.slug}
            onSelect={handleSelectCard}
          />
        ))}
      </div>

      {/* 3. Selected Date Highlighted Details Panel */}
      <div className="paper-sheet rounded-md border border-crease border-l-4 border-l-wax shadow-sm overflow-hidden animate-fade-in">
        <div className="archival-folder border-b border-manila-border px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div
              className={cn(
                "w-14 h-14 sm:w-16 sm:h-16 rounded-sm border flex items-center justify-center shrink-0",
                getIllustrationBackdropClass(selectedDate.illustrationKey),
              )}
            >
              <SpecialDateIllustration
                illustrationKey={selectedDate.illustrationKey}
                className="w-12 h-12"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="postmark-stamp text-[10px] py-0.5 px-2">
                  {formattedSelectedDate}
                </span>
                <span className="text-[10px] font-letter uppercase tracking-wider text-foreground-muted">
                  {t(`specialDates.categories.${selectedDate.category}`)}
                </span>
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                {selectedDate.title}
              </h3>
              <p className="text-xs sm:text-sm font-letter text-foreground-muted leading-relaxed max-w-2xl">
                {selectedDate.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h4 className="font-serif-editorial text-lg font-semibold text-foreground">
              {t("specialDates.modalTitle")}
            </h4>
            <p className="text-xs font-letter text-foreground-muted">
              {t("specialDates.modalSubtitle")}
            </p>
          </div>

          <SpecialDatePrompts
            prompts={visiblePrompts}
            selectedSlugs={activeSelectedSlugs}
            onTogglePrompt={handleTogglePrompt}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
          />

          {/* 4. Call to Action */}
          <div className="pt-4 border-t border-crease flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-letter text-foreground-muted min-h-[20px]">
              {previewAppliedCount !== null && (
                <span className="inline-flex items-center gap-1.5 text-ink font-semibold animate-fade-in">
                  <Check size={14} className="text-wax" />
                  <span>
                    {t("specialDates.previewApplied", {
                      count: previewAppliedCount,
                    })}
                  </span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handlePreviewUsePrompts}
              disabled={activeSelectedSlugs.size === 0}
              className={cn(
                "px-6 py-3 min-h-[44px] rounded-xs bg-wax hover:bg-wax-hover text-on-wax text-xs font-letter font-semibold uppercase tracking-widest inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer",
                activeSelectedSlugs.size === 0 &&
                  "opacity-45 cursor-not-allowed",
              )}
            >
              <Sparkles size={14} />
              <span>
                {activeSelectedSlugs.size > 0
                  ? t("specialDates.usePromptsCount", {
                      count: activeSelectedSlugs.size,
                    })
                  : t("specialDates.usePrompts")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {!onUsePrompts && inlinePreviewPrompts.length > 0 && (
        <SpecialDatePromptComposer
          specialDate={selectedDate}
          prompts={inlinePreviewPrompts}
          drafts={inlineDrafts}
          onChangeAnswer={(slug, val) =>
            setInlineDrafts((prev) => ({ ...prev, [slug]: val }))
          }
          onRemovePrompt={(slug) =>
            setInlinePreviewPrompts((prev) =>
              prev.filter((p) => p.slug !== slug),
            )
          }
          onClearAll={() => {
            setInlinePreviewPrompts([]);
            setPreviewAppliedCount(null);
          }}
        />
      )}
    </section>
  );
}
