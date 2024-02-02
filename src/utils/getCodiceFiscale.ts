import consonantsVowels from "./consonantsVowels";
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
    .filter((_ch, index) => index != 1) // do not select second consonant
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
