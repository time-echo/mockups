"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SpecialDateIllustrationProps {
  illustrationKey: string;
  className?: string;
}

export function getIllustrationBackdropClass(illustrationKey: string): string {
  switch (illustrationKey) {
    case "new-years-day":
      return "bg-amber-100/70 dark:bg-amber-900/25 border-amber-300/60 dark:border-amber-700/40";
    case "valentines-day":
      return "bg-rose-100/70 dark:bg-rose-900/25 border-rose-300/60 dark:border-rose-700/40";
    case "mothers-day":
      return "bg-emerald-100/60 dark:bg-emerald-900/25 border-emerald-300/50 dark:border-emerald-700/40";
    case "graduation-season":
      return "bg-sky-100/65 dark:bg-sky-900/25 border-sky-300/60 dark:border-sky-700/40";
    case "christmas":
      return "bg-teal-100/60 dark:bg-teal-900/25 border-teal-300/60 dark:border-teal-700/40";
    case "new-years-eve":
      return "bg-indigo-100/60 dark:bg-indigo-900/25 border-indigo-300/60 dark:border-indigo-700/40";
    default:
      return "bg-manila/80 border-manila-border";
  }
}

export function SpecialDateIllustration({
  illustrationKey,
  className,
}: SpecialDateIllustrationProps) {
  const baseClass = cn("w-12 h-12 shrink-0", className);

  switch (illustrationKey) {
    case "new-years-day":
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className={baseClass}
        >
          <circle cx="28" cy="30" r="13" fill="#F6C86E" fillOpacity="0.45" />
          <path
            d="M10 38H46"
            stroke="#9A6B2F"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M16 38A12 12 0 0 1 40 38"
            fill="#F5B951"
            fillOpacity="0.65"
            stroke="#B46E1E"
            strokeWidth="1.5"
          />
          <path
            d="M28 11V17M15 17L19 21M41 17L37 21M10 29H14M42 29H46"
            stroke="#D98A2B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M39 10L40 12.5L42.5 13.5L40 14.5L39 17L38 14.5L35.5 13.5L38 12.5L39 10Z"
            fill="#8E2818"
            fillOpacity="0.75"
          />
          <path
            d="M18 43H38"
            stroke="#B46E1E"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );

    case "valentines-day":
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className={baseClass}
        >
          <rect
            x="9"
            y="16"
            width="38"
            height="25"
            rx="3"
            fill="#FCE3E1"
            stroke="#B9545B"
            strokeWidth="1.5"
          />
          <path
            d="M10.5 17.5L28 30.5L45.5 17.5"
            stroke="#B9545B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 36.5C28 36.5 21 31.8 21 27.3C21 25 22.8 23.4 24.8 23.4C26.1 23.4 27.2 24.1 28 25.2C28.8 24.1 29.9 23.4 31.2 23.4C33.2 23.4 35 25 35 27.3C35 31.8 28 36.5 28 36.5Z"
            fill="#C84648"
            stroke="#8E2818"
            strokeWidth="1.3"
          />
          <circle cx="44" cy="12" r="2" fill="#E89296" />
          <circle cx="13" cy="12" r="1.5" fill="#E89296" />
        </svg>
      );

    case "mothers-day":
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className={baseClass}
        >
          <path
            d="M28 46V27"
            stroke="#4E7A5B"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M28 38C21.5 38 17 34 17 29C22 29 26.5 32.5 28 38Z"
            fill="#8DB996"
            fillOpacity="0.65"
            stroke="#4E7A5B"
            strokeWidth="1.4"
          />
          <path
            d="M28 34C34.5 34 39 30 39 25C34 25 29.5 28.5 28 34Z"
            fill="#8DB996"
            fillOpacity="0.65"
            stroke="#4E7A5B"
            strokeWidth="1.4"
          />
          <circle
            cx="28"
            cy="15"
            r="5.5"
            fill="#F2A7B3"
            fillOpacity="0.8"
            stroke="#B65B6E"
            strokeWidth="1.3"
          />
          <circle
            cx="21"
            cy="20"
            r="5"
            fill="#F6C1C8"
            fillOpacity="0.85"
            stroke="#B65B6E"
            strokeWidth="1.3"
          />
          <circle
            cx="35"
            cy="20"
            r="5"
            fill="#F6C1C8"
            fillOpacity="0.85"
            stroke="#B65B6E"
            strokeWidth="1.3"
          />
          <circle cx="28" cy="20" r="3.5" fill="#F2C864" stroke="#B47C24" strokeWidth="1.2" />
        </svg>
      );

    case "graduation-season":
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className={baseClass}
        >
          <polygon
            points="28,13 46,22 28,31 10,22"
            fill="#4F7396"
            fillOpacity="0.35"
            stroke="#2C485E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M17 26V36C17 39.2 21.8 41.5 28 41.5C34.2 41.5 39 39.2 39 36V26"
            fill="#7AA0C4"
            fillOpacity="0.22"
            stroke="#2C485E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M44 23V36"
            stroke="#C98D32"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="44" cy="38" r="2.5" fill="#E6AE4C" stroke="#A66E1B" strokeWidth="1.2" />
          <path
            d="M28 22L44 23"
            stroke="#C98D32"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case "christmas":
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className={baseClass}
        >
          <path
            d="M28 10L19 23H24L15 34H22L14 43H42L34 34H41L32 23H37L28 10Z"
            fill="#6FA384"
            fillOpacity="0.45"
            stroke="#2E6347"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M28 43V48M23 48H33"
            stroke="#7C5333"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M28 5L29.2 7.8L32 9L29.2 10.2L28 13L26.8 10.2L24 9L26.8 7.8L28 5Z"
            fill="#E6B245"
            stroke="#B47C1A"
            strokeWidth="1"
          />
          <circle cx="24" cy="27" r="1.8" fill="#C84648" />
          <circle cx="32" cy="31" r="1.8" fill="#E6B245" />
          <circle cx="25" cy="38" r="1.8" fill="#E6B245" />
          <circle cx="33" cy="39" r="1.8" fill="#C84648" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className={baseClass}
        >
          <rect
            x="11"
            y="14"
            width="34"
            height="30"
            rx="3"
            fill="#E8DFCE"
            stroke="#2C485E"
            strokeWidth="1.5"
          />
          <path d="M11 23H45" stroke="#2C485E" strokeWidth="1.5" />
          <path
            d="M20 10V17M36 10V17"
            stroke="#8E2818"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="28" cy="33" r="4" fill="#8E2818" fillOpacity="0.3" />
        </svg>
      );
  }
}
