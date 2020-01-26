<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link @click="toProducts">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Makan Apa?</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$store.state.isLogin" link @click="toCart">
          <v-list-item-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Keranjang ({{$store.state.pendings.length}})</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$store.state.isLogin" link @click="toConfirm">
          <v-list-item-action>
            <v-icon>local_shipping</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sampai</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$store.state.isLogin" link @click="myProducts">
          <v-list-item-action>
            <v-icon>attach_money</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Jualanku</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$store.state.isLogin" link @click="toTransactions">
          <v-list-item-action>
            <v-icon>trending_up</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sejarah</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Warteg Hub</v-toolbar-title>
      <span class="ml-auto" v-if="$store.state.isLogin">Welcome, {{$store.state.username}}</span>
      <!-- <v-btn class="mx-5" @click="myProducts" rounded color="primary" v-if="$store.state.isLogin" dark>My Product</v-btn> -->
      <v-btn class="mx-5" @click="logout" rounded color="accent" v-if="$store.state.isLogin" dark>Logout</v-btn>
      <v-btn class="ml-auto" @click="toLogin" rounded color="primary" v-if="!$store.state.isLogin" dark>Login</v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-content>
      <!-- <v-footer
        absolute
        class="font-weight-medium"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Amil Hasbala</strong>
        </v-col>
      </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
      this.$store.dispatch('fetchProducts')
      this.$gAuth.signOut()
      this.$router.currentRoute.name !== 'products' && this.$router.replace({ name: 'products' })
    },
    toLogin () {
      this.$router.push('/login')
    },
    toProducts () {
      this.$router.currentRoute.name !== 'products' && this.$router.replace({ name: 'products' })
    },
    myProducts () {
      this.$router.currentRoute.name !== 'myProducts' && this.$router.replace({ name: 'myProducts' })
    },
    toCart () {
      this.$router.currentRoute.name !== 'cart' && this.$router.replace({ name: 'cart' })
    },
    toTransactions () {
      this.$router.currentRoute.name !== 'transactions' && this.$router.replace({ name: 'transactions' })
    },
    toConfirm () {
      this.$router.currentRoute.name !== 'confirm' && this.$router.replace({ name: 'confirm' })
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
