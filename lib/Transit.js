import { normalizeTime } from "../util/helpers";
import { transitProps } from "../util/transitProps";


export default (Vue, cfg) => {
  return {
    name: cfg.transitComponentName,
    props: {
      name: {
        type: String,
        required: false
      },
      initOnly: {
        type: Boolean,
        required: false,
        default: false
      },
      delay: {
        type: [Number, Object, null],
        required: false,
        default: null
      },
      duration: {
        type: [Number, Object, null],
        required: false,
        default: null
      },
      easing: {
        type: [String, Object, null],
        required: false,
        default: null
      },
      beforeEnter: {
        type: Function,
        required: false,
        default: () => {}
      },
      afterEnter: {
        type: Function,
        required: false,
        default: () => {}
      },
      beforeLeave: {
        type: Function,
        required: false,
        default: () => {}
      },
      afterLeave: {
        type: Function,
        required: false,
        default: () => {}
      }
    },
    watch: {
      if (b) {

        // Adding explicit timing values
        if (b) {
          this.attachStyle("transitionTimingFunction", this._easing.enter, this.$el);
          this.attachStyleWithUnit("transitionDelay", "ms", this._delay.enter, this.$el);
          this.attachStyleWithUnit("transitionDuration", "ms", this._duration.enter, this.$el);
        } else {
          this.attachStyle("transitionTimingFunction", this._easing.leave, this.$el);
          this.attachStyleWithUnit("transitionDelay", "ms", this._delay.leave, this.$el);
          this.attachStyleWithUnit("transitionDuration", "ms", this._duration.leave, this.$el);
        }

        if (b) {
          this.beforeEnter();
          this.$el.addEventListener("transitionend", this._afterEnter);
        } else {
          this.beforeLeave();
          this.$el.addEventListener("transitionend", this._afterLeave);
        }

        if (!b) {
          const f = () => {
            const cDel = window.getComputedStyle(this.$el).transitionDelay;
            const cDur = window.getComputedStyle(this.$el).transitionDuration;
            const nDel = normalizeTime(cDel);
            const nDur = normalizeTime(cDur);
            this.$store.dispatch(`${cfg.storeNamespace}/setImplicitDuration`, nDel + nDur);
          };
          Vue.nextTick(f);
        }
      }
    },
    computed: {
      if () {
        return this.$store.state[cfg.storeNamespace]["if"];
      },
      initialized () {
        return this.$store.state[cfg.storeNamespace]["initialized"];
      },
      shouldPlay () {
        if (this.initOnly && this.initialized) { return false; }
        return true;
      },
      className () {
        if (!this.shouldPlay) { return ""; }
        return this.if ? this.name + "--enter" : this.name + "--leave";
      },
      _delay () {
        return this.normalizeStyleSetting(this.delay);
      },
      _duration () {
        return this.normalizeStyleSetting(this.duration);
      },
      _easing () {
        return this.normalizeStyleSetting(this.easing);
      }
    },
    methods: {
      normalizeStyleSetting (t) {
        if (t === null) { return { enter: null, leave: null }; }
        if (typeof t === "object") {
          if (typeof t.enter === "undefined") { t.enter = null; }
          if (typeof t.leave === "undefined") { t.leave = null; }
          return t;
        }
        if (typeof t === "number" || typeof t === "string") {
          return { enter: t, leave: t }; 
        }
      },
      attachStyle (prop, v, el) {
        if (v === null) { return; }
        el.style[prop] = `${v}`;
      },
      attachStyleWithUnit(prop, unit, val, el) {
        if (val === null) { return; }
        el.style[prop] = `${val}${unit}`;
      },
      _afterEnter () {
        this.afterEnter();
        this.$el.removeEventListener("transitionend", this._afterEnter);
      },
      _afterLeave () {
        this.afterLeave();
        this.$el.removeEventListener("transitionend", this._afterLeave);
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
