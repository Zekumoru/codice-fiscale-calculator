import { useState } from 'react';
import DatePicker from './components/DatePicker';
import Select from './components/Select';
import TextInput from './components/TextInput';
import LoadingScreen from './components/LoadingScreen';
import useCodiceFiscale from './hooks/useCodiceFiscale';
import Footer from './components/Footer';

function App() {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => new Date());
  const [sex, setSex] = useState('Male');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthProvince, setBirthProvince] = useState('');
  const [getCodiceFiscale, codiceFiscale, isLoading, error] =
    useCodiceFiscale();

  const birthPlaceError = error?.fields.find((f) => f.field === 'comune');
  const provinceError = error?.fields.find((f) => f.field === 'provincia');

  const handleSubmit = async () => {
    if (birthPlace === '' || birthProvince === '') return;
    await getCodiceFiscale({
      birth: date,
      birthPlace,
      birthProvince,
      name,
      sex,
      surname,
    });
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {isLoading && <LoadingScreen />}
      <h1 className="font-bold text-2xl mb-4">Codice Fiscale Calculator</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={async (event) => {
          event.preventDefault();
          await handleSubmit();
        }}
      >
        <TextInput
          id="codice-fiscale"
          label="Codice Fiscale"
          name="codice-fiscale"
          placeholder="Codice fiscale will appear here..."
          value={codiceFiscale}
          disabled
        />
        <TextInput
          id="surname"
          label="Surname"
          name="surname"
          placeholder="Enter surname..."
          value={surname}
          onChange={setSurname}
          required
        />
        <TextInput
          id="name"
          label="Name"
          name="name"
          placeholder="Enter name..."
          value={name}
          onChange={setName}
          required
        />
        <DatePicker label="Date of birth" value={date} onChange={setDate} />
        <div className="flex flex-col gap-1">
          <div>Sex</div>
          <Select id="sex" name="sex" label="Sex" value={sex} onChange={setSex}>
            {['Male', 'Female'].map((sex) => (
              <option key={sex} value={sex}>
                {sex}
              </option>
            ))}
          </Select>
        </div>
        <TextInput
          id="place-of-birth"
          name="place-of-birth"
          label="Place of birth"
          placeholder="e.g. Milano"
          value={birthPlace}
          onChange={setBirthPlace}
          errMessage={birthPlaceError?.errMessage}
          required
        />
        <TextInput
          id="province-of-birth"
          name="province-of-birth"
          label="Province of birth (Acronym)"
          placeholder="e.g. MI"
          value={birthProvince}
          onChange={setBirthProvince}
          errMessage={provinceError?.errMessage}
          maxLength={2}
          required
        />
        <button className="p-4 border-2 rounded border-neutral-900 mt-4 text-lg hover:bg-neutral-900 hover:text-white transition">
          Submit
        </button>
        {error && error.type === 'calculation-error' && (
          <p className="text-red-600 font-semibold">Error: {error.message}</p>
        )}
      </form>
      <Footer />
    </div>
  );
}

export default App;
