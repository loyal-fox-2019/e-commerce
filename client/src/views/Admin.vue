<template>
  <div>
    <sui-tab :menu="{ vertical: true, fluid: true, tabular: true }">
        <sui-tab-pane title="User">
          <User/>
        </sui-tab-pane>
        <sui-tab-pane title="Product">
            <ProductAdmin/>
        </sui-tab-pane>
        <sui-tab-pane title="Transaction">
            <Transaction/>
        </sui-tab-pane>
    </sui-tab>
  </div>
</template>

<script>
import User from '../components/admin/User';
import ProductAdmin from '../components/admin/ProductAdmin';
import Transaction from '../components/admin/Transaction';

export default {
    name: 'Admin',
    components:{
        User,
        ProductAdmin,
        Transaction
    }
};
</script>

<style>
</style>