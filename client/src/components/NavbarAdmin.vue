<template>
  <div>
    <div class="p-2 flex-shrink-1 bd-highlight" id="navbar">
      <div
        class="d-flex align-content-between flex-wrap bd-highlight"
        style="justify-content: center">
        <b-button to="/dashboard" :class="{ active: $route.path == '/dashboard' }" class="btn navbar-btn">
          <i class="fas fa-gem" id="icon"></i>
        </b-button>
        <b-button to="/dashboard/history" :class="{ active: $route.path == '/dashboard/history' }" class="btn navbar-btn">
          <i class="fas fa-history" id="icon"></i>
        </b-button>
        <b-button @click.prevent="logout" class="btn navbar-btn">
          <i class="fas fa-sign-out-alt" id="icon"></i>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
methods: {
    logout () {
      Swal.fire({
        title: 'Are you sure to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      }).then(result => {
        if (result.value) {
          Swal.fire({
            title: 'Success!',
            text: 'See you soon.....',
            icon: 'success',
            confirmButtonText: 'Oke'
          })
          localStorage.removeItem('token');
          this.$store.commit('SET_LOGIN', false)
          this.$store.commit('SET_CART', null)
          this.$store.commit('SET_CHECKOUTCART', [])
          this.$store.commit('SET_RECEIVEDCART', [])
          this.$store.commit('SET_STATUSCART', [])
          this.$router.push('/')
        }
      })
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    page () {
      return this.$store.state.page
    }
  }
}
</script>

<style scoped>
#navbar {
  width: 70px;
  display: flex;
  height: 100vh;
  background-color: #8ec54a
}

#icon-mini {
  width: 24px !important;
  height: 24px !important;
}

#icon {
  width: 24px !important;
  height: 24px !important;
}

.btn {
  background-color: #8ec54a !important ;
  border-color: #8ec54a;
  color: black
}

.navbar-btn {
  box-shadow: none !important;
}

.btn:hover, .btn:focus {
  background-color: #6b9a32 !important;
  border-color: #6b9a32;
  box-shadow: none !important;
  color: black !important;
}

.active {
  background-color: #6b9a32 !important;
  border-color: #6b9a32 !important;
  box-shadow: none !important;
  color: black !important;
}

.disabled {
  background-color: #709b3b !important ;
  border-color: #709b3b !important;
  box-shadow: none !important;
  color: black !important;

}
</style>
