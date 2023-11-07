const fs = require('fs');
const { parse } = require('@vue/compiler-sfc');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { getAbsPath } = require('./path.js');

/**
 * Parses the given code and extracts the imports from it.
 *
 * @param {string} code - The code to parse.
 * @param {string} filePath - The path of the file containing the code.
 * @param {object} [options] - The options for parsing.
 * @param {boolean} [options.isTs=false] - Indicates if the code is TypeScript.
 * @return {Array} - An array of imports extracted from the code.
 */
function parseFilePathCode(code, filePath) {
  if (!code) return [];
  const ast = parser.parse(code, {
    sourceType: 'unambiguous',
    plugins: ['jsx', 'typescript'],
  });
  const imports = [];
  const sourcesKey = new Set()

  traverse(ast, {
    ImportDeclaration(path) {
      const importSpecifier = path.node.specifiers.map((specifier) => {
        switch (specifier.type) {
          case 'ImportDefaultSpecifier':
            return {
              type: 'default',
              localName: specifier.local.name,
            };
          case 'ImportSpecifier':
            return {
              type: 'named',
              importedName: specifier.imported.name,
              localName: specifier.local.name,
            };
          case 'ImportNamespaceSpecifier':
            return {
              type: 'namespace',
              localName: specifier.local.name,
            };
          default:
            break;
        }
      });



      const source = getAbsPath(filePath, path.node.source.value);
      if(!sourcesKey.has(source)){
        imports.push({
          source,
          specifier: importSpecifier,
        });
      } else {
        const importIndex = imports.findIndex((importItem) => importItem.source === source);
        imports[importIndex].specifier = imports[importIndex].specifier.concat(importSpecifier);
      }
      sourcesKey.add(source)

      
    },
    CallExpression(path) {
      if (path.node.callee.type === 'Import') {
        const targetDynamicImport = path.findParent((p) => {
          if (p.node.type === 'ObjectProperty') {
            return true;
          }
        });
        const dynamicImportKey = targetDynamicImport.node.key.name;
        imports.push({
          source: getAbsPath(filePath, path.node.arguments[0].value),
          specifier: [dynamicImportKey],
        });
      }
    },
  });

  return imports;
}

/**
 * Parses a Vue file and extracts the imported modules.
 *
 * @param {string} filePath - The path of the Vue file.
 * @param {Map} dependencies - A map of file paths to their dependencies.
 * @return {void} This function does not return a value.
 */
function vueParser(filePath, dependencies) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { descriptor } = parse(fileContent);
  const importedModules = parseFilePathCode(
    descriptor.script?.content,
    filePath
  );
  dependencies.set(filePath, {
    type: 'vue',
    importedModules,
  });
}

/**
 * Parses a JavaScript file, extracts the imported modules, and adds them to the dependencies map.
 *
 * @param {string} filePath - The path of the JavaScript file.
 * @param {Map} dependencies - A map that stores the dependencies of each file.
 * @return {undefined} This function does not return a value.
 */
function jsorTsParser(filePath, dependencies, fileExt) {
  const isTs = /\.tsx?/.test(fileExt);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const importedModules = parseFilePathCode(fileContent, filePath);
  dependencies.set(filePath, {
    type: isTs ? 'ts' : 'js',
    importedModules,
  });
}

function getSupportedFileExt() {
  return Array.from(Parser.keys())
    .map((item) => item.replace(/\.(\w+)/, '$1'))
    .join(',');
}

const Parser = new Map([
  ['.vue', vueParser],
  ['.js', jsorTsParser],
  ['.jsx', jsorTsParser],
  ['.ts', jsorTsParser],
  ['.tsx', jsorTsParser],
]);

module.exports = {
  Parser,
  getSupportedFileExt,
};
