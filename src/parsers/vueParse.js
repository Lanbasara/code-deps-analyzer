const { parse } = require('@vue/compiler-sfc');
const { parseScriptCode } = require('./jsParse');

/**
 * Parses a Vue file and returns the imported modules.
 * @param {string} filePath - The path of file to be parsed.
 * @param {string} fileContent - The content of the Vue file.
 * @param { Map } dependencies
 * @returns {void}
 */
function parseVueFile(filePath, fileContent, dependencies) {
  const { descriptor } = parse(fileContent);
  const importedModules = parseScriptCode(descriptor.script?.content);
  dependencies.set(filePath, importedModules);
}

module.exports = {
  parseVueFile,
};
