<template>
  <div>
        
            <td>1313132132</td>
            <td>Jap</td>
            <td>1500000</td>
            <td>paid</td>
            <td>confirm</td>
            <td>1523131564</td>
            <td>confirm</td>
            <td>complete</td>
            <td style="border:none">
                <b-button variant="outline-primary">update</b-button>
            </td>
        
  </div>
</template>

<script>
export default {
    name:'invoiceItem'

}
</script>

<style scoped>
#japTableInvoice{
    /* border: solid 2px red; */

    font-family: 'Mukta', sans-serif;
}

table, th, td{
    padding: 10px;
    border: 1px solid black; 
    border-collapse: collapse;
    border-radius: 2px;
    /* background-color: #e5e5e5; */
    text-align: center;
}
table{
    border-right: 0;
    border-bottom: 0
}

th{
    color: white;
    font-weight: 100;
    font-family: 'Mukta', sans-serif;
    background-color: rgb(97, 100, 96);

}

</style>