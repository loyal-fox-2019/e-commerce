<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <div class="jumbotron text-center" v-if="myInv.length == 0">
      <h2>Kamu belum punya barang jualan</h2>
      <h2>Mulai sekarang</h2>
      <b-button class="mt-4" @click.prevent="$bvModal.show('jualan-modal')">
        Tambah Barang
      </b-button>
    </div>

    <div v-else>
      <div class="flex justify-end my-3">
        <b-button @click.prevent="$bvModal.show('jualan-modal')">
          Tambah Barang
        </b-button>
      </div>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Sort"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select
                v-model="sortBy"
                id="sortBySelect"
                :options="sortOptions"
                class="w-75"
              >
                <template v-slot:first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                size="sm"
                :disabled="!sortBy"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Initial sort"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="initialSortSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="sortDirection"
              id="initialSortSelect"
              size="sm"
              :options="['asc', 'desc', 'last']"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="myInv"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Info modal
          </b-button>

          <b-button
            size="sm"
            class="mr-1"
            variants="danger"
            @click="deleteInv(row.item.id)"
          >
            Delete
          </b-button>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        size="xl"
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
        centered
        @hide="resetInfoModal"
      >
        <EditForm :content="infoModal.content" />
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios'
import EditForm from './Jualan-Edit-Form'
export default {
  nama: 'SellList',
  components: {
    EditForm
  },
  data() {
    return {
      fields: [
        {
          key: 'no',
          label: 'No',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'nama',
          label: 'Nama Barang',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'deskripsi',
          label: 'Deskripsi'
        },
        {
          key: 'stok',
          label: 'Jumlah Stok',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'harga',
          label: 'Harga Per Satuan',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'kategori',
          label: 'Kategori Barang',
          sortable: true,
          sortDirection: 'desc'
        },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => {
          return f.sortable
        })
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
    myInv() {
      //   console.log(this.$store.state.myInv)
      let invList = this.$store.state.myInv
      let result = []
      invList.forEach((item, index) => {
        result.push({
          no: index + 1,
          id: item._id,
          nama: item.nama,
          deskripsi: item.deskripsi,
          stok: item.stok,
          harga: item.harga,
          gambar: item.gambar,
          kategori: item.kategori
        })
      })
      //   console.log(result)
      return result
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.myInv.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      //   JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    deleteInv(id) {
      this.$swal({
        title: 'Apakah anda yakin?',
        text: 'Produk yang telah dihapus tidak dapat dikembalikan diubah',
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
            url: 'http://54.179.183.251:3000/inventori/delete/' + id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              // eslint-disable-next-line
              console.log({ update: data })
              return this.$swal(
                'Sukses',
                'Produk telah berhasil dihapus',
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
