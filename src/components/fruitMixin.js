import { mapGetters } from "vuex";

export const fruitMixin = {
  data() {
    return {
      text: "Hello there!",
      fruits: this.allTodos,
      filterText: ""
    };
  },
  filters: {
    //Filter is there to transform some data.
    toUppercase(value) {
      //eller som en sträng 'to-uppercase': {}
      return value.toUpperCase();
    }
  },
  computed: {
    ...mapGetters(["allTodos"]),
    //Computed properties är att föredra pga det är mer performant. Men vid enkla grejer är filter ok.
    filteredFruits() {
      return this.allTodos.filter(element => {
        return element.match(this.filterText);
      });
    }
  },
  created() {
    console.log("Created");
  }
}; //Mixin förstör datan, och i created metoderna så kommer först mixin, sen component, alltså har componenet alltid sista ordet!!!
