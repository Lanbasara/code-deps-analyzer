import { Graph } from 'react-d3-graph';
import { convertDataToGraphFormat } from '../utils/index';
const myConfig = {
  nodeHighlightBehavior: true,
  directed : true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue',
    labelProperty: 'name'
  },
  link: {
    highlightColor: 'lightblue',
    // renderLabel : true,
    // labelProperty : (link) => {
    //   const {source, target} = link
    //   return 'label'
    // }
  },
};


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

const data = convertDataToGraphFormat(graphInfo);
console.log('data is', data);

// const dataDemo = {
//   links: [
//     { source: 'Marvel', target: 'Heroes' },
//     { source: 'Marvel', target: 'Villains' },
//     { source: 'Marvel', target: 'Teams' },
//     { source: 'Heroes', target: 'Spider-Man' },
//     { source: 'Heroes', target: 'CAPTAIN MARVEL' },
//     { source: 'Heroes', target: 'HULK' },
//     { source: 'Heroes', target: 'Black Widow' },
//     { source: 'Heroes', target: 'Daredevil' },
//     { source: 'Heroes', target: 'Wolverine' },
//     { source: 'Heroes', target: 'Captain America' },
//     { source: 'Heroes', target: 'Iron Man' },
//     { source: 'Heroes', target: 'THOR' },
//     { source: 'Villains', target: 'Dr. Doom' },
//     { source: 'Villains', target: 'Mystique' },
//     { source: 'Villains', target: 'Red Skull' },
//     { source: 'Villains', target: 'Ronan' },
//     { source: 'Villains', target: 'Magneto' },
//     { source: 'Villains', target: 'Thanos' },
//     { source: 'Villains', target: 'Black Cat' },
//     { source: 'Teams', target: 'Avengers' },
//     { source: 'Teams', target: 'Guardians of the Galaxy' },
//     { source: 'Teams', target: 'Defenders' },
//     { source: 'Teams', target: 'X-Men' },
//     { source: 'Teams', target: 'Fantastic Four' },
//     { source: 'Teams', target: 'Inhumans' },
//   ],
//   nodes: [
//     {
//       id: 'Marvel',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/marvel.png',
//       size: 500,
//       fontSize: 18,
//     },
//     { id: 'Heroes', symbolType: 'circle', color: 'red', size: 300 },
//     { id: 'Villains', symbolType: 'circle', color: 'red', size: 300 },
//     { id: 'Teams', symbolType: 'circle', color: 'red', size: 300 },
//     {
//       id: 'Spider-Man',
//       name: 'Peter Benjamin Parker',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png',
//       size: 400,
//     },
//     {
//       id: 'CAPTAIN MARVEL',
//       name: 'Carol Danvers',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainmarvel.png',
//       size: 400,
//     },
//     {
//       id: 'HULK',
//       name: 'Robert Bruce Banner',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png',
//       size: 400,
//     },
//     {
//       id: 'Black Widow',
//       name: 'Natasha Alianovna Romanova',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_blackwidow.png',
//       size: 400,
//     },
//     {
//       id: 'Daredevil',
//       name: 'Matthew Michael Murdock',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_daredevil.png',
//       size: 400,
//     },
//     {
//       id: 'Wolverine',
//       name: 'James Howlett',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_wolverine.png',
//       size: 400,
//     },
//     {
//       id: 'Captain America',
//       name: 'Steven Rogers',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainamerica.png',
//       size: 400,
//     },
//     {
//       id: 'Iron Man',
//       name: 'Tony Stark',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_ironman.png',
//       size: 400,
//     },
//     {
//       id: 'THOR',
//       name: 'Thor Odinson',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_thor.png',
//       size: 400,
//     },
//     {
//       id: 'Dr. Doom',
//       name: 'Victor von Doom',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/drdoom.png',
//       size: 400,
//     },
//     {
//       id: 'Mystique',
//       name: 'Unrevealed',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/mystique.png',
//       size: 400,
//     },
//     {
//       id: 'Red Skull',
//       name: 'Johann Shmidt',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/redskull.png',
//       size: 400,
//     },
//     {
//       id: 'Ronan',
//       name: 'Ronan',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/ronan.png',
//       size: 400,
//     },
//     {
//       id: 'Magneto',
//       name: 'Max Eisenhardt',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/magneto.png',
//       size: 400,
//     },
//     {
//       id: 'Thanos',
//       name: 'Thanos',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/thanos.png',
//       size: 400,
//     },
//     {
//       id: 'Black Cat',
//       name: 'Felicia Hardy',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/blackcat.png',
//       size: 400,
//     },
//     {
//       id: 'Avengers',
//       name: '',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/avengers.png',
//       size: 400,
//     },
//     {
//       id: 'Guardians of the Galaxy',
//       name: '',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/gofgalaxy.png',
//       size: 400,
//     },
//     {
//       id: 'Defenders',
//       name: '',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/defenders.png',
//       size: 400,
//     },
//     {
//       id: 'X-Men',
//       name: '',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/xmen.png',
//       size: 400,
//     },
//     {
//       id: 'Fantastic Four',
//       name: '',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/fantasticfour.png',
//       size: 400,
//     },
//     {
//       id: 'Inhumans',
//       name: '',
//       svg: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/inhumans.png',
//       size: 400,
//     },
//   ],
// };


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
export default function MyGraph() {
  return (
    <Graph
      id="graph-id"
      data={data}
      config={myConfig}
      // plus any event handlers you want, e.g. onClickNode, onClickLink
    />
  );
}
