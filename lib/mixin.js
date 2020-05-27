import { cfgDefault } from "../util/config";


export const createTransitMixin = (_cfg) => {

  const cfg = { ...cfgDefault, ..._cfg };

  return {
    computed: {
      [`${cfg.mixinNamespace}`] () {
        return {
          initialize: () => {
            cfg.store.dispatch(`${cfg.storeNamespace}/initialize`);
          }
        };
      }
    }
  };
};
