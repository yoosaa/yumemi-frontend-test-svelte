<script>
  import Loading from '../lib/components/Loading.svelte'
  import PrefecturesList from '../lib/components/PrefecturesList.svelte'
  import GraphList from '../lib/components/GraphList.svelte'
  import { page } from '$app/stores'


  let selecteditems = []
  const updateSelecteditem = e => {
    selecteditems = e.detail.selecteditems
  }

  import { createParam } from '../lib/js/funcs.js'
  $: demographicsData = handleGetDemographics(selecteditems)

  const handleGetDemographics = async targets => {
    if (targets.length === 0) return {}

    // パラメータ作成
    const param = createParam(targets)

    const res = await fetch(`/api/resus-portal-population?prefs=${param}`, { method: 'GET' })
    const resData = await res.json()

    return await resData.result
  }
</script>

<div class="main">
<!-- 都道府県一覧 -->
{#await $page.data}
  <Loading />
{:then data}
  <PrefecturesList prefectures={data.result} on:updateSelecteditem={updateSelecteditem} {selecteditems} />
{:catch error}
  {alert(error)}
{/await}

<!-- グラフ一覧 -->
{#await demographicsData}
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
