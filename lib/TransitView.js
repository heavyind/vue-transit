

export default (Vue, cfg) => {
  return {
    name: cfg.transitViewComponentName,
    computed: {
      duration () {
        return this.$store.getters[`${cfg.storeNamespace}/duration`];
      }
    },
    methods: {
      setTrue () {
        this.$store.dispatch(`${cfg.storeNamespace}/setTrue`);
      },
      enter (el, done) {
        // Get next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.setTrue();
          });
        });
        done();
      },
      beforeEnter () {
        this.$store.dispatch(`${cfg.storeNamespace}/reset`);
      }
    },
    render (h) {
      const data = {
        props: {
          mode: "out-in",
          duration: this.duration
        },
        on: {
          enter: this.enter,
          beforeEnter: this.beforeEnter
        }
      };
      return h("transition", data, [h("router-view")]);
    }
  };
};
