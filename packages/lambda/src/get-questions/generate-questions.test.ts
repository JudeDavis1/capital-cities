import { generateQuestionsFromCountries } from "./generate-questions";

describe("generateQuestionsFromCountries", () => {
  it("questions should contain the real answer", () => {
    const test = [
      { name: "Afghanistan", capital: "Kabul", iso2: "AF", iso3: "AFG" },
      { name: "Aland Islands", capital: "Mariehamn", iso2: "AX", iso3: "ALA" },
      { name: "Albania", capital: "Tirana", iso2: "AL", iso3: "ALB" },
      { name: "Algeria", capital: "Algiers", iso2: "DZ", iso3: "DZA" },
    ];
    const questions = generateQuestionsFromCountries(test);

    for (let i = 0; i < questions.length; i++) {
      expect(questions[i].options).toContain(test[i].capital);
    }
  });
});
