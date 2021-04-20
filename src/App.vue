<template>
  <div id="app" class="mt-5">
    <nav class="level">
      <p class="level-item has-text-centered">
        <img
          alt="Duck Image"
          src="./assets/rubberDuck.png"
          style="height: 100px"
        />
      </p>
    </nav>
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
#app {
  text-align: center;
}
</style>
