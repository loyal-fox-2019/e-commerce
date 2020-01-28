<template>
  <b-container class="mb-5">
    <b-row class="justify-content-center mt-3 m-0 p-0 text-center">
      <b-col>
        <b-card no-body class="overflow-hidden shadow-sm font-weight-bolder">
          <b-row>
            <b-col class="p-0">
              <b-card-body class="p-0">
                <b-card-text
                  class="py-3 btn btn-block"
                  :style="
                    activeState === 'new'
                      ? {
                          'background-color': '#42b983',
                          color: 'white',
                          'font-weight': 'bold'
                        }
                      : {}
                  "
                  @click.prevent="getCartOnState('new')"
                >
                  Baru
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col class="p-0">
              <b-card-body class="p-0">
                <b-card-text
                  class="py-3 btn btn-block"
                  :style="
                    activeState === 'unpaid'
                      ? {
                          'background-color': '#42b983',
                          color: 'white',
                          'font-weight': 'bold'
                        }
                      : {}
                  "
                  @click.prevent="getCartOnState('unpaid')"
                >
                  Belum Bayar
                </b-card-text>
              </b-card-body>
            </b-col>
            <!-- <b-col class="p-0">
              <b-card-body class="p-0">
                <b-card-text
                  class="py-3 btn btn-block"
                  :style="
                    activeState === 'packing'
                      ? {
                          'background-color': '#42b983',
                          color: 'white',
                          'font-weight': 'bold'
                        }
                      : {}
                  "
                  @click.prevent="getCartOnState('packing')"
                >
                  Dikemas
                </b-card-text>
              </b-card-body>
            </b-col> -->
            <b-col class="p-0">
              <b-card-body class="p-0">
                <b-card-text
                  class="py-3 btn btn-block"
                  :style="
                    activeState === 'send'
                      ? {
                          'background-color': '#42b983',
                          color: 'white',
                          'font-weight': 'bold'
                        }
                      : {}
                  "
                  @click.prevent="getCartOnState('send')"
                >
                  Dikirim
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col class="p-0">
              <b-card-body class="p-0">
                <b-card-text
                  class="py-3 btn btn-block"
                  :style="
                    activeState === 'done'
                      ? {
                          'background-color': '#42b983',
                          color: 'white',
                          'font-weight': 'bold'
                        }
                      : {}
                  "
                  @click.prevent="getCartOnState('done')"
                >
                  Selesai
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col class="p-0">
              <b-card-body class="p-0">
                <b-card-text
                  class="py-3 btn btn-block"
                  :style="
                    activeState === 'cancel'
                      ? {
                          'background-color': '#42b983',
                          color: 'white',
                          'font-weight': 'bold'
                        }
                      : {}
                  "
                  @click.prevent="getCartOnState('cancel')"
                >
                  Dibatalkan
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="justify-content-center mx-5 my-3">
      <b-col>
        <b-card no-body class="overflow-hidden shadow-sm font-weight-bolder">
          <b-row>
            <b-col cols="4">
              <b-card-body>
                <b-card-text>
                  Produk
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col cols="2">
              <b-card-body>
                <b-card-text>
                  Harga Satuan
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col cols="2">
              <b-card-body>
                <b-card-text>
                  Total Barang
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col cols="2">
              <b-card-body>
                <b-card-text>
                  Total Harga
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col cols="2">
              <b-card-body>
                <b-card-text>
                  Aksi
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row
      class="justify-content-center mx-5 my-1"
      v-for="cart in carts"
      :key="cart._id"
    >
      <b-col>
        <cart :cartData="cart" @updateList="getCartOnState($event)"></cart>
      </b-col>
    </b-row>
    <b-row v-if="activeState === 'new' && carts && carts.length">
      <b-col class="text-right my-2">
        <b-button
          class="mx-2"
          size="md"
          variant="outline-dark"
          squared
          @click.prevent="changeStatus('unpaid')"
        >
          Pesan Semua
        </b-button>
        <b-button
          size="md"
          variant="success"
          squared
          @click.prevent="changeStatus('send')"
        >
          Pesan dan Bayar Semua
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Cart from "@/components/Cart.vue";
import axios from "axios";

export default {
  components: {
    Cart
  },
  data() {
    return {
      activeState: "new",
      carts: null
    };
  },
  methods: {
    changeStatus(newStatus) {
      axios({
        method: "PUT",
        url: `${this.$baseUrl}/carts/status/all`,
        headers: {
          token: localStorage.token
        },
        data: {
          products: this.carts,
          status: newStatus
        }
      })
        .then(() => {
          this.getCartOnState(this.activeState);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCartOnState(state) {
      axios({
        method: "GET",
        url: `${this.$baseUrl}/carts/${state}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.carts = data;
          this.activeState = state;
          if (this.activeState === "new") {
            this.$emit("updateCart");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.carts = this.getCartOnState(this.activeState);
  }
};
</script>

<style scoped>
p.card-text.py-3:hover {
  background-color: #42b983;
  color: white;
}
</style>
