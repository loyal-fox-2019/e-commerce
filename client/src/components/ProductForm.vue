<template>
  <div class="border border-gray-300 p-4 mt-2 rounded">
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
</template>

<script>
export default {

}
</script>

<style>

</style>