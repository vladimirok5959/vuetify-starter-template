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
  <v-data-table
    v-if="items.length"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    :search="search"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Product calories</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          density="compact"
          variant="solo"
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="d-none d-sm-block mr-4"
          max-width="100px"
          style="max-width:300px"
        ></v-text-field>
        <v-dialog v-model="dialog" persistent transition="dialog-transition" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" variant="outlined" class="mb-0 mr-4" v-bind="props" @click="newItem()">New Product</v-btn>
          </template>
          <v-card>
            <v-card-title class="pt-3">
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 pl-4 pr-4">
              <v-container class="pa-0">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="submit">{{ formAction }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" persistent max-width="500px">
          <v-card>
            <v-card-title class="pt-3">
              <span class="text-h5">Delete product?</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 pl-4 pr-4">{{ editedItem.name }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" variant="text" @click="deleteItemConfirm">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)">mdi-delete</v-icon>
    </template>
  </v-data-table>
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
          { title: 'Dashboard', disabled: false, href: '/' },
          { title: 'Home', disabled: true, href: '/' },
        ],
        dialog: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
        },
        defaultItem: {
          name: '',
          calories: 0,
        },
        dialogDelete: false,
        itemsPerPage: 10,
        search: '',
        headers: [
          { title: 'Name', align: 'start', key: 'name' },
          { title: 'Calories', align: 'end', key: 'calories' },
          { title: 'Actions', align: 'end', key: 'actions', sortable: false },
        ],
        items: [],
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
      },
      formAction() {
        return this.editedIndex === -1 ? 'Create' : 'Save'
      },
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },
    methods: {
      loadItems() {
        this.apiGet("/table").then((response) => {
          this.items = response.data
        }).catch((err) => { this.processAxiosError(err) })
      },
      newItem() {
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      editItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm() {
        // Delete
        console.log('Delete', this.editedItem)
        this.closeDelete()
      },
      close() {
        this.dialog = false
      },
      closeDelete() {
        this.dialogDelete = false
      },
      submit() {
        if(this.editedIndex > -1) {
          // Update
          console.log('Update', this.editedItem)
        } else {
          // Create
          console.log('Create', this.editedItem)
        }
        this.close()
      },
    },
    mounted() {
      this.loadItems()
    },
  }
</script>
