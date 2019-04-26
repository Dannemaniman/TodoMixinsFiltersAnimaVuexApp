import Vue from "vue";
import App from "./App.vue";
import store from "./components/store/index";

Vue.directive("highlight", {
  bind(el, binding /*, vnode*/) {
    // el.style.backgroundColor = 'green'; v-highlight
    //el.style.backgroundColor = binding.value; v-highlight="'red'"
    var delay = 0;
    if (binding.modifiers["delayed"]) {
      delay = 3000;
    }

    setTimeout(() => {
      if (binding.arg == "background") {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    }, delay);
  }
});

Vue.filter("to-lowercase", function(value) {
  return value.toLowerCase();
}); //Globally

new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
