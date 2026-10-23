export const docGroups = [
  { title: '开始', items: [{ id: 'introduction', title: '阅读指南' }] },
  {
    title: '基础设计',
    items: [
      { id: 'foundations', title: '色彩、文字与空间' },
      { id: 'states', title: '状态与尺寸' },
    ],
  },
  {
    title: '设计体系',
    items: [
      { id: 'systems', title: '体系概览' },
      {
        id: 'systems/macos',
        title: 'macOS',
        children: [
          { id: 'systems/macos/foundations', title: '色彩与字号参考' },
          { id: 'systems/macos/materials', title: '材质与层级' },
        ],
      },
    ],
  },
  { title: '组件适配', items: [{ id: 'adapters/shadcn', title: 'shadcn/ui' }] },
];
export const docTopics = docGroups.flatMap((group) =>
  group.items.flatMap((item) => [
    { id: item.id, title: item.title, group: group.title },
    ...(item.children
      ? item.children.map((child) => ({
          ...child,
          group: `${group.title} / macOS`,
        }))
      : []),
  ]),
);
