<template>
  <div class="card">

    <router-link :to="{ name: 'InfoCard', params: { cardId: hit.id }}">
      <img :src="hit.previewURL">
    </router-link>

    <div class="card-content">

      <div class="tag">
          <app-tag v-for="(tag, index) in tags"
                   :key="index"
                   :tag="tag"
                   @dblclickTag="openEditTags"
                   >
          </app-tag>
          <input type="text" v-model="editTags"
                             v-if="editTagsFlag"
                             @focusout="editTagsHandler"
                             >
      </div>

      <div class="likes">
        <p >
          {{hit.comments}}
          <i class="fas fa-comment"></i>
        </p>
        <p>
          {{hit.likes}}
          <i class="far fa-thumbs-up"></i>
        </p>

      </div>
    </div>

  </div>

</template>

<script>

import AppTag from './AppTag';
export default {
  props: ['hit'],
  data () {
    return {
      tags: null,
      editTags: '',
      editTagsFlag: false
    }
  },
  methods: {
    openEditTags(){
      this.editTags = this.hit.tags
      this.editTagsFlag = true
      // open an input and save data
    },
    editTagsHandler() {
      this.$store.commit('UPDATE_HIT', {id: this.hit.id, tags: this.editTags})
      this.editTagsFlag = false
      this.editTag = ''
      // send to store a data and close the input
    }
  },
  components:{
    AppTag
  },
  mounted() {
    this.tags = this.hit.tags.split(',')
    // transform to array, make it easier to use
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card{
  width: 20%;
  margin: 2%;
  height: 200px;
  border: 1px solid #333;
  border-radius: 5px;
  position: relative;

  img{
    max-width: 100%;
    cursor: pointer;
  }
  &-content{
    display: flex;
    justify-content: space-between;

    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    align-items: flex-end;
  }
  .tag{

    display: flex;
    flex-wrap: wrap;
    padding: 7px;
  }

}
p{
  margin: 0;
}
.likes{
  width: 30%;
  p{
    margin: 2px;
    display: inline;
    display: inline-flex;
  }
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

</style>
