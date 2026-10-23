import { expect, test } from '@playwright/test';
import catalog from '../../apps/lab/src/registry/components.json' with {
  type: 'json',
};

for (const appearance of ['light', 'dark'])
  for (const density of ['comfortable', 'compact']) {
    test(`all previews render: ${appearance} / ${density}`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.addInitScript(
        ({ appearance, density }) =>
          localStorage.setItem(
            'craftbase-preferences',
            JSON.stringify({ appearance, density, material: 'solid' }),
          ),
        { appearance, density },
      );
      await page.goto('/#/components');
      for (const item of catalog) {
        await page.goto(`/#/components/${item.id}`, {
          waitUntil: 'domcontentloaded',
        });
        await expect(page.locator('.specimen-settings h1')).toHaveText(
          item.title,
        );
        await expect(page.locator('.component-preview')).toBeVisible();
        await expect(page.locator('.component-preview')).not.toContainText(
          '正在加载预览',
        );
        await expect(page.locator('.component-preview')).not.toContainText(
          '预览加载失败',
        );
        await expect(page.locator('.component-preview')).not.toContainText(
          '暂无预览',
        );
        expect(
          await page.locator('.component-preview').textContent(),
          item.id,
        ).not.toBe('');
        expect(errors, item.id).toEqual([]);
      }
    });
  }
test('preferences, form, table and nested portal keep state', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute(
    'data-site-material',
    'solid',
  );
  await page.getByLabel('项目名称', { exact: true }).fill('');
  await page.getByRole('button', { name: '保存示例', exact: true }).click();
  await expect(page.getByText('请输入项目名称。')).toBeVisible();
  await page.getByLabel('项目名称', { exact: true }).fill('测试工作区');
  await page.getByRole('button', { name: '保存示例', exact: true }).click();
  await expect(page.getByText('已保存到本次演示')).toBeVisible();
  await page.getByRole('combobox', { name: '配色', exact: true }).click();
  await page.getByRole('option', { name: '深色', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByLabel('项目名称', { exact: true })).toHaveValue(
    '测试工作区',
  );
  await page.getByRole('combobox', { name: '密度', exact: true }).click();
  await page.getByRole('option', { name: '紧凑', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-density', 'compact');
  const trigger = page.getByRole('button', { name: '打开设置弹窗' });
  await trigger.click();
  await page.getByRole('combobox', { name: '通知频率' }).click();
  await page.getByRole('option', { name: '全部通知' }).click();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await page.getByLabel('搜索设计资产').fill('不存在');
  await expect(page.getByText('没有匹配项，请调整搜索词。')).toBeVisible();
  await page.getByLabel('搜索设计资产').fill('');
  await page.getByRole('button', { name: '下一页', exact: true }).click();
  await expect(
    page.getByRole('button', { name: '上一页', exact: true }),
  ).toBeEnabled();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-density', 'compact');
  await expect(page.locator('html')).toHaveClass(/dark/);
});
test('directory filters and compatibility links', async ({ page }) => {
  await page.goto('/#/shadcn');
  await page.getByLabel('搜索组件').fill('button');
  await expect(page.locator('.directory-entry')).toHaveCount(2);
  await page.goto('/#/components/menu');
  await expect(page.locator('.specimen-settings h1')).toHaveText('下拉菜单');
  await page.goto('/#/components/date-picker');
  await page.getByRole('button', { name: '选择日期', exact: true }).click();
  await expect(page.locator('.rdp-root')).toBeVisible();
});
test('desktop layouts and optional materials', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.recharts-bar-rectangle').first()).toBeVisible();
  for (const width of [1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(page.getByRole('heading', { name: '数据概览' })).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await page.screenshot({
      path: `artifacts/showcase-${width}.png`,
      fullPage: true,
    });
  }
  for (const material of [
    'Ultra Thin',
    'Thin',
    'Medium',
    'Thick',
    'Ultra Thick',
    '实色',
  ]) {
    await page.getByRole('combobox', { name: '材质', exact: true }).click();
    await page.getByRole('option', { name: material, exact: true }).click();
    await page.getByRole('button', { name: '打开设置弹窗' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.getByRole('button', { name: '打开设置弹窗' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({ path: 'artifacts/forced-colors.png' });
});

test('menu keyboard navigation and focused previews', async ({ page }) => {
  await page.goto('/#/components/dropdown-menu');
  const trigger = page
    .locator('.component-preview [data-slot="dropdown-menu-trigger"]')
    .first();
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menu').first()).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await page.goto('/#/components/button');
  await expect(page.locator('.official-example').first()).toBeVisible();
  await page.screenshot({
    path: 'artifacts/buttons-light.png',
    fullPage: true,
  });
  await page.getByRole('combobox', { name: '配色', exact: true }).click();
  await page.getByRole('option', { name: '深色', exact: true }).click();
  await page.screenshot({ path: 'artifacts/buttons-dark.png', fullPage: true });
  await page.goto('/#/components');
  await expect(page.locator('.directory-entry')).toHaveCount(catalog.length);
  await page.screenshot({
    path: 'artifacts/directory-dark.png',
    fullPage: true,
  });
});
