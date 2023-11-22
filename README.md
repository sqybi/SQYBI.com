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
- Use `npm run translate` to translate all blog articles automatically by GPT-4-turbo. It will skip the translation if the original file was not modified since the last translation time, to reduce the usage of ChatGPT API.
- Translate or adjust the items in the frontmatter by yourself -- they will not be translated by ChatGPT automatically.

### Site

- Use `npm run write-translations -- --locale {target_locale}` to append new translation items.
- Translate them by yourself.
