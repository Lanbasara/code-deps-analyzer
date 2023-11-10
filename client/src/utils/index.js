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
      symbolSize: 60,
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
          symbolSize: 60,
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

  return { nodes, links };
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

export { convertDataToGraphFormat };
