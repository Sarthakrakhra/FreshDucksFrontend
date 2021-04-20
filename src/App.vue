<template>
  <div id="app" class="container mt-5">
    <nav class="level">
      <router-link to="/" class="level-item has-text-centered">
        <img
          alt="Duck Image"
          src="./assets/rubberDuck.png"
          style="height: 100px"
        />
      </router-link>
    </nav>
    <router-view />
  </div>
</template>
