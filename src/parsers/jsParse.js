const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

/**
 *
 * @param {string} code - The script code to be parsed.
 */
function parseScriptCode(code) {
  if (!code) return [];
  const ast = parser.parse(code, {
    sourceType: "unambiguous",
    plugins: ["jsx", "typescript"],
  });
  const imports = [];

  traverse(ast, {
    ImportDeclaration(path) {
      const importSpecifier = path.node.specifiers.map((specifier) => {
        if (specifier.type === "ImportDefaultSpecifier") {
          return {
            type: "default",
            localName: specifier.local.name,
          };
        } else if (specifier.type === "ImportSpecifier") {
          return {
            type: "named",
            importedName: specifier.imported.name,
            localName: specifier.local.name,
          };
        }
      });

      imports.push({
        source: path.node.source.value,
        specifier: importSpecifier,
      });
    },
    CallExpression(path) {
      if (path.node.callee.type === "Import") {
        const targetDynamicImport = path.findParent((p) => {
          if (p.node.type === "ObjectProperty") {
            return true;
          }
        });
        const dynamicImportKey = targetDynamicImport.node.key.name;
        imports.push({
          source: path.node.arguments[0].value,
          specifier: [dynamicImportKey],
        });
      }
    },
  });

  return imports;
}

module.exports = {
  parseScriptCode,
};
