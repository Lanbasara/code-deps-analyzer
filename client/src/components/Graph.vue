<script>
import * as echarts from 'echarts';
import 'vue-echarts';
import { convertDataToGraphFormat, setColor } from '../utils/index';

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
        const graphData = convertDataToGraphFormat(graph);
        this.option = {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right',
          },
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          tooltip: {
            z: 60,
            show: true,
            showContent: true,
            formatter: (data) => {
              console.log('data is', data);
              switch (data.dataType) {
                case 'node': {
                  return `${data.data.name}`;
                }
                case 'edge': {
                  return 'edge';
                }
                default: {
                  return 'aaa';
                }
              }
            },
            trigger: 'item',
            triggerOn: 'mousemove|click',
            alwaysShowContent: false,
            displayMode: 'single',
            renderMode: 'auto',
            confine: null,
            showDelay: 0,
            hideDelay: 100,
            transitionDuration: 0.4,
            enterable: false,
            backgroundColor: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            borderRadius: 4,
            borderWidth: 1,
            padding: null,
            extraCssText: '',
            textStyle: {
              color: '#666',
              fontSize: 14,
            },
            axisPointer: {
              type: 'line',
              axis: 'auto',
              animation: 'auto',
              animationDurationUpdate: 200,
              animationEasingUpdate: 'exponentialOut',
              crossStyle: {
                color: '#999',
                width: 1,
                type: 'dashed',
              },
            },
          },
          legend: {
            data: graphData.categories.map(function (a) {
              return {
                name: a.name,
                itemStyle: {
                  color: setColor(a.name),
                },
              };
            }),
          },
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
                repulsion: 50,
                gravity: 0.005,
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
              lineStyle: {
                curveness: 0.3,
              },
              label: {
                show: true,
                position: 'bottom',
                distance: 5,
                fontSize: 18,
                align: 'center',
              },
            },
          ],
        };
        myChart.setOption(this.option);
      });
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
