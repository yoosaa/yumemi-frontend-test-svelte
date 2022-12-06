<script>
  import { tweened } from 'svelte/motion'
  import { quintOut } from 'svelte/easing'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let prefectures = []

  let visibleFlg = false
  const listHeight = tweened(0, { duration: 150, easing: quintOut })
  let windowWidth = null
  $: {
    if (windowWidth > 768) {
      $listHeight = 100
      visibleFlg = true
    } else {
      $listHeight = 0
      visibleFlg = false
    }
  }

  const handleSlide = () => {
    $listHeight = visibleFlg ? 0 : 45
    visibleFlg = !visibleFlg
  }

  export let selecteditems = []
  const updateSelecteditem = e => {
    // apiの都合で１０件以上は同時に送信できない
    if (selecteditems.length > 9) {
      alert('同時に選択できる都道府県は10までです。')
      e.target.checked = false
      return
    }

    const value = e.target.value
    if (selecteditems.indexOf(value) === -1) selecteditems.push(value)
    else selecteditems.splice(selecteditems.indexOf(value), 1)

    // 念のため重複削除
    selecteditems = [...new Set(selecteditems)]
    dispatch('updateSelecteditem', { selecteditems: selecteditems})
  }
</script>

<!-- window幅取得用 -->
<svelte:window bind:innerWidth={windowWidth} />
<!-- window幅取得用 -->
<section class="prefecturelist"
  style="height: {$listHeight}vh;"
>
  <button class="toggleButton"
    on:click|preventDefault={handleSlide}
  >都道府県一覧</button>
  <div class="listsWrap">
    <ul class="lists">
      {#each prefectures as prefecture (prefecture.prefCode)}
        <li>
          <label class="label">
            <input type="checkbox" class="checkbox"
              value={prefecture.prefCode}
              on:change={updateSelecteditem}
            >
            <span class="checkboxDummy"></span>
            <span class="labelText">{prefecture.prefName}</span>
          </label>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
.prefecturelist {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45vh;
  border-top: 1px solid rgba(0, 0, 0, .4);
  background-color: #fff;
  z-index: 1;
  .toggleButton {
    width: 50vw;
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    display: block;
    position: absolute;
    text-align: center;
    top: -50px;
    right: 0;
    color: #fff;
    font-weight: bold;
    letter-spacing: .1rem;
    background-color: var(--main-color);
    border-radius: 20px 20px 0 0;
  }
  .listsWrap {
    height: 100%;
    overflow-y: scroll;
  }
  .lists {
    width: fit-content;
    padding-top: 12px;
    margin: auto;
  }
  .label {
    padding: 6px 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &Text {
      margin-left: 10px;
      display: block;
      font-size: 1rem;
      font-weight: 500;
    }
  }
  .checkbox {
    margin: 0;
    width: 0;
    opacity: 0;
    &:focus
    +.checkboxDummy {
      border: 1px dashed #333333;
    }
    &:checked
    +.checkboxDummy {
      background-color: var(--main-color);
      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 2px;
        border-radius: 2px;
        transform: translate(0px, 3px) rotateZ(-135deg);
        transform-origin: 0;
        background-color: #fff;
      }
      &::after {
        transform: translate(0px, 2px) rotateZ(-45deg);
      }
    }
    &Dummy {
      position: relative;
      top: 0;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      border: 1px solid transparent;
      background: rgba(0, 0, 0, .2);
      border-radius: 4px;
    }
  }
}
@include mq(pc) {
  .prefecturelist{
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: auto;
    border-top: none;
    border-right: 1px solid rgba(0, 0, 0, .4);
    .toggleButton {
      display: none;
    }
    .listsWrap {
      padding-top: 72px;
      padding-bottom: 20px;
    }
  }
}
</style>
