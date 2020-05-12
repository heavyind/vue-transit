import { normalizeTime } from "../util/helpers";


export default (Vue, cfg) => {
  return {
    name: cfg.transitComponentName,
    props: {
      name: {
        type: String,
        required: false
      }
    },
    watch: {
      if (b) {
        const f = () => {
          const cDel = window.getComputedStyle(this.$el).transitionDelay;
          const cDur = window.getComputedStyle(this.$el).transitionDuration;
          const nDel = normalizeTime(cDel);
          const nDur = normalizeTime(cDur);
          this.$store.dispatch(`${cfg.storeNamespace}/setImplicitDuration`, nDel + nDur);
        };
        Vue.nextTick(f);
      }
    },
    computed: {
      if () {
        return this.$store.state[cfg.storeNamespace]["if"];
      },
      className () {
        return this.if ? this.name + "--enter" : this.name + "--leave";
      }
    },
    render (h) {
      const data = {
        attrs: {
          class: this.className
        }
      };
      return h("div", data, this.$slots.default);
    }
  };
};
