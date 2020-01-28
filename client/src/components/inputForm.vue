<template>
    <div class="w-full max-w-md mx-auto">
    <form v-if="!upId" class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="product-name">
                Product Name
            </label>
            <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product-name" type="text" placeholder="product-name">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                Image
            </label>
            <input @change="setImage" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image" type="file" placeholder="input image">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                Description
            </label>
            <textarea v-model="description" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" rows="5" id="description"  placeholder="input description">
            </textarea>
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                Price
            </label>
            <input v-model="price" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Input price">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                Stock
            </label>
            <input v-model="stock" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="Input stock">
        </div>
        <div class="flex items-center justify-between">
            <button @click.prevent="addProduct" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Add Product
            </button>
        </div>
    </form>
    </div>
</template>

<script>
import { mapActions,mapState, mapMutations } from 'vuex'

export default {
    props:['add'],
    data() {
        return {
            name: '',
            image: '',
            description: '',
            price: 0,
            stock: 0
        }
    },
    computed: {
        ...mapState(['product','success','fail','errorMessage']),
        // ...mapState('product',['upId','upName','upDescription','upPrice','upStock']),
        // upId() {
        //     return this.$store.state.product.upId
        // },
        // upName() {
        //     return this.$store.state.product.upName
        // },
        // upDescription() {
        //     return this.$store.state.product.upDescription
        // },
        // upPrice() {
        //     return this.$store.state.product.upPrice
        // },
        // upStock() {
        //     return this.$store.state.product.upStock
        // }
    },
    methods: {
        ...mapActions('product',['ADD_PRODUCT','UPDATE_PRODUCT']),
        ...mapMutations('product',['SET_UP_NAME','SET_UP_DESCRIPTION','SET_UP_PRICE','SET_UP_STOCK']),
        setImage(event) {
            this.image = event.target.files[0]
        },
        addProduct() {
            let fd = new FormData()
            fd.append('name',this.name)
            fd.append('image',this.image)
            fd.append('description',this.description)
            fd.append('price',this.price)
            fd.append('stock',this.stock)

            this.ADD_PRODUCT({fd})

            this.name = ''
            this.image = ''
            this.description = ''
            this.price = 0
            this.stock = 0
        },
        // setName() {
        //     console.log(event)
        //     this.SET_UP_NAME(this.upName)
        // },
        // setDescription() {
        //     this.SET_UP_DESCRIPTION(this.upDescription)
        // },
        // setPrice() {
        //     this.SET_UP_PRICE(this.upPrice)
        // },
        // setStock() {
        //     this.SET_UP_STOCK(this.upStock)
        // },
        // updateProduct() {
        //     this.UPDATE_PRODUCT({
        //         id: this.upId,
        //         name: this.upName,
        //         description: this.upDescription,
        //         price: this.upPrice,
        //         stock: this.upStock
        //     })
        // }
    }
}
</script>

<style>

</style>