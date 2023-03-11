<template>
  <v-app id="inspire">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { useTheme } from 'vuetify'

  export default {
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
