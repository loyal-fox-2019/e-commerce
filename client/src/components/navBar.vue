<template>
    <div>
        <!-- <h3 class="elementIdentifier">component navbar</h3> -->

        <nav class="navbar navbar-expand-lg navbar-light bg-light p-2 javNavbar1">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse japNavBar2" id="navbarTogglerDemo01" >
                <a class="navbar-brand" href="#" 
                    @click.prevent="goToHomePage"
                    style="font-family: Varela Round', sans-serif;">HACKCOMMERCE-8</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <button 
                            class="btn btn-light" 
                            @click.prevent="goToMyShopPage">
                            <font-awesome-icon icon="store" style="color:grey"/>
                            <span style="color:grey">my Shop</span>
                        </button>
                    </li>
                    <li class="nav-item">
                        <b-button 
                            class="btn btn-light"
                            v-b-tooltip.hover title="view my carts"
                            @click.prevent="goToMyCartsPage">
                            <font-awesome-icon icon="shopping-cart" style="color:#00b7ba"/>
                        </b-button>
                        
                        
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0 japNavBar3" >
                    <input class="form-control " type="search" placeholder="Search Item" aria-label="Search" style="width:85%" v-model="titleSearch">
                    <button
                        class="btn btn-outline-success my-2 my-sm-0" 
                        type="submit"
                         @click.prevent="goToSearchResultPage">Search
                    </button>
                </form>
                <!-- <div style="margin-left:8px">
                    <button class="btn btn-secondary" >Log Out</button>
                </div> -->
                <!-- start of 'user dropdown' -->
                <div class="japNavBar4">
                    <ul class="navbar-nav mr-auto" style="margin-right:10%">
                    <li class="japNavBar5">
                        <button 
                            type="button" 
                            class="btn btn-outline-success"
                            @click.prevent='goToLoginPage'>Login
                        </button>
                    </li>
                    <li class="japNavBar5">
                        <button 
                            type="button" 
                            class="btn btn-success"
                            @click.prevent="goToRegistrationPage">Register
                        </button>
                    </li>
                    <li class="nav-item dropdown japNavBar5">
                        <div>
                            <b-dropdown id="dropdown-right" right :text="loggedInUserDetail.username" variant="secondary" >
                                <div style="text-align:right">
                                    <b-dropdown-item-button @click.prevent="goToUserProfilePage">Edit Profile</b-dropdown-item-button>
                                    <b-dropdown-item-button @click.prevent="goToProductPage">Add New Product</b-dropdown-item-button>
                                    <b-dropdown-item-button @click.prevent="goToDashboardPage">Dashboard</b-dropdown-item-button>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item-button @click.prevent="logOut">Log Out</b-dropdown-item-button>
                                </div>
                            </b-dropdown>
                        </div>
                    </li>
                    </ul>
                </div>
                <!-- end of 'user dropdown' -->
            </div>
        </nav>
    </div>
    
</template>

<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
    name: 'comp-NavBar',
    methods:{
        goToHomePage(){
            this.$router.push('/')  
        },
        goToMyShopPage(){
            this.$router.push('/myShop')  
        },
        goToMyCartsPage(){
            this.$router.push('/myCarts')  
        },
        goToSearchResultPage(){
            this.$router.push('/searchResult')  
        },
        goToRegistrationPage(){
            this.$router.push('/user/registration')  
        },
        goToLoginPage(){
            this.$router.push('/user/login')  
        },
        goToUserProfilePage(){
            this.$router.push('/userprofile')
        },
        goToDashboardPage(){
            this.$router.push('/dashboard/incompleteInvoice')
        },
        goToProductPage(){
            this.$router.push('/product/create')
        },
        logOut(){
            this.$store.dispatch('logOut')
        },
    },
    computed:{
        ...mapGetters([
            'loggedInUserDetail',
        ])
    }




}
</script>

<style scoped>

.javNavbar1{
    position: static;
    /* border:solid 2px red; */
    /* position: sticky; */
    /* position: absolute; */
    /* position: fixed; */
    /* border: solid 2px red; */
    /* padding-top:1%;
    padding-bottom:1%; */
    height: 20%;
    top: 0;

}

.japNavBar2{
    /* border: solid 2px blue; */
    width: 100%
}

.japNavBar3{
    /* border: solid 2px blue; */
    width: 50%;
    margin:auto
}

.japNavBar4{
    margin-right:2%
}

.japNavBar5{
    /* border:solid 2px red; */
    display: flex;
    margin-right: 3%;
}
</style>