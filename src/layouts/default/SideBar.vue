<template>
  <v-list id="sidebarUser">
    <!-- https://skeletonreact.com/ -->
    <div v-if="!user" style="opacity:0.3;height:48px">
      <content-loader :speed="1" :animate="true" primaryColor="rgb(var(--v-theme-surface))" secondaryColor="#808080" viewBox="0 0 255 48">
        <rect x="16" y="0" rx="3" ry="3" width="223" height="24" />
        <rect x="16" y="30" rx="3" ry="3" width="223" height="18" />
      </content-loader>
    </div>
    <v-list-item v-if="user" :title="user.userName" :subtitle="user.userEmail"></v-list-item>
  </v-list>
  <v-list density="compact">
    <v-list-subheader>DASHBOARD</v-list-subheader>
    <v-list-item
      v-for="[icon, text, href] in links"
      :key="icon"
      active-class="v-list-item--active text-primary"
      @click="onItemClick(href)"
      :class="href === $route.path ? 'v-list-item--active text-primary' : ''"
    >
      <template v-slot:prepend>
        <v-icon :icon="icon"></v-icon>
      </template>
      <v-list-item-title v-text="text"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style>
  #sidebarUser {
    box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12))
  }
  .v-list-item.active .v-list-item__overlay {
    background: currentColor;
    opacity: 0.1;
  }
</style>

<script>
  import MixinAjax from './../../mixins/ajax.js'
  import { ContentLoader } from 'vue-content-loader'

  export default {
    components: {
      ContentLoader
    },
    mixins: [
      MixinAjax
    ],
    data() {
      return {
        user: null,
        links: [
          ['mdi-home', 'Home', '/'],
          ['mdi-help-box', 'About', '/about'],
        ],
      }
    },
    methods: {
      onItemClick(href) {
        this.$router.push({ path: href })
      },
      loadUser() {
        this.apiGet("/user").then((response) => {
          this.user = response.data;
        }).catch((err) => { this.processAxiosError(err) })
      },
    },
    mounted() {
      this.loadUser()
    },
  }
</script>
