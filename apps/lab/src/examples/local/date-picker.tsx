import { useState } from 'react';
import { zhCN } from 'react-day-picker/locale';
import { Button } from '../../../../../design-system/react/ui/button';
import { Calendar } from '../../../../../design-system/react/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../design-system/react/ui/popover';
export default function DatePickerExample() {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date ? date.toLocaleDateString('zh-CN') : '选择日期'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={zhCN}
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
