<template>
  <div>
    <div class="h-screen">
      <div class="flex h-full">
        <div class="ml-5">
          <h1 class="text-6xl font-hairline tracking-wider text-red-900 mt-16">
            Our Collections
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guitar',
  watch: {
    $route: {
      immediate: true,
      handler: function(val) {
        console.log(val)
      },
    },
  },
}
</script>

<style></style>
