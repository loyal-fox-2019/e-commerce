<template>
  <v-container justify="center">
    <v-data-table :headers="headers" :items="products" sort-by="name" class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-right my-4">
      <v-btn rounded color="accent" dark>Purchase</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CartList',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Products name',
        align: 'left',
        value: 'name'
      },
      { text: 'Price', value: 'price' },
      { text: 'Qty', value: 'qty' },
      { text: 'Sub Total', value: 'subTotal' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    products: []
  }),

  created () {
    this.products = this.$store.state.pendings
  },

  methods: {
    deleteItem (payload) {
      console.log(payload)
    },
    editItem (payload) {
      console.log(payload)
    }
  }
}
</script>

<style>
</style>
