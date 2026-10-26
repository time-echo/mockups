import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import HomePage from "@/app/page";
import NewLetterPage from "@/app/letters/new/page";
import LetterDetailPage from "@/app/letters/[id]/page";
import DashboardPage from "@/app/dashboard/page";
import AnalyticsPage from "@/app/analytics/page";
import SettingsPage from "@/app/settings/page";

const meta: Meta = {
  title: "Tier 5 - Pages/Figma Frames",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Landing_V2: Story = {
  name: "Landing-V2",
  render: () => (
    <AppShell>
      <HomePage />
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

export const Composer_Full: Story = {
  name: "Composer-Full",
  render: () => (
    <AppShell>
      <NewLetterPage />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/letters/new",
      },
    },
  },
};

const sealedLetterParams = Promise.resolve({ id: "capsule-unlocked-2024" });
const openedLetterParams = Promise.resolve({ id: "capsule-revealed-2023" });

export const Letter_Sealed: Story = {
  name: "Letter-Sealed",
  render: () => (
    <AppShell>
      <LetterDetailPage params={sealedLetterParams} />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/letters/capsule-unlocked-2024",
      },
    },
  },
};

export const Letter_Opened: Story = {
  name: "Letter-Opened",
  render: () => (
    <AppShell>
      <LetterDetailPage params={openedLetterParams} />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/letters/capsule-revealed-2023",
      },
    },
  },
};

export const Vault_Grid: Story = {
  name: "Vault-Grid",
  render: () => (
    <AppShell>
      <DashboardPage />
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

export const Analytics_Summary: Story = {
  name: "Analytics-Summary",
  render: () => (
    <AppShell>
      <AnalyticsPage />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/analytics",
      },
    },
  },
};

export const Settings_Sections: Story = {
  name: "Settings-Sections",
  render: () => (
    <AppShell>
      <SettingsPage />
    </AppShell>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/settings",
      },
    },
  },
};
