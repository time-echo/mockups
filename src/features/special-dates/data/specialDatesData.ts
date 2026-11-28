import {
  SpecialDateCategory,
  SpecialDateItem,
  SpecialDatePrompt,
  SpecialDatePromptOption,
  SpecialDatePromptType,
  SupportedLanguage,
} from "@/types/timeecho";

interface LocalizedString {
  en: string;
  es: string;
}

interface DateRuleFixed {
  type: "fixed";
  month: number;
  day: number;
  endMonth?: number;
  endDay?: number;
}

interface DateRuleNthWeekday {
  type: "nth_weekday";
  month: number;
  weekday: number; // 0 = Sun .. 6 = Sat
  occurrence: number; // 1..5 or -1 for last
}

type BaseDateRule = DateRuleFixed | DateRuleNthWeekday;

interface DateRule extends Record<string, unknown> {
  base: BaseDateRule;
  overrides?: Record<string, BaseDateRule>;
}

interface RawPromptOption {
  value: string;
  label: LocalizedString;
}

interface RawPromptConfig {
  placeholder?: LocalizedString;
  maxLength?: number;
  maxSelections?: number;
  min?: number;
  max?: number;
  minLabel?: LocalizedString;
  maxLabel?: LocalizedString;
}

interface RawSpecialDatePrompt {
  slug: string;
  question: LocalizedString;
  questionType: SpecialDatePromptType;
  options?: RawPromptOption[];
  config?: RawPromptConfig;
}

interface RawSpecialDate {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: SpecialDateCategory;
  illustrationKey: string;
  countryCode?: string | null;
  dateRule: DateRule;
  prompts: RawSpecialDatePrompt[];
}

