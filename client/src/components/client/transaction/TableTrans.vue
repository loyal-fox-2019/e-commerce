<template>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Total Payment</th>
        <th>Status</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{ item._id }}</td>
        <td>{{ item.totalPayment }}</td>
        <td>{{ item.status }}</td>
        <td>
          <button class="btn btn-sm btn-outline-dark" type="button" @click="detail(item)">
            Detail
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TableTrans',
  props: ['items'],
  data() {
    return {};
  },
  methods: {
    detail(item) {
      this.$emit('detail', item);
    },
  },
};
</script>

<style lang="css" scoped></style>
