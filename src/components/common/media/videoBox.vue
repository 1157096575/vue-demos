<template>
    <div class="videoBoxWrap">
        <a class="closeBtn el-icon-close" @click="closeVideoFn"></a>
        <div class="videoBox">
          <video id="my-video" class="video-js" controls preload="auto" width="740" height="400"
            :poster="videoImg" data-setup="{}">
              <source :src="videoUrl" type="video/mp4">
              <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>
            </video>
        </div>
    </div>
</template>
<script>
  import 'static/css/video-js.css';
  import videojs from 'static/js/video.min.js';
  import 'static/js/zh-CN.js';
  export default {
    name:'vediobox',
    props: {
        videoUrl: {
            type: String,
            default: 'http://jq22com.qiniudn.com/jq22-sp.mp4'
        }
    },
    data() {
      return {
        videoImg: require('static/img/me.png'),
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
      closeVideoFn(){
        this.$emit('closeVideoFn');
      }
    }
  }
</script>


<style rel="stylesheet/less" lang="less">
.videoBoxWrap{
    .video-js{
      width:740px;
      height:400px;
    }
}
</style>