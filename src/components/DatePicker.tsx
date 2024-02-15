import Select from "./Select";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years: number[] = [];
for (let year = new Date().getFullYear(); year >= 1900; year--) {
  years.push(year);
}

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | ((date: Date) => Date)) => void;
}

const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  const date = new Date(value!.getFullYear(), value!.getMonth() + 1, 1);
  date.setDate(0);

  return (
    <div className="flex flex-col gap-1">
      <div>{label}</div>
      <div className="flex gap-4">
        <Select
          id="day-of-birth"
          name="day-of-birth"
          label="Day"
          value={(value?.getDate() ?? 1) - 1}
          onChange={(day) =>
            onChange?.((date) => {
              date.setDate(Number(day) + 1);
              return new Date(date);
            })
          }
        >
          {[...Array(date.getDate()).keys()].map((day) => (
            <option key={day} value={day}>
              {(day + 1).toString().padStart(2, "0")}
            </option>
          ))}
        </Select>
        <Select
          id="month-of-birth"
          name="month-of-birth"
          label="Month"
          value={value?.getMonth() ?? 0}
          onChange={(month) =>
            onChange?.((date) => {
              date.setMonth(Number(month));
              return new Date(date);
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
          value={value?.getFullYear() ?? 1900}
          onChange={(year) =>
            onChange?.((date) => {
              date.setFullYear(Number(year));
              return new Date(date);
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
