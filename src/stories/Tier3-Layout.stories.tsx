import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { ArchivalHeader } from "@/components/layout/ArchivalHeader";
import { AppShell } from "@/components/layout/AppShell";
import { PaperSheet } from "@/components/ui/PaperSheet";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";

const ShellDemoContent = () => {
  const { t } = useTimeEcho();

  return (
    <div className="space-y-6">
      <PaperSheet docketFolio={t("header.folio")} elevation="raised">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold">{t("dashboard.title")}</h2>
          <p className="font-mono text-sm text-foreground-muted">{t("dashboard.subtitle")}</p>
        </div>
      </PaperSheet>
    </div>
  );
};

const meta: Meta = {
  title: "Tier 3 - Layout/App Shell & Header",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const PublicHeader: Story = {
  render: () => <ArchivalHeader />,
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const PublicShell: Story = {
  render: () => (
    <AppShell>
      <ShellDemoContent />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const InternalShell: Story = {
  render: () => (
    <AppShell>
      <ShellDemoContent />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
};
