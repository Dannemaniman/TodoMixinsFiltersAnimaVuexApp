<template>
  <div class="row">
    <todoItem
      class="todoItems"
      v-for="(todo, index) in allTodos"
      :key="index"
      @click.native="deleteItem(index)"
      >{{ todo }}</todoItem>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import { mapGetters } from "vuex";

export default {
  
  computed: mapGetters(["allTodos"]),
  methods: {
    deleteItem(index) {
      this.$emit('emitDelete', index)
    }
  },
  components: {
    todoItem: TodoItem
  }
};
</script>

<style>
.todoItems {
  overflow-wrap: break-word;
}
</style>

