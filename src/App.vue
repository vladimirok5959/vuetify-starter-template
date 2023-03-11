<template>
  <v-snackbar v-model="snackBarShow">
    {{ snackBarMsg }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackBarShow = false">Close</v-btn>
    </template>
  </v-snackbar>
  <router-view />
</template>

<style>
  .v-data-table-footer {
    background: rgb(var(--v-theme-on-surface-variant));
    padding: 16px 16px !important;
  }
</style>

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
    },
    data() {
      return {
        snackBarMsg: '',
        snackBarShow: false,
      }
    },
    methods: {
      showMsg(message) {
        this.snackBarMsg = message
        this.snackBarShow = true
      },
      showNoConnectionMsg() {
        this.snackBarMsg = import.meta.env.VITE_APP_ERR_NETWORK
        this.snackBarShow = true
      },
    },
  };
</script>
