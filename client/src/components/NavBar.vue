<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo_small.png" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav text-uppercase mx-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Category</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Designer</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">About</a>
                </li>
              </ul>
              <a href="" class="nav-link text-white"><i class="fas fa-shopping-cart"></i>My Cart (<span>12</span>)</a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
    .navbar {
        background-color: #171717;
        border-bottom: 1px solid #333;
    }

    .nav-item {
        margin-right: 20px;
        font-weight: 200;
    }

    .nav-item.active a {
        color: rgb(245, 225, 48) !important;
        font-weight: 600;
    }

    .nav-link span {
        color: rgb(245, 225, 48) !important;
        font-weight: 600;
    }
</style>