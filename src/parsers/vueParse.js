const { parse } = require('@vue/compiler-sfc');

function parseVueFile(fileContent) {
  const { descriptor } = parse(fileContent);
  const imports = descriptor.script?.content?.match(/import\s+.*?from\s+['"](.+?)['"]/g) || [];
  const importedModules = imports.map((importStatement) => {
    const match = importStatement.match(/import\s+.*?from\s+['"](.+?)['"]/);
    return match[1];
  });
  return importedModules;
}

module.exports = {
  parseVueFile,
};
