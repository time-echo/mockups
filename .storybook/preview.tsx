import type { Preview, Decorator } from "@storybook/nextjs-vite";
import React, { useEffect, Suspense } from "react";
import "@/app/globals.css";
import { fraunces, courierPrime, plexSans } from "@/lib/fonts";
import { TimeEchoProvider } from "@/lib/context/TimeEchoContext";
import { FlashProvider } from "@/components/ui/FlashBanner";
import { SupportedLanguage } from "@/types/timeecho";
import { MockCapsuleRepository } from "../src/support/mockCapsuleRepository";

const repository = new MockCapsuleRepository();

const withThemeAndProviders: Decorator = (Story, context) => {
  const theme = context.globals.theme || "light";
  const locale = (context.globals.locale || "en") as SupportedLanguage;
  const isDark = theme === "dark";

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("timeecho_locale", locale);
      document.cookie = `timeecho_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      window.dispatchEvent(new Event("storage"));
    }
  }, [locale]);

  return (
    <div
      className={`${fraunces.variable} ${courierPrime.variable} ${plexSans.variable} ${isDark ? "dark" : ""} min-h-screen bg-[var(--parchment)] text-[var(--foreground)] font-[family-name:var(--font-ui)]`}
    >
      <TimeEchoProvider repository={repository} defaultLocale={locale}>
        <FlashProvider>
          <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-foreground-muted">Loading...</div>}>
            <Story />
          </Suspense>
        </FlashProvider>
      </TimeEchoProvider>
    </div>
  );
};

const preview: Preview = {
  decorators: [withThemeAndProviders],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: "Active language",
      defaultValue: "en",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
    layout: "centered",
    backgrounds: {
      default: "parchment",
      values: [
        { name: "parchment", value: "#faf9f5" },
        { name: "parchment-dark", value: "#16181d" },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (375px)",
          styles: { width: "375px", height: "667px" },
        },
        tablet: {
          name: "Tablet (768px)",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop (1440px)",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;