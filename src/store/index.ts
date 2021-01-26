import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators';

import Games from './modules/gamesModule';

Vue.use(Vuex);


const store = new Vuex.Store<any>({
  state: {},
  modules: {
    gamesModule: Games
  }
});

export default store;

export const GamesModule = getModule(Games, store);