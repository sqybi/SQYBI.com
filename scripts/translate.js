const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { fileURLToPath } = require('url');
const OpenAI = require('openai');

const sourceLang = 'zh-Hans';
const targetLangs = ['en-US'];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const translate = async (content, targetLang) => {
    const stream = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    `You are a professional interpreter who can translate articles from ${sourceLang} to ${targetLang}.\n`
                    + 'User will provide the original article directly, without any other information.\n'
                    + 'The article is written in plain text, Markdown format or MDX format. '
                    + 'You should keep the original Markdown syntax or MDX syntax if there are any. '
                    + 'MDX syntax looks like Markdown + HTML. '
                    + 'Also, you should not translate meaningful items, such as URLs.\n'
                    + 'Reply with the translated article. '
                    + 'Do not include the original article in your reply. '
                    + 'Do not include anything other than the translated article in your reply.\n'
                    + 'Do not stop your response until you have finished translating the entire article.'
            },
            { role: 'user', content: content }
        ],
        model: 'gpt-4-1106-preview',
        stream: true,
    });

    let result = '';
    for await (const chunk of stream) {
        const chunkData = chunk.choices[0]?.delta?.content || '';
        result += chunkData;
        console.log(`ChatGPT responding, length ${chunkData.length} / ${result.length}...`);
    }
    const chatCompletion = await stream.finalChatCompletion();
    const chatCompletionData = chatCompletion.choices[0]?.delta?.content || '';
    result += chatCompletionData;
    console.log(`ChatGPT response finished, last length ${chatCompletionData.length} / ${result.length}.`);

    return result;
};

const translateFile = async (filePath, targetLang) => {
    console.log(`Translating ${filePath} to ${targetLang} by ChatGPT, it may take a lot of time if the article is long...`);

    const frontmatterRegex = /^---\n(.*)---\n(.*)/s;
    const lastTranslatedTimeRegex = /last_translated_at:\s*(.*)\n/s;

    const blogPath = path.join(__dirname, '../blog');
    const translationPath = path.join(
        __dirname,
        '../i18n/en-US/docusaurus-plugin-content-blog',
        path.relative(blogPath, filePath),
    );

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lastEditedTime = moment(fs.statSync(filePath).mtime);
    if (!fs.existsSync(translationPath)) {
        fs.writeFileSync(translationPath, fileContent);
    }

    const translationContent = fs.readFileSync(translationPath, 'utf-8');
    const translationFrontmatterMatch = translationContent.match(frontmatterRegex);
    const translationFrontmatter = translationFrontmatterMatch ? translationFrontmatterMatch[1] : '';
    const lastTranslatedTimeMatch = translationFrontmatter.match(lastTranslatedTimeRegex);
    const lastTranslatedTime = lastTranslatedTimeMatch ? moment(lastTranslatedTimeMatch[1]) : null;

    if (lastTranslatedTime === null || lastEditedTime > lastTranslatedTime) {
        const frontmatterMatch = fileContent.match(frontmatterRegex);
        const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
        const mainContent = frontmatterMatch ? frontmatterMatch[2] : fileContent;
        const translatedMainContent = await translate(mainContent, targetLang);
        const translatedFullContent =
            `---\n${frontmatter}\nlast_translated_at: ${lastEditedTime.toISOString()}\n---\n\n`
            + '> (This article was translated by ChatGPT automatically.)\n\n'
            + translatedMainContent;

        fs.writeFileSync(translationPath, translatedFullContent);
        console.log('Done.');
    } else {
        console.log('Already translated, skipped.');
    }
};

const searchFiles = async (basePath, targetLang) => {
    const items = fs.readdirSync(basePath);
    for (const item of items) {
        const itemPath = path.join(basePath, item);
        const itemStats = fs.statSync(itemPath);
        if (itemStats.isDirectory()) {
            await searchFiles(itemPath, targetLang);
        } else if (itemStats.isFile() && (item.endsWith('.md') || item.endsWith('.mdx'))) {
            await translateFile(itemPath, targetLang);
        }
    }
};

const translateAllFiles = async (targetLang) => {
    const blogPath = path.join(__dirname, '../blog');
    await searchFiles(blogPath, targetLang);
};

(async () => {
    for (const targetLang of targetLangs) {
        await translateAllFiles(targetLang);
    }
})();
