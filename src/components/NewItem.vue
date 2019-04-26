<template>
  <div id="wrapper">
    <label v-highlight:background.delayed="'red'" class="infoLabel">Lägg till på listan!</label>
    <textarea class="form-control" rows="1" placeholder="Skriv Här!" v-model="title"></textarea>
    <button class="submitButton" @click.prevent="onSubmit">Tryck</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      
      if (this.title.length !== 0) {
        this.$emit('addToList', this.title)
        this.title = "";
      }
    }
  }
};
</script>

<style>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 3em;
  font-family: Arial, Helvetica, sans-serif;
}

.form-control {
  font-size: 20px;
}

.infoLabel {
  font-size: 1.3em;
  color: beige;
}

.submitButton {
  border-style: none;
  font-weight: 300;
  margin-left: 2em;
  padding: 0.5em;
  border-radius: 0.7em;
  font-size: 20px;
  background-color: beige;
  outline: none;
}

.submitButton:hover {
  background-color: goldenrod;
  color: white;
}
</style>

