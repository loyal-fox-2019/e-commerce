<template>
  <div id="my-container">
    <div>
      <!-- Our triggering (target) element -->
      <b-button
        id="popover-reactive-1"
        variant="light"
        ref="button"
        size="sm"
        class="m-0 p-0"
        style="font-size:15px;"
      >
        <b-img
          src="https://storage.cloud.google.com/tookoo-img/default-profile-picture1.jpg"
          fluid
          alt="Fluid image"
          rounded="circle"
          class="mr-2"
          v-bind="{
            width: 25,
            height: 25,
            class: 'm1'
          }"
        ></b-img>
        {{ name }}
      </b-button>
    </div>

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      target="popover-reactive-1"
      triggers="hover"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
    >
      <template v-slot:title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        User Menu
      </template>
      <div class="text-right">
        <b-button size="sm" variant="success" block to="/seller">
          Mulai Berjualan
        </b-button>
        <b-button size="sm" variant="outline-primary" block>
          Halaman Penjual
        </b-button>
        <!-- <b-button size="sm" variant="primary">Keluar</b-button> -->
        <hr />
        <b-link
          href="#"
          @click.prevent="signOut"
          block
          class="text-danger font-weight-light mt-3"
        >
          Keluar
        </b-link>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return localStorage.name;
    }
  },
  data() {
    return {
      popoverShow: false
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      this.$emit("isLogout", true);
      this.$forceUpdate();
      // location.reload();
    },
    onClose() {
      this.popoverShow = false;
    }
  }
};
</script>
