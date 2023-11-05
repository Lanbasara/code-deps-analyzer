import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';
import NewGraph from '../../components/network-graph';
import { convertDependenciesToGraphData } from '../../utils/index';
const Home = () => {
  const [graph, setGraph] = useState({});
  useEffect(() => {
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
    setGraph(convertDependenciesToGraphData(graphInfo));
  }, []);

  return (
    <div class={style.home}>
      <h1>Get Started Building PWAs with Preact-CLI</h1>
      <NewGraph graph={graph} />
    </div>
  );
};

export default Home;
