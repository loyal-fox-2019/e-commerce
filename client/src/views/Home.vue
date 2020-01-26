<template>
  <b-container fluid="sm" class="home">
    <!-- <b-list-group>
      <b-list-group-item v-for="item in listOfItem" :key="item.id">
        <router-link :to="`/items/${item.id}`">{{ item.title }}</router-link>
      </b-list-group-item>
    </b-list-group> -->
    <b-row cols="3">
      <b-col v-for="item in listOfItem" :key="item.id" class="mt-3">
        <b-card
          :title="item.title"
          :img-src="item.image"
          img-alt="Image"
          img-top
          class="mb-2"
        >
          <b-card-text> </b-card-text>

          <b-button :to="`/items/${item._id}`" variant="primary"
            >Read More</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

import axios from 'axios';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      listOfItem: null
    };
  },
  created() {
    axios
      .get('http://localhost:3000/products')
      .then(({ data }) => {
        this.listOfItem = data.data;
      })
      .catch(err => console.error(err));
  }
};
</script>
