<template>
  <div class="pt-12 bg-gray-200">
	<div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
		<div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
			<h1 class="my-4 text-5xl font-bold leading-tight">Welcome to our website!</h1>
			<p class="leading-normal text-2xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...</p>
			<router-link to="/products" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
        Explore Our Products
			</router-link>
		</div>
	</div>

</div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>

</style>