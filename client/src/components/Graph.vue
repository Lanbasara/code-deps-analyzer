<script>
import * as echarts from 'echarts';
import 'vue-echarts';
import { convertDataToGraphFormat } from '../utils/index';

export default {
  data() {
    return {
      option: {},
    };
  },
  mounted() {
    const chartContainer = document.getElementById('chartContainer');
    const myChart = echarts.init(chartContainer);
    fetch('http://localhost:3000/dependencies')
      .then((res) => res.json())
      .then((graph) => {
        console.log('graph is', graph);
        const graphData = convertDataToGraphFormat(graph);
        console.log('graphData is', graphData);
        // graphData.nodes.forEach(function (node) {
        //   node.label = {
        //     show: node.symbolSize > 30,
        //   };
        // });
        this.option = {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right',
          },
          //   tooltip: {},
          //   legend: [
          //     {
          //       // selectedMode: 'single',
          //       data: graph.categories.map(function (a) {
          //         return a.name;
          //       }),
          //     },
          //   ],
          //   animationDuration: 1500,
          //   animationEasingUpdate: 'quinticInOut',
          legend: [
            {
              // selectedMode: 'single',
              data: graphData.categories.map(function (a) {
                return a.name;
              }),
            },
          ],
          series: [
            {
              draggable: true,
              type: 'graph',
              layout: 'force',
              nodes: graphData.nodes,
              links: graphData.links,
              categories: graphData.categories,
              autoCurveness: 0.01, //多条边的时候，自动计算曲率
              edgeSymbol: ['circle', 'arrow'], //边两边的类型
              force: {
                repulsion: 20,
                gravity: 0.01,
                edgeLength: 200,
                friction: 0.6,
                roam: true,
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: {
                  width: 10,
                },
              },
              label: {
                show: true,
                position: 'bottom',
                distance: 5,
                fontSize: 18,
                align: 'center',
              },
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3dd67a', // 0% 处的颜色
                    },
                    {
                      offset: 0.7,
                      color: '#3dd67a', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#95dcb2', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
          ],
        };
        myChart.setOption(this.option);
      });
    // myChart.setOption(this.option);
  },
};
</script>

<template>
  <div id="chartContainer"></div>
</template>

<style scoped>
#chartContainer {
  width: 100vw;
  height: 100vh;
}
</style>
