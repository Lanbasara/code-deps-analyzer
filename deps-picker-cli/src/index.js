// Imports
const fg = require('fast-glob');
const path = require('path');
const { Parser, getSupportedFileExt } = require('./parser');
const { publicPath, resultPath } = require('./path');
const { saveDependenciesToFile } = require('./result');
//-------------------------------

const SUPPORTED_FILE_EXTS = getSupportedFileExt();
// glob遍历的文件目录列表
const sources = [
  path.join(__dirname, publicPath, `src/**/*.{${SUPPORTED_FILE_EXTS}}`),
];

const dependencies = new Map();

//-------------------------------
async function processFiles() {
  try {
    // 遍历目录并获取Vue、JavaScript和TypeScript文件列表
    const files = await fg(sources);
    for (const file of files) {
      const fileExt = path.extname(file);
      Parser.get(fileExt)(file, dependencies, fileExt);
    }
    console.log(dependencies); // 打印所有文件的import信息
    process.on('exit', () => {
      saveDependenciesToFile(dependencies, resultPath);
    });
  } catch (err) {
    console.error(err);
  }
}

processFiles();
