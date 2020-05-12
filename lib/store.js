

const state = {
  if: false,
  initialized: false,
  explicitDuration: null,
  implicitDuration: 0
};


const mutations = {

  setTrue (state) {
    state.if = true;
  },

  setFalse (state) {
    state.if = false;
  },

  setInitializedTrue (state) {
    this.initFlag = true;
  },

  setExplicitDuration (state, d) {
    state.explicitDuration = d;
  },

  setImplicitDuration (state, d) {
    state.implicitDuration = Math.max(state.implicitDuration, d);
  },

  clearDuration (state) {
    state.explicitDuration = null;
    state.implicitDuration = 0;
  }
};


const actions = {

  setTrue ({ commit }) {
    commit("setTrue");
  },

  setFalse ({ commit }) {
    commit("setFalse");
  },

  initialize ({ commit }) {
    commit("setTrue");
    commit("setInitializedTrue");
  },

  setExplicitDuration ({ commit }, d) {
    commit("setExplicitDuration", d);
  },

  setImplicitDuration ({ commit }, d) {
    commit("setImplicitDuration", d);
  },

  clearDuration ({ commit }) {
    commit("clearDuration");
  }
};


const getters = {
  duration (state) {
    if (state.explicitDuration !== null) {
      console.log("It's not equal to null! It is", state.explicitDuration, ".");
      return state.explicitDuration;
    }
    return state.implicitDuration;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
