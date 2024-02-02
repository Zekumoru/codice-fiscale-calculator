import consonantsVowels, { isVowel } from "./consonantsVowels";
import getControlCode from "./getControlCode";
import getMonthCode from "./getMonthCode";

const getCodiceFiscale = (
  surname: string,
  name: string,
  sex: string,
  birth: Date,
  codiceCatastale: string
): string | null => {
  const processedName = consonantsVowels(name)
    .toUpperCase()
    .slice(0, 4)
    .split("")
    .filter((_ch, index, arr) => {
      if (index == 0) return true;
      // if there are only 3 consonants, select them all
      // this is done by checking if the fourth (index 3) element is a consonant
      // therefore from first to fourth characters, we can say they are all
      // consonants
      if (index == 1 && arr.length >= 3 && !isVowel(arr[3])) return false;
      return true;
    })
    // ignore 4th character
    .filter((_ch, index) => index != 3)
    .join("");
  while (processedName.length < 3) processedName.concat("X");

  const processedSurname = consonantsVowels(surname).toUpperCase().slice(0, 3);
  while (processedSurname.length < 3) processedSurname.concat("X");

  const yearCode = birth.getFullYear() % 100;
  const monthCode = getMonthCode(birth.getMonth());
  if (!monthCode) return null;

  const dayCode = birth.getDate() + (sex.toLowerCase() === "female" ? 40 : 0);

  const codiceFiscale =
    processedSurname +
    processedName +
    String(yearCode).padStart(2, "0") +
    monthCode +
    String(dayCode).padStart(2, "0") +
    codiceCatastale;

  const controlCode = getControlCode(codiceFiscale);

  return codiceFiscale + controlCode;
};

export default getCodiceFiscale;
