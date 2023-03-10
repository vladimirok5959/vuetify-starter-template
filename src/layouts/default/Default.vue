<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="sidebarOpened">
      <side-bar />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="primary" to="/login" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify 3</v-toolbar-title>
      <v-btn
        id="toggleTheme"
        @click="toggleSwitch(); toggleTheme();"
        :icon="toggleThemeIcon"
        class="float-right">
      </v-btn>
    </v-app-bar>
    <default-view />
  </v-app>
</template>

<script>
  import { useTheme } from 'vuetify'
  import SideBar from './SideBar.vue'
  import DefaultView from './View.vue'

  export default {
    components: {
      SideBar,
      DefaultView,
    },
    setup() {
      const theme = useTheme()

      // Get and set theme
      var currentTheme = localStorage.getItem("theme")
      if(currentTheme == null) { currentTheme = 'light' }
      theme.global.name.value = currentTheme

      return {
        theme,
        toggleSwitch: () => {
          const currentTheme = theme.global.current.value.dark ? 'light' : 'dark'
          localStorage.setItem("theme", currentTheme)
          theme.global.name.value = currentTheme
        }
      }
    },
    data() {
      return {
        sidebarOpened: this.sidebarOpenedValue(),
        toggleThemeIcon: this.toggleThemeIconValue(),
      }
    },
    methods: {
      sidebarOpenedValue() {
        const isOpened = localStorage.getItem("sidebar")
        return isOpened != null && isOpened == 'true'
      },
      toggleThemeIconValue() {
        const theme = useTheme()
        if(theme.global.current.value.dark) {
          return 'mdi-weather-night'
        }
        return 'mdi-weather-sunny'
      },
      toggleSidebar() {
        const currentState = !this.sidebarOpened
        localStorage.setItem("sidebar", currentState)
        this.sidebarOpened = currentState
      },
      toggleTheme() {
        this.toggleThemeIcon = this.toggleThemeIcon == 'mdi-weather-sunny' ? 'mdi-weather-night' : 'mdi-weather-sunny'
      },
    },
  }
</script>
