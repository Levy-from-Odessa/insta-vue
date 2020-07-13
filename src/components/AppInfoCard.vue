<template>
<div>
  <div class="card">

    <img :src="hit.previewURL">


    <div class="card-content">

      <div class="tag">
          <app-tag v-for="(tag, index) in tags"
                   :key="index"
                  :tag="tag"
                  >
          </app-tag>
      </div>

      <div class="likes">
        <span>
          {{hit.comments}}

        </span>
        <span>{{hit.likes}}  </span>
      </div>
    </div>


  </div>
  <div class="card-more">
     <p> type: {{hit.type}}</p>
     <p> views: {{hit.views}}</p>
     <p> user: {{hit.user}}</p>
    </div>
</div>
</template>

<script>
import AppTag from './AppTag';
export default {
  data () {
    return {
      tags: null,
      hit: null
    }
  },
  mounted(){
    const cardId = parseInt(this.$route.params.cardId)
    this.hit =this.$store.getters.HIT_BY_ID(cardId)
    this.tags = this.hit.tags.split(',')
    // get id from router and find hit in store
  },
  components: {
    AppTag
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 30%;
  margin: 2%;
  height: 200px;
  border: 1px solid #333;
  border-radius: 5px;
  position: relative;
  margin: 0 auto;

  img{
    max-width: 100%;
    cursor: pointer;
    margin-bottom: 50px;
  }
  &-content{
    display: flex;
    justify-content: space-between;

    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
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
</style>
