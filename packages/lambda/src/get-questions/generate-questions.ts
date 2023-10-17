import { CountryInfo, Question } from "@capital-cities/common/types";

/**
 * @param countries
 *
 * @description Generate questions in Question type format.
 */
export function generateQuestionsFromCountries(
  countries: CountryInfo[]
): Question[] {
  // Get a list of unique capitals
  const uniqueCapitals = countries
    .filter((country) => Boolean(country.capital))
    .map((country) => country.capital);

  const questions: Question[] = [];
  countries.forEach((country) => {
    // Choose 2 random options (apart from the real answer)
    let options: string[];
    do {
      shuffle(uniqueCapitals);
      options = uniqueCapitals.slice(0, 2);
    } while (options.includes(country.capital));

    // Add the correct answer and shuffle
    options.push(country.capital);
    shuffle(options);

    questions.push({
      name: country.name,
      options,
    });
  });

  return questions;
}

/**
 * @param arr
 *
 * @description Shuffle the array provided by randomly swapping elements.
 */
function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Random index
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    // TODO: (could do the tmp variable method as that's more efficient than array destruct)
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
