import { APIGatewayEvent, Context } from "aws-lambda";
import { getCountries } from "../integrations/countries-api";
import { logger } from "../logger";
import { serverErrors } from "@capital-cities/common/errors";
import { generateQuestionsFromCountries } from "./generate-questions";

export async function handler(event: APIGatewayEvent, ctx: Context) {
  try {
    logger.info("getting countries from API");
    const countries = await getCountries();
    const questions = generateQuestionsFromCountries(countries);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello from Serverless!",
        questions,
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
