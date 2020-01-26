<template>
  <div>
    <b-form @submit.prevent="addInventori">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <b-form-group label="Nama Barang:">
            <b-form-input v-model="nama" type="text" required></b-form-input>
          </b-form-group>
        </div>
        <div class="col-sm-12 col-md-6">
          <b-form-group
            description="contoh: handphone, sepatu, dll."
            label="Kategori:"
          >
            <b-form-input
              v-model="kategori"
              placeholder="Kategori Barang"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 col-md-6">
          <b-form-group
            description="dalam satuan mata uang rupiah"
            label="Harga:"
          >
            <b-form-input
              v-model="harga"
              placeholder="per satuan"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-sm-12 col-md-6">
          <b-form-group label="Stok Barang:">
            <b-form-input
              type="number"
              v-model="stok"
              min="1"
              value="0"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <b-form-group
        description="contoh: spesifikasi, penggunaan, dll"
        label="Deskripsi: "
      >
        <b-form-textarea
          id="textarea"
          v-model="deskripsi"
          placeholder="Deskripsi barang"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div>
        <label class="my-2 text-xl">Featured Image :</label>
        <span class="flex justify-center bg-gray-300 py-5">
          <img :src="image" width="500" height="500" alt />
        </span>
        <b-form-file
          @change="onFileChange"
          :state="Boolean(gambar)"
          placeholder="Choose a file ..."
          drop-placeholder="Drop file here..."
          action="/upload-single"
          method="post"
          enctype="multipart/form-data"
          class="mb-3"
        ></b-form-file>
      </div>
      <div class="flex justify-center">
        <b-button class="mr-5" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" @click="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'JualanModalForm',
  data() {
    return {
      nama: '',
      kategori: '',
      harga: 0,
      stok: 0,
      deskripsi: '',
      image: '',
      gambar: '',
      itemTemp: []
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.gambar = file
      this.image = URL.createObjectURL(file)
    },
    reset() {
      this.image = ''
      this.gambar = ''
    },
    addInventori() {
      const fd = new FormData()
      fd.append('gambar', this.gambar)
      fd.append('nama', this.nama)
      fd.append('kategori', this.kategori)
      fd.append('harga', this.harga)
      fd.append('stok', this.stok)
      fd.append('deskripsi', this.deskripsi)

      this.$swal({
        title: 'Apakah anda yakin?',
        text:
          'Seluruh informasi mengenai item ini akan disimpan ke daftar barang jualan anda',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'post',
            url: 'http://localhost:3000/inventori/add',
            headers: {
              token: localStorage.getItem('token')
            },
            data: fd
          })
            .then(({ data }) => {
              // eslint-disable-next-line
              this.itemTemp = data
              return this.$swal(
                'Sukses',
                'Item telah ditambahkan ke daftar penjualan barang anda',
                'success'
              )
            })
            .then(() => {
              this.$store.dispatch('getMyInv')
              this.$bvModal.hide('jualan-modal')
              if (
                !this.$route.matched.some(({ path }) => {
                  return path === '/profile/sell-list'
                })
              ) {
                this.$router.push('/profile/sell-list')
              }
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
    }
  }
}
</script>

<style></style>
