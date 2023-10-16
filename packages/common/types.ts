import { z } from "zod";

export const countryInfoSchema = z.object({
  name: z.string(),
  capital: z.string(),
});

export type CountryInfo = z.infer<typeof countryInfoSchema>;
export type Question = {
  name: string;
  options: string[];
};
export type SelectedOption = {
  country: string;
  selectedCapital: string;
};

export interface GetQuestionResult {
  message: string;
  questions: Question[];
}
