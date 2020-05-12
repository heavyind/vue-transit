import transitStore from "./lib/store";
import Transit from "./lib/Transit";
import TransitLink from "./lib/TransitLink";
import TransitView from "./lib/TransitView";
import { cfgDefault } from "./util/config";
import e from "./util/e.js";
import { transitProps } from "./util/transitProps";




export default {

  install (Vue, _cfg) {

    if (typeof _cfg === "undefined") {
      throw new Error(e.cfgUndefined);
    }

    if (typeof _cfg.store === "undefined") {
      throw new Error(e.cfgStoreUndefined);
    }

    if (typeof _cfg.router === "undefined") {
      throw new Error(e.cfgRouterUndefined);
    }

    const cfg = { ...cfgDefault, ..._cfg };

    const store = cfg.store;
    const router = cfg.router;

    store.registerModule(cfg.storeNamespace, transitStore);

    router.beforeEach((to, from, next) => {
      store.dispatch(`${cfg.storeNamespace}/setFalse`);

      Vue.nextTick(next);
    });

    if (cfg.mixin) {
      Vue.mixin(createTransitMixin(cfg));
    }

    Vue.component(cfg.transitComponentName, Transit(Vue, cfg));
    Vue.component(cfg.transitLinkComponentName, TransitLink(Vue, cfg));
    Vue.component(cfg.transitViewComponentName, TransitView(Vue, cfg));
  },
  transitProps
};
