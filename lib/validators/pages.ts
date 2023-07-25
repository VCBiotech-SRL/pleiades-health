import { z } from "zod";

export const pageCreate = z.object({
  title: z.string().min(3, "Page title too short."),
  segment: z.string().min(1, "Page title too short.").regex(
    /^[a-zA-Z0-9_-]*$/,
    "Must be URL friendly.",
  ),
  description: z.string().min(10, "Page title too short."),
  order: z.number().optional().nullish(),
});

export const pageUpdate = z.object({
  id: z.string().min(1, "Elige un enlace"),
  title: z.string().min(1, "Page title too short.").optional().nullish(),
  segment: z.string().min(1, "Page title too short.").regex(
    /^[a-zA-Z0-9_-]*$/,
    "Must be URL friendly.",
  ).optional(),
  order: z.number().optional().nullish(),
  description: z.string().min(10, "Page title too short.").optional().nullish(),
});

export type PageCreate = z.infer<typeof pageCreate>;
export type PageUpdate = z.infer<typeof pageUpdate>;
