<template>
  <v-dialog v-model="show" width="auto">
    <v-card>
      <v-card-text>
        {{ msg }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['msg', 'visible'],
    computed: {
      show: {
        get() {
          return this.visible
        },
        set(value) {
          if(!value) {
            this.$emit('close')
          }
        }
      }
    }
  }
</script>
