import { Configuration, OpenAIApi } from "openai";

import { env } from "@/env.mjs";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: env.OPENAI_API_KEY,
  })
);

export const createCompletion = async (prompt: string) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 1,
    });

    return completion.data.choices[0]?.text;
  } catch (e) {
    const error = e as
      | Error
      | {
          response: {
            status: number;
            data: unknown;
          };
        };

    if (error instanceof Error) {
      throw error.message;
    }

    throw error.response.data;
  }
};
