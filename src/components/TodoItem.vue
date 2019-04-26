<template>
  <div class="col-sm-6 col-md-4 col-lg-3">
    <div class="panel panel-success">
      TODO
      <div class="panel-body item-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    
}
</script>

<style>
.panel-body {
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 20px;
  background: linear-gradient(rgb(255, 255, 255, 0.1), rgba(0, 0, 0, 0.3));
  font-weight: 200;
  color: black;
  background-color: white;
}

.panel:hover {
  cursor: pointer;
  background-color: beige;
}

.panel-success {
  text-align: center;
  font: bolder;
  text-shadow: 0.01em 0.01em black;
  color: black;
  background-color: green;
}
</style>