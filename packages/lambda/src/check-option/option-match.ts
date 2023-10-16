import { serverErrors } from "@capital-cities/common/errors";
import { CountryInfo, SelectedOption } from "@capital-cities/common/types";
import { logger } from "../logger";

export function optionMatch(
  selectedOption: SelectedOption,
  countries: CountryInfo[]
) {
  const matchingCountry = countries.find(
    (country) => country.name === selectedOption.country
  );
  logger.info("The answer is: " + matchingCountry);
  if (!matchingCountry) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: serverErrors.COUNTRY_NOT_FOUND,
      }),
    };
  }

  const correct = matchingCountry.capital === selectedOption.selectedCapital;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Serverless!",
      correct,
      actual: matchingCountry.capital,
    }),
  };
}
