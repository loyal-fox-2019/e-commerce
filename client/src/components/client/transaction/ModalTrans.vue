<template>
  <b-modal id="modal-detail">
    <p class="my-4">{{ JSON.stringify(item, null, 2) }}</p>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalTrans',
  props: ['item'],
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
