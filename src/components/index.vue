<template>
  <div class="main">
    <div class="params">
      <div class="sort">
      <p>sort by:</p>
      <button @click="sortBy('likes')">likes</button>
      <button @click="sortBy('comments')">comments</button>
    </div>
    <div class="search">
      <p>search</p>
    <!-- //search input -->
    <input type="text" v-model="tagName"
                       @input="searchByTag"
                       @keyup="searchByTag">
    </div>
    </div>



    <div class="cards">
      <app-card v-for="(hit, index) in newHits" :key="index"
              :hit="hit"
              :index="index">

    </app-card>
    </div>

  </div>
</template>

<script>

import AppCard from './AppCard';
import { log } from 'util';

export default {

  data () {
    return {
      tagName: '',
      newHits: []
    }
  },
  methods:{

    sortBy(type){
      if (type == 'likes'){
         this.newHits.sort((a, b )=> b.likes-a.likes)
      }
      if( type == 'comments'){
        this.newHits.sort((a, b )=> b.comments-a.comments)
      }
      // sort array from highest to lowest

    },
    filter(){
      this.newHits = []
      for (let hit of this.hits){
        if(hit.tags.indexOf(this.tagName) != -1){
          this.newHits.push(hit)
        }
      }
      // search in each hit where the stroke include
    },
    searchByTag(){
      this.debounce(this.filter(), 300)
    },
    debounce(func, wait, immediate) {
      let timeout;
      return function() {
        let context = this, args = arguments;
        let later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
        }
    }
    // unload an input event
  },
  components:{
    AppCard
  },

  computed: {
    hits() {
      return this.$store.getters.HITS;
    }

  },


  mounted(){
    this.$store.dispatch('GET_HITS')
    this.newHits = this.hits
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cards{
  display: flex;
  flex-wrap: wrap;

}
input{
  border-radius: 5px;
  border: 1px solid rgb(138, 138, 138);
  transition: all .4s linear;
  padding: 2px 5px;
  &:focus{
    border: 1px solid rgb(138, 138, 138);
    border-bottom:1px solid skyblue ;
  }
}

button{
  font-size:16px ;
  padding: 10px;
  border-radius:5px ;
  margin: 0 10px;
  transition: all .3s linear;
  &:hover{
    background: blue;
    cursor: pointer;
  }
}
.params{
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>
