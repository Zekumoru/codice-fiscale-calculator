import { useState } from 'react';
import getCodiceFiscale from '../utils/getCodiceFiscale';
import getCodiceCatastale from '../utils/getCodiceCatastale';

interface CodiceFiscaleParams {
  name: string;
  surname: string;
  sex: string;
  birth: Date;
  birthPlace: string;
  birthProvince: string;
}

export interface IErrorCodiceFiscale {
  type: 'api-error' | 'calculation-error';
  message: string;
  fields: {
    field: string;
    errMessage: string;
  }[];
}

const useCodiceFiscale = () => {
  const [codiceFiscale, setCodiceFiscale] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IErrorCodiceFiscale | null>();

  const handleCodiceFiscale = async ({
    birth,
    birthPlace,
    birthProvince,
    name,
    sex,
    surname,
  }: CodiceFiscaleParams) => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);
    const [codiceCatastale, comune, provincia] = await getCodiceCatastale(
      birthPlace,
      birthProvince
    );

    if (!codiceCatastale) {
      // no comune and/or provincia found
      const error: IErrorCodiceFiscale = {
        type: 'api-error',
        message: 'An error occurred while processing the codice catastale.',
        fields: [],
      };

      error.fields.push({
        field: 'comune',
        errMessage: comune
          ? 'Check if the province is correct.'
          : "The place of birth does not exist or it's outside Italy!",
      });

      error.fields.push({
        field: 'provincia',
        errMessage: provincia
          ? 'Check if the municipality (place of birth) is correct.'
          : 'The province does not exist!',
      });

      setError(error);
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
      setError({
        type: 'calculation-error',
        message:
          'Codice fiscale could not be calculated, try double checking your inputs!',
        fields: [],
      });
      setIsLoading(false);
      return;
    }

    setCodiceFiscale(codiceFiscale ?? '');
    setIsLoading(false);
  };

  return [handleCodiceFiscale, codiceFiscale, isLoading, error] as const;
};

export default useCodiceFiscale;
