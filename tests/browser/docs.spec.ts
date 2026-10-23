import { expect, test } from '@playwright/test';

test('document hierarchy and persistent footer', async ({ page }) => {
  await page.goto('/#/docs/introduction');
  await expect(
    page.getByRole('heading', { name: '阅读指南', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.docs-nav-children')).toContainText('材质与层级');
  await page.screenshot({ path: 'artifacts/docs-hierarchy.png' });
  await page.goto('/#/docs/materials');
  await expect(page.locator('.docs-breadcrumb')).toContainText(
    '设计体系 / macOS',
  );
  const footer = page.locator('.site-footer');
  const initial = await footer.boundingBox();
  const scroller = page.locator('.site-scroll-region');
  await scroller.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await expect
    .poll(() => scroller.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(100);
  expect(await footer.boundingBox()).toEqual(initial);
  if (!initial) throw new Error('Footer missing');
  expect(initial.y + initial.height).toBeLessThanOrEqual(1000);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(
    1000,
  );
  await page.screenshot({ path: 'artifacts/docs-macos-footer.png' });
  await page.goto('/#/docs/foundations');
  await expect(page.locator('.docs-content h1')).toHaveText('设计基础');
  await expect.poll(() => scroller.evaluate((el) => el.scrollTop)).toBe(0);
  await expect(page.locator('.docs-content')).not.toContainText('原稿');
  await page.goto('/#/docs/systems/macos/foundations');
  await expect(page.locator('.docs-content h1')).toHaveText(
    'macOS 色彩与字号参考',
  );
  await page.goto('/');
  await expect(page.locator('.showcase-grid')).toBeVisible();
  await page.screenshot({ path: 'artifacts/showcase-final.png' });
});
