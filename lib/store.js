

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
    state.initialized = true;
  },

  setExplicitDuration (state, d) {
    state.explicitDuration = d;
  },

  setImplicitDuration (state, d) {
    state.implicitDuration = Math.max(state.implicitDuration, d);
  },

  clearExplicitDuration (state) {
    state.explicitDuration = null;
  },

  clearImplicitDuration (state) {
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

  reset ({ commit }) {
    commit("clearImplicitDuration");
    commit("clearExplicitDuration");
  }
};


const getters = {
  duration (state) {
    if (state.explicitDuration !== null) {
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
