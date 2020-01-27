<template>
    <div id="portofolio">
        <div class="container" style="margin-top: 120px;">
            <div class="row">
                <div class="col-lg-3 col-card-car" v-for="(portofolio, i) in portofolios" :key="i">
                    <carCard v-bind:portofolio="portofolio"></carCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import carCard from '@/components/CarCard.vue';
import axios from 'axios';

export default {
    name: 'Portofolio',
    components: {
        Navbar,
        carCard
    },
    created() {
        this.getPortofolio();
    },
    data() {
        return {
            portofolios: []
        }
    },
    methods: {
        getPortofolio: function() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/portofolio'
            })
            .then(respond => {
                this.portofolios = respond.data.data
            })
            .catch(error => {
                console.log({error});
            })
        }
    }
}
</script>

<style>
.col-card-car {
    padding: 3px !important;
}
</style>