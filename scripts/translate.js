const fs = require('fs');
const path = require('path');
const moment = require('moment');
const OpenAI = require('openai');
const { exit } = require('process');

const sourceLang = 'zh-Hans';
const targetLangs = ['en-US'];

const modelBaseUrl = process.env.OPENAI_BASE_URL;
const modelKey = process.env.OPENAI_API_KEY;
const modelName = process.env.OPENAI_MODEL;
const modelHumanReadableName = process.env.OPENAI_MODEL_HUMAN_READABLE_NAME || process.env.OPENAI_MODEL;

let skipAll = false;

const openai = new OpenAI({
    baseURL: modelBaseUrl,
    apiKey: modelKey,
});

const translate = async (content, targetLang) => {
    console.log(`Translating to ${targetLang} via ${modelHumanReadableName} (${modelName}), it may take a lot of time if the article is long...`);
    const stream = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    `You are a professional interpreter who can translate articles from ${sourceLang} to ${targetLang}.\n`
                    + 'User will provide the original article directly, without any other information.\n'
                    + 'The article is written in plain text, Markdown format or MDX format. '
                    + 'You should keep the original Markdown syntax and all HTML tags unchanged, if there are any. '
                    + 'Also, you should not translate meaningful items, such as URLs.\n'
                    + 'Reply with the translated article. '
                    + 'Do not include the original article in your reply. '
                    + 'Do not include anything other than the translated article in your reply.\n'
                    + 'Do not stop your response until you have finished translating the entire article.'
            },
            { role: 'user', content: content }
        ],
        model: modelName,
        stream: true,
    });

    let result = '';
    for await (const chunk of stream) {
        const chunkData = chunk.choices[0]?.delta?.content || '';
        result += chunkData;
        console.log(`${modelHumanReadableName} responding, length ${chunkData.length} / ${result.length}...`);
    }
    console.log(`${modelHumanReadableName} response finished, total length ${result.length}.`);

    return result;
};

const translateFile = async (filePath, targetLang, type) => {
    console.log(`Processing ${filePath}...`);

    const frontmatterRegex = /^---\n(.*)---\n(.*)/s;
    const lastTranslatedTimeRegex = /last_translated_at:\s*(.*)\n/s;

    var basePath = '';
    var outputPath = '';
    if (type === 'blog') {
        basePath = '../blog';
        outputPath = '../i18n/en-US/docusaurus-plugin-content-blog';
    } else if (type === 'page') {
        basePath = '../src/pages';
        outputPath = '../i18n/en-US/docusaurus-plugin-content-pages';
    }
    const folderPath = path.join(__dirname, basePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const translationFolder = path.join(__dirname, outputPath, path.relative(folderPath, path.dirname(filePath)));
    if (!fs.existsSync(translationFolder)) {
        fs.mkdirSync(translationFolder, { recursive: true });
    }
    const translationPath = path.join(translationFolder, path.basename(filePath));
    if (!fs.existsSync(translationPath)) {
        fs.writeFileSync(translationPath, fileContent, { flag: 'w' });
    }

    const translationContent = fs.readFileSync(translationPath, 'utf-8');
    const translationFrontmatterMatch = translationContent.match(frontmatterRegex);
    const translationFrontmatter = translationFrontmatterMatch ? translationFrontmatterMatch[1] : '';
    const lastTranslatedTimeMatch = translationFrontmatter.match(lastTranslatedTimeRegex);
    const lastTranslatedTime = lastTranslatedTimeMatch ? moment(lastTranslatedTimeMatch[1]) : null;

    if (lastTranslatedTime !== null) {
        if (!skipAll) {
            // Ask user on console if they want to translate again
            console.log(`This article was translated at ${lastTranslatedTime.format('YYYY-MM-DD HH:mm:ss')}.`);
            console.log('Do you want to translate again? Yes / No / Skip All (y/n/a)');
            const answer = await new Promise((resolve) => {
                process.stdin.once('data', (data) => {
                    resolve(data.toString().trim());
                });
            });
            if (answer !== 'y' && answer !== 'Y') {
                if (answer === 'a' || answer === 'A') {
                    console.log('(Will skip all translated articles.)');
                    skipAll = true;
                }
                console.log('Skipped.');
                return;
            }
        } else {
            console.log(`This article was translated at ${lastTranslatedTime.format('YYYY-MM-DD HH:mm:ss')}, skipped.`);
            return;
        }
    }
    const frontmatterMatch = fileContent.match(frontmatterRegex);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
    const mainContent = frontmatterMatch ? frontmatterMatch[2] : fileContent;
    const translatedMainContent = await translate(mainContent, targetLang);
    const translatedFullContent =
        `---\n${frontmatter}last_translated_at: ${moment().toISOString()}\n---\n\n`
        + `:::info[Translation Tool]\n\nThis article was translated via ${modelHumanReadableName} automatically, with minor manual corrections.\n\n:::\n\n`
        + translatedMainContent;

    fs.writeFileSync(translationPath, translatedFullContent);
    console.log('Done!');
};

const searchFiles = async (basePath, targetLang, type) => {
    const items = fs.readdirSync(basePath);
    for (const item of items) {
        const itemPath = path.join(basePath, item);
        const itemStats = fs.statSync(itemPath);
        if (itemStats.isDirectory()) {
            await searchFiles(itemPath, targetLang, type);
        } else if (itemStats.isFile() && (item.endsWith('.md') || item.endsWith('.mdx'))) {
            await translateFile(itemPath, targetLang, type);
            console.log('----------------------------------------');
        }
    }
};

const translateAllFiles = async (targetLang) => {
    const blogPath = path.join(__dirname, '../blog');
    await searchFiles(blogPath, targetLang, 'blog');

    const pagePath = path.join(__dirname, '../src/pages');
    await searchFiles(pagePath, targetLang, 'page');
};

(async () => {
    for (const targetLang of targetLangs) {
        await translateAllFiles(targetLang);
    }
    exit(0);
})();
