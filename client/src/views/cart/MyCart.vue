<template>
  <div id="boxy">
    <div style="width:50vw" class="mr-5">
      <TableSui :dataList="myCarts" />
    </div>
    <div style="width:40vw" class="ml-5">
      <sui-card>
        <sui-card-content>
          <sui-card-header>Harga total</sui-card-header>
          <sui-card-meta>{{myCarts.length}} list</sui-card-meta>
          <sui-card-description>{{subTotal}} rupiah</sui-card-description>
        </sui-card-content>
        <sui-button attached="bottom" @click.prevent="bayar">
          <sui-icon name="cart plus"/>Pay
        </sui-button>
      </sui-card>
    </div>
  </div>
</template>

<script>
import TableSui from "../../components/TableSui";
export default {
  name: "MyCart",
  components: { TableSui },
  data() {
    return {
      subTotal: 0,
    };
  },
  created() {
    this.$store.dispatch("fetchMyCart");
  },
  computed: {
    myCarts() {
      return this.$store.state.myCarts;
    }
  },
  mounted() {
    this.subTotal = 0;
    this.myCarts.forEach(data => {
      this.subTotal += data.product.price * data.qty;
    })
  },
  methods:{
    bayar(){
      // alert('asd')
      console.log('masuk bayar');
      this.axios({
        method:'patch',
        url: 'carts/pending',
        data: this.myCarts
      })
      .then(({data}) => {
        this.$swal.fire(data + ' Barang terbeli dan akan segera dikirim')
        this.$router.push('/cart/mypaid')
      }).catch((err) => {
        console.log(err.response)
        this.$swal.fire(err.response.data)
      });
    }
  }
};
</script>

<style scoped>
#boxy {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15px;
}
</style>