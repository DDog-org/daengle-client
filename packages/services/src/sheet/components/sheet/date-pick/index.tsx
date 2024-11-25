import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.styles';

interface Props {
  onChange: (dateTime: Date) => void;
}

const DatePick: React.FC<Props> = ({ onChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const now = new Date();
  const startOfDay = new Date();
  startOfDay.setHours(10, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(19, 0, 0, 0);

  const isTodayValid = now.getHours() < 19 || (now.getHours() === 19 && now.getMinutes() === 0);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      onChange(date);
    }
  };

  return (
    <div css={styles.wrapper}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        timeCaption="시간"
        dateFormat="yyyy.MM.dd HH:mm"
        minDate={isTodayValid ? now : new Date(now.getTime() + 24 * 60 * 60 * 1000)}
        minTime={
          selectedDate?.toDateString() === now.toDateString()
            ? now.getHours() >= 10 && now.getHours() < 19
              ? now
              : startOfDay
            : startOfDay
        }
        maxTime={endOfDay}
        placeholderText="날짜와 시간을 선택하세요"
        css={styles.datePicker}
      />
    </div>
  );
};

export default DatePick;
