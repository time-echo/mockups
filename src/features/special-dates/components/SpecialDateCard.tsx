"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn, formatLocaleDate } from "@/lib/utils";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";
import { SpecialDateItem } from "@/types/timeecho";
import {
  SpecialDateIllustration,
  getIllustrationBackdropClass,
} from "./SpecialDateIllustration";

export interface SpecialDateCardProps {
  specialDate: SpecialDateItem;
  onSelect: (specialDate: SpecialDateItem) => void;
  isSelected?: boolean;
  className?: string;
}

export function SpecialDateCard({
  specialDate,
  onSelect,
  isSelected = false,
  className,
}: SpecialDateCardProps) {
  const { locale, t } = useTimeEcho();

  const formattedDate = formatLocaleDate(
    `${specialDate.occurrenceDate}T12:00:00`,
    locale,
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(specialDate)}
      aria-pressed={isSelected}
      className={cn(
        "paper-sheet rounded-md p-4 sm:p-5 border text-left flex flex-col justify-between gap-4 transition-all cursor-pointer group focus:outline-none min-w-[235px] sm:min-w-[250px] lg:min-w-0 snap-start",
        isSelected
          ? "border-wax ring-1 ring-wax/25 shadow-sm -translate-y-0.5"
          : "border-crease hover:border-wax/60 hover:-translate-y-0.5 hover:shadow-sm",
        className,
      )}
    >
      <div className="space-y-3.5 w-full">
        <div
          className={cn(
            "w-full h-24 rounded-sm border flex items-center justify-center relative overflow-hidden transition-colors",
            getIllustrationBackdropClass(specialDate.illustrationKey),
          )}
        >
          <SpecialDateIllustration
            illustrationKey={specialDate.illustrationKey}
            className="w-14 h-14 transition-transform duration-200 group-hover:scale-105"
          />
          {isSelected && (
            <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-wax text-on-wax flex items-center justify-center shadow-2xs">
              <Check size={11} strokeWidth={3} />
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <span className="postmark-stamp text-[10px] py-0.5 px-2 leading-tight">
            {formattedDate}
          </span>

          <h3
            className={cn(
              "font-serif-editorial text-lg font-semibold leading-snug pt-0.5 transition-colors",
              isSelected
                ? "text-wax"
                : "text-foreground group-hover:text-wax",
            )}
          >
            {specialDate.title}
          </h3>

          <p className="text-xs font-letter text-foreground-muted leading-relaxed line-clamp-3">
            {specialDate.description}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-dashed border-crease flex items-center justify-between gap-2 w-full text-[11px] font-letter">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold transition-colors",
            isSelected
              ? "text-wax"
              : "text-ink group-hover:text-wax",
          )}
        >
          <span>
            {isSelected
              ? t("specialDates.viewingCta")
              : t("specialDates.exploreCta")}
          </span>
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </button>
  );
}
