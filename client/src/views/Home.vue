<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link @click="toProducts">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toCart">
          <v-list-item-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cart (5)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toConfirm">
          <v-list-item-action>
            <v-icon>local_shipping</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Confirmation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toTransactions">
          <v-list-item-action>
            <v-icon>trending_up</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Transaction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Warteg Hub</v-toolbar-title>
      <v-btn class="ml-auto" @click="logout" rounded color="accent" dark>Logout</v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-content>
      <v-footer
        absolute
        class="font-weight-medium"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Amil Hasbala</strong>
        </v-col>
      </v-footer>
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
      this.$router.push('/login')
    },
    toProducts () {
      this.$router.currentRoute.name !== 'products' && this.$router.replace({ name: 'products' })
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
