<template>
    <div class="imgBoxWrapCopy">
        <a class="closeBtn el-icon-close" @click="closeImgFn"></a>
        <div class="imgBox">
            <img :src="imgUrl"/>
        </div>
    </div>
</template>
<script>
  export default {
    name:'vediobox',
    props: {
        imgUrl: {
            type: String,
            default: require('static/img/me.png')
        }
    },
    data() {
      return {

      }
    },
    mounted() {
        this.$nextTick(function () {
            this.init();
        }); 
    },
    methods: {
      init() {

      },
      closeImgFn(){
        this.$emit('closeImgFn');
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .imgBoxWrapCopy{
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background:rgba(0,0,0,.8);
    z-index:9999;
  }
  .imgBox {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .imgBoxWrap .closeBtn{
    position:absolute;
    right:20px;
    top:20px;
    width:60px;
    height: 60px; 
    background: #409eff;
    z-index: 10000;
    border-radius: 50%;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    color:#fff;
    opacity:0.6;
}
</style>