<template>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <!-- Custom Header -->
    <Header />

    <!-- Main Content with Sidebar on the Right -->
    <div class="d-flex flex-grow-1">
      <main class="content flex-grow-1" style="margin-right: 250px; padding: 20px; width: calc(100% - 250px);">
        <router-view />
      </main>
      <Sidebar class="flex-shrink-0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Sidebar,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
  overflow-y: auto;
}
</style>