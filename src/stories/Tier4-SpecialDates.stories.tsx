import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { SpecialDatesSection } from "@/features/special-dates";

const meta: Meta = {
  title: "Tier 4 - Capsules/Special Dates",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

export const DefaultSection: Story = {
  name: "Special Dates Section (New Year's Day Selected)",
  render: () => (
    <div className="py-8">
      <SpecialDatesSection defaultSelectedSlug="new-years-day" />
    </div>
  ),
};

export const ValentinesSelected: Story = {
  name: "Special Dates Section (Valentine's Day Selected)",
  render: () => (
    <div className="py-8">
      <SpecialDatesSection defaultSelectedSlug="valentines-day" />
    </div>
  ),
};

export const ChristmasSelected: Story = {
  name: "Special Dates Section (Christmas Selected)",
  render: () => (
    <div className="py-8">
      <SpecialDatesSection defaultSelectedSlug="christmas" />
    </div>
  ),
};
