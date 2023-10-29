const fg = require('fast-glob');
const path = require('path')
const fs = require('fs')
const { parseVueFile } = require('./parsers/vueParse');
const publicPath = '../example'

const sources = [
  path.join(__dirname,publicPath,'src/**/*.vue'),
  path.join(__dirname,publicPath,'src/**/*.js'),
  path.join(__dirname,publicPath,'src/**/*.ts'),
]

async function processFiles() {
  try {
    // 遍历目录并获取Vue、JavaScript和TypeScript文件列表
    const files = await fg(sources);

    for (const file of files) {
      // 读取文件内容
      const fileContent = fs.readFileSync(file, 'utf-8');

      // 解析Vue文件并输出import的结果
      if (file.endsWith('.vue')) {
        const importedModules = parseVueFile(fileContent);
        console.log(`Vue file: ${file}`);
        console.log(importedModules);
      } else if (file.endsWith('.js')) {
        // 处理JavaScript文件
        console.log(`JavaScript file: ${file}`);
        // 其他逻辑...
      } else if (file.endsWith('.ts')) {
        // 处理TypeScript文件
        console.log(`TypeScript file: ${file}`);
        // 其他逻辑...
      }
    }
  } catch (err) {
    console.error(err);
  }
}

processFiles();