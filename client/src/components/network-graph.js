import Graph from 'react-graph-vis';
import { useEffect } from 'preact/hooks';
import { convertDependenciesToGraphData } from '../utils/index';
/**
 * Generates a network graph using the provided props.
 *
 * @param {{
 *  graph : {
 *    nodes : Array<{id:number,label : string}>,
 *    edges : Array<{from :number, to : number}>
 *  },
 * options : {
 *  layout : Object,
 *  edges : Object,
 *  height : string,
 *  width : string
 *  }
 * }} props - The props used to configure the network graph.
 * @return {JSX.Element} The rendered network graph component.
 */

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

const graphs = convertDependenciesToGraphData(graphInfo);

export default function NetworkGraph(props) {
  // const graphs = {
  //   nodes: [
  //     { id: 'aaa', label: 'Node 1', title: 'node 1 tootip text' },
  //     { id: 'bbb', label: 'Node 2', title: 'node 2 tootip text' },
  //     { id: 'ccc', label: 'Node 3', title: 'node 3 tootip text' },
  //     { id: 'ddd', label: 'Node 4', title: 'node 4 tootip text' },
  //     { id: 'eee', label: 'Node 5', title: 'node 5 tootip text' },
  //   ],
  //   edges: [
  //     { from: 'aaa', to: 'bbb' },
  //     { from: 'aaa', to: 'ccc' },
  //     { from: 'bbb', to: 'ddd' },
  //     { from: 'bbb', to: 'eee' },
  //   ],
  // };

  const {
    graph,
    options = {
      edges: {
        color: '#000000',
      },
      height: '500px',
    },
  } = props;

  useEffect(() => {
    console.log('graph is', graph);
  }, [graph]);

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log('nodes', nodes, 'edges', edges);
    },
  };
  return <Graph graph={graphs} options={options} events={events} />;
}
