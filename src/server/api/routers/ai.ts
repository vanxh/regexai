import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createCompletion } from "@/server/utils/openai";

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createRegEx: publicProcedure
    .input(
      z.object({
        description: z.string(),
        exampleValid: z.array(z.string()),
        exampleInvalid: z.array(z.string()),
      })
    )
    .mutation(({ input }) => {
      const { description, exampleValid, exampleInvalid } = input;

      return createCompletion(`create a regex for:
${description}
${exampleValid.length > 0 ? "valid inputs: " + exampleValid.join(", ") : ""}
${
  exampleInvalid.length > 0
    ? "invalid inputs: " + exampleInvalid.join(", ")
    : ""
}

answer in the format - don't need any explanation.
\`\`\`
REGEX PLACEHOLDER
\`\`\``);
    }),
});
