<template>
    <div class="card" 
    v-on:mouseover="showCardContent = true"
    v-on:mouseleave="showCardContent = false">
        <div class="card-body" style="padding: 5px;">
            <img class="img-responsive card-img-top" 
            v-bind:src="portofolio.image"
            style="width:100%;"
            v-animate-css="'fadeIn'"/>
            <div v-if="showCardContent" class="card-content" v-animate-css="'fadeInUp'">
                <h6>{{portofolio.description}}</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'carCard',
    props: ['portofolio'],
    data() {
        return {
            showCardContent: false,
        }
    },
}
</script>

<style scoped>
.card {
    position: relative;
}
.card-content {
    padding: 6px 5px 5px 5px;
    position: absolute;
    background-color: rgba(220,220,220, 0.5);
    width: 96.4%;
    bottom: 5.8px;
    left: 5px;
}
</style>