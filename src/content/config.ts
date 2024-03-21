import { defineCollection, z } from "astro:content";

const teamCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.number(),
    name: z.string().max(100),
    role: z.enum(["engineering", "hr", "design", "sales"]),
    startDate: z.coerce.date(),
    image: z.string().optional(),
  }),
});

export const collections = {
  team: teamCollection,
};
