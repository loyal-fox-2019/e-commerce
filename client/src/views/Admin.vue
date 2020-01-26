<template>
  <div class="container mx-auto w-3/5 border rounded flex flex-col">
    <ul class="border md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
      <li>
        <router-link
          to=""
          class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
          Transactions
        </router-link>
        <router-link
          to=""
          class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
          Products
        </router-link>
      </li>
    </ul>
    <div class="border border-gray-300 p-4">
      <h4 class="text-lg mb-4 font-bold">Add New Product</h4>
      <form>
        <label class="">
          Product Name:
        </label>
        <input type="text" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
        <label class="">
          Description:
        </label>
        <textarea type="text" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded"></textarea>
        <label class="">
          Image Link:
        </label>
        <input type="text" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
        <label class="">
          Stock:
        </label>
        <input type="number" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
        <button class="mt-2 border border-gray-600 w-full rounded py-1">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style>

</style>