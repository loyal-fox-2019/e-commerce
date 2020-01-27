<template>
  <div class="bg-gray-200">
    <div class="container bg-white mt-10 py-4 mb-4">
      <!-- <pre>{{ itemDetail }}</pre> -->
      <div class="row border-bottom p-4">
        <div class="col-sm-12 col-md-12 col-lg-4">
          <img :src="itemDetail.gambar" :alt="itemDetail.nama" />
        </div>
        <div class="col-sm-12 col-md-12 col-lg-8 flex flex-col container">
          <div class="border-bottom pb-3">
            <h2>{{ itemDetail.nama }}</h2>
            <span class="inline flex justify-between">
              <span>
                <small class="mr-3">
                  Seller:
                  <span class="text-blue-500">{{ itemDetail.seller }}</span>
                </small>
                <small>
                  Kategori:
                  <span class="text-blue-500">{{ itemDetail.kategori }}</span>
                </small>
              </span>
              <span>
                <small class="flex justify-end">
                  Diposting:
                  <span class="text-blue-500">{{ tanggalDiposting }}</span>
                </small>
              </span>
            </span>
          </div>

          <div class="my-4">
            <div class="row">
              <h5 class="col-3 font-bold">Harga</h5>
              <div class="col-9">
                <h4 class="text-orange-600">RP. {{ itemDetail.harga }}</h4>
              </div>
            </div>
            <div class="row mt-3">
              <h5 class="col-3 font-bold">Stok</h5>
              <div class="col-9">
                <h6>Tersisa {{ itemDetail.stok }} lagi</h6>
              </div>
            </div>
            <div class="row mt-3">
              <h5 class="col-3 font-bold">Jumlah</h5>
              <div class="col-9">
                <b-form-input
                  class="max-w-sm"
                  v-model="jumlah"
                  type="number"
                ></b-form-input>
                <p
                  class="text-red-500 text-xs italic my-2"
                  v-show="overcapacity"
                >
                  Jumlah yang anda pesan melebihi kapasitas stok
                </p>
              </div>
            </div>
            <div class="flex justify-center my-3">
              <!-- <b-button variant="warning mr-1 button">
                BELI SEKARANG
              </b-button> -->
              <b-button
                variant="primary ml-1 button"
                @click="addToBag(itemDetail._id)"
                :disabled="disableBtn"
              >
                TAMBAH KE BAG
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="my-3 flex flex-col">
        <h5>Deskripsi :</h5>
        <p class="text-base">{{ itemDetail.deskripsi }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  nama: 'DetailView',
  data() {
    return {
      jumlah: 1,
      overcapacity: false,
      disableBtn: false
    }
  },
  watch: {
    jumlah(o, n) {
      if (this.jumlah > this.itemDetail.stok) {
        this.overcapacity = true
        this.disableBtn = true
      } else {
        this.overcapacity = false
        this.disableBtn = false
      }
    }
  },
  created() {
    const userId = this.$route.params.userId
    const idBarang = this.$route.params.idBarang
    const item = {
      userId: userId,
      idBarang: idBarang
    }
    this.$store.dispatch('getInv', item)
  },
  computed: {
    itemDetail() {
      return this.$store.state.detailBarang
    },
    tanggalDiposting() {
      let date = new Date(this.$store.state.detailBarang.tanggal)
      return ' ' + date.toDateString()
    }
  },
  methods: {
    addToBag(productId) {
      axios({
        method: 'post',
        url: 'http://54.179.183.251:3000/bag/add',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          productId: productId,
          jumlah: this.jumlah
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'Berhasil ditambahkan ke bag',
            text: 'Lihat bag sekarang?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Lanjut Belanja'
          }).then((result) => {
            if (result.value) {
              this.$router.push('/bag')
            } else {
              this.$router.push('/')
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.button {
  color: white !important;
  font-weight: bold;
}
.button:hover {
  color: white !important;
}

.button:active {
  color: white !important;
}
</style>
