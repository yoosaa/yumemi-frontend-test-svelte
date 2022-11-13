<script>
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'

  export let demographics = {}

  let renderAreas = []
  let chart = []
  onMount(() => {
    demographics.data.forEach((demographic, index) => {
      let xAxisLabels = []
      let dataValues = []
      demographic.data.forEach(d => {
        xAxisLabels.push(d.year)
        dataValues.push(d.value)
      })
      chart[index] = echarts.init(renderAreas[index])
      chart[index].setOption({
        title: {
          text: demographic.label
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        dataZoom: {
          show: true,
          start: 0,
          end: 100
        },
        xAxis: {
          data: xAxisLabels,
          name: '年',
          nameTextStyle: {
            fontSize: 8,
            fontWeight: 'bold'
          },
          axisLabel: {
            fontSize: 10,
            fontWeight: 'bold'
          }
        },
        yAxis: {
          name: '千人',
          nameTextStyle: {
            fontSize: 8,
            fontWeight: 'bold'
          },
          axisLabel: {
            fontSize: 9,
            fontWeight: 'bold',
            formatter: function (value) {
              return value / 1000
            }
          }
        },
        series: [
          {
            data: dataValues,
            type: 'line',
            areaStyle: {
              color: '#0DC5C1'
            }
          }
        ]
      })
    })
  })
</script>

<section class="graphs">
  {#each demographics.data as demographic, index (demographic.label)}
    <div class="graphWrap" bind:this={renderAreas[index]}></div>
  {/each}
</section>

<style lang="scss">
.graphs {
  padding-bottom: 100px;
  .graphWrap {
    width: 90%;
    min-height: 300px;
    margin: 16px auto 0 auto;
    aspect-ratio: 17 / 9;
  }
}
@include mq(pc) {
  .graphs {
    flex: 6;
    padding-left: 200px;
    padding-bottom: 60px;
    .graphWrap {
      width: 80%;
      margin: 24px auto 0 auto;
    }
  }
}
</style>
