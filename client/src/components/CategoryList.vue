<template>
  <div>
    <b-card
      overlay
      img-src="https://archive.li/9TMor/d6b7e109e933a41389ca2ba43275354f8674e384.jpg"
      img-alt="Card Image"
      text-variant="white"
    >
      <b-card-text>
        <h2>{{list}}</h2>
        <b-button href="#" variant="warning" class="mt-3">View Details</b-button>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: ['list']
}
</script>
