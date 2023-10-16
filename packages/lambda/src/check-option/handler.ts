import { APIGatewayEvent, Context } from "aws-lambda";
import { getCountries } from "../integrations/countries-api";
import { logger } from "../logger";
import { serverErrors } from "@capital-cities/common/errors";
import { SelectedOption } from "@capital-cities/common/types";
import { optionMatch } from "./option-match";

export async function handler(event: APIGatewayEvent, ctx: Context) {
  try {
    logger.info("getting countries from API");
    const countries = await getCountries();
    const selectedOption: SelectedOption = JSON.parse(event.body ?? "{}");
    if (!selectedOption) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: serverErrors.PAYLOAD_INCORRECT,
        }),
      };
    }

    return optionMatch(selectedOption, countries);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: serverErrors.UNKNOWN_ERROR,
      }),
    };
  }
}
