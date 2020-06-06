<template>
  <div>
    <b-table :fields="fields" :items="items">
      <template v-slot:cell(options)="data">
        <b-button-group size="sm" style="width:10px;">
          <b-button @click="detail(data.item)">Detail</b-button>
          <b-button @click="preUpdate(data.item)">Update</b-button>
          <b-button @click="deleteData(data.item)">Delete</b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'TableProduct',
  props: ['items'],
  data() {
    return {
      fields: [
        'options',
        'name',
        'price',
        'stock',
        {
          key: 'seller',
          formatter: value => value.fullname,
        },
      ],
    };
  },
  methods: {
    ...mapMutations('Product', ['SET_PRODUCT', 'SET_ISUPDATE', 'CLEAR_PRODUCT']),
    ...mapActions('Product', ['deleteProduct']),
    detail(data) {
      const form = JSON.parse(JSON.stringify(data));
      this.CLEAR_PRODUCT();
      this.SET_PRODUCT(form);
      this.$bvModal.show('modalShow');
      this.$emit('detailProduct');
    },
    preUpdate(data) {
      const form = JSON.parse(JSON.stringify(data));
      this.CLEAR_PRODUCT();
      this.SET_PRODUCT(form);
      this.$bvModal.show('modalShow');
      this.SET_ISUPDATE(true);
      this.$emit('modalDisabledFalse');
    },
    deleteData(data) {
      this.SET_PRODUCT(data);
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
          if (result.value) {
            this.deleteProduct(data._id);
          }
        });
    },
  },
};
</script>

<style lang="css" scoped></style>
