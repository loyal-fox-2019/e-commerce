<template>
  <div>
    <b-card
      overlay
      :img-src="list.image"
      img-alt="Card Image"
      text-variant="white"
    >
      <b-card-text>
        <h2 style="background: rgba(0,0,0,0.5); font-weight: 600; padding: 10px;">{{ list.name }}</h2>
        <b-button
          href="#"
          variant="warning"
          class="mt-3"
          @click.prevent="changeCategory(list.index)"
          >View Details</b-button
        >
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: ['list'],
  methods: {
    changeCategory(index) {
      this.$store.state.activePage.name = this.$store.state.categoryList[index].name
      this.$store.state.activePage.image = this.$store.state.categoryList[index].image
      this.$store.dispatch('FETCH_ITEM')
      this.$router.push(`/${this.$store.state.activePage.name}`)
    }
  }
}
</script>
