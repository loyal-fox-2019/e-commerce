<template>
  <div>
    <header class="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4 title">
  
    <!-- Logo text or image -->
    <div class="flex items-center justify-between mb-4 md:mb-0">
      <h1 class="leading-none text-2xl text-grey-darkest">
        <router-link to="/" class="no-underline text-grey-darkest hover:text-black">
          E-commerce
        </router-link>
      </h1>

      <router-link to="/products" class="ml-10 text-black hover:text-orange">
        Products
      </router-link>
    </div>
    <!-- END Logo text or image -->
    
    <!-- Search field -->
    <div class="pt-2 relative mx-auto text-gray-600">
      <input v-model="keyword" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search" name="search" placeholder="Search">
      <button @click.prevent="search" class="absolute right-0 top-0 mt-5 mr-4">
        <svg class="fill-current h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
      </button>
    </div>
    <!-- END Search field -->
    
    <!-- Global navigation -->
    <nav>
      <ul class="list-reset md:flex md:items-center">
        <li class="md:ml-4">
          <router-link to="/cart" class="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0">
            <svg class="fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm-11.816 6c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm8-16.5l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-2.541 9h2.102l3.432-12h4.195z"/></svg>
          </router-link>
        </li>
        <li v-if="!isLoggedIn" class="md:ml-4">
          <button  @click="showRegister = true, showLogin = false" class="mr-1 px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
          <button @click="showLogin = true, showRegister = false" class="px-1 py-1 bg-white border-red-500 font-semibold text-red-500 hover:text-red-600 border hover:border-red-600 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </li>
        <li v-if="isLoggedIn" class="md:ml-4">
          <router-link to="/dashboard" class="mr-1 px-2 py-1 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
          Dashboard
          </router-link>
          <a @click.prevent="logout" href="#" class="px-1 py-1 bg-white border-red-500 font-semibold text-red-500 hover:text-red-600 border hover:border-red-600 rounded focus:outline-none focus:shadow-outline">Sign Out</a>
        </li>
      </ul>
    </nav>
    <!-- END Global navigation -->
  </header>

    <RegisterForm v-if="showRegister" title="Create an account" @close="showRegister = false">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Name
          </label>
          <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="John Doe">
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="email" placeholder="john@mail.com">
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="password" placeholder="******************">
        </div>      
          <div class="mt-6">
            <button type="button" @click.prevent="register" class="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button @click.prevent="clearRegister" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
    </RegisterForm>

    <LoginForm v-if="showLogin" title="Sign in" @close="showLogin = false">
      <g-signin-button
        class="cursor-pointer bg-red-500 hover:bg-blue-600 text-white rounded-lg border font-bold py-2 px-4 rounded mb-4"
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Sign in with Google
      </g-signin-button>
      <p class="mb-4">- or use your account -</p>
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="email" placeholder="john@mail.com">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="password" placeholder="******************">
      </div>
      <div class="mt-6">
        <button type="button" @click.prevent="login" class="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
        <button @click.prevent="clearLogin" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
          Cancel
        </button>
      </div>
    </LoginForm>

  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm'

export default {
  name: 'NavBar',
  data() {
    return  {
      showRegister: false,
      showLogin: false,
      name: '',
      email: '',
      password: '',
      keyword: '',
      googleSignInParams: {
        client_id: '948794319816-f2dr4giald6d07ivr6vnb5cvfvnnap8j.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    login() {
      this.showLogin = false
      this.$axios.post('users/signin', {
				email: this.email,
				password: this.password
      })
        .then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
          localStorage.setItem('id', data._id)
          localStorage.setItem('isAdmin', data.isAdmin)
          this.$store.commit('UPDATE_LOGIN', true)
          this.success('Successfully signed in!')
        })
        .catch(err => {
          this.error(err.response.data.error)
        })
        .finally(() => {
          this.clearLogin()
        })
    },
    register() {
      this.showRegister = false
      this.$axios.post('users/register', {
				name: this.name,
				email: this.email,
				password: this.password
      })
        .then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
          localStorage.setItem('id', data.id)
          localStorage.setItem('isAdmin', data.isAdmin)
          this.$store.commit('UPDATE_LOGIN', true)
          this.success('Profile successfully created!')
        })
        .catch(err => {
          this.error(err.response.data.error)
        })
        .finally(() => {
          this.clearRegister()
        })
    },
    onSignInSuccess (googleUser) {
			const id_token = googleUser.getAuthResponse().id_token;
			this.$axios.post('users/googleSignIn', {
				id_token
      })
				.then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
					localStorage.setItem('id', data.id)
          this.$store.commit('UPDATE_LOGIN', true)
          this.success('Successfully signed in!')
				})
				.catch(err => {
					this.error(err.response.data.error)
				})
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    logout() {
      localStorage.clear()
      this.$store.commit('UPDATE_LOGIN', false)
      this.success('Successfully signed out!')
      this.$router.push('/')
    },
    resetForm() {
      this.name = ''
      this.email = ''
      this.password = ''
    },
    clearLogin() {
      this.showLogin = false
      this.resetForm()
    },
    clearRegister() {
      this.showRegister = false
      this.resetForm()
    },
    success(text) {
      this.$swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Close'
      })
    },
    error(text) {
      this.$swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    },
    search() {
      if (this.keyword) {
        this.$axios.get(`products/search/${this.keyword}`)
        .then(({ data }) => {
          this.$store.commit('FETCH_PRODUCTS', data)
          this.$router.push('/products')
        })
        .catch(err => {
          this.error(err.data.response.error)
        })
        .finally(() => {
          this.keyword = ''
        })
      } else {
        this.$store.dispatch('fetchProducts')
      }
    }
  },
  components: {
    RegisterForm,
    LoginForm
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    } 
  }
}
</script>

<style scoped>
  .title {
    font-family: 'Acme', sans-serif;
  }
  .modal-scrollbar-measure {
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll;
  }
  .bg-smoke-darkest {
    background-color: rgba(0, 0, 0, .9);
  }

  .bg-smoke-darker {
    background-color: rgba(0, 0, 0, .75);
  }

  .bg-smoke-dark {
    background-color: rgba(0, 0, 0, .6);
  }

  .bg-smoke {
    background-color: rgba(0, 0, 0, .5);
  }

  .bg-smoke-light {
    background-color: rgba(0, 0, 0, .4);
  }

  .bg-smoke-lighter {
    background-color: rgba(0, 0, 0, .25);
  }

  .bg-smoke-lightest {
    background-color: rgba(0, 0, 0, .1);
  }

  .hover\:bg-smoke-darkest:hover {
    background-color: rgba(0, 0, 0, .9);
  }

  .hover\:bg-smoke-darker:hover {
    background-color: rgba(0, 0, 0, .75);
  }

  .hover\:bg-smoke-dark:hover {
    background-color: rgba(0, 0, 0, .6);
  }

  .hover\:bg-smoke:hover {
    background-color: rgba(0, 0, 0, .5);
  }

  .hover\:bg-smoke-light:hover {
    background-color: rgba(0, 0, 0, .4);
  }

  .hover\:bg-smoke-lighter:hover {
    background-color: rgba(0, 0, 0, .25);
  }

  .hover\:bg-smoke-lightest:hover {
    background-color: rgba(0, 0, 0, .1);
  }
</style>