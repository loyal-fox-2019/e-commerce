<template>
    <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 mt-3">
        <div class="card p-2">
            <img class="card-img-top rounded" v-bind:src="item.picture" alt="Card image cap">
            <div class="card-body pt-2 px-1 mt-2">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                    <i class="fas fa-money-bill-wave"></i> {{ rupiahPrice }}
                </p>
                <div class="row mt-4">
                    <div class="col-1" id="box-image">
                        <i class="fas fa fa-store-alt"></i>
                    </div>
                    <div class="col-10 seller">
                        Seller: {{ item.userOwner.name }}
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-1" id="box-image">
                        <i class="fas fa-lg fa-box-open"></i>
                    </div>
                    <div class="col-7" id="stock">
                        Stock: {{ item.stock }}
                    </div>
                    <div class="col-1">
                        <i class="fas fa-lg fa-info-circle"></i>
                    </div>
                    <!-- <div class="col-1">
                        <i class="fas fa-lg fa-cart-arrow-down"></i><input type="number" v-model="quantity" min="1" :max="item.stock">
                    </div> -->
                </div>
            </div>
        </div>   
    </div>                   
</template>

<script>
export default {
    name: "product-list",
    props: {
        item: Object
    },
    data(){
        return {
            quantity: null
        }
    },
    methods: {

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

.card-text {
    font-weight: bold;
}

h5 {
    font-weight: bold;
}

.seller {
    text-align: left;
    font-size: 14px;
    color: rgb(63, 91, 119);
}

#stock {
    text-align: left;
    font-size: 14px;
}

.fa-store-alt {
    color: rgb(75, 158, 54);
}

.fa-box-open {
    color: rgb(75, 158, 54);
}

.fa-money-bill-wave {
    color: rgb(75, 158, 54);
}

.fa-info-circle {
    color: rgb(56, 75, 185);
}

.fa-info-circle:hover {
    filter: brightness(50%);
    cursor: pointer;
}

.fa-info-circle:active {
    filter: brightness(100%);
    cursor: pointer;
}

.card-img-top {
    width: 100%;
    height: 12vw;
    object-fit: cover;
}

</style>