<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "Transaction",
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "status",
          sortable: true
        },
        {
            key: "qty",
            sortable: true
        },
        {
          key: "buyer",
          sortable: true
        },
        {
          key: "product",
          sortable: true
        },
        {
          key: "seller",
          sortable: true
        },
        // {
        //   key: "age",
        //   label: "Person age",
        //   sortable: true,
        //   // Variant applies to the whole column, including the header and footer
        //   variant: "danger"
        // }
      ],
      items: []
    };
  },
  beforeMount(){
      this.axios({
          method: 'get',
          url: 'carts/all'
      })
      .then(({data}) => {
          this.items = data
      }).catch((err) => {
          this.$swal.fire('Something went wrong...')
          console.log(err.response);
      });
  }
};
</script>

<style>
</style>