export const materials = {
  solid: '实色',
  'ultra-thin': 'Ultra Thin',
  thin: 'Thin',
  medium: 'Medium',
  thick: 'Thick',
  'ultra-thick': 'Ultra Thick',
} as const;

export type Preferences = {
  material: keyof typeof materials;
  fontLatin: 'system' | 'jetbrains' | 'sarasa';
  fontCjk: 'system' | 'sarasa';
  appearance: 'light' | 'dark' | 'system';
  density: 'comfortable' | 'compact';
};
const defaults: Preferences = {
  material: 'solid',
  fontLatin: 'system',
  fontCjk: 'system',
  appearance: 'system',
  density: 'comfortable',
};
function readPreferences(): Preferences {
  try {
    const p = JSON.parse(localStorage.getItem('craftbase-preferences') ?? '{}');
    return {
      material: Object.hasOwn(materials, p.material) ? p.material : 'solid',
      fontLatin: ['system', 'jetbrains', 'sarasa'].includes(p.fontLatin)
        ? p.fontLatin
        : ['jetbrains', 'sarasa'].includes(p.font)
          ? p.font
          : 'system',
      fontCjk: ['system', 'sarasa'].includes(p.fontCjk)
        ? p.fontCjk
        : ['jetbrains', 'sarasa'].includes(p.font)
          ? 'sarasa'
          : 'system',
      appearance: ['light', 'dark', 'system'].includes(p.appearance)
        ? p.appearance
        : 'system',
      density: p.density === 'compact' ? 'compact' : 'comfortable',
    };
  } catch {
    return defaults;
  }
}
export const initial = readPreferences();
export function apply(p: Preferences) {
  const appearance =
    p.appearance === 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : p.appearance;
  Object.assign(document.documentElement.dataset, {
    ...p,
    appearance,
    siteMaterial: p.material,
  });
  document.documentElement.classList.toggle('dark', appearance === 'dark');
  document.documentElement.style.colorScheme = appearance;
  return appearance;
}
apply(initial);
