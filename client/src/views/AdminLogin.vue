<template>
  <div class="admin-login p-5">
    <h3 align="center" class="mb-4">Admin Panel</h3>
    <div class="card form-admin d-block mx-auto">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="example@mail.com"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          autocomplete="off"
        />
      </div>
      <button class="btn btn-success submit-admin">Login</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.form-admin {
  width: 35%;
  padding: 20px;
}
.submit-admin {
  width: 100%;
}
</style>
