<script>
  import Loading from './Loading.svelte'
  import PrefecturesList from './PrefecturesList.svelte'
  import GraphList from './GraphList.svelte'
  import { getData } from '../js/funcs.js'

  const prefectures = getData(`https://opendata.resas-portal.go.jp/api/v1/prefectures`)

  let selecteditems = []
  const updateSelecteditem = e => {
    selecteditems = e.detail.selecteditems
  }

  $: demographics = handleGetDemographics(selecteditems)
  const handleGetDemographics = targets => {
    if (targets.length === 0) return {}
    // パラメータ作成
    let param = ''
    if (targets.length === 1) {
      param = `prefCode=${selecteditems[0]}`
    } else {
      param = `prefCode=${selecteditems[0]}&addArea=`
      for (let i = 1; i < targets.length; i++) {
        param += i === 1 ? `${targets[i]}_` : `,${targets[i]}_`
      }
    }

    return getData(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${param}`)
  }
</script>

<div class="main">
<!-- 都道府県一覧 -->
{#await prefectures}
  <Loading />
{:then prefectures}
  <PrefecturesList prefectures={prefectures} on:updateSelecteditem={updateSelecteditem} {selecteditems} />
{:catch error}
  {alert(error)}
{/await}

<!-- グラフ一覧 -->
{#await demographics}
  <Loading />
{:then demographics}
  {#if Object.keys(demographics).length}
    <GraphList {demographics} />
  {:else}
    <p class="nodataMessage">No Data</p>
  {/if}
{:catch error}
  {alert(error)}
{/await}
</div>

<style lang="scss">
.main {
  .nodataMessage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: clamp(18px, 3vw, 100px);
    font-weight: 700;
    color: rgba(0, 0, 0, .3);
  }
}
@include mq(pc) {
  .main {
    display: flex;
    .nodataMessage {
      transform: translateY(-50%);
    }
  }
}
</style>
