<template>
  <div>
    <router-link :to="{ name: 'product', params: {id: item.product._id } }">
    <div class="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest mb-4">
            <img class="w-1/2 h-full rounded-l-sm" :src="item.product.image">
            <div class="w-full flex flex-col">
                <div class="p-4 pb-0 flex-1">
                    <h3 class="text-left font-bold mb-1 text-grey-darkest">{{ item.product.name }}</h3>
                    <div class="text-xs flex items-center mb-4">
                        {{ item.product.brand }}
                    </div>
                    <span class="text-2xl text-grey-darkest">Rp. {{ item.product.price * item.quantity }}</span>
                    <div class="flex items-center mt-4">
                        <div class="pr-2 text-base">
                            {{ item.quantity }}
                        </div>*
                        <div class="px-2 text-base">
                             {{ item.product.price }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: {
    item: Object
  }
}
</script>

<style>

</style>