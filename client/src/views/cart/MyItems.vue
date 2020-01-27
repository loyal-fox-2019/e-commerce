<template>
  <div id="boxy">
    <div style="width:50vw" class="mr-5">
      <TableSui :dataList="myItems" />
    </div>
  </div>
</template>

<script>
import TableSui from "../../components/TableSui";
export default {
  name: "DeliveredItems",
  components: { TableSui },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchMyItem");
  },
  computed: {
    myItems() {
      return this.$store.state.myItems;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
#boxy {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 15px;
  width: 100vw;
}
</style>