<template>
  <div>
    <div class="row no-gutters" style="height: 30vh;">
      <div class="col-md-5">
        <img :src="image" class="card-img h-100 w-100" alt="itemDetail" />
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          <b-button href="#" variant="primary">Add to Cart</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: 'https://picsum.photos/600/300/?image=25'
    }
  }
}
</script>

<style lang="css" scoped></style>
