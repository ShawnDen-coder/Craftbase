import { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../design-system/react/ui/select';
export function PreferenceSelect({
  label,
  ariaLabel,
  value,
  onValueChange,
  options,
}: {
  label: string;
  ariaLabel: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Record<string, string>;
}) {
  const id = useId();
  return (
    <div className="specimen-setting">
      <label htmlFor={id}>{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} aria-label={ariaLabel} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([key, text]) => (
            <SelectItem key={key} value={key}>
              {text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
