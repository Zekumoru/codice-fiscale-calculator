import axios from 'axios';

const apiLink = 'https://axqvoqvbfjpaamphztgd.functions.supabase.co/';
interface Comune {
  codice: string;
  nome: string;
  nomeStraniero: string | null;
  codiceCatastale: string;
  cap: string;
  prefisso: string;
  provincia: {
    nome: string;
    regione: string;
  };
  email: string;
  pec: string;
  telefono: string;
  fax: string;
  coordinate: {
    lat: number;
    lng: number;
  };
}
interface Provincia {
  codice: string;
  nome: string;
  sigla: string;
  regione: string;
}

const getCodiceCatastale = async (
  birthPlace: string,
  birthProvince: string
) => {
  const comuni = (
    await axios.get<Comune[]>(`${apiLink}/comuni`, {
      params: {
        nome: birthPlace,
      },
    })
  ).data;

  const province = (
    await Promise.all(
      comuni.map((comune) =>
        axios.get<Provincia[]>(`${apiLink}/province`, {
          params: {
            nome: comune.provincia.nome,
          },
        })
      )
    )
  )
    .map((response) => response.data)
    .reduce<Provincia[]>(
      (province, provinceInstance) => province.concat(provinceInstance),
      []
    );

  const provinciaIndex = province.findIndex(
    (provincia) => provincia.sigla === birthProvince.toUpperCase()
  );

  const comune = provinciaIndex > 0 ? comuni[provinciaIndex] : comuni[0];
  const provincia = provinciaIndex > 0 ? province[provinciaIndex] : province[0];

  if (provinciaIndex < 0) {
    // no comune and provincia found
    return [null, comune, provincia] as const;
  }

  return [comune.codiceCatastale, comune, provincia] as const;
};

export default getCodiceCatastale;
