<template>
  <sui-card>
    <sui-image :src="item.image" />
    <sui-card-content>
      <sui-card-header>{{item.name}}</sui-card-header>
      <sui-card-meta>{{item.city}}</sui-card-meta>
      <sui-card-description>{{item.description}}</sui-card-description>
    </sui-card-content>
    <sui-card-content extra>
      <sui-icon name="user" />{{item.stock}}
      <sui-icon name="weight" />{{item.weight}} kg
      <span slot="right">Rp {{item.price}}</span>
    </sui-card-content>
  </sui-card>
</template>

<script>
export default {
    name: 'ItemCard',
    props: ['item']
};
</script>

<style>
</style>