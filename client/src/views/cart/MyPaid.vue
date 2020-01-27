<template>
  <div id="boxy">
    <div style="width:50vw" class="mr-5">
      <TableSui :dataList="myPaids" />
    </div>
  </div>
</template>

<script>
import TableSui from "../../components/TableSui";
export default {
  name: "PaidItem",
  components: { TableSui },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchMyPaid");
  },
  computed: {
    myPaids() {
      return this.$store.state.myPaids;
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