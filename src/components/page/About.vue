<template>
  <v-breadcrumbs class="mb-6" style="background:rgb(var(--v-theme-surface))" :items="breadcrumbs">
    <template v-slot:title="{ item }">
      {{ item.title.toUpperCase() }}
    </template>
  </v-breadcrumbs>
  About
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        breadcrumbs: [
        {
          title: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          title: 'About',
          disabled: true,
          href: '/about',
        },
        ],
      }
    },
    methods: {
    },
    mounted() {
    },
  }
</script>
