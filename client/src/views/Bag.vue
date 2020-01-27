<template>
  <div class="bg-gray-200 h-full flex flex-col">
    <div class="container my-auto" v-if="bagList.length === 0">
      <div class="jumbotron flex flex-col text-center">
        <h2>Belanjaanmu masih kosong</h2>
        <b-button
          class="max-w-sm mx-auto my-4"
          variant="success"
          @click="$router.push('/')"
        >
          Belanja Sekarang
        </b-button>
      </div>
    </div>

    <div class="container flex flex-col justify-center my-5" v-else>
      <!-- <pre>{{ bagList }}</pre> -->
      <table class="table">
        <thead class="border-bottom rounded bg-gray-400 border-bottom py-4">
          <th colspan="3"></th>
          <th>Nama Barang</th>
          <th>Harga</th>
          <th>Jumlah</th>
        </thead>
        <tbody
          class="w-full bg-gray-300 rounded-lg py-4 mt-4 shadow"
          v-for="item in bagList"
          :key="item._id"
        >
          <tr>
            <td class="my-auto" colspan="3">
              <img
                class="ml-5"
                width="120"
                height="120"
                :src="item.productId.gambar"
                :alt="item.productId.nama"
              />
            </td>
            <td class="align-middle">
              {{ item.productId.nama }}
            </td>
            <td class="align-middle">{{ item.productId.harga }}</td>
            <td class="align-middle">
              <b-input-group class="" style="width:20rem;">
                <b-form-input
                  v-model="item.jumlah"
                  type="number"
                  min="1"
                  @change="
                    updateJumlah(item._id, item.jumlah, item.productId.stok)
                  "
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="danger" @click="deleteProduct(item._id)"
                    >Hapus</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </td>
          </tr>
          <tr>
            <td colspan="5"></td>
            <td class="text-left">
              Seller :
              <span class="text-blue-700 font-bold ml-3">
                {{ item.productId.seller }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="row bg-gray-300 rounded-lg flex text-2xl font-bold shadow py-4 my-5"
      >
        <div class="col-sm-6">
          <p
            class="text-red-500 text-base text-center italic my-2"
            v-show="overlimit"
          >
            Jumlah yang anda pesan melebihi kapasitas stok
          </p>
        </div>
        <div class="col-sm-2 text-right my-auto">Total:</div>
        <div class="col-sm-2 text-green-800 my-auto">Rp. {{ total }}</div>
        <div class="col-sm-2">
          <b-button
            size="lg"
            variant="success"
            :disabled="disableBtn"
            @click="checkout"
          >
            Checkout
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Bag',
  data() {
    return {
      overlimit: false,
      disableBtn: false
    }
  },
  created() {
    this.$store.dispatch('getBagList')
  },
  computed: {
    bagList() {
      return this.$store.state.bagList
    },
    total() {
      const bagList = this.$store.state.bagList
      let total = 0
      bagList.forEach((item) => {
        total += item.productId.harga * item.jumlah
      })
      return total
    }
  },
  methods: {
    updateJumlah(bagId, jumlah, stok) {
      if (jumlah > stok) {
        this.overlimit = true
        this.disableBtn = true
      } else {
        this.overlimit = false
        this.disableBtn = false
        axios({
          method: 'put',
          url: 'http://localhost:3000/bag/patch-jumlah/' + bagId,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            jumlah: jumlah
          }
        })
          .then(({ data }) => {})
          .catch((err) => {
            console.log(err)
          })
      }
    },
    deleteProduct(bagId) {
      this.$swal({
        title: 'Hapus item dari bag?',
        text: 'Item akan dihapus dari bag mu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: 'http://localhost:3000/bag/delete/' + bagId,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              // eslint-disable-next-line
              return this.$swal(
                'Sukses',
                'Produk telah berhasil dihapus',
                'success'
              )
            })
            .then(() => {
              this.$store.dispatch('getBagList')
            })
            // eslint-disable-next-line
            .catch((err) => {
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
            })
        }
      })
    },
    checkout() {
      this.$store
        .dispatch('getBagList')
        .then((result) => {
          // eslint-disable-next-line
          this.bagList.forEach((item) => {
            if (item.productId.stok - item.jumlah < 0) {
              this.$swal({
                icon: 'error',
                title: 'Maaf',
                text: 'Stok produk kurang'
              })
            } else {
              return this.$store.dispatch('getCheckout', this.bagList)
            }
          })
        })
        .then((result) => {
          let timerInterval
          return this.$swal({
            title: 'Mohon Tunggu!',
            timer: 3000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              this.$swal.showLoading()
            },
            onClose: () => {
              clearInterval(timerInterval)
            }
          })
        })
        .then((result) => {
          this.$router.push('/profile/buy-list')
        })
        // eslint-disable-next-line
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    }
  }
}
</script>

<style></style>
