export type ComponentMeta = {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  source: string;
  order: number;
  features: string[];
};
const metadata = import.meta.glob<ComponentMeta>(
  '../../../../design-system/react/ui/*.meta.json',
  { eager: true, import: 'default' },
);
export const catalog = Object.values(metadata).sort(
  (a, b) => a.order - b.order,
);
