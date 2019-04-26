<template>
  <div class="container" >
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters And Mixins</h1>
        
        <!-- anropar filter genom | filternamn, och kedjan som anropas går från vänster till höger! -->
        <input class="input" v-model="filterText">
        <label class="filter-label">{{ filterText | toUppercase }}</label>
        <hr>
        
        <ul v-if="allTodos.length !== 0">
          <li v-for="(fruit, index) in filteredFruits " :key="index">{{ fruit }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { fruitMixin } from "./fruitMixin.js";
import { mapGetters } from 'vuex';

export default {
  mixins: [fruitMixin],
  data() {
    // Vue cleverly merges our application with the constant I've declared. den förstör inte datan.
    return {
      text: "Concurrency"
    };
  },
  computed: mapGetters(['allTodos'])
};
</script>

<style scoped>

ul {
   list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    display: block;
    font-size: 2em;
    padding: 0.2em;
}

.input {
    text-align: center;
    margin: 1em auto 1em auto;
    color: black;

}

.container {
  text-align: center;
  min-height: 17em;
  padding-bottom: 3em;
  color: White;
}

.filter-label {
    display: block;
    font-size: 2em;
}
</style>
