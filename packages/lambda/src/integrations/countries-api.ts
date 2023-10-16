import { z } from "zod";
import axios from "axios";

import { logger } from "../logger";
import { CountryInfo, countryInfoSchema } from "@capital-cities/common/types";

export class CountryApi {
  public static shared = new CountryApi();

  public countryResultSchema = z.object({
    data: z.array(countryInfoSchema),
  });
  public countryFlagSchema = z.object({
    error: z.boolean(),
    data: z.array(
      z.object({
        name: z.string(),
        flag: z.string().url(),
      })
    ),
  });

  public async getCountries(): Promise<CountryInfo[]> {
    const res = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/capital/"
    );
    const validationResult = this.countryResultSchema.safeParse(res.data);

    if (!validationResult.success) {
      logger.error("error validating API json");
      throw new Error("API response does not match expected structure.");
    }

    return validationResult.data.data;
  }

  public async getCountryFlagUrl(
    countryName: string
  ): Promise<string | undefined> {
    const res = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );

    const validationResult = this.countryFlagSchema.safeParse(res.data);

    if (!validationResult.success) {
      logger.error("error validating API json");
      throw new Error("API response does not match expected structure.");
    }

    type CountryFlagResult = z.infer<typeof this.countryFlagSchema>;
    const countryFlagResult: CountryFlagResult = res.data;

    const flag = countryFlagResult.data.find(
      (country) => country.name == countryName
    )?.flag;

    return flag;
  }
}
