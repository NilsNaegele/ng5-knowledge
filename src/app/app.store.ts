import { InjectionToken } from '@angular/core';

import { createStore, Store, compose, StoreEnhancer } from 'redux';

import { AppState, default as reducer } from './app.reducer';

export const AppStore = new InjectionToken('App.store');

const devTools: StoreEnhancer<AppState> =
      window['devToolsExtension'] ? window['devToolsExtension']() : w => w;

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(reducer, compose(devTools));
}

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
];
