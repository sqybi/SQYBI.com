const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const concurrency = 10;

const templateFilePath = './src/css/custom-font.css.template';
const outputFilePath = './src/css/custom-font.css';
const fontsDirPath = './static/fonts/';

if (fs.existsSync(fontsDirPath)) {
    execSync(`rm -rf ${fontsDirPath}/*`);
} else {
    fs.mkdirSync(fontsDirPath, { recursive: true });
}

const cssContent = fs.readFileSync(templateFilePath, 'utf-8');

const urlRegex = /url\((['"]?)(https?:\/\/[^'"\)]+)\1\)/g;
let match;
const urls = [];

while ((match = urlRegex.exec(cssContent)) !== null) {
    urls.push(match[2]);
}

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

const downloadAllFiles = async () => {
    let activeDownloads = 0;
    let count = 0;
    const total = urls.length;
    const downloadQueue = [...urls];
    const results = [];

    const downloadNext = async () => {
        if (downloadQueue.length === 0) return;

        const url = downloadQueue.shift();
        const fileName = path.basename(url);
        const destPath = path.join(fontsDirPath, fileName);
        const current_count = ++count;

        activeDownloads++;
        console.log(`Downloading (${current_count} / ${total}): ${url}...`);

        try {
            await downloadFile(url, destPath);
            console.log(`Downloaded (${current_count} / ${total}): ${url} -> ${destPath}`);
            results.push({ url, success: true });
        } catch (err) {
            console.error(`Error downloading ${url} (${current_count} / ${total}):`, err);
            results.push({ url, success: false, error: err });
        } finally {
            activeDownloads--;
            downloadNext();
        }
    };

    while (activeDownloads < concurrency && downloadQueue.length > 0) {
        downloadNext();
    }

    while (activeDownloads > 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // 等待所有下载完成
    }

    return results;
};

const replaceUrls = () => {
  const outputCssContent = cssContent.replace(urlRegex, (match, p1, p2) => {
    const fileName = path.basename(p2); // 获取文件名
    return `url('/fonts/${fileName}')`;
  });

  fs.writeFile(outputFilePath, outputCssContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log(`CSS file generated at ${outputFilePath}.`);
  });
};

downloadAllFiles().then(() => {
    console.log('All files downloaded.');
}).catch((err) => {
    console.error('Error:', err);
});

replaceUrls();
