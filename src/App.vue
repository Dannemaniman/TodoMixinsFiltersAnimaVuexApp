<template>
  <div
    
    class="background"
  > <!--v-local-hightlight2:background.delayed.blink="{mainColor: 'red', secondColor: 'green', delay: 500}" -->
    <!--<div v-local-highlight:background.delayed.blink="'red'" class="container"> v-local-highlight:background.delayed.blink="'red'" -->
    <div class="container">
      <myHeader></myHeader>
      <newItem @addToList="addItem"></newItem>
      <todoGrid class="todo-grid" @emitDelete="deleteItem"></todoGrid>
      <hr>
      <my-filter></my-filter>
      <hr>
      <my-animation class="my-animation"></my-animation>
      <hr>
      <br><br>
    </div>
  </div>
</template>

<script>
import TodoGrid from "./components/TodoGrid.vue";
import NewItem from "./components/NewItem.vue";
import Header from "./components/Header.vue";
import Filter from "./components/Filter.vue";
import myAnimations from "./components/Animations.vue";
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: []
    };
  },
  directives: {
    "local-highlight": {
      bind(el, binding, vnode) {
        var delay = 0;

        if (binding.modifiers["delayed"]) {
          delay = 3000;
        }
        if (binding.modifiers["blink"]) {
          let mainColor = binding.value;
          let secondColor = "blue";
          let currentColor = mainColor;
          setTimeout(() => {
            setInterval(() => {
              currentColor == secondColor
                ? (currentColor = mainColor)
                : (currentColor = secondColor);
              if (binding.arg == "background") {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, 1000); //1000 = hur länge innan du ska alterera.
          }, delay);
        } else {
          setTimeout(() => {
            if (binding.arg == "background") {
              el.style.backgroundColor = binding.value;
            } else {
              el.style.color = binding.value;
            }
          }, delay);
        }
      }
    },
    "local-highlight2": {
      bind(el, binding, vnode) {
        var delay = 0;

        if (binding.modifiers["delayed"]) {
          delay = 3000;
        }
        if (binding.modifiers["blink"]) {
          let mainColor = binding.value.mainColor;
          let secondColor = binding.value.secondColor;
          let currentColor = mainColor;
          setTimeout(() => {
            setInterval(() => {
              currentColor == secondColor
                ? (currentColor = mainColor)
                : (currentColor = secondColor);
              if (binding.arg == "background") {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, binding.value.delay); //1000 = hur länge innan du ska alterera.
          }, delay);
        } else {
          setTimeout(() => {
            if (binding.arg == "background") {
              el.style.backgroundColor = binding.value.mainColor;
            } else {
              el.style.color = binding.value.mainColor;
            }
          }, delay);
        }
      }
    }
  },
  components: {
    todoGrid: TodoGrid,
    newItem: NewItem,
    myHeader: Header,
    myFilter: Filter,
    myAnimation: myAnimations
  },
  methods: {
    ...mapActions(['addTodo', 'deleteTodo']),
    addItem(itemToAdd) {
      this.addTodo(itemToAdd)
    },
    deleteItem(index) {
        console.log(index)
      this.deleteTodo(index)
      
    }
  }
};
</script>

<style>
body {
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  height: 100vh; 
  background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)),
    url("./assets/headerpicture.jpg");
  background-color: black;
}

.todo-grid {
  margin-bottom: 10em;
}

.filter {
  background-color: white;
}

.my-animation {
  margin: 0;
  margin-bottom: 350px;
}
</style>
