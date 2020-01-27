<template>
  <sui-table celled>
    <sui-table-header>
      <sui-table-row>
        <sui-table-header-cell>Barang</sui-table-header-cell>
        <sui-table-header-cell>Jumlah</sui-table-header-cell>
        <sui-table-header-cell>Harga Satuan</sui-table-header-cell>
        <sui-table-header-cell>Sub total</sui-table-header-cell>
        <sui-table-header-cell v-if="$route.path != '/cart/mycart'">Pembelian</sui-table-header-cell>
        <sui-table-header-cell v-if="$route.path == '/cart/mycart'">Buang</sui-table-header-cell>
        <sui-table-header-cell v-if="$route.path == '/cart/mypaid'">Konfirmasi</sui-table-header-cell>
        <sui-table-header-cell v-if="$route.path == '/cart/myitem'">Status</sui-table-header-cell>
      </sui-table-row>
    </sui-table-header>

    <sui-table-body>
      <sui-table-row v-for="list in dataList" :key="list.id">
        <sui-table-cell>
          <sui-label ribbon>{{list.product.name}}</sui-label>
        </sui-table-cell>
        <sui-table-cell>{{list.qty}}</sui-table-cell>
        <sui-table-cell>{{list.product.price}}</sui-table-cell>
        <sui-table-cell>{{list.product.price*list.qty}}</sui-table-cell>
        <sui-table-cell v-if="$route.path != '/cart/mycart'">{{pembelian(list.updated_at)}}</sui-table-cell>
        <sui-table-cell v-if="$route.path == '/cart/myitem'">{{list.status}}</sui-table-cell>
        <sui-table-cell>
          <b-button
            class="btn btn-danger"
            @click.prevent="deleteThis(list._id)"
            v-if="$route.path == '/cart/mycart'"
          >Hapus</b-button>
          <b-button
            class="btn btn-outline-warning"
            @click.prevent="delivered(list._id)"
            v-if="$route.path == '/cart/mypaid'"
          >Sudah Sampai?</b-button>
        </sui-table-cell>
      </sui-table-row>
    </sui-table-body>
  </sui-table>
</template>

<script>
export default {
  name: "TableSui",
  props: ["dataList"],
  data() {
    return {};
  },
  created() {
  },
  computed: {},
  methods: {
    pembelian(val) {
      return new Date(val).toLocaleString();
    },
    deleteThis(id) {
      this.axios({
        method: "delete",
        url: "carts/" + id
      })
        .then(({ data }) => {
          this.$swal.fire(data.product.name, " sukses di hapus dari cart");
          this.$store.dispatch("fetchMyCarts");
          this.$router.push("/cart/myproduct");
        })
        .catch(err => {
          this.$swal.fire(err);
          console.log(err);
        });
    },
    delivered(id) {
      this.axios({
        method: "patch",
        url: "carts/paid/" + id
      })
        .then(({ data }) => {
          this.$swal.fire(data.product.name, "terima kasih atas pembeliannya");
          this.$store.dispatch("fetchMyPaid");
          this.$router.push("/cart/myitem");
        })
        .catch(err => {
          this.$swal.fire(err);
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>