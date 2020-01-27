<template>
    <div class="card my-4">
        <h5 class="card-header">Detail Transaction</h5>
           <div class="card-body">
             <div class="row justify-content-between">
             <p class="mx-4">ID : {{detail._id}} </p>
            </div>
            <div class="row">
              <p class="mx-4">Address : {{detail.address}}</p>
            </div>
            <div class="row">
              <p class="mx-4" v-if="detail.status == 'Received'" style="color:green;"><span style="color:black;">Status: </span>{{detail.status}}</p>
              <p class="mx-4" v-else style="color:red;"><span style="color:black;">Status: </span>{{detail.status}}</p>
            </div>
          </div>
    </div>
</template>

<script>
export default {
    props:['detail']
}
</script>

