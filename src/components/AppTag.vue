<template>
 <div class="tag" @dblclick="$emit('dblclickTag')">
   {{tag}}

 </div>

</template>

<script>


export default {
  props: ['tag'],
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tag{
  border-radius: 10px;
  text-align: center;
  background: #87cefa;
  margin: 2px;
  cursor:pointer;
}
</style>
