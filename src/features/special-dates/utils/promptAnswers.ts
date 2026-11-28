import {
  LetterPromptAnswerInput,
  PromptAnswerPayload,
  SpecialDatePrompt,
} from "@/types/timeecho";

export type PromptAnswerDraftValue = string | string[] | number | undefined;
export type PromptAnswerDraftMap = Record<string, PromptAnswerDraftValue>;

export function getInitialDraftForPrompts(
  prompts: SpecialDatePrompt[],
  existing: PromptAnswerDraftMap = {},
): PromptAnswerDraftMap {
  const next: PromptAnswerDraftMap = { ...existing };
  for (const prompt of prompts) {
    if (next[prompt.slug] !== undefined) continue;
    if (prompt.questionType === "checkbox") {
      next[prompt.slug] = [];
    } else if (prompt.questionType === "scale") {
      const min = prompt.config.min ?? 1;
      const max = prompt.config.max ?? 5;
      next[prompt.slug] = Math.ceil((min + max) / 2);
    } else {
      next[prompt.slug] = "";
    }
  }
  return next;
}

export function buildStructuredPromptAnswers(
  prompts: SpecialDatePrompt[],
  drafts: PromptAnswerDraftMap,
): LetterPromptAnswerInput[] {
  const result: LetterPromptAnswerInput[] = [];

  prompts.forEach((prompt, idx) => {
    const raw = drafts[prompt.slug];
    if (raw === undefined || raw === null) return;

    let payload: PromptAnswerPayload | null = null;

    switch (prompt.questionType) {
      case "text":
      case "textarea": {
        const text = typeof raw === "string" ? raw.trim() : "";
        if (text.length > 0) {
          payload = { text };
        }
        break;
      }
      case "radio": {
        const val = typeof raw === "string" ? raw : "";
        const opt = prompt.options.find((o) => o.value === val);
        if (opt) {
          payload = { value: opt.value, label: opt.label };
        }
        break;
      }
      case "checkbox": {
        const vals = Array.isArray(raw) ? raw : [];
        const matched = prompt.options.filter((o) => vals.includes(o.value));
        if (matched.length > 0) {
          payload = {
            values: matched.map((o) => o.value),
            labels: matched.map((o) => o.label),
          };
        }
        break;
      }
      case "scale": {
        const num = typeof raw === "number" ? raw : Number(raw);
        const min = prompt.config.min ?? 1;
        const max = prompt.config.max ?? 5;
        if (!Number.isNaN(num) && num >= min && num <= max) {
          payload = {
            value: num,
            min,
            max,
            minLabel: prompt.config.minLabel,
            maxLabel: prompt.config.maxLabel,
          };
        }
        break;
      }
    }

    if (payload) {
      result.push({
        promptSlug: prompt.slug,
        question: prompt.question,
        questionType: prompt.questionType,
        answer: payload,
        position: idx + 1,
      });
    }
  });

  return result;
}
