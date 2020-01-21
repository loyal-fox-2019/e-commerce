<template>
  <v-col class="shrink">
    <v-card shaped hover max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey">
          <!-- <v-avatar> -->
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          <!-- </v-avatar> -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Tempe Goreng Kering</v-list-item-title>
          <v-list-item-subtitle>by Indra Buana</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img src="https://selerasa.com/wp-content/uploads/2018/10/tempe-goreng-bumbu-kunyit-500x365-1280x720.jpg" height="194"></v-img>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Rp. 2.500,-</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>Digoreng dengan minyak goreng. Gluten free</v-card-text>

      <v-card-actions>
        <!-- <v-btn text color="blue accent-4">Detail</v-btn> -->
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'ProductItem'
}
</script>

<style>

</style>
