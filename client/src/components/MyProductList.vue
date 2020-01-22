<template>
    <div class="card col-sm-4 col-md-4 col-lg-3 col-xl-2 p-2 my-2">
        <img class="card-img-top rounded" v-bind:src="item.picture" alt="Card image cap">
        <div class="card-body pt-2 px-1">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">
                <i class="fas fa-money-bill-wave"> {{ rupiahPrice }}</i>
            </p>
            <div class="row mt-2">
                <div class="col-1" id="box-image">
                    <i class="fas fa-lg fa-box-open"></i>
                </div>
                <div class="col-6" id="stock">
                    Stock: {{ item.stock }}
                </div>
                <div class="col-2">
                    <i class="far fa-edit fa-lg dashboard-img" v-on:click="goToUpdate(item.title, item.content, item._id)"></i>
                </div>
                <div class="col-2">
                    <i class="fas fa-trash-alt fa-lg dashboard-img" v-on:click="deleteArticle(item.title, item._id)"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-product-list',
    props: {
        item: Object
    },
    computed: {
        rupiahPrice: function(){
            let angka = this.item.price
            let rupiah = '';		
            let numReverse = angka.toString().split('').reverse().join('');
            for(let i = 0; i < numReverse.length; i++) if(i%3 == 0) rupiah += numReverse.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }
    }
}
</script>

<style scoped>
#stock {
    text-align: left;
    font-size: 14px;
}
h5 {
    font-weight: bold;
}
.fa-edit {
    filter: opacity(90%);
}
.fa-edit:hover {
    cursor: pointer;
    filter: opacity(100%)
}
.fa-edit:active {
    cursor: pointer;
    filter: opacity(90%);
}
.fa-trash-alt {
    filter: opacity(90%);
    color: rgb(223, 51, 51);
}
.fa-trash-alt:hover {
    cursor: pointer;
    filter: opacity(100%)
}
.fa-trash-alt:active {
    filter: opacity(90%);
    cursor: pointer;
}

</style>