import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';

interface Props {
  onChange: (dateTime: Dayjs) => void;
  placeholderText?: string;
  isEditable: boolean;
}

export function DatePick({ onChange, placeholderText, isEditable }: Props): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const now = dayjs();
  const startOfDay = dayjs().hour(10).minute(0).second(0).millisecond(0);
  const endOfDay = dayjs().hour(19).minute(0).second(0).millisecond(0);
  const maxDate = now.add(1, 'year');

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      onChange(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        minDate={now.startOf('day')}
        maxDate={maxDate}
        minDateTime={
          selectedDate?.isSame(now, 'day')
            ? now.isBefore(startOfDay)
              ? startOfDay
              : now.isBefore(endOfDay)
                ? now
                : undefined
            : startOfDay
        }
        disabled={!isEditable}
        ampm={false}
        slotProps={{
          textField: {
            placeholder: placeholderText || '날짜를 선택해주세요',
            fullWidth: true,
            InputProps: {
              sx: {
                borderRadius: '20px',
                input: { color: '#000000' },
                fontSize: '14px',
              },
            },
          },
        }}
        slots={{
          textField: TextField,
        }}
      />
    </LocalizationProvider>
  );
}
