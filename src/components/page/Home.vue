<template>
  <v-breadcrumbs class="mb-6" style="background:rgb(var(--v-theme-surface))" :items="breadcrumbs">
    <template v-slot:title="{ item }">
      {{ item.title.toUpperCase() }}
    </template>
  </v-breadcrumbs>
  <!-- https://skeletonreact.com/ -->
  <div v-if="!items.length" style="background:rgb(var(--v-theme-surface))" class="pa-4">
    <div style="opacity:0.3">
      <content-loader :speed="1" :animate="true" primaryColor="rgb(var(--v-theme-surface))" secondaryColor="#808080" viewBox="0 0 800 195">
        <rect x="0" y="0" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="20" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="40" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="60" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="80" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="100" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="120" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="140" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="160" rx="3" ry="3" width="800" height="15" />
        <rect x="0" y="180" rx="3" ry="3" width="800" height="15" />
      </content-loader>
    </div>
  </div>
  <v-table v-if="items.length">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

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
        breadcrumbs: [
        {
          title: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          title: 'Home',
          disabled: true,
          href: '/',
        },
        ],
        items: [],
      }
    },
    methods: {
      loadItems() {
        this.apiGet("/table").then((response) => {
          this.items = response.data
        }).catch((err) => { this.processAxiosError(err) })
      },
    },
    mounted() {
      this.loadItems()
    },
  }
</script>
