const sourceLang = 'zh-Hans';
const targetLangs = ['en-US'];

const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Translation method:
// 1. check all the md or mdx files under /blog
// 2. for each file, get its last edited time from filesystem
// 3. check if there is a corresponding file under /i18n/en-US/docusaurus-plugin-content-blog
// 4. if there is not, create one
// 5. get its last translated time from frontmatter property "last_translated_at", the format is UTC time string
// 6. if the last edited time is later than the last translated time, call translate() api to translate the file content, without the frontmatter
// 7. if the last edited time is later than the last translated time, update the last translated file, including: the original frontmatter, the translated content, and then add the "last_translated_at" frontmatter with last edited time

const translate = async (content, targetLang) => {
    return "Translated";
};

const translateFile = async (file, targetLang) => {
    const filePath = path.join(blogPath, file);
    const translationPath = path.join(
        __dirname,
        '../i18n/en-US/docusaurus-plugin-content-blog',
        path.basename(filePath)
    );
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lastEditedTime = moment(fs.statSync(filePath).mtime);

    const frontmatterRegex = /^---\n(.*?)\n---\n(.*)/;
    const lastTranslatedTimeRegex = /last_translated_at:\s*(.*)\n/;

    if (!fs.existsSync(translationPath)) {
        fs.writeFileSync(translationPath, fileContent);
    }
    const translationContent = fs.readFileSync(translationPath, 'utf-8');
    const frontmatterMatch = translationContent.match(frontmatterRegex);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
    const content = frontmatterMatch ? frontmatterMatch[2] : fileContent;
    const lastTranslatedTimeMatch = frontmatter.match(lastTranslatedTimeRegex);
    const lastTranslatedTime = lastTranslatedTimeMatch ? moment(lastTranslatedTimeMatch[1]) : null;

    if (lastTranslatedTime === null ||lastEditedTime > lastTranslatedTime) {
        const frontmatterMatch = fileContent.match(frontmatterRegex);

        fs.writeFileSync(translationPath, JSON.stringify(updatedTranslation, null, 2));
    }
};

const translateAllFiles = async (targetLang) => {
    const blogPath = path.join(__dirname, '../blog');
    const files = fs.readdirSync(blogPath);

    for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
            await translateFile(file, blogPath, targetLang);
        }
    }
};

for (const targetLang of targetLangs) {
    translateAllFiles(targetLang);
}
