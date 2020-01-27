<template>
    <div class="fade-in">
        <h4>dashboard</h4>
        <div id="japDashboardContainer">
    
        <div id="japDashboardHeader">
            <b-list-group horizontal>
                <b-list-group-item 
                    button class="d-flex justify-content-between align-items-center col-md-2"
                    @click.prevent="goToDashboardIncompleteInvoice">
                    incomplete Invoice
                    <b-badge variant="primary" pill>140</b-badge>
                </b-list-group-item>


                <b-list-group-item 
                    button class="d-flex justify-content-between align-items-center col-md-2"
                    @click.prevent="goToDashboardTransactionHistory">
                    Transaction History
                    <b-badge variant="primary" pill>1</b-badge>
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
export default {
    name: 'dashboard',
    methods:{
        goToDashboardIncompleteInvoice(){
            this.$router.push('/dashboard/incompleteInvoice')
        },
        goToDashboardTransactionHistory(){
            this.$router.push('/dashboard/transactionHistory')
        }
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