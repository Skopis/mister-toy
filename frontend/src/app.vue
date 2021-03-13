<template>
  <div class="container main-layout">
  <div class="header-container full">
    <app-header class="main-layout"/>
  </div>
    <router-view />
    <footer class="main-footer full main-layout">
      <h3>AnimalRights 2021</h3>
    </footer>
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue";
export default {
  components: {
    appHeader,
  },
};
</script>