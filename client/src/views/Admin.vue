<template>
  <div class="container mx-auto w-3/5 flex flex-col">
    <ul class="mt-20 rounded border md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
      <li>
        <router-link
          to="/admin/transactions"
          class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
          Transactions
        </router-link>
        <router-link
          to="/admin/products"
          class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
          Products
        </router-link>
        <router-link
          to="/admin/add-product"
          class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
          Add New Products
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style>

</style>