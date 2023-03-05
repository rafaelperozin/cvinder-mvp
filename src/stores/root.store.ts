import { ApplicationStore, makeApplicationStore } from 'src/stores/application.store';
import {Instance, types} from 'mobx-state-tree';

export type RootStoreType = Instance<typeof RootStore>;

export const RootStore = types.model('RootStore', {
  application: ApplicationStore,
});

let rootStoreInstance: RootStoreType | null = null;

/**
 * Create root store composed of child business stores.
 */
export const createStore = () => {
  if (rootStoreInstance) {
    return rootStoreInstance;
  }

  rootStoreInstance = RootStore.create({
    application: makeApplicationStore,
  });

  return rootStoreInstance;
};

export const rootStore = createStore();
