import Select from './Select';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years: number[] = [];
for (let year = new Date().getFullYear(); year >= 1900; year--) {
  years.push(year);
}

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange?: (date: Date | ((date: Date) => Date)) => void;
}

const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div>{label}</div>
      <div className="flex gap-4">
        <Select
          id="day-of-birth"
          name="day-of-birth"
          label="Day"
          value={value.getDate() - 1}
          onChange={(day) =>
            onChange?.((date) => {
              date.setDate(Number(day) + 1);
              return new Date(date);
            })
          }
        >
          {[
            ...Array(
              new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate()
            ).keys(),
          ].map((day) => (
            <option key={day} value={day}>
              {(day + 1).toString().padStart(2, '0')}
            </option>
          ))}
        </Select>
        <Select
          id="month-of-birth"
          name="month-of-birth"
          label="Month"
          value={value.getMonth()}
          onChange={(month) =>
            onChange?.(() => {
              const newDate = new Date(value);
              newDate.setMonth(Number(month));
              if (newDate.getDate() != value.getDate()) {
                // correct day when the chosen month has less days than the
                // current chosen day (basically, if the new month has 30 days
                // but the current chosen day is 31 then make it 30)
                newDate.setMonth(Number(month) + 1);
                newDate.setDate(0);
              }
              return newDate;
            })
          }
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          id="year-of-birth"
          name="year-of-birth"
          label="Year"
          value={value.getFullYear()}
          onChange={(year) =>
            onChange?.(() => {
              const newDate = new Date(value);
              newDate.setFullYear(Number(year));
              if (newDate.getDate() != value.getDate()) {
                // correct day when the chosen year is leap year
                newDate.setMonth(newDate.getMonth());
                newDate.setDate(0);
              }
              return newDate;
            })
          }
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default DatePicker;
