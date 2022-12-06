<div class="loader">
  <div class="loaderBox">
    <div class="circleBorder">
      <div class="circleCore"></div>
    </div>
  </div>
</div>

<style lang="scss">
.loader {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  z-index: 10;
  &Box {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  .circle {
    &Border {
      width: 150px;
      height: 150px;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgb(63,249,220);
      background: linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%);
      animation: spin .8s linear 0s infinite;
    }
    &Core {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 50%;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}
</style>