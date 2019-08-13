<template>
    <div>
        <div class="background">
          <router-view/>
          <img v-for="image in images" :key="image.id" :src="image.src" ref="images" alt="image"/>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
    export default {
        data(){
            return{
              images: []
            };
        },
        mounted: function(){

            console.log(this.$refs);

            let images = [
              {
                id: "img1",
                src: "storage/img/login-background/1.jpg",
              },
              {
                id: "img2",
                src: "storage/img/login-background/2.jpg"
              },
              {
                id: "img3",
                src: "storage/img/login-background/3.jpg"
              }
            ];

            this.images = Object.assign([], images).reverse();

            this.$nextTick(function(){
              this.backgroundChanger(this.$refs.images, images);
            });
        },
        methods: {
          backgroundChanger: function(e, images = []) {

            /**/
            window.clearTimeout();

            let seconds = 10;
            let length = images.length;

            let sequence = function(){
                let x = 0;

                for(let i = 0; i < length; i++){
                    setTimeout(function(){
                      
                      let last = i === 0 ? length - 1 : i - 1;
                      e[last].style.opacity = 0;
                      e[i].style.opacity = 1;

                      if((x + 1) === images.length){
                          setTimeout(function(){
                              sequence();
                          }, (seconds * 1000));
                      }
                      else{
                          x++;
                      }
                    }, (seconds * 1000) * i);
                }
            }

            sequence();
            /**/
          }
        }
    }
</script>

<style scoped>

/* STRUCTURE */
.background{   
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  
  background-blend-mode: darken;

  min-height: 100%;
  /* Set up proportionate scaling */
  width: 100%;
      
  /* Set up positioning */
  position: absolute;
  top: 0;
  left: 0;
  
  background-image: url("https://i.pinimg.com/originals/3c/7a/fc/3c7afc1b68c0f8cc367dd9d0f1f383de.jpg");
  
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

.background > img{
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  z-index: -1;

  opacity: 0;

  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;

}


  

</style>
