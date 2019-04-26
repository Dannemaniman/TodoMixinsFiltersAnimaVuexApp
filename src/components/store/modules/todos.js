const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos //tar in en state och lämnar state.todos
};

const actions = {
  addTodo({ commit }, title) {
    commit("newTodo", title);
  },
  deleteTodo({ commit }, index) {
    commit("removeTodo", index);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, index) => state.todos.splice(index, 1)
};

export default {
  state, //Es6 kan jag bara skriva state istället för state: state
  getters,
  actions,
  mutations
};
