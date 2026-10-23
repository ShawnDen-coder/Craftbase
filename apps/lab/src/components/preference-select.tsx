import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Select } from 'radix-ui';
import { useId } from 'react';

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
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className="preference-select"
          aria-label={ariaLabel}
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDown size={14} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="preference-menu"
            position="popper"
            sideOffset={6}
            collisionPadding={12}
          >
            <Select.ScrollUpButton className="preference-scroll">
              <ChevronUp size={14} />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {Object.entries(options).map(([key, text]) => (
                <Select.Item
                  key={key}
                  value={key}
                  className="preference-option"
                >
                  <Select.ItemText>{text}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check size={14} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="preference-scroll">
              <ChevronDown size={14} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
