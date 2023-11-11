/**
 * Converts the given data to a graph format.
 *
 * @param {Object} data - The data to be converted.
 * @return {Object} An object representing the graph format of the data.
 */
function convertDataToGraphFormat(data) {
  const nodes = [];
  const links = [];
  const nodeIds = new Set();

  // Iterate over each file in the data
  for (const filePath in data) {
    const file = data[filePath];

    // Create a node for the file
    const fileNode = {
      category: file?.type,
      symbolSize: file?.codeColums,
      id: filePath,
      name: setFileName(filePath),
      color: setColor(file?.type),
    };
    if (!nodeIds.has(filePath)) {
      nodes.push(fileNode);
      nodeIds.add(filePath);
    }

    // Iterate over each imported module in the file
    for (const importedModule of file.importedModules) {
      const source = importedModule.source;

      // Check if the imported module is already a node
      if (!nodeIds.has(source)) {
        // Create a new node for the imported module
        const newNode = {
          category: file?.type,
          symbolSize: file?.codeColums,
          id: source,
          name: setFileName(source),
        };
        nodes.push(newNode);
        nodeIds.add(source);
      }

      // Create a link between the file and the imported module
      const link = { source: filePath, target: source };
      links.push(link);
    }
  }

  // Add isolated nodes to the graph
  for (const node of nodes) {
    if (
      !links.some((link) => link.source === node.id || link.target === node.id)
    ) {
      links.push({ source: node.id, target: node.id });
    }
  }

  remapNumbers(nodes, 60, 2);

  const categories = generateCategory(nodes);

  return { nodes, links, categories };
}

/**
 * Pickup graph node display name from a given file path.
 *
 * @param {string} filePath - The path of the file.
 * @return {string} The file name.
 */
function setFileName(filePath) {
  return /.*\/(\w+(\.\w+)?)$/.exec(filePath)[1] || filePath;
}

function setColor(type) {
  const colorMap = {
    vue: 'green',
    js: 'yellow',
    ts: 'blue',
  };
  return colorMap[type];
}

function remapNumbers(nodes, newMean, ratio, decimalPlaces = 2) {
  let oldMean =
    nodes.reduce((acc, val) => acc + val?.symbolSize || 10, 0) / nodes.length;

  console.log('oldMean is', oldMean);
  nodes.forEach((node) => {
    node.symbolSize = ((node.symbolSize - oldMean) * ratio + newMean).toFixed(
      decimalPlaces
    );
  });
}

function generateCategory(nodes) {
  const category = ['vue', 'js', 'ts'].map((type) => {
    return {
      name: type,
    };
  });

  nodes.forEach((node) => {
    node.category = category
      .map((item) => item.name)
      .findIndex((item) => {
        return node.category === item;
      });
  });

  return category;
}

export { convertDataToGraphFormat };
