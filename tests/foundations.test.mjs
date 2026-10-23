import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { generate, validateTheme } from '../scripts/build.mjs';

const reference = JSON.parse(
  await readFile(
    new URL('../design-system/themes/macos/tokens.json', import.meta.url),
  ),
);
const semantic = JSON.parse(
  await readFile(
    new URL('../design-system/tokens/semantic.json', import.meta.url),
  ),
);
const theme = {
  density: semantic.density,
  appearance: Object.fromEntries(
    Object.entries(semantic.appearance).map(([mode, values]) => [
      mode,
      { ...values, ...reference.appearance[mode] },
    ]),
  ),
};
const luminance = (hex) => {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) => {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
test('reject missing appearance and density tokens', () => {
  for (const [group, mode] of [
    ['appearance', 'dark'],
    ['density', 'compact'],
  ]) {
    const broken = structuredClone(theme);
    delete broken[group][mode][Object.keys(broken[group][mode])[0]];
    assert.throws(() => validateTheme(broken), /keys differ/);
  }
});
test('opaque text, action and focus colors meet baseline contrast', () => {
  for (const currentTheme of [theme]) {
    for (const [mode, t] of Object.entries(currentTheme.appearance)) {
      for (const bg of ['surface.canvas', 'surface.panel', 'surface.overlay']) {
        for (const fg of ['text.primary', 'text.secondary', 'status.danger'])
          assert.ok(contrast(t[fg], t[bg]) >= 4.5, `${mode}: ${fg}/${bg}`);
        for (const fg of ['focus.ring', 'border.control'])
          assert.ok(contrast(t[fg], t[bg]) >= 3, `${mode}: ${fg}/${bg}`);
      }
      assert.ok(
        contrast(t['status.on-danger'], t['status.danger']) >= 4.5,
        `${mode}: danger foreground`,
      );
      for (const bg of ['action.primary', 'action.hover'])
        assert.ok(
          contrast(t['action.on-primary'], t[bg]) >= 4.5,
          `${mode}: ${bg}`,
        );
      assert.ok(
        contrast(t['selection.text'], t['selection.background']) >= 4.5,
        mode,
      );
    }
  }
});
test('generated CSS resolves all emitted references and catalog is honest', async () => {
  const artifacts = await generate();
  const css = artifacts['design-system/styles/tokens.css'];
  const definitions = new Set(
    [...css.matchAll(/(--cb-[\w-]+):/g)].map((m) => m[1]),
  );
  const styles = await readFile(
    new URL('../design-system/styles/index.css', import.meta.url),
    'utf8',
  );
  for (const m of styles.matchAll(/(--cb-[\w-]+):/g)) definitions.add(m[1]);
  for (const m of (
    styles + artifacts['design-system/tailwind/theme.css']
  ).matchAll(/var\((--cb-[\w-]+)\)/g))
    assert.ok(definitions.has(m[1]), m[1]);
  const catalog = JSON.parse(artifacts['design-system/registry/catalog.json']);
  assert.equal(catalog.installable, false);
  assert.deepEqual(
    catalog.items.map((i) => i.id),
    ['button', 'dialog', 'input', 'menu'],
  );
  assert.ok(
    catalog.items.every(
      (i) =>
        i.status === 'historical' &&
        i.implementations.react === 'upstream' &&
        i.implementations.vue === 'not-in-scope',
    ),
  );
});

test('regular text surfaces remain readable over extreme backdrops', () => {
  for (const [mode, values] of Object.entries(theme.appearance)) {
    const [r, g, b, percent] = values['material.regular.tint']
      .match(/[\d.]+/g)
      .map(Number);
    const alpha = percent / 100;
    for (const backdrop of [0, 255]) {
      const composite = `#${[r, g, b]
        .map((channel) =>
          Math.round(channel * alpha + backdrop * (1 - alpha))
            .toString(16)
            .padStart(2, '0'),
        )
        .join('')}`;
      for (const foreground of ['text.primary', 'text.secondary']) {
        assert.ok(
          contrast(values[foreground], composite) >= 4.5,
          `${mode}: ${foreground} on ${composite}`,
        );
      }
    }
  }
});

test('glass surfaces keep foreground readable over extreme backdrops', () => {
  for (const [mode, values] of Object.entries(theme.appearance)) {
    const [r, g, b, percent] = values['material.overlay.tint']
      .match(/[\d.]+/g)
      .map(Number);
    for (const backdrop of [0, 255]) {
      const alpha = percent / 100;
      const composite = `#${[r, g, b]
        .map((c) =>
          Math.round(c * alpha + backdrop * (1 - alpha))
            .toString(16)
            .padStart(2, '0'),
        )
        .join('')}`;
      assert.ok(
        contrast(values['text.primary'], composite) >= 4.5,
        `${mode}: glass foreground on ${composite}`,
      );
    }
  }
});
