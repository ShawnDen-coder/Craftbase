import entries from './components.json';
export type ComponentMeta = (typeof entries)[number];
export const catalog = entries;
export const categories = [...new Set(catalog.map((item) => item.category))];
