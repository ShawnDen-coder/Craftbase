import { materials, type Preferences } from '../lib/preferences';
import { PreferenceSelect } from './preference-select';
export type AppearanceProps = {
  prefs: Preferences;
  update: (key: keyof Preferences, value: string) => void;
};
export function AppearanceSettings({ prefs, update }: AppearanceProps) {
  return (
    <>
      <PreferenceSelect
        label="配色"
        ariaLabel="配色"
        value={prefs.appearance}
        onValueChange={(v) => update('appearance', v)}
        options={{ system: '跟随系统', light: '浅色', dark: '深色' }}
      />
      <PreferenceSelect
        label="密度"
        ariaLabel="密度"
        value={prefs.density}
        onValueChange={(v) => update('density', v)}
        options={{ comfortable: '舒适', compact: '紧凑' }}
      />
      <PreferenceSelect
        label="材质"
        ariaLabel="材质"
        value={prefs.material}
        onValueChange={(v) => update('material', v)}
        options={materials}
      />
      <PreferenceSelect
        label="英文字体"
        ariaLabel="英文字体"
        value={prefs.fontLatin}
        onValueChange={(v) => update('fontLatin', v)}
        options={{
          system: 'System',
          jetbrains: 'JetBrains Mono',
          sarasa: 'Sarasa Term SC',
        }}
      />
      <PreferenceSelect
        label="中文字体"
        ariaLabel="中文字体"
        value={prefs.fontCjk}
        onValueChange={(v) => update('fontCjk', v)}
        options={{ system: 'System', sarasa: 'Sarasa Term SC' }}
      />
    </>
  );
}
