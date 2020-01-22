<template>
    <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3 cartCard">
            <b-card-text style="color:black;">
            <h1>Item Name</h1>
            <p>
            Item Description
            </p>
            <b-row style="float:left;" align-v="center">
                <b-button pill variant="outline-warning" @click="amount--"><i class="fas fa-minus"></i></b-button>
                <p class="mx-2" style="margin-bottom:0px;">{{amount}}</p>
                <b-button pill variant="outline-warning" @click="amount++"><i class="fas fa-plus"></i></b-button>
            </b-row>
            <b-button variant="danger" style="float:right;"><i class="fas fa-trash-alt"></i></b-button>
      </b-card-text>
    </b-card>
</template>

<script>
export default {
  name: 'CartItems',
  data () {
    return {
      amount: 1
    }
  }
}
</script>

<style scoped>
    .cartCard {
        width: 100%;
        height: 20vh;
        margin-top: 2%;
        margin-bottom: 1%;
    }
</style>
