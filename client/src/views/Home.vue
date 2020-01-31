<template>
  <div>
    <div v-show="userRole === 'customer'" class="home">
      <carouselHome></carouselHome>
      <promotion></promotion>
      <cardItem></cardItem>
    </div>
    <div v-show="userRole === 'admin'" class="admin">
      <tableAdmin v-show="table === 'table'" @gotoAdd="gotoAdd" @updateItem="updateItem"></tableAdmin>
      <addItem v-show="table === 'addForm'" @submitItem="gotoTable" @getBack="gotoTable"></addItem>
      <updateItem
        v-show="table === 'updateItem'"
        :itemToEdit="itemToEdit"
        @itemUpdate="gotoTable"
        @getBack="gotoTable"
      ></updateItem>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import carouselHome from "@/components/carouselHome.vue";
import promotion from "@/components/promotion.vue";
import cardItem from "@/components/cardItem.vue";
import tableAdmin from "@/components/tableAdmin.vue";
import addItem from "@/components/addItem.vue";
import updateItem from "@/components/updateItem.vue";

export default {
  name: "home",
  components: {
    carouselHome,
    promotion,
    cardItem,
    tableAdmin,
    addItem,
    updateItem
  },
  data() {
    return {
      userRole: "",
      table: "table",
      itemToEdit: {}
    };
  },
  methods: {
    gotoAdd() {
      this.table = "addForm";
    },
    gotoTable() {
      this.table = "table";
    },
    updateItem(payload) {
      this.itemToEdit = payload;
      this.table = "updateItem";
    }
  },
  created() {
    if (localStorage.getItem("role") === "admin") {
      this.userRole = "admin";
    } else {
      this.userRole = "customer";
    }
  }
};
</script>
