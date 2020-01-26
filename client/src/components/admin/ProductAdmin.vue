<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "ProductAdmin",
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "name",
          sortable: true
        },
        {
          key: "image",
          sortable: true
        },
        {
          key: "price",
          sortable: true
        },
        {
          key: "description",
          sortable: true
        },
        {
          key: "stock",
          sortable: true
        },
        {
          key: "weight",
          sortable: true
        },
        {
          key: "city",
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
          url: 'products'
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