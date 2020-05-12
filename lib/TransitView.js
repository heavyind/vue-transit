

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
      setFalse () {
        this.$store.dispatch(`${cfg.storeNamespace}/setFalse`);
      },
      afterEnter () {
        this.setTrue();
      }
    },
    render (h) {
      const data = {
        props: {
          mode: "out-in",
          duration: this.duration
        },
        on: {
          afterEnter: this.afterEnter
        }
      };
      return h("transition", data, [h("router-view")]);
    }
  };
};
