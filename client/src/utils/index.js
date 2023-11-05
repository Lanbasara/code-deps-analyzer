/**
 * Generates a graph representation of the given dependencies.
 *
 * @param {Object} dependencies - The dependencies object.
 * @param {Array} dependencies.path - The paths of the dependencies.
 * @param {Array} dependencies.path.importedModules - The imported modules for each path.
 * @param {string} dependencies.path.importedModules.source - The source path of each imported module.
 * @return {Object} The graph representation of the dependencies.
 */
function convertDependenciesToGraphData(dependencies) {
  const nodes = [];
  const edges = [];

  for (const path in dependencies) {
    nodes.push({ id: path, label: path, title: path });
  }

  for (const path in dependencies) {
    const importedModules = dependencies[path].importedModules;
    for (const module of importedModules) {
      if (dependencies[module.source]) {
        edges.push({ from: path, to: module.source });
      }
    }
  }

  return { nodes, edges };
}

const graphInfo = {
  '/Users/ludwig/Code/code-deps-analyzer/example/src/App.vue': {
    type: 'vue',
    importedModules: [
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/example/src/components/HelloWorld.vue',
        specifier: [
          {
            type: 'default',
            localName: 'HelloWorld',
          },
        ],
      },
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/example/src/components/DynamicComponent.vue',
        specifier: ['DynamicComponent'],
      },
    ],
  },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/main.js': {
    type: 'js',
    importedModules: [
      {
        source: '/Users/ludwig/Code/code-deps-analyzer/node_modules/vue',
        specifier: [
          {
            type: 'default',
            localName: 'Vue',
          },
        ],
      },
      {
        source: '/Users/ludwig/Code/code-deps-analyzer/example/src/App.vue',
        specifier: [
          {
            type: 'default',
            localName: 'App',
          },
        ],
      },
    ],
  },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/helpers/tools.ts': {
    type: 'ts',
    importedModules: [
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/node_modules/axios/dist/node',
        specifier: [
          {
            type: 'named',
            importedName: 'getAdapter',
            localName: 'getAdapter',
          },
          {
            type: 'named',
            importedName: 'ParamEncoder',
            localName: 'ParamEncoder',
          },
        ],
      },
    ],
  },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/helpers/utils.js': {
    type: 'js',
    importedModules: [
      {
        source: '/Users/ludwig/Code/code-deps-analyzer/node_modules/lodash',
        specifier: [
          {
            type: 'namespace',
            localName: '_',
          },
        ],
      },
    ],
  },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/components/A.vue': {
    type: 'vue',
    importedModules: [
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/example/src/components/B.vue',
        specifier: [
          {
            type: 'default',
            localName: 'B',
          },
        ],
      },
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/example/src/components/subComponents/C.vue',
        specifier: [
          {
            type: 'default',
            localName: 'C',
          },
        ],
      },
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/node_modules/ant-design-vue/lib',
        specifier: [
          {
            type: 'named',
            importedName: 'Button',
            localName: 'Button',
          },
        ],
      },
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/node_modules/ant-design-vue/lib',
        specifier: [
          {
            type: 'named',
            importedName: 'Message',
            localName: 'MyMessage',
          },
        ],
      },
    ],
  },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/components/B.vue': {
    type: 'vue',
    importedModules: [
      {
        source:
          '/Users/ludwig/Code/code-deps-analyzer/example/src/components/subComponents/C.vue',
        specifier: [
          {
            type: 'default',
            localName: 'C',
          },
        ],
      },
    ],
  },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/components/HelloWorld.vue':
    {
      type: 'vue',
      importedModules: [],
    },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/components/subComponents/C.vue':
    {
      type: 'vue',
      importedModules: [
        {
          source:
            '/Users/ludwig/Code/code-deps-analyzer/example/src/components/A.vue',
          specifier: [
            {
              type: 'default',
              localName: 'A',
            },
          ],
        },
        {
          source:
            '/Users/ludwig/Code/code-deps-analyzer/example/src/helpers/utils',
          specifier: [
            {
              type: 'named',
              importedName: 'utils',
              localName: 'utils',
            },
          ],
        },
      ],
    },
  '/Users/ludwig/Code/code-deps-analyzer/example/src/components/tsComponents/D.tsx':
    {
      type: 'ts',
      importedModules: [
        {
          source: '/Users/ludwig/Code/code-deps-analyzer/node_modules/vue',
          specifier: [
            {
              type: 'named',
              importedName: 'defineComponent',
              localName: 'defineComponent',
            },
          ],
        },
        {
          source:
            '/Users/ludwig/Code/code-deps-analyzer/example/src/helpers/tools',
          specifier: [
            {
              type: 'named',
              importedName: 'getAdapter',
              localName: 'getAdapter',
            },
          ],
        },
      ],
    },
};

const graph = convertDependenciesToGraphData(graphInfo);

export { convertDependenciesToGraphData };
