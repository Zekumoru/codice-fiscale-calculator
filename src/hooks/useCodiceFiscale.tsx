import { useState } from "react";
import getCodiceFiscale from "../utils/getCodiceFiscale";
import getCodiceCatastale from "../utils/getCodiceCatastale";

interface CodiceFiscaleParams {
  name: string;
  surname: string;
  sex: string;
  birth: Date;
  birthPlace: string;
  birthProvince: string;
}

const useCodiceFiscale = () => {
  const [codiceFiscale, setCodiceFiscale] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCodiceFiscale = async ({
    birth,
    birthPlace,
    birthProvince,
    name,
    sex,
    surname,
  }: CodiceFiscaleParams) => {
    if (isLoading) return;

    setError("");
    setIsLoading(true);
    const [codiceCatastale] = await getCodiceCatastale(
      birthPlace,
      birthProvince
    );

    if (!codiceCatastale) {
      // no comune and provincia found
      setError("Comune and provincia not found!");
      setIsLoading(false);
      return;
    }

    const codiceFiscale = getCodiceFiscale(
      surname,
      name,
      sex,
      birth,
      codiceCatastale
    );

    if (!codiceFiscale) {
      // could not calculate codice fiscale maybe wrong data
      setError("Could not calculate codice fiscale, check your inputs!");
      setIsLoading(false);
      return;
    }

    setCodiceFiscale(codiceFiscale ?? "");
    setIsLoading(false);
  };

  return [handleCodiceFiscale, codiceFiscale, isLoading, error] as const;
};

export default useCodiceFiscale;
