import type { CSSProperties } from 'react';
import { GlassSwatch } from '../../../../design-system/react/material-swatch';
import colors from '../../../../design-system/themes/macos/reference-colors.json';

const tints = ['Green', 'Yellow', 'Orange', 'Red', 'Purple', 'Blue'];
export function MaterialComparison() {
  return (
    <section className="material-reference" aria-label="Figma 材质对照">
      <h2>Liquid Glass</h2>
      <p className="muted">
        同一材质跨越六档背景。Light 与 Dark 同时展示，便于比较透色与边缘。
      </p>
      <div className="glass-comparison-grid">
        {(['light', 'dark'] as const).map((mode) => (
          <figure key={mode}>
            <figcaption>{mode === 'light' ? 'Light' : 'Dark'}</figcaption>
            <div className="glass-comparison" data-appearance={mode}>
              <div className="glass-comparison-native">
                <div className="glass-comparison-stripes" aria-hidden="true">
                  {[0.6, 0.5, 0.4, 0.3, 0.2, 0.1].map((alpha) => (
                    <span
                      key={alpha}
                      style={{
                        background: `rgb(${mode === 'light' ? '0 0 0' : '255 255 255'} / ${alpha})`,
                      }}
                    />
                  ))}
                </div>
                <div className="glass-comparison-small">
                  {tints.map((name) => (
                    <GlassSwatch key={name} size="small" />
                  ))}
                </div>
                <div className="glass-comparison-tints">
                  {tints.map((name) => (
                    <div
                      className="glass-tinted-swatch"
                      key={name}
                      style={
                        {
                          '--glass-tint': colors.groups[0].rows.find(
                            (row) => row.name === name,
                          )?.light,
                        } as CSSProperties
                      }
                    >
                      <span className="glass-tinted-backing" />
                      <span className="glass-tinted-white" />
                      <span className="glass-tinted-saturation" />
                      <span className="glass-tinted-overlay" />
                      <span className="glass-tinted-color" />
                      <span className="glass-tinted-highlight" />
                    </div>
                  ))}
                </div>
                <div className="glass-comparison-medium">
                  <GlassSwatch size="medium" />
                </div>
                <div className="glass-comparison-large">
                  <GlassSwatch size="large" />
                </div>
              </div>
            </div>
            <p className="muted">Small · Small tinted · Medium · Large</p>
          </figure>
        ))}
      </div>
      <p className="muted">
        这里采用原稿展示实例的配方；Dark 的两层填充均为
        50%，下方独立样本保留主组件的 70% / 90%。
      </p>
      <h2 className="material-comparison-title">Materials</h2>
      <p className="muted">
        五档普通材质放在同一张原稿背景上，按 Ultra Thick → Ultra Thin 排列。
      </p>
      {(['light', 'dark'] as const).map((mode) => (
        <figure
          className="regular-comparison"
          data-appearance={mode}
          key={mode}
        >
          <img
            className="regular-comparison-wallpaper"
            src={`${import.meta.env.BASE_URL}figma/materials/wallpaper-${mode}.webp`}
            alt=""
          />
          <figcaption>{mode === 'light' ? 'Light' : 'Dark'}</figcaption>
          <div className="regular-comparison-row">
            {(
              ['ultra-thick', 'thick', 'medium', 'thin', 'ultra-thin'] as const
            ).map((weight) => (
              <div key={weight}>
                <h3>
                  {weight
                    .split('-')
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(' ')}
                </h3>
                <div
                  className="cb-material-swatch"
                  data-material-weight={weight}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </figure>
      ))}
    </section>
  );
}
