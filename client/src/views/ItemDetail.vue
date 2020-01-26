<template>
  <div>
    <div class="container-fluid mt-4 mb-5">
      <div class="row">
        <div class="col-12">
          <div class="container">
            <DetailCard></DetailCard>
          </div>
        </div>
        <div class="col-12">
          <h2 class="text-center mt-4 mb-4">Something you might like</h2>
          <CardItem></CardItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailCard from '@/components/DetailCard.vue'
import CardItem from '@/components/CardItem.vue'

export default {
  name: 'DetailItem',
  components: {
    DetailCard,
    CardItem
  }
}
</script>

<style lang="css" scoped></style>