const RAW_SPECIAL_DATES: RawSpecialDate[] = [
  {
    slug: "christmas",
    title: { en: "Christmas", es: "Navidad" },
    description: {
      en: "Pause amid the season to capture what home, warmth, and togetherness mean to you right now.",
      es: "Haz una pausa en esta temporada para guardar lo que significan hoy el hogar, la calidez y la compañía.",
    },
    category: "celebration",
    illustrationKey: "christmas",
    dateRule: { base: { type: "fixed", month: 12, day: 25 } },
    prompts: [
      {
        slug: "christmas-table",
        question: {
          en: "Who is around your table—or in your thoughts—this Christmas?",
          es: "¿Quién está alrededor de tu mesa —o en tus pensamientos— esta Navidad?",
        },
        questionType: "text",
        config: {
          placeholder: {
            en: "Names, faces, or a quiet memory...",
            es: "Nombres, rostros o un recuerdo cercano...",
          },
          maxLength: 140,
        },
      },
      {
        slug: "christmas-feeling",
        question: {
          en: "Which word best describes how this season feels to you?",
          es: "¿Qué palabra describe mejor cómo se siente esta temporada para ti?",
        },
        questionType: "radio",
        options: [
          { value: "warm", label: { en: "Warm & grounded", es: "Cálida y serena" } },
          { value: "nostalgic", label: { en: "Nostalgic", es: "Nostálgica" } },
          { value: "grateful", label: { en: "Deeply grateful", es: "Profundamente agradecida" } },
          { value: "quiet", label: { en: "Quiet & reflective", es: "Tranquila y reflexiva" } },
        ],
      },
      {
        slug: "christmas-traditions",
        question: {
          en: "Which small traditions do you hope you never outgrow?",
          es: "¿Qué pequeñas tradiciones esperas no perder nunca?",
        },
        questionType: "checkbox",
        options: [
          { value: "shared-meal", label: { en: "Cooking or sharing a meal", es: "Cocinar o compartir la mesa" } },
          { value: "handwritten-notes", label: { en: "Writing notes to loved ones", es: "Escribir notas a quienes quiero" } },
          { value: "quiet-morning", label: { en: "A slow, quiet morning", es: "Una mañana lenta y en calma" } },
          { value: "giving-time", label: { en: "Being present without hurry", es: "Estar presente sin prisa" } },
        ],
        config: { maxSelections: 3 },
      },
      {
        slug: "christmas-warmth-scale",
        question: {
          en: "How connected do you feel to the people you love right now?",
          es: "¿Qué tan conectado/a te sientes hoy con las personas que quieres?",
        },
        questionType: "scale",
        config: {
          min: 1,
          max: 5,
          minLabel: { en: "Distant", es: "Distante" },
          maxLabel: { en: "Deeply close", es: "Muy cercano/a" },
        },
      },
      {
        slug: "christmas-memory",
        question: {
          en: "Describe one quiet moment from this season you never want to forget.",
          es: "Describe un instante sencillo de esta temporada que nunca quieras olvidar.",
        },
        questionType: "textarea",
        config: {
          placeholder: {
            en: "A sound, a conversation, a detail in the room...",
            es: "Un sonido, una conversación, un detalle del lugar...",
          },
        },
      },
    ],
  },
  {
    slug: "new-years-eve",
    title: { en: "New Year's Eve", es: "Víspera de Año Nuevo" },
    description: {
      en: "Close the chapter on this year with honesty before the clock resets.",
      es: "Cierra el capítulo de este año con honestidad antes de que el reloj vuelva a empezar.",
    },
    category: "milestone",
    illustrationKey: "new-years-eve",
    dateRule: { base: { type: "fixed", month: 12, day: 31 } },
    prompts: [
      {
        slug: "year-in-one-word",
        question: {
          en: "If you could name this year in one word, what would it be?",
          es: "Si pudieras nombrar este año con una sola palabra, ¿cuál sería?",
        },
        questionType: "text",
        config: {
          placeholder: {
            en: "e.g., Resilience, Transition, Discovery...",
            es: "Ej., Resiliencia, Transición, Descubrimiento...",
          },
          maxLength: 80,
        },
      },
      {
        slug: "closing-feeling",
        question: {
          en: "How are you feeling as this chapter closes?",
          es: "¿Cómo te sientes al cerrar este capítulo?",
        },
        questionType: "radio",
        options: [
          { value: "hopeful", label: { en: "Hopeful", es: "Con esperanza" } },
          { value: "grateful", label: { en: "Grateful", es: "Agradecido/a" } },
          { value: "tired-proud", label: { en: "Tired, but proud", es: "Cansado/a, pero orgulloso/a" } },
          { value: "ready-change", label: { en: "Ready for change", es: "Listo/a para cambiar" } },
        ],
      },
      {
        slug: "protect-next-year",
        question: {
          en: "What do you want to protect most in the year ahead?",
          es: "¿Qué quieres proteger más en el año que viene?",
        },
        questionType: "checkbox",
        options: [
          { value: "peace", label: { en: "Peace of mind", es: "Paz mental" } },
          { value: "relationships", label: { en: "Close relationships", es: "Vínculos cercanos" } },
          { value: "health", label: { en: "Health & energy", es: "Salud y energía" } },
          { value: "craft", label: { en: "Creative or career craft", es: "Oficio o crecimiento profesional" } },
        ],
        config: { maxSelections: 3 },
      },
      {
        slug: "year-fulfillment-scale",
        question: {
          en: "How proud are you of how you showed up this year?",
          es: "¿Qué tan orgulloso/a estás de cómo enfrentaste este año?",
        },
        questionType: "scale",
        config: {
          min: 1,
          max: 5,
          minLabel: { en: "Still finding footing", es: "Aún buscando rumbo" },
          maxLabel: { en: "Deeply proud", es: "Muy orgulloso/a" },
        },
      },
      {
        slug: "proudest-moment",
        question: {
          en: "What moment from this year do you want your future self to remember?",
          es: "¿Qué momento de este año quieres que tu yo del futuro recuerde?",
        },
        questionType: "textarea",
        config: {
          placeholder: {
            en: "Write about a quiet win, a turning point, or something you survived...",
            es: "Escribe sobre un logro silencioso, un punto de giro o algo que superaste...",
          },
        },
      },
    ],
  },
  {
    slug: "new-years-day",
    title: { en: "New Year's Day", es: "Año Nuevo" },
    description: {
      en: "Set quiet intentions on a fresh page and check back in when the year has unfolded.",
      es: "Traza intenciones serenas en una página nueva y vuelve a leerlas cuando el año haya pasado.",
    },
    category: "milestone",
    illustrationKey: "new-years-day",
    dateRule: { base: { type: "fixed", month: 1, day: 1 } },
    prompts: [
      {
        slug: "one-brave-promise",
        question: {
          en: "What is one quiet promise you want to keep to yourself this year?",
          es: "¿Cuál es una promesa silenciosa que quieres cumplirte este año?",
        },
        questionType: "text",
        config: {
          placeholder: {
            en: "Keep it honest and specific...",
            es: "Hazla honesta y concreta...",
          },
          maxLength: 140,
        },
      },
      {
        slug: "year-pace",
        question: {
          en: "What pace do you want this new year to have?",
          es: "¿Qué ritmo quieres que tenga este nuevo año?",
        },
        questionType: "radio",
        options: [
          { value: "bold", label: { en: "Bold & ambitious", es: "Valiente y ambicioso" } },
          { value: "steady", label: { en: "Steady & sustainable", es: "Constante y sostenible" } },
          { value: "gentle", label: { en: "Gentle & restorative", es: "Suave y reparador" } },
          { value: "curious", label: { en: "Curious & experimental", es: "Curioso y experimental" } },
        ],
      },
      {
        slug: "habits-to-build",
        question: {
          en: "Which habits would make your future self thank you?",
          es: "¿Qué hábitos harían que tu yo del futuro te diera las gracias?",
        },
        questionType: "checkbox",
        options: [
          { value: "reading", label: { en: "Reading more deeply", es: "Leer con más calma" } },
          { value: "movement", label: { en: "Moving my body regularly", es: "Mover mi cuerpo con constancia" } },
          { value: "boundaries", label: { en: "Saying no without guilt", es: "Decir no sin culpa" } },
          { value: "saving", label: { en: "Saving with intention", es: "Ahorrar con intención" } },
        ],
      },
      {
        slug: "letter-to-december",
        question: {
          en: "What do you hope has changed by the time next winter arrives?",
          es: "¿Qué esperas que haya cambiado cuando vuelva el próximo fin de año?",
        },
        questionType: "textarea",
        config: {
          placeholder: {
            en: "Picture yourself twelve months from now...",
            es: "Imagínate dentro de doce meses...",
          },
        },
      },
    ],
  },
  {
    slug: "valentines-day",
    title: { en: "Valentine's Day", es: "Día de San Valentín" },
    description: {
      en: "Reflect on the love you give, the love you receive, and the way you care for yourself.",
      es: "Reflexiona sobre el amor que das, el que recibes y la forma en que cuidas de ti.",
    },
    category: "celebration",
    illustrationKey: "valentines-day",
    dateRule: { base: { type: "fixed", month: 2, day: 14 } },
    prompts: [
      {
        slug: "who-makes-you-feel-seen",
        question: {
          en: "Who makes you feel most understood right now?",
          es: "¿Quién te hace sentir más comprendido/a en este momento?",
        },
        questionType: "text",
        config: {
          placeholder: {
            en: "A partner, friend, family member, or yourself...",
            es: "Tu pareja, una amistad, alguien de tu familia o tú mismo/a...",
          },
        },
      },
      {
        slug: "love-language-season",
        question: {
          en: "What form of affection means the most to you in this chapter?",
          es: "¿Qué forma de afecto significa más para ti en esta etapa?",
        },
        questionType: "radio",
        options: [
          { value: "presence", label: { en: "Undivided presence", es: "Presencia plena" } },
          { value: "honesty", label: { en: "Gentle honesty", es: "Honestidad amable" } },
          { value: "small-gestures", label: { en: "Everyday small gestures", es: "Pequeños gestos cotidianos" } },
          { value: "encouragement", label: { en: "Encouragement & belief", es: "Aliento y confianza" } },
        ],
      },
      {
        slug: "self-kindness",
        question: {
          en: "What is something loving you want your future self to never forget about you today?",
          es: "¿Qué verdad cariñosa quieres que tu yo del futuro nunca olvide de quien eres hoy?",
        },
        questionType: "textarea",
      },
    ],
  },
  {
    slug: "international-womens-day",
    title: { en: "International Women's Day", es: "Día Internacional de la Mujer" },
    description: {
      en: "Honor the women who shaped your path—and the strength you are still growing into.",
      es: "Honra a las mujeres que marcaron tu camino y la fortaleza que sigues construyendo.",
    },
    category: "cultural",
    illustrationKey: "international-womens-day",
    dateRule: { base: { type: "fixed", month: 3, day: 8 } },
    prompts: [
      {
        slug: "woman-who-inspired",
        question: {
          en: "Which woman's courage or wisdom has stayed with you this year?",
          es: "¿El coraje o la sabiduría de qué mujer te ha acompañado este año?",
        },
        questionType: "text",
      },
      {
        slug: "values-to-carry",
        question: {
          en: "Which qualities do you want to keep amplifying in your own life?",
          es: "¿Qué cualidades quieres seguir cultivando en tu propia vida?",
        },
        questionType: "checkbox",
        options: [
          { value: "voice", label: { en: "Speaking up clearly", es: "Alzar la voz con claridad" } },
          { value: "empathy", label: { en: "Fierce empathy", es: "Empatía valiente" } },
          { value: "independence", label: { en: "Independence", es: "Independencia" } },
          { value: "mentorship", label: { en: "Lifting others up", es: "Impulsar a otras personas" } },
        ],
      },
      {
        slug: "letter-of-strength",
        question: {
          en: "Write a reminder about a barrier you outgrew or a voice you found.",
          es: "Escribe un recordatorio sobre una barrera que superaste o una voz que encontraste.",
        },
        questionType: "textarea",
      },
    ],
  },
  {
    slug: "mothers-day",
    title: { en: "Mother's Day", es: "Día de la Madre" },
    description: {
      en: "Preserve gratitude, memories, and unspoken words for the maternal figures who shaped you.",
      es: "Guarda gratitud, recuerdos y palabras sinceras para las figuras maternas que te formaron.",
    },
    category: "family",
    illustrationKey: "mothers-day",
    dateRule: {
      base: { type: "nth_weekday", month: 5, weekday: 0, occurrence: 2 },
      overrides: {
        MX: { type: "fixed", month: 5, day: 10 },
        ES: { type: "nth_weekday", month: 5, weekday: 0, occurrence: 1 },
        AR: { type: "nth_weekday", month: 10, weekday: 0, occurrence: 3 },
      },
    },
    prompts: [
      {
        slug: "lesson-from-mom",
        question: {
          en: "What lesson from your mother or maternal figure do you understand better today?",
          es: "¿Qué enseñanza de tu madre o figura materna comprendes mejor hoy?",
        },
        questionType: "textarea",
      },
      {
        slug: "favorite-memory-word",
        question: {
          en: "A smell, dish, or phrase that instantly reminds you of her:",
          es: "Un aroma, plato o frase que te recuerda a ella al instante:",
        },
        questionType: "text",
      },
      {
        slug: "gratitude-scale",
        question: {
          en: "How often have you told her what she means to you lately?",
          es: "¿Qué tan seguido le has dicho últimamente lo que significa para ti?",
        },
        questionType: "scale",
        config: {
          min: 1,
          max: 5,
          minLabel: { en: "Not enough", es: "No lo suficiente" },
          maxLabel: { en: "Often & openly", es: "Seguido y con apertura" },
        },
      },
    ],
  },
  {
    slug: "graduation-season",
    title: { en: "Graduation Season", es: "Temporada de Graduación" },
    description: {
      en: "Mark the threshold between who you were as a student and who you are becoming next.",
      es: "Marca el umbral entre quien fuiste en esta etapa y la persona en la que te estás convirtiendo.",
    },
    category: "seasonal",
    illustrationKey: "graduation-season",
    dateRule: {
      base: { type: "fixed", month: 6, day: 1, endMonth: 6, endDay: 30 },
    },
    prompts: [
      {
        slug: "chapter-closing",
        question: {
          en: "What milestone or chapter are you graduating from?",
          es: "¿Qué hito o etapa estás culminando?",
        },
        questionType: "text",
      },
      {
        slug: "next-step-mood",
        question: {
          en: "How does the road ahead feel right now?",
          es: "¿Cómo se siente el camino que viene ahora mismo?",
        },
        questionType: "radio",
        options: [
          { value: "excited", label: { en: "Wide open & exciting", es: "Abierto y emocionante" } },
          { value: "bittersweet", label: { en: "Bittersweet", es: "Agridulce" } },
          { value: "nervous", label: { en: "Uncertain, yet hopeful", es: "Incierto, pero esperanzador" } },
        ],
      },
      {
        slug: "advice-to-future-grad",
        question: {
          en: "What do you want to remind yourself when imposter syndrome or doubt creeps in?",
          es: "¿Qué quieres recordarte cuando aparezcan la duda o el síndrome del impostor?",
        },
        questionType: "textarea",
      },
    ],
  },
  {
    slug: "fathers-day",
    title: { en: "Father's Day", es: "Día del Padre" },
    description: {
      en: "Capture the quiet lessons, stories, and gratitude you carry for your father or father figure.",
      es: "Guarda las lecciones silenciosas, historias y gratitud hacia tu padre o figura paterna.",
    },
    category: "family",
    illustrationKey: "fathers-day",
    dateRule: {
      base: { type: "nth_weekday", month: 6, weekday: 0, occurrence: 3 },
      overrides: {
        ES: { type: "fixed", month: 3, day: 19 },
      },
    },
    prompts: [
      {
        slug: "dad-phrase",
        question: {
          en: "A piece of advice or saying from him that still echoes in your mind:",
          es: "Un consejo o dicho suyo que todavía resuena en tu mente:",
        },
        questionType: "text",
      },
      {
        slug: "dad-memory",
        question: {
          en: "What memory with him would you love to revisit years from now?",
          es: "¿Qué recuerdo junto a él te encantaría volver a leer dentro de unos años?",
        },
        questionType: "textarea",
      },
    ],
  },
];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function resolveRuleForYear(
  rule: BaseDateRule,
  year: number,
): { start: Date; end: Date | null } {
  if (rule.type === "fixed") {
    const safeDay =
      rule.month === 2 && rule.day === 29 && !isLeapYear(year) ? 28 : rule.day;
    const start = new Date(year, rule.month - 1, safeDay);
    const end =
      rule.endMonth && rule.endDay
        ? new Date(year, rule.endMonth - 1, rule.endDay)
        : null;
    return { start, end };
  }

  // nth_weekday
  if (rule.occurrence === -1) {
    const lastDay = new Date(year, rule.month, 0);
    const diff = (lastDay.getDay() - rule.weekday + 7) % 7;
    const start = new Date(year, rule.month - 1, lastDay.getDate() - diff);
    return { start, end: null };
  }

  const firstOfMonth = new Date(year, rule.month - 1, 1);
  const offset = (rule.weekday - firstOfMonth.getDay() + 7) % 7;
  const day = 1 + offset + (rule.occurrence - 1) * 7;
  const daysInMonth = new Date(year, rule.month, 0).getDate();
  const clampedDay = day > daysInMonth ? day - 7 : day;
  return { start: new Date(year, rule.month - 1, clampedDay), end: null };
}

