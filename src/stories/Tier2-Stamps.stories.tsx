import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Stamp } from "@/components/stamps/Stamp";
import { StampPerforationFrame } from "@/components/stamps/StampPerforationFrame";
import { PostmarkOverlay } from "@/components/stamps/PostmarkOverlay";
import { StampPickerModal } from "@/components/stamps/StampPickerModal";
import { STAMPS_CATALOG, STAMP_CATEGORIES } from "@/components/stamps/stamps.data";
import { PaperSheet } from "@/components/ui/PaperSheet";
import { useTimeEcho } from "@/lib/context/TimeEchoContext";

const StampGalleryComponent = () => {
  const { t } = useTimeEcho();
  const [selectedStampId, setSelectedStampId] = useState<string | undefined>("morning-coffee");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-foreground">{t("composer.stampModalTitle")}</h2>
          <p className="font-mono text-xs text-foreground-muted">{t("composer.stampModalSubtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="px-4 py-2 border border-wax bg-wax text-on-wax rounded font-mono text-xs uppercase tracking-wider hover:bg-wax-hover transition-colors"
        >
          {t("composer.stampModalTitle")}
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-6 p-6 border border-crease bg-parchment rounded">
        <Stamp id="morning-coffee" size="sm" hasPostmark />
        <Stamp id="today-song" size="md" hasPostmark postmarkVariant="circular" />
        <Stamp id="little-home" size="lg" hasPostmark postmarkVariant="waves" />
        <Stamp id="rainy-afternoon" size="xl" hasPostmark postmarkVariant="combo" />
        <StampPerforationFrame size="md">
          <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-foreground-muted">
            {t("common.pending")}
          </div>
        </StampPerforationFrame>
      </div>

      {STAMP_CATEGORIES.map((category) => {
        const categoryStamps = STAMPS_CATALOG.filter((item) => item.category === category.id);
        const categoryLabelKey = `composer.stampCategories.${category.id}`;
        const translatedCategory = t(categoryLabelKey) !== categoryLabelKey ? t(categoryLabelKey) : category.label;

        return (
          <PaperSheet key={category.id} variant="parchment" elevation="raised">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-crease pb-2">
                <h3 className="font-serif text-lg text-ink font-semibold">{translatedCategory}</h3>
                <span className="font-mono text-xs text-foreground-muted">
                  {categoryStamps.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {categoryStamps.map((stampItem) => (
                  <div
                    key={stampItem.id}
                    onClick={() => setSelectedStampId(stampItem.id)}
                    className="flex flex-col items-center gap-2 p-3 border border-crease/60 rounded hover:border-wax transition-colors cursor-pointer"
                  >
                    <Stamp
                      id={stampItem.id}
                      size="md"
                      selected={selectedStampId === stampItem.id}
                      interactive
                    />
                    <span className="font-mono text-[11px] text-center text-foreground-muted truncate w-full">
                      {stampItem.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PaperSheet>
        );
      })}

      <StampPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        selectedStampId={selectedStampId}
        onSelectStamp={(id) => {
          setSelectedStampId(id);
          setIsPickerOpen(false);
        }}
      />
    </div>
  );
};

const meta: Meta<typeof StampGalleryComponent> = {
  title: "Tier 2 - Stamps/Stamps Catalog",
  component: StampGalleryComponent,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof StampGalleryComponent>;

export const Default: Story = {};
