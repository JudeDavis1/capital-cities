import { SelectedOption } from "@capital-cities/common/types";
import { optionMatch } from "./option-match";
import { CountryApi } from "../integrations/countries-api";

describe("optionMatch", () => {
  const test = [
    { name: "Afghanistan", capital: "Kabul", iso2: "AF", iso3: "AFG" },
    { name: "Aland Islands", capital: "Mariehamn", iso2: "AX", iso3: "ALA" },
    { name: "Albania", capital: "Tirana", iso2: "AL", iso3: "ALB" },
    { name: "Algeria", capital: "Algiers", iso2: "DZ", iso3: "DZA" },
  ];

  it("should correctly identify correct options", async () => {
    const countries = await CountryApi.shared.getCountries();

    const correctOption: SelectedOption = {
      country: test[0].name,
      selectedCapital: test[0].capital,
    };
    const matchResult = optionMatch(correctOption, countries);
    expect(JSON.parse(matchResult.body).correct).toEqual(true);
  });

  it("should correctly identify incorrect options", async () => {
    const countries = await CountryApi.shared.getCountries();

    const correctOption: SelectedOption = {
      country: test[0].name,
      selectedCapital: test[1].capital,
    };
    const matchResult = optionMatch(correctOption, countries);
    expect(JSON.parse(matchResult.body).correct).toEqual(false);
  });
});
