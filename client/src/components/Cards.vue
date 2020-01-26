<template>
  <b-card
    :title="item.nama"
    :imgSrc="item.gambar"
    img-alt="Image"
    img-height="1"
    img-top
    tag="article"
    class="mb-2 mx-2"
  >
    <div>
      <b-card-text> Rp. {{ item.harga }} </b-card-text>
      <div class="my-4 text-red-700 font-bold">
        <b-card-text> {{ item.seller }} </b-card-text>
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2"
          >{{ item.kategori }}</span
        >
      </div>
    </div>
    <div class="flex justify-center">
      <b-button variant="primary" :to="'/inv/' + item.userId + '/' + item._id">
        Detail
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Cards',
  props: ['item'],
  computed: {
    invList() {
      return this.$store.state.invList
    }
  },
  watch: {
    invList(oldvalue, newvalue) {
      return newvalue
    }
  }
}
</script>

<style></style>
