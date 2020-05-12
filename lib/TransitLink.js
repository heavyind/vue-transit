

export default (Vue, cfg) => {
  return {
    name: cfg.transitLinkComponentName,
    props: {
      to: {
        type: String,
        required: true
      },
      duration: {
        type: [Number, null],
        required: false,
        default: null
      }
    },
    methods: {
      setFalse () {
        this.$store.dispatch(`${cfg.storeNamespace}/setFalse`);
      },
      setExplicitDuration (d) {
        this.$store.dispatch(`${cfg.storeNamespace}/setExplicitDuration`, d);
      },
      handleClick (e) {
        e.preventDefault();
        if (this.to !== this.$route.path) {
          if (this.duration !== null) {
            this.setExplicitDuration(this.duration);
          }
          this.setFalse();
          this.$router.push(this.to);
        }
      }
    },
    render (h) {
      const data = {
        attrs: {
          href: this.to
        },
        on: {
          click: this.handleClick
        }
      };
      return h("a", data, this.$slots.default);
    }
  };
};
