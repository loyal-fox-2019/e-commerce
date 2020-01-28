<template>
  <div>
    <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="{ backgroundImage: 'url(' + product.item.image + ')' }" title="Woman holding a mug">
        </div>
        <div class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2">{{product.item.name}}</div>
            <div>Seller: {{product.item.seller.name}}</div>
            <div>Price : Rp. {{product.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
            <div>Quantity: x{{product.quantity}}</div>
            <div>Total Price: Rp. {{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
            </div>
            <button @click="deleteFromCart" class="w-4/12 self-center bg-gray-300 border border-gray-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                <span>Delete</span>
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/baseRoute'
import { mapMutations } from 'vuex'

export default {
    props: ['product'],
    computed: {
        total() {
            return this.product.quantity * this.product.item.price
        },
    },
    methods: {
        ...mapMutations('product',['updateCart']),
            deleteFromCart() {
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                    if (result.value) {
                        axios({
                            method:'delete',
                            url: `/user/${this.product.item._id}`,
                            headers: {token: localStorage.getItem('token')}
                        })
                            .then( () => {
                                this.$swal.fire({
                                    icon:'success',
                                    title: 'Deleted from cart!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.updateCart(this.product._id)
                            })
                            .catch( err => {
                                console.log(err )
                                this.$swal.fire({
                                    icon: 'error',
                                    title: `Something's wrong!`,
                                    text: `Couldn't delete from cart!`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                    }
                })
            }
        }
}
</script>

<style>

</style>