function computeNextOccurrence(
  dateRule: DateRule,
  referenceDate: Date,
  countryCode?: string | null,
) {
  const effectiveRule =
    (countryCode && dateRule.overrides?.[countryCode.toUpperCase()]) ||
    dateRule.base;
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  let { start, end } = resolveRuleForYear(effectiveRule, today.getFullYear());
  const effectiveEnd = end || start;

  if (effectiveEnd < today) {
    const next = resolveRuleForYear(effectiveRule, today.getFullYear() + 1);
    start = next.start;
    end = next.end;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const isOngoing = Boolean(end && today >= start && today <= end);
  const daysUntil = isOngoing
    ? 0
    : Math.max(0, Math.round((start.getTime() - today.getTime()) / msPerDay));

  return {
    occurrenceDate: toIsoDate(
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate(),
    ),
    endDate: end
      ? toIsoDate(end.getFullYear(), end.getMonth() + 1, end.getDate())
      : null,
    daysUntil,
    isOngoing,
  };
}

function localizePrompts(
  rawPrompts: RawSpecialDatePrompt[],
  locale: SupportedLanguage,
): SpecialDatePrompt[] {
  return rawPrompts.map((p, index) => {
    const options: SpecialDatePromptOption[] = (p.options || []).map((opt) => ({
      value: opt.value,
      label: opt.label[locale] || opt.label.en,
    }));

    return {
      slug: p.slug,
      question: p.question[locale] || p.question.en,
      questionType: p.questionType,
      options,
      config: {
        placeholder: p.config?.placeholder
          ? p.config.placeholder[locale] || p.config.placeholder.en
          : undefined,
        maxLength: p.config?.maxLength,
        maxSelections: p.config?.maxSelections,
        min: p.config?.min,
        max: p.config?.max,
        minLabel: p.config?.minLabel
          ? p.config.minLabel[locale] || p.config.minLabel.en
          : undefined,
        maxLabel: p.config?.maxLabel
          ? p.config.maxLabel[locale] || p.config.maxLabel.en
          : undefined,
      },
      position: index + 1,
    };
  });
}

export function getUpcomingSpecialDates(
  locale: SupportedLanguage,
  options?: { countryCode?: string | null; limit?: number; referenceDate?: Date },
): SpecialDateItem[] {
  const refDate = options?.referenceDate || new Date();
  const limit = options?.limit ?? 6;
  const countryCode = options?.countryCode || null;

  const items: SpecialDateItem[] = RAW_SPECIAL_DATES.map((raw, idx) => {
    const occ = computeNextOccurrence(raw.dateRule, refDate, countryCode);
    const prompts = localizePrompts(raw.prompts, locale);

    return {
      slug: raw.slug,
      title: raw.title[locale] || raw.title.en,
      description: raw.description[locale] || raw.description.en,
      category: raw.category,
      illustrationKey: raw.illustrationKey,
      countryCode: raw.countryCode ?? null,
      occurrenceDate: occ.occurrenceDate,
      endDate: occ.endDate,
      daysUntil: occ.daysUntil,
      isOngoing: occ.isOngoing,
      promptsCount: prompts.length,
      position: idx + 1,
      prompts,
    };
  });

  return items
    .sort((a, b) => a.daysUntil - b.daysUntil || a.position - b.position)
    .slice(0, limit);
}

export function getSpecialDateBySlug(
  slug: string | null | undefined,
  locale: SupportedLanguage,
  countryCode?: string | null,
): SpecialDateItem | undefined {
  if (!slug) return undefined;
  return getUpcomingSpecialDates(locale, {
    countryCode,
    limit: RAW_SPECIAL_DATES.length,
  }).find((item) => item.slug === slug);
}
