const fs = require('fs');
const path = require('path');

function saveDependenciesToFile(dependencies, filePath) {
  const dependenciesObj = Object.fromEntries(dependencies);
  const json = JSON.stringify(dependenciesObj, null, 2);
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filePath, json);
  console.log(`Dependencies saved to ${filePath}`);
}

module.exports = {
  saveDependenciesToFile,
};
