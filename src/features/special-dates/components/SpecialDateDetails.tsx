"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { cn, formatLocaleDate } from "@/lib/utils";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { SpecialDateItem, SpecialDatePrompt } from "@/types/timeecho";
import { SpecialDateIllustration } from "./SpecialDateIllustration";
import { SpecialDatePrompts } from "./SpecialDatePrompts";

export interface SpecialDateDetailsProps {
  specialDate: SpecialDateItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUsePrompts: (
    specialDate: SpecialDateItem,
    selectedPrompts: SpecialDatePrompt[],
  ) => void;
  initialSelectedSlugs?: string[];
}

export function SpecialDateDetails({
  specialDate,
  isOpen,
  onClose,
  onUsePrompts,
  initialSelectedSlugs,
}: SpecialDateDetailsProps) {
  const { locale, t } = useTimeEcho();
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(
    () => new Set(initialSelectedSlugs || []),
  );

  useEffect(() => {
    if (!specialDate || !isOpen) return;
    if (initialSelectedSlugs && initialSelectedSlugs.length > 0) {
      setSelectedSlugs(new Set(initialSelectedSlugs));
    } else {
      // Pre-select the first 2 prompts so the user immediately sees how multi-select works
      setSelectedSlugs(
        new Set(specialDate.prompts.slice(0, 2).map((p) => p.slug)),
      );
    }
  }, [specialDate, isOpen, initialSelectedSlugs]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (typeof document === "undefined") return null;

  const togglePrompt = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (!specialDate) return;
    setSelectedSlugs(new Set(specialDate.prompts.map((p) => p.slug)));
  };

  const handleClearAll = () => {
    setSelectedSlugs(new Set());
  };

  const handleApply = () => {
    if (!specialDate || selectedSlugs.size === 0) return;
    const chosen = specialDate.prompts.filter((p) => selectedSlugs.has(p.slug));
    onUsePrompts(specialDate, chosen);
    onClose();
  };

  const formattedDate = specialDate
    ? formatLocaleDate(`${specialDate.occurrenceDate}T12:00:00`, locale)
    : "";

  return createPortal(
    <AnimatePresence>
      {isOpen && specialDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="special-date-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/45 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl paper-sheet rounded-xs border border-crease shadow-xl overflow-hidden font-ui text-foreground"
          >
            <div className="archival-folder border-b border-manila-border px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xs paper-sheet border border-crease flex items-center justify-center shrink-0">
                  <SpecialDateIllustration
                    illustrationKey={specialDate.illustrationKey}
                    className="w-9 h-9 text-wax"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="postmark-stamp text-[10px] py-0.5 px-2">
                      {formattedDate}
                    </span>
                    <span className="text-[10px] font-letter uppercase tracking-wider text-foreground-muted">
                      {t(`specialDates.categories.${specialDate.category}`)}
                    </span>
                  </div>
                  <h2
                    id="special-date-modal-title"
                    className="font-serif-editorial text-2xl font-semibold text-foreground leading-tight"
                  >
                    {specialDate.title}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t("specialDates.closeModal")}
                className="p-2 rounded-xs text-foreground-muted hover:text-wax hover:bg-parchment/80 transition-colors cursor-pointer shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <p className="font-letter text-xs sm:text-sm text-foreground-muted leading-relaxed border-l-2 border-l-wax pl-3.5">
                {specialDate.description}
              </p>

              <div className="space-y-1">
                <h3 className="font-serif-editorial text-lg font-semibold text-foreground">
                  {t("specialDates.modalTitle")}
                </h3>
                <p className="text-[11px] font-letter text-foreground-muted">
                  {t("specialDates.modalSubtitle")}
                </p>
              </div>

              <SpecialDatePrompts
                prompts={specialDate.prompts}
                selectedSlugs={selectedSlugs}
                onTogglePrompt={togglePrompt}
                onSelectAll={handleSelectAll}
                onClearAll={handleClearAll}
              />
            </div>

            <div className="border-t border-crease bg-manila/40 px-5 sm:px-6 py-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 min-h-[44px] rounded-xs border border-crease text-xs font-letter uppercase tracking-wider text-foreground-muted hover:text-foreground hover:bg-parchment transition-colors cursor-pointer"
              >
                {t("specialDates.closeModal")}
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={selectedSlugs.size === 0}
                className={cn(
                  "px-5 py-2.5 min-h-[44px] rounded-xs bg-wax hover:bg-wax-hover text-on-wax text-xs font-letter font-semibold uppercase tracking-widest inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer",
                  selectedSlugs.size === 0 && "opacity-45 cursor-not-allowed",
                )}
              >
                <Sparkles size={14} />
                <span>
                  {selectedSlugs.size > 0
                    ? t("specialDates.usePromptsCount", {
                        count: selectedSlugs.size,
                      })
                    : t("specialDates.usePrompts")}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
