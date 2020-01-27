<template>
  <div>
    <!-- <pre>{{ item }}</pre> -->
    <b-form @submit.prevent="updateInventori(content.id)">
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
          <img :src="image" width="500" height="500" :alt="nama" />
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
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditForm',
  props: ['content'],
  data() {
    return {
      nama: this.content.nama,
      kategori: this.content.kategori,
      harga: this.content.harga,
      stok: this.content.stok,
      deskripsi: this.content.deskripsi,
      image: this.content.gambar,
      gambar: this.content.gambar
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.gambar = file
      this.image = URL.createObjectURL(file)
    },
    updateInventori(id) {
      const fd = new FormData()
      fd.append('gambar', this.gambar)
      fd.append('nama', this.nama)
      fd.append('kategori', this.kategori)
      fd.append('harga', this.harga)
      fd.append('stok', this.stok)
      fd.append('deskripsi', this.deskripsi)

      this.$swal({
        title: 'Apakah anda yakin?',
        text: 'Informasi mengenai produk ini akan diubah',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'put',
            url: this.$baseUrl + '/inventori/update/' + id,
            headers: {
              token: localStorage.getItem('token')
            },
            data: fd
          })
            .then(({ data }) => {
              // eslint-disable-next-line
              console.log({ update: data })
              return this.$swal(
                'Sukses',
                'Produk telah berhasil diperbarui',
                'success'
              )
            })
            .then(() => {
              this.$store.dispatch('getMyInv')
              this.$bvModal.hide('info-modal')
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
