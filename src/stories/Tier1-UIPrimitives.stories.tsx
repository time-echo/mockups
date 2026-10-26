import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { PaperSheet } from "@/components/ui/PaperSheet";
import { ArchivalFolder } from "@/components/ui/ArchivalFolder";
import { PostmarkStamp } from "@/components/ui/PostmarkStamp";
import { WaxSeal } from "@/components/ui/WaxSeal";
import { DualEmotionalBar } from "@/components/ui/DualEmotionalBar";
import { CountdownBadge } from "@/components/ui/CountdownBadge";
import { LinedPaperCanvas } from "@/features/capsules/components/LinedPaperCanvas";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";

const PrimitivesGalleryComponent = () => {
  const { t } = useTimeEcho();
  const [composerText, setComposerText] = useState("");
  const targetDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PaperSheet variant="parchment" elevation="raised" docketFolio={t("header.folio")}>
          <div className="space-y-2">
            <h3 className="font-serif text-lg">{t("common.appName")}</h3>
            <p className="font-mono text-xs text-foreground-muted">{t("common.tagline")}</p>
          </div>
        </PaperSheet>

        <PaperSheet variant="lined" elevation="floating" showMarginGuide docketFolio={t("header.folio")}>
          <div className="space-y-2">
            <h3 className="font-serif text-lg">{t("composer.letterTab")}</h3>
            <p className="font-mono text-xs text-foreground-muted">{t("composer.guideTitle")}</p>
          </div>
        </PaperSheet>

        <PaperSheet variant="manila" elevation="flat" docketFolio={t("header.folio")}>
          <div className="space-y-2">
            <h3 className="font-serif text-lg">{t("common.vault")}</h3>
            <p className="font-mono text-xs text-foreground-muted">{t("common.archived")}</p>
          </div>
        </PaperSheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArchivalFolder tabLabel={t("common.vault")} tabPosition="left" classification={t("header.vaultActive")}>
          <div className="p-4 flex items-center justify-between">
            <span className="font-mono text-sm">{t("common.pending")}</span>
            <PostmarkStamp variant="circular" inkColor="ink" size="sm" docketId={t("header.folio")} subtext={t("common.pending")} />
          </div>
        </ArchivalFolder>

        <ArchivalFolder tabLabel={t("common.appName")} tabPosition="right" classification={t("header.vaultActive")}>
          <div className="p-4 flex items-center justify-between">
            <span className="font-mono text-sm">{t("common.delivered")}</span>
            <PostmarkStamp variant="boxed" inkColor="wax" size="sm" docketId={t("header.folio")} subtext={t("common.delivered")} />
          </div>
        </ArchivalFolder>
      </div>

      <PaperSheet variant="parchment" elevation="raised">
        <div className="flex flex-wrap items-center justify-around gap-6">
          <WaxSeal isBroken={false} isLocked={true} size="sm" />
          <WaxSeal isBroken={false} isLocked={false} size="md" showPrompt promptText={t("common.breakSeal")} />
          <WaxSeal isBroken={true} size="lg" />
        </div>
      </PaperSheet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PostmarkStamp variant="circular" inkColor="ink" size="md" docketId={t("header.folio")} subtext={t("common.delivered")} />
        <PostmarkStamp variant="boxed" inkColor="wax" size="md" docketId={t("header.folio")} subtext={t("common.opened")} />
        <PostmarkStamp variant="cancellation-waves" inkColor="muted" size="md" docketId={t("header.folio")} subtext={t("common.archived")} />
      </div>

      <div className="space-y-4">
        <DualEmotionalBar label={t("common.happiness")} pastValue={6} currentValue={9} type="happiness" />
        <DualEmotionalBar label={t("common.anxiety")} pastValue={8} currentValue={3} type="anxiety" invertColor />
        <DualEmotionalBar label={t("common.motivation")} pastValue={5} currentValue={8} type="motivation" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <CountdownBadge targetDate={targetDate} variant="pill" size="md" />
        <CountdownBadge targetDate={targetDate} variant="segmented" size="md" />
        <CountdownBadge targetDate={targetDate} variant="docket" size="md" />
        <div className="radial-progress text-wax font-mono text-xs" style={{ "--value": 78 } as React.CSSProperties}>
          78%
        </div>
      </div>

      <LinedPaperCanvas
        value={composerText}
        onChange={setComposerText}
        showLines
        showWordCount
      />
    </div>
  );
};

const meta: Meta<typeof PrimitivesGalleryComponent> = {
  title: "Tier 1 - Primitives/UI Primitives Gallery",
  component: PrimitivesGalleryComponent,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof PrimitivesGalleryComponent>;

export const Default: Story = {};
