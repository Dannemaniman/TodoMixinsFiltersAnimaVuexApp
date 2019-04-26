<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="animated fadeIn">Animations</h1>
        <hr>
        <select v-model="alertAnimation" class="form-control" >
          <option value="fade" selected="selected">Fade</option>
          <option value="slide">Slide</option>
        </select>
        <hr>
        <button class="btn btn-primary" @click="show = !show">Show Alert</button>
        <button class="btn btn-primary" @click="show2 = !show2">Show Second Alert</button>
        <button class="btn btn-primary" @click="show3 = !show3">Show Third Alert</button>
        <button class="btn btn-primary" @click="show4 = !show4">Show Fourth Alert</button>
        <br>
        <br>
        <transition :name="alertAnimation" appear>
          <!--kan bara animata ett element med transition, kan inte animera lists här t ex, men jag kan bara animera en grej åt gången i en transition tag. Använd istället transition-group -->
          <!--använder v-if och v-show för att animera in grejer oftast.  VueJs fungerar som så att "Okej jag har en v-if som ligger i en <transition>, låt mig animera in den.-->
          <div class="alert alert-info" v-show="show">This is some Info</div>
          <div class="alert alert-info" v-show="show">This is some Info</div>
        </transition>
        <transition :name="alertAnimation" type="animation" appear>
          <!--type="transition" eller type="animation", t ex om jag har 2 olika durations så kan jag sätta vilken som ska besqtämma här. -->
          <div class="alert alert-info" v-show="show2">This is some Info</div>
          <!--till skillnad från v-if tar inte v-show bort elementet utan sätter bara display: none; så man inte ser det. -->
          <div class="alert alert-info" v-show="show2">This is some Info</div>
        </transition>
        <transition name="flip" appear mode="out-in">
          <!-- animerar den smoothly vid typ onCreate -->
          <div class="alert alert-info" v-if="show3">This is some Info</div>
          <!--till skillnad från v-if tar inte v-show bort elementet utan sätter bara display: none; så man inte ser det. -->
          <div class="alert alert-info" v-if="show3">This is some Info</div>
        </transition>
        <!-- rad 34, använd inte defaults, använd från stylesheeten jag importerade från cdnjs!!-->
        <transition appear enter-active-class="animated bounce" leave-active-class="animated shake">
          <div class="alert alert-info" v-if="show4">This is some Info</div>
          <!--till skillnad från v-if tar inte v-show bort elementet utan sätter bara display: none; så man inte ser det. -->
        </transition>
        <transition :name="alertAnimation" mode="out-in">
          <!--animera out befintliga och animera in nya -->
          <div class="alert alert-info" v-if="show" key="info">more info</div>
          <!--Vue swappar content, istället för hela diven, därför får jag ingen animation än sålänge, men om jag lägger till key... -->
          <div class="alert alert-warning" v-else key="warning">more warning</div>
        </transition>
        <hr>
        <button class="btn btn-primary" @click="load = !load">Load / Remove Element</button>
        <br>
        <br>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
          :css="false"
        >
          <!-- använd inte css animationer; det speedar upp processen men det går även om jag inte skriver men den måste klura ut det själv då-->
          <div style="width: 300px; height: 100px; background-color: lightgreen;" v-if="load"></div>
        </transition>
        <hr>
        <button
          class="btn btn-primary"
          @click="selectedComponent == 'app-success-alert' ? 
                            selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert'"
        >Toggle Components</button>
        <transition name="fade" mode="out-in">
          <component :is="selectedComponent"></component>
        </transition>
        <hr>
        <button class="btn btn-primary" @click="addItem">Add Item</button>
        <br>
        <br>
        <ul class="list-group">
          <transition-group name="slide">
            <!--:key kan även bindas som nummer! Imed att det bara occurar en gång! -->
            <li
              class="list-group-item"
              v-for="(number, index) in numbers"
              :key="number"
              @click="removeItem(index)"
              style="cursor: pointer"
            >{{ number }}</li>
            <!-- måste ha key annars kan inte vue identifiera individuella items, och det behöver den!-->
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DangerAlert from "./DangerAlert.vue";
import SuccessAlert from "./SuccessAlert.vue";

export default {
  data() {
    return {
      show: true,
      load: true,
      show2: true,
      show3: true,
      show4: true,
      alertAnimation: "",
      elementWidth: 100,
      selectedComponent: "app-success-alert",
      numbers: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    test() {
      this.show = !this.show; //Emita istället och fixa i parent
    },
    removeItem(index) {
      this.numbers.splice(index, 1);
    },
    addItem() {
      const pos = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.numbers.length + 1);
    },
    beforeEnter(el) {
      //We get the element which the animation is performed as an argument.
      console.log("beforeEnter");
      this.elementWidth = 100; //Just to make sure it really is 100
      el.style.width = this.elementWidth + "px";
    },
    enter(el, done) {
      //done is a function we can execute which we get, it tells vue when animation is done. Since we cant set the timing like we did in css we have to use the function call done.
      console.log("enter");
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elementWidth + round * 10 + "px";
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      console.log("afterEnter");
    },
    enterCancelled(el) {
      console.log("enterCancelled");
    },
    beforeLeave(el) {
      console.log("beforeLeave");
      this.elementWidth = 300;
      el.style.width = this.elementWidth + "px";
    },
    leave(el, done) {
      console.log("leave");
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elementWidth - round * 10 + "px";
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log("afterLeave");
    },
    leaveCancelled(el) {
      console.log("leaveCancelled");
    }
  },
  components: {
    appDangerAlert: DangerAlert,
    appSuccessAlert: SuccessAlert
  }
};
</script>

<style>
body {
  padding: 40px;
  margin: 50px;
}
h1 {
  color: aliceblue;
  text-align: center;
}

.container {
    text-align: center;
}


.alert {
  background-color: white;
}

/*Att skriva fade som namn betyder att Vue kommer lägga till flera css classer som hanterar fade.*/

/*.v-enter 
    .*/
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  /* This is the place to setup the transition.*/
  transition: opacity 1s;
}

.fade-leave {
  /* opacity: 1; already default so I can comment out.*/
}

.fade-leave-active {
  transition: opacity 1s; /* please animate whenever the opacity changes, is what im telling vue here. Oh and look! Here its changing to 0*/
  opacity: 0;
}

/*NU ska jag animera med css Animation istället för transition*/

.slide-enter {
  opacity: 0;
  /*transform: translateY(20px); imed att jag sätter den i keyframes behöver jag ej sätta här.*/
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards; /* we set forwards so it stays at the finishing position */
  transition: opacity 1s;
}

.slide-leave {
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute; /* när jag tar bort item och vill att den ska animatas,
          måste jag sätta det genom att sätta position: absolute på denna css classen.
          this will make sure, that other elements may move above this element whilst this element is still being animated*/
}

.slide-move {
  /*Attached to any element that needs to change place */
  transition: transform 1s; /* Vue will always move objects with the transform property, so this transform here is not in regard to the @keyframes for example*/
}

.flip-enter {
  /*transform: rotateY(0deg); detta är starting state så behöver ej det.*/
}

.flip-enter-active {
  animation: flip-in 0.5s ease-out forwards; /* använder forwards för att inte snappa tillbaka till original position */
}

.flip-leave {
  /*transform: rotateY(0deg); */
}

.flip-leave-active {
  animation: flip-out 0.5s ease-out forwards;
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
