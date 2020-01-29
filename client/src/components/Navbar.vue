<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#"><i class="fa fa-dice-four"></i></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="#/sell">Sell <span class="sr-only">(current)</span></a>
            </li>
            <li v-if="user==='admin@hacktivshop.com'" class="nav-item active ml-4">
                <a @click.prevent="adminDashboard" class="nav-link text-white btn btn-dark">Admin Dashboard <span class="sr-only">(current)</span></a>
            </li>
        </ul>
        <form class="form-inline    my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
            <button @click="logout" class="btn btn-outline-dark ml-2 my-2 my-sm-0" type="submit">Logout</button>
        </form>

        <img
        src="https://cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png" 
        width="50px" 
        class="rounded-circle float-right ml-3"
        >

    </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            user : localStorage.user 
        }
    },
    methods : {
        logout(){
            localStorage.clear()
            this.$emit('logout')
            window.location.href = "http://localhost:8080/#/login"
        },
        adminDashboard(){
            this.$router.push('/admin')
        }
    }
}
</script>

<style>

</style>