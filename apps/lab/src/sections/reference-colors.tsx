import colors from '../../../../design-system/themes/macos/reference-colors.json';

const titles: Record<string, string> = {
  accents: 'Accents',
  vibrantAccents: 'Accents · Vibrant',
  fills: 'Fills',
  vibrantFills: 'Fills · Vibrant',
  labels: 'Text',
  vibrantLabels: 'Text · Vibrant',
};
export function ReferenceColors() {
  return (
    <section className="reference-colors" aria-label="Figma 原稿色板">
      <div className="section-heading">
        <div>
          <h2>Colors</h2>
          <p>原稿色板。每组上半为 Light，下半为 Dark。</p>
        </div>
        <span className="meta">46 组 · Light / Dark</span>
      </div>
      <p className="muted">
        Vibrant 保留原稿的混合层，不等同于一个固定的屏幕颜色。下方 Web
        语义色用于本站界面。
      </p>
      {colors.groups.map((group) => (
        <section className="reference-color-group" key={group.id}>
          <h3>{titles[group.id]}</h3>
          <div className="reference-color-grid" data-kind={group.id}>
            {group.rows.map((row) => (
              <figure key={row.name}>
                <figcaption>{row.name}</figcaption>
                <div
                  className="reference-color-pair"
                  role="img"
                  aria-label={`${row.name} Light / Dark`}
                >
                  {(['light', 'dark'] as const).map((mode) => (
                    <div
                      className="reference-color-half"
                      data-mode={mode}
                      key={mode}
                    >
                      {group.id.toLowerCase().includes('labels') ? (
                        <img
                          src={`${import.meta.env.BASE_URL}${row[mode].replace(/^\//, '')}`}
                          alt=""
                          width="56"
                          height="60"
                        />
                      ) : (
                        <>
                          {group.id === 'vibrantAccents' && (
                            <span className="reference-desaturate" />
                          )}
                          {group.id === 'vibrantFills' && (
                            <span
                              className="reference-fill-underlay"
                              style={{
                                background: colors.groups
                                  .find((g) => g.id === 'fills')
                                  ?.rows.find((r) => r.name === row.name)?.[
                                  mode
                                ],
                              }}
                            />
                          )}
                          <span
                            className="reference-color-ink"
                            style={{ background: row[mode] }}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {!group.id.toLowerCase().includes('labels') && (
                  <div className="reference-color-values">
                    <code title="Light">{row.light}</code>
                    <code title="Dark">{row.dark}</code>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
