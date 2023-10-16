import { z } from "zod";
import axios from "axios";

import { logger } from "../logger";
import { CountryInfo, countryInfoSchema } from "@capital-cities/common/types";

export const countryApiResultSchema = z.object({
  data: z.array(countryInfoSchema),
});

export type CountryApiResult = z.infer<typeof countryApiResultSchema>;

export async function getCountries(): Promise<CountryInfo[]> {
  const res = await axios.get(
    "https://countriesnow.space/api/v0.1/countries/capital/"
  );
  const validationResult = countryApiResultSchema.safeParse(res.data);

  if (!validationResult.success) {
    logger.error("error validating API json");
    throw new Error("API response does not match expected structure.");
  }

  return validationResult.data.data;
}
