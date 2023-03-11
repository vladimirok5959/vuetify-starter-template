<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
    watch: {
      $route: {
        immediate: true,
        handler(to, from) {
          document.title = to.meta.title || import.meta.env.VITE_APP_TITLE
        }
      },
    }
  };
</script>
