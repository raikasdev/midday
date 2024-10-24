"use server";

import { filterInvoiceSchema } from "@/actions/schema";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";

const VALID_FILTERS = [
  "name",
  "due_date",
  "start",
  "end",
  "customers",
  "statuses",
];

export async function generateInvoiceFilters(prompt: string, context?: string) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `You are a helpful assistant that generates filters for a given prompt. \n
               Current date is: ${new Date().toISOString().split("T")[0]} \n
               ${context}
      `,
      schema: filterInvoiceSchema.pick({
        ...(VALID_FILTERS.reduce((acc, filter) => {
          acc[filter] = true;
          return acc;
        }, {}) as any),
      }),
      prompt,
      temperature: 0.7,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
