<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Upload Makanan</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Nama" name="title" prepend-icon="local_dining" type="text"></v-text-field>
                    <v-text-field label="Harga" name="price" prepend-icon="attach_money" type="number"></v-text-field>
                    <v-select
                      prepend-icon="layers"
                      :items="kategoris"
                      :menu-props="{ top: true, offsetY: true }"
                      label="Kategori"
                    ></v-select>
                    <v-textarea
                      v-model="description"
                      auto-grow
                      filled
                      label="Keistimewaan :"
                      outlined
                      rounded
                      row-height=3
                    ></v-textarea>
                    <v-file-input
                      label="Foto Makanan"
                      filled
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="upload">Upload</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'UploadPage',
  data () {
    return {
      description: '',
      kategoris: ['lauk', 'sayur']
    }
  },
  methods: {
    upload () {
      this.$router.push('/')
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style>
</style>
