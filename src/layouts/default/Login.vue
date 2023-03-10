<template>
  <v-app id="inspire">
    <v-container class="fill-height">
      <v-responsive class="d-flex align-center fill-height">
        <v-row>
          <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
            <v-card>
              <v-card-title>
                <span class="text-h5">Please Login</span>
              </v-card-title>
              <v-card-text>
                <v-container class="pa-0">
                  <v-form v-model="valid">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail*"
                      type="text"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password*"
                      type="password"
                      required
                    ></v-text-field>
                  </v-form>
                </v-container>
                <small>*indicates required field</small>
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
