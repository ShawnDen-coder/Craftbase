# Font assets

Self-hosted fonts for the ShowCase appearance selector.
- JetBrains Mono v2.304, Regular and SemiBold WOFF2 from the [official repository](https://github.com/JetBrains/JetBrainsMono/tree/v2.304/fonts/webfonts). License: JetBrainsMono-OFL.txt.
- Sarasa Term SC v1.0.42, Regular and SemiBold from the [official unhinted TTF release](https://github.com/be5invis/Sarasa-Gothic/releases/tag/v1.0.42), converted to WOFF2 with FontTools. Full character coverage retained; no outline or naming changes. License: Sarasa-OFL.txt.

System is the default. Latin and Chinese fonts are selected independently. Latin supports System, JetBrains Mono and Sarasa Term SC; Chinese supports System and Sarasa Term SC. Unicode-range aliases prevent either custom Latin face from overriding Chinese glyphs. Existing combined preferences are migrated without changing their appearance. Fonts load on demand and are distributed with the site, without a third-party font CDN. Regular maps to 400, SemiBold supplies the UI's 500–700 emphasis range.
