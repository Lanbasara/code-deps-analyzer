const graphInfo = {
  "/Users/haokun/Code/code-deps-analyzer/example/src/App.vue": {
    type: "vue",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/components/HelloWorld.vue",
        specifier: [
          {
            type: "default",
            localName: "HelloWorld"
          }
        ]
      },
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/components/DynamicComponent.vue",
        specifier: [
          "DynamicComponent"
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/main.js": {
    type: "js",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/node_modules/vue",
        specifier: [
          {
            type: "default",
            localName: "Vue"
          }
        ]
      },
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/App.vue",
        specifier: [
          {
            type: "default",
            localName: "App"
          }
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/components/A.vue": {
    type: "vue",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/components/B.vue",
        specifier: [
          {
            type: "default",
            localName: "B"
          }
        ]
      },
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/components/subComponents/C.vue",
        specifier: [
          {
            type: "default",
            localName: "C"
          }
        ]
      },
      {
        source: "/Users/haokun/Code/code-deps-analyzer/node_modules/ant-design-vue/lib",
        specifier: [
          {
            type: "named",
            importedName: "Button",
            localName: "Button"
          },
          {
            type: "named",
            importedName: "Message",
            localName: "MyMessage"
          }
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/components/B.vue": {
    type: "vue",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/components/subComponents/C.vue",
        specifier: [
          {
            type: "default",
            localName: "C"
          }
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/components/HelloWorld.vue": {
    type: "vue",
    importedModules: []
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/helpers/tools.ts": {
    type: "ts",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/node_modules/axios/dist/node",
        specifier: [
          {
            type: "named",
            importedName: "getAdapter",
            localName: "getAdapter"
          },
          {
            type: "named",
            importedName: "ParamEncoder",
            localName: "ParamEncoder"
          }
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/helpers/utils.js": {
    type: "js",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/node_modules/lodash",
        specifier: [
          {
            type: "namespace",
            localName: "_"
          }
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/components/subComponents/C.vue": {
    type: "vue",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/components/A.vue",
        specifier: [
          {
            type: "default",
            localName: "A"
          }
        ]
      },
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/helpers/utils",
        specifier: [
          {
            type: "named",
            importedName: "utils",
            localName: "utils"
          }
        ]
      }
    ]
  },
  "/Users/haokun/Code/code-deps-analyzer/example/src/components/tsComponents/D.tsx": {
    type: "ts",
    importedModules: [
      {
        source: "/Users/haokun/Code/code-deps-analyzer/node_modules/vue",
        specifier: [
          {
            type: "named",
            importedName: "defineComponent",
            localName: "defineComponent"
          }
        ]
      },
      {
        source: "/Users/haokun/Code/code-deps-analyzer/example/src/helpers/tools",
        specifier: [
          {
            type: "named",
            importedName: "getAdapter",
            localName: "getAdapter"
          }
        ]
      }
    ]
  }
}
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
      id: filePath,
      name: setFileName(filePath),
      color : setColor(file?.type)
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
          id: source,
          name: setFileName(source)
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
  return /.*\/(\w+(\.\w+)?)$/.exec(filePath)[1] || filePath
}

function setColor(type){
  const colorMap = {
    vue: 'green',
    js: 'yellow',
    ts: 'blue'
  }
  return colorMap[type]
}

const data = convertDataToGraphFormat(graphInfo);

console.log(data);

export { convertDataToGraphFormat };
