declare module 'react-datepicker' {
  import * as React from 'react';
  import { Interpolation, Theme } from '@emotion/react';

  export interface Props {
    selected: Date | null;
    onChange: (date: Date | null, event?: React.SyntheticEvent) => void;
    showTimeSelect?: boolean;
    timeFormat?: string;
    timeIntervals?: number;
    timeCaption?: string;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    minTime?: Date;
    maxTime?: Date;
    placeholderText?: string;
    className?: string;
    css?: Interpolation<Theme>;
    customInput?: React.ReactNode;
  }

  const ReactDatePicker: React.FC<Props>;
  export default ReactDatePicker;
}
