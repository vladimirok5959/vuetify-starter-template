<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center fill-height">
      <v-row>
        <v-col cols="12" sm="6" offset-sm="3" md="6" offset-md="3">
          <v-card>
            <v-card-title class="pt-3">
              <span class="text-h5">Please login</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 pl-4 pr-4">
              <v-container class="pa-0">
                <v-form v-model="valid">
                  <v-container class="pa-0">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail*"
                          type="text"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="password"
                          :rules="passwordRules"
                          label="Password*"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" to="/">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        emailRules: [
          value => {
            if(value) return true
            return 'E-mail is requred'
          },
          value => {
            if(/.+@.+\..+/.test(value)) return true
            return 'E-mail must be valid'
          },
        ],
        password: '',
        passwordRules: [
          value => {
            if(value) return true
            return 'Password is requred'
          },
          value => {
            if(value?.length >= 8) return true
            return 'Password must be more than 8 characters'
          },
          value => {
            if(value?.length <= 32) return true
            return 'Password must be less than 32 characters'
          },
        ],
      }
    },
  }
</script>
