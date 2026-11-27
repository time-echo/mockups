import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { CapsuleCard } from "@/features/capsules/components/CapsuleCard";
import { LetterComposerForm } from "@/features/capsules/components/LetterComposerForm";
import {
  InspirationPromptLabel,
  getInspirationBySlug,
  getRandomInspiration,
  getLocalizedInspirationText,
} from "@/features/capsules";
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

const InspireMeInteractiveDemo = () => {
  const { t, locale } = useTimeEcho();
  const [draft, setDraft] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(
    "person-to-become",
  );

  const selectedPrompt = getInspirationBySlug(selectedPromptId);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 paper-sheet rounded-xs border border-crease">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor="storybook-inspire-draft"
          className="text-xs font-letter uppercase tracking-wider font-semibold text-foreground-muted"
        >
          {t("letters.content_label")}
        </label>
        <button
          type="button"
          onClick={() => {
            const nextPrompt = getRandomInspiration(selectedPromptId);
            setSelectedPromptId(nextPrompt.slug);
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-crease bg-manila/50 hover:border-wax hover:bg-manila text-foreground font-letter text-[11px] font-semibold tracking-wider transition-colors cursor-pointer"
        >
          <Sparkles size={13} className="text-wax shrink-0" />
          <span>{t("inspireMe.buttonLabel")}</span>
        </button>
      </div>

      {selectedPrompt && (
        <InspirationPromptLabel
          promptText={getLocalizedInspirationText(selectedPrompt, locale)}
          onRemove={() => setSelectedPromptId(null)}
        />
      )}

      <textarea
        id="storybook-inspire-draft"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={10}
        maxLength={2000}
        placeholder={
          selectedPrompt ? "" : t("letters.content_placeholder_form")
        }
        className="w-full p-5 rounded-xs bg-transparent border border-crease font-letter text-sm leading-loose text-foreground placeholder:text-foreground-muted/40 focus:border-wax focus:outline-none"
      />
    </div>
  );
};

export const InspireMeLabelStory: Story = {
  name: "Inspire Me Label",
  render: () => <InspireMeInteractiveDemo />,
};
