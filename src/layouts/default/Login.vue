<template>
  <v-app id="inspire">
    <default-view />
  </v-app>
</template>

<script>
  import { useTheme } from 'vuetify'
  import DefaultView from './View.vue'

  export default {
    components: {
      DefaultView,
    },
    setup() {
      const theme = useTheme()

      // Get and set theme
      var currentTheme = localStorage.getItem("theme")
      if(currentTheme == null) { currentTheme = 'light' }
      theme.global.name.value = currentTheme
    },
    data() {
      return {
      }
    },
  }
</script>
