<template>
   <div id="appbody" class="bg-wetasphalt">
      <div id="navbar"></div>
      <router-view :key="$route.fullPath"/>
   </div>
</template>

<script>
export default {
   name: 'App'
}
</script>

<style>
   #appbody {
      width: 100vw;
   }

   .bg-wetasphalt {
      background-color: #34495e;
   }

   .text-wetasphalt {
      color: #34495e;
   }

   .bg-midnightblue {
      background-color: #2c3e50;
   }

   .text-midnightblue {
      color: #2c3e50;
   }

   .bg-clouds {
      background-color: #ECF0F1;
   }

   .text-clouods {
      color: #ECF0F1;
   }

   .bg-silver {
      background-color: #BDC3C7;
   }

   .text-silver {
      color: #BDC3C7;
   }
</style>