

export const transitProps = {
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
  }
};
