import { APIGatewayEvent, Context } from "aws-lambda";
import { CountryApi } from "../integrations/countries-api";
import { logger } from "../logger";
import { serverErrors } from "@capital-cities/common/errors";
import { SelectedOption } from "@capital-cities/common/types";

export type GetFlagPayload = {
  countryName: string;
};

export async function handler(event: APIGatewayEvent, ctx: Context) {
  try {
    logger.info("getting flag for country");

    const payload: GetFlagPayload = JSON.parse(event.body ?? "{}");
    const flag = await CountryApi.shared.getCountryFlagUrl(payload.countryName);
    console.log(flag);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "It works!",
        flag,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: serverErrors.UNKNOWN_ERROR,
      }),
    };
  }
}
