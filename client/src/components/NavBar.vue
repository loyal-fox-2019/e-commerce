<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <router-link to="/">
                <b-navbar-brand><i class="fas fa-shopping-bag fa-lg"></i> Home</b-navbar-brand>
            </router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/myproducts">My Products</router-link>
                </b-nav-item>        
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>{{ username }}</em>
                </template>
                <b-dropdown-item href="#"><i class="fas fa-cart-arrow-down"></i> My Cart</b-dropdown-item>
                <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: "navbar",
    data(){
        return {
            username: ''
        }
    },
    methods: {
        logout: function(){
            localStorage.clear()
            this.$router.push('/loginregister')
            Swal.fire(
                'You are logged out!',
                '',
                'success'
            )
        }
    },
    created(){
        this.username = localStorage.getItem('username')
    }
}
</script>

<style>

</style>