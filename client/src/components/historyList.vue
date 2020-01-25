<template>
  <div class="listSejarah mx-5">
    <div class="d-flex mx-auto flex-column justify-content-center">
      <div class="col">
        <h4>Total: {{convertRupiah}}</h4>
      </div>
      <div class="col">
        <h4>Check Out: {{sejarah.dateCheckedOut}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "historyList",
  props: ["sejarah"],
  computed: {
    convertRupiah() {
      let angka = this.sejarah.total;
      var rupiah = "";
      if (angka) {
        var angkarev = angka
          .toString()
          .split("")
          .reverse()
          .join("");
        for (var i = 0; i < angkarev.length; i++)
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return (
          "Rp. " +
          rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("") +
          ",00"
        );
      } else {
        return "0";
      }
    }
  }
};
</script>

<style scoped>
.listSejarah {
  border: 1px solid black;
}
</style>