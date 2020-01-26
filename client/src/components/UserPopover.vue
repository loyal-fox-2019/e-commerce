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

    <!-- Output from the popover interaction -->
    <b-card title="Returned values:" v-if="input1Return && input2Return">
      <p class="card-text">
        Name: <strong>{{ input1Return }}</strong>
        <br />
        Color: <strong>{{ input2Return }}</strong>
      </p>
    </b-card>

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      target="popover-reactive-1"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template v-slot:title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        User Menu
      </template>

      <div>
        <b-form-group
          label="Name"
          label-for="popover-input-1"
          label-cols="3"
          :state="input1state"
          class="mb-1"
          description="Enter your name"
          invalid-feedback="This field is required"
        >
          <b-form-input
            ref="input1"
            id="popover-input-1"
            v-model="input1"
            :state="input1state"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Color"
          label-for="popover-input-2"
          label-cols="3"
          :state="input2state"
          class="mb-1"
          description="Pick a color"
          invalid-feedback="This field is required"
        >
          <b-form-select
            id="popover-input-2"
            v-model="input2"
            :state="input2state"
            :options="options"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-alert show class="small">
          <strong>Current Values:</strong><br />
          Name: <strong>{{ input1 }}</strong
          ><br />
          Color: <strong>{{ input2 }}</strong>
        </b-alert>

        <b-link href="#" @click.prevent="signOut">Keluar</b-link>
        <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
        <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input1state: null,
      input2: "",
      input2state: null,
      options: [{ text: "- Choose 1 -", value: "" }, "Red", "Green", "Blue"],
      input1Return: "",
      input2Return: "",
      popoverShow: false
    };
  },
  computed: {
    name() {
      return localStorage.name;
    }
  },
  watch: {
    input1(val) {
      if (val) {
        this.input1state = true;
      }
    },
    input2(val) {
      if (val) {
        this.input2state = true;
      }
    }
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
    },
    onOk() {
      if (!this.input1) {
        this.input1state = false;
      }
      if (!this.input2) {
        this.input2state = false;
      }
      if (this.input1 && this.input2) {
        this.onClose();
        // Return our popover form results
        this.input1Return = this.input1;
        this.input2Return = this.input2;
      }
    },
    onShow() {
      // This is called just before the popover is shown
      // Reset our popover form variables
      this.input1 = "";
      this.input2 = "";
      this.input1state = null;
      this.input2state = null;
      this.input1Return = "";
      this.input2Return = "";
    },
    onShown() {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      this.focusRef(this.$refs.input1);
    },
    onHidden() {
      // Called just after the popover has finished hiding
      // Bring focus back to the button
      this.focusRef(this.$refs.button);
    },
    focusRef(ref) {
      // Some references may be a component, functional component, or plain element
      // This handles that check before focusing, assuming a `focus()` method exists
      // We do this in a double `$nextTick()` to ensure components have
      // updated & popover positioned first
      this.$nextTick(() => {
        this.$nextTick(() => {
          (ref.$el || ref).focus();
        });
      });
    }
  }
};
</script>
