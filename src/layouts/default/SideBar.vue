<template>
  <v-list id="sidebarUser">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      title="Sandra Adams"
      subtitle="sandra@gmail.com"
    ></v-list-item>
  </v-list>
  <v-list>
    <v-list-item
      v-for="[icon, text, href] in links"
      :key="icon"
      @click="onItemClick(href)"
    >
      <template v-slot:prepend>
        <v-icon>{{ icon }}</v-icon>
      </template>
      <v-list-item-title>{{ text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped>
  #sidebarUser {
    box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12))
  }
</style>

<script>
  export default {
    data() {
      return {
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
    },
  }
</script>
