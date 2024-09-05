# SQYBI.com

The [SQYBI.com](https://sqybi.com) website.

## Technologies Used

- Framework: [Docusaurus](https://docusaurus.io/)
- Serve on: [Cloudflare Pages](https://www.cloudflare.com/developer-platform/pages/)
- Comments plugin: [giscus](https://giscus.app/)
- Coding and writing assistent: [Github Copilot](https://github.com/features/copilot)
- Automated translation: [ChatGPT API](https://platform.openai.com)

## i18n

### Blogs

- Copy `.env.example`, rename to `.env`, add your OpenAI secret key.
- Use `npm run translate` to translate all blog articles automatically by GPT-4o. It will skip the translation if the original file was not modified since the last translation time, to reduce the usage of ChatGPT API.
- Translate or adjust the items in the frontmatter by yourself -- they will not be translated by ChatGPT automatically.

### Site

- Use `npm run write-translations -- --locale {target_locale}` to append new translation items.
- Translate them by yourself.

## Fonts

This site uses `Noto Serif SC` and `JetBrains Mono` as default font.

Use `npm run download-fonts` to download and upgrade fonts from Google Fonts. Update `custom-font.css.template` if necessary.

## Upgrade Docusaurus

There will be an alert like this if new version of Docusaurus released:

```text
    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
                                                                                                                                                                                                                     
                                                                                             Update available 3.x.x → 3.x.x                                                                                          
                                                                                                                                                                                                                     
                                                                    To upgrade Docusaurus packages with the latest version, run the following command:                                                               
         `npm i @docusaurus/core@latest @docusaurus/plugin-ideal-image@latest @docusaurus/preset-classic@latest @docusaurus/theme-mermaid@latest @docusaurus/module-type-aliases@latest @docusaurus/types@latest`    
                                                                                                                                                                                                                     
    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
```

Upgrading Docusaurus may break build since this blog used some internal interfaces and they are not stable. You need to fix them by yourself.
