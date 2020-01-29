<template>
    <div>
        <div class="container">
            <h1>Transacations</h1>
            <div class="row">
                <TransactionCard v-for="(transaction, i) in transactionList" :key="i" :transaction="transaction"></TransactionCard>
            </div>
        </div>
    </div>
</template>

<script>
import TransactionCard from '../components/TransactionCard'
import axios from 'axios'

export default {
    data(){
        return {
            transactionList : []
        }
    },
    components : {
        TransactionCard
    },
    created(){
        axios({
            url : 'http://localhost:3000/transaction',
            method : 'get',
            headers : {
                token : localStorage.token
            }
        })
        .then(({data})=>{
            console.log(data)
            this.transactionList = data
        })
        .catch(err => {
            console.log(err)
            swal.fire('oops failed to fetch transactions')
        })
    }
}
</script>

<style scoped>

</style>