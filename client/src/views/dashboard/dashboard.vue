<template>
    <div class="fade-in">
        <h4>dashboard</h4>
        <div id="japDashboardContainer">
    
        <div id="japDashboardHeader">
            <b-list-group horizontal>
                <b-list-group-item 
                    button class="d-flex justify-content-between align-items-center col-md-2"
                    @click.prevent="goToDashboardTab( 'invoiceIncomplete' )">
                    incomplete Invoice
                    <b-badge variant="primary" pill></b-badge>
                </b-list-group-item>


                <b-list-group-item 
                    button class="d-flex justify-content-between align-items-center col-md-2"
                    @click.prevent="goToDashboardTab( 'invoiceComplete' )">
                    Transaction History
                    <b-badge variant="primary" pill></b-badge>
                </b-list-group-item>


                <b-list-group-item 
                    button class="d-flex justify-content-between align-items-center col-md-2"
                    @click.prevent="goToDashboardTab( 'POOngoing' )">
                    Ongoing PO
                    <b-badge variant="primary" pill></b-badge>
                </b-list-group-item>


                <b-list-group-item 
                    button class="d-flex justify-content-between align-items-center col-md-2"
                    @click.prevent="goToDashboardTab( 'POComplete' )">
                    Complete PO
                    <b-badge variant="primary" pill></b-badge>
                </b-list-group-item>

            </b-list-group>
        </div>
        
        <div id="japDashboardContent">
            <router-view/>
        </div>

        </div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    sockets: {
        reFetchInvoice: function () {
            console.log('ADA UPDATE NIH message dari DASHBOARD')
        }
        
    },
    name: 'dashboard',
    methods:{
        goToDashboardTab( tab ){
            this.$router.push(`/dashboard/${tab}`)
        }
    },
    created(){
    },
    computed:{
        ...mapGetters([
        ])        
    }

}
</script>

<style scoped>
#japDashboardContainer{
    /* border: solid 2px red; */

    width: 95%;
    margin: auto;
    overflow-y: hidden
    /* padding: 1%; */
}

#japDashboardHeader{
    /* border: solid 2px blue; */
}

#japDashboardContent{
    /* border: solid 2px green; */

    height: 80vh;
    /* width: 95%; */
    overflow-x: scroll;
}

</style>