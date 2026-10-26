import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { CapsuleCard } from "@/features/capsules/components/CapsuleCard";
import { LetterComposerForm } from "@/features/capsules/components/LetterComposerForm";
import { INITIAL_SEEDS } from "@/lib/initialSeeds";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";

const CapsuleCardVariantsComponent = () => {
  const { t } = useTimeEcho();

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="border-b border-crease pb-3">
        <h2 className="font-serif text-2xl font-bold">{t("dashboard.title")}</h2>
        <p className="font-mono text-xs text-foreground-muted">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_SEEDS.map((capsule) => (
          <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Tier 4 - Capsules/Cards & Composer",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

export const CapsuleCards: Story = {
  render: () => <CapsuleCardVariantsComponent />,
};

export const ComposerForm: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <LetterComposerForm />
    </div>
  ),
};
