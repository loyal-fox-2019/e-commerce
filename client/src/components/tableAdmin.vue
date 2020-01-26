<template>
  <div class="container">
    <br />
    <center>
      <h1>Data Items</h1>
    </center>
    <br />
    <center>
      <h5>
        <a>Add Item</a>
      </h5>
    </center>
    <br />
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">image</th>
          <th scope="col">Item Name</th>
          <th scope="col">Price</th>
          <th scope="col">qty</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <a href="/">edit</a> |
            <a href="/">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.linkUser:hover {
  color: rgba(255, 255, 255, 0.75) !important;
}
</style>