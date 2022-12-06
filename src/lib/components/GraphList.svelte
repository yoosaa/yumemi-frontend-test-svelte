<script>
  import { onMount } from 'svelte'
  import { handleEcharts } from '../js/funcs.js'

  export let demographics = {}

  let renderAreas = []
  let charts = []
  let handleEchart = new handleEcharts()
  onMount(() => {
    demographics.data.forEach((demographic, index) => {
      let xAxisLabels = []
      let dataValues = []
      demographic.data.forEach(d => {
        xAxisLabels.push(d.year)
        dataValues.push(d.value)
      })
      // option設定
      handleEchart.options.title.text = demographic.label
      handleEchart.options.xAxis.data = xAxisLabels
      handleEchart.options.series[0].data = dataValues

      charts = [...charts, handleEchart.init(renderAreas[index])]
    })
  })

  let windowWidth = null
  const resizeChart = trigger => {
    charts.forEach(chart => { chart.reRender() })
  }
  $: { resizeChart(windowWidth) }
</script>

<!-- window幅取得用 -->
<svelte:window bind:innerWidth={windowWidth} />
<!-- window幅取得用 -->
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
