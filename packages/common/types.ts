import { z } from "zod";

export const countryInfoSchema = z.object({
  name: z.string(),
  capital: z.string(),
});

export type Question = {
  name: string;
  options: string[];
};
export type CountryInfo = z.infer<typeof countryInfoSchema>;

export interface GetQuestionResult {
  message: string;
  questions: Question[];
}
