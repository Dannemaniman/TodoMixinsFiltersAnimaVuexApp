import Vuex from "vuex";
import Vue from "vue";
import todos from "./modules/todos";

//Entry point into VueX, where we combine all of our modules

//load vuex

Vue.use(Vuex);

//Create store

export default new Vuex.Store({
  modules: {
    todos
  }
});

//In order for this file to do anything we have to import it into main.js, which is our application starting point.
