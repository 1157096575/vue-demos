<template>
    <el-dialog class="imgScanBoxDialog" title="预览" :visible.sync="imgVisible" width="100%" @close="closeImgFn" >
      <!--<div class="imgBox">-->
            <img :src="imgUrl"/>
      <!--</div>-->
    </el-dialog>
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
        imgVisible : true
      }
    },
    mounted() {
        this.$nextTick(function () {
            this.init();
        }); 
    },
    methods: {
      init() {
        var oh = $(".imgScanBoxDialog .el-dialog__body").height();
        var hw = $(".imgScanBoxDialog").height();
        console.log(oh,hw);
        if(oh < hw){
          var bh = hw - 108;
          $(".imgScanBoxDialog .el-dialog__body").css({height:bh + 'px', lineHeight:bh+'px'});
          $(".imgScanBoxDialog .el-dialog__body img").css({marginTop:-20+'px'});
        }
      },
      closeImgFn(){
        this.$emit('closeImgFn');
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  .imgScanBoxDialog{
    background:rgba(0,0,0,.8);
    .el-dialog{
      background:none;
      margin-top:0!important;
      //min-height:100%;
      top:0;
      .el-dialog__body{
        //min-height:100%;
        text-align:center;
      }
      .imgBox{
        text-align:center;
        padding:20px;
        /*position:absolute;
        //top:0;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%, -20%);
        transform: translate(-50%, -20%);*/
        img{
          display:inline-block;
          width:auto;
          max-width:100%;

        }
      }
      img{
          display:inline-block;
          width:auto;
          max-width:100%;
          vertical-align:middle;
          margin-top:-10px;
        }
    }
    .el-dialog__close{
      font-size:30px;
      width:60px;
      height: 60px; 
      background:#409eff;
      border-radius: 50%;
      line-height: 60px;
      text-align: center;
      color:#fff;
      opacity:0.6;
    }
    .el-dialog__close:hover{
      color:#f9f9f9;
    }
  }
</style>