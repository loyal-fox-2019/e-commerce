<template>
  <div @click="close" class="modal animated fadeIn faster fixed z-50 pin bg-smoke-light w-full h-full pt-3 pb-3" style="overflow-x:hidden; overflow-y:auto;">
    <div @click.stop v-bind:class="issueModalSize" class="animated border border-smoke-lighter border-solid fixed shadow-inner w-full md:relative mx-auto bg-white md:rounded md:shadow flex flex-col">
      <div class="flex justify-between border-b border-grey-lighter border-solid">
        <span class="text-3xl font-hairline text-grey pt-4 pl-4 pb-4" id="title">
          {{ title }}
        </span>
        <span @click="close" class="flex flex-col justify-center pr-4">
          <svg class="h-6 w-6 font-hairline text-grey hover:text-grey-lighter" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </span>
      </div>
      <div class="pt-4 pr-6 pb-4 pl-6 text-sm">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      paddingRight: 0,
      isModalOverflowing: false,
      isBodyOverflowing: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    }
  },
  methods: {
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    close: function() {
      this.$emit("close");
    },
    _adjustDialog() {
      this.isModalOverflowing =
        this.$el.scrollHeight > document.documentElement.clientHeight;

      if (!this.isBodyOverflowing && this.isModalOverflowing) {
        this.$el.style.paddingLeft = `${this._scrollbarWidth}px`;
      }

      if (this.isBodyOverflowing && !this.isModalOverflowing) {
        this.$el.style.paddingRight = `${this._scrollbarWidth}px`;
      }
    },
    _resetAdjustments() {
      this.$el.style.paddingLeft = "";
      this.$el.style.paddingRight = "";
    },
    _checkScrollbar() {
      const rect = document.body.getBoundingClientRect();
      this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    },
    _setScrollbar() {
      if (this.isBodyOverflowing) {
        const actualPadding = document.body.style.paddingRight;
        /* eslint-disable */
        const calculatedPadding = $(document.body).css("padding-right");
        this.paddingRight = actualPadding;
        /* eslint-disable */
        $(document.body).css(
          "padding-right",
          `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`
        );
      }
    },
    _resetScrollbar() {
      const padding = this.paddingRight;
      this.paddingRight = 0;
      document.body.style.paddingRight = padding ? padding : 0;
    },
    _getScrollbarWidth() {
      const scrollDiv = document.createElement("div");
      scrollDiv.className = "modal-scrollbar-measure";
      document.body.appendChild(scrollDiv);
      const scrollbarWidth =
        scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }
  },
  computed: {
    issueModalSize: function() {
      return "max-w-" + this.size;
    }
  },
  watch: {
    isModalOverflowing: function(overflowing) {
      console.log(overflowing ? "modal is overflowing" : "");
    },
    isBodyOverflowing: function(overflowing) {
      console.log(overflowing ? "body is overflowing" : "");
    }
  },
  activated: function() {
  },
  created: function() {
  },
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.close();
      }
    });
    this._checkScrollbar();
    this._setScrollbar();
    this._adjustDialog();
    this.toggleBodyClass("addClass", "overflow-hidden");
  },
  destroyed() {
    this._resetAdjustments();
    this._resetScrollbar();
    this.toggleBodyClass("removeClass", "overflow-hidden");
  }
}
</script>

<style scoped>
  #title {
    font-family: 'Acme', sans-serif;
  }
</style>