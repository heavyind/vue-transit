import { normalizeTime } from "../util/helpers";
import { transitProps } from "../util/transitProps";


export default (Vue, cfg) => {
  return {
    name: cfg.transitComponentName,
    props: transitProps.props,
    data () {
      return {
        ready: false,
        wrapOpacity: 0,
        isIntersecting: false
      };
    },
    watch: {
      ready (b) {
        console.log(this.intersect);
        if (b) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!this.intersect) {
                //console.log("No intersect required.");
                //this.wrapOpacity = 1;
              } else {
                //console.log("Intersect required.");
              }
            });
          });
        }
      },
      if (b) {
        // Adding explicit timing values
        if (b) {
          this.attachStyle("transitionTimingFunction", this._easing.enter, this.$refs.inner);
          this.attachStyleWithUnit("transitionDelay", "ms", this._delay.enter, this.$refs.inner);
          this.attachStyleWithUnit("transitionDuration", "ms", this._duration.enter, this.$refs.inner);
        } else {
          this.attachStyle("transitionTimingFunction", this._easing.leave, this.$refs.inner);
          this.attachStyleWithUnit("transitionDelay", "ms", this._delay.leave, this.$refs.inner);
          this.attachStyleWithUnit("transitionDuration", "ms", this._duration.leave, this.$refs.inner);
        }
        if (b) {
          this.beforeEnter();
          this.$refs.inner.addEventListener("transitionend", this._afterEnter);
        } else {
          this.beforeLeave();
          this.$refs.inner.addEventListener("transitionend", this._afterLeave);
        }
        if (!b) {
          const f = () => {
            const cDel = window.getComputedStyle(this.$refs.inner).transitionDelay;
            const cDur = window.getComputedStyle(this.$refs.inner).transitionDuration;
            const nDel = normalizeTime(cDel);
            const nDur = normalizeTime(cDur);
            this.$store.dispatch(`${cfg.storeNamespace}/setImplicitDuration`, nDel + nDur);
          };
          Vue.nextTick(f);
        }
        this.wrapOpacity = 1;
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
        if (!this.shouldPlay) { return this.name; }
        if (this.intersect && (!this.isIntersecting)) { return this.name + "--leave"; }
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
      _afterEnter (e) {
        this.afterEnter();
        e.target.removeEventListener("transitionend", this._afterEnter);
      },
      _afterLeave (e) {
        this.afterLeave();
        e.target.removeEventListener("transitionend", this._afterLeave);
      }
    },
    mounted () {
      if (this.intersect) {
        const io = new IntersectionObserver((entries, observer) => {
          if (entries[0].isIntersecting) {
            this.isIntersecting = true;
          }
          if (!this.ready) { this.ready = true; }
        }, {
          root: null,
          rootMargin: "0px",
          threshold: 0.5
        });
        io.observe(this.$el);
      }
    },
    render (h) {
      const wrapData = {
        style: {
          opacity: this.wrapOpacity
        }
      };
      const targetData = {
        attrs: {
          class: this.className
        },
        ref: "inner"
      };
      return h("div", wrapData, [h("div", targetData, this.$slots.default)]);
    }
  };
};
