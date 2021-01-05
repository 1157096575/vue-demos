<template>
  <div class="audio-box">
    <a class="closeBtn el-icon-close" @click="closeAudioFn"></a>
    <div class="audio-container">
      <div class="audio-cover"></div>
      <div class="audio-view">
        <h4 class="audio-title">未知歌曲</h4>
        <div class="audio-body">
          <div class="audio-backs">
            <div class="audio-this-time">00:00</div>
            <div class="audio-count-time">00:00</div>
            <div class="audio-setbacks">
              <i class="audio-this-setbacks">
                <span class="audio-backs-btn"></span>
              </i>
              <span class="audio-cache-setbacks">
              </span>
            </div>
          </div>
        </div>
        <div class="audio-btn">
          <div class="audio-select">
            <div class="audio-prev"></div>
            <div class="audio-play"></div>
            <div class="audio-next"></div>
            <div class="audio-menu"></div>
            <div class="audio-volume"></div>
          </div>
          <div class="audio-set-volume">
            <div class="volume-box">
              <i><span></span></i>
            </div>
          </div>
          <div class="audio-list">
            <div class="audio-list-head">
              <p>☺随心听</p>
              <span class="menu-close">关闭</span>
            </div>
            <ul class="audio-inline">
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import 'static/css/audio.css';
  import 'static/js/audio.js';

  export default {
    props: {
        audioUrl: {
            type: String,
            default: ''
        },
        audioName: {
            type: String,
            default: ''
        }
    },
    watch:{
      audioUrl(a,b){
        if (a) {
          var _this = this;
          if(_this.audioFlag){
            _this.newSongFn();
          }else{
            _this.init();
          }

        }
      }
    },
    data() {
      return {
        audioFlag:false,
        cover:require('static/img/cover.jpg'),
        songs:[],
        audioFn:''
      }
    },
    mounted() {
        this.$nextTick(function () {
            this.init();
        }); 
    },
    methods: {
      init() {
        var _this = this;
        if(_this.audioFn){
          _this.audioFn = '';
        }
        var songItem = {
          src: _this.audioUrl,
          title: _this.audioName,
          cover: _this.cover
        };
        
        _this.songs.push(songItem);

          if(_this.songs.length>0 && _this.songs[0].src){
            var audioFn = audioPlay({
              song : _this.songs,
              autoPlay : true 
            });
            _this.audioFn = audioFn;
            _this.audioFlag = true;
          }
        
        
      },
      newSongFn(){
        var _this = this;
        var songs = _this.songs || [];
        songs.forEach(function(a,b){
          if(a.src == _this.audioUrl){
            songs.splice(b,1);
          }
        });
        _this.songs = songs;

        var songItem = {
          src: _this.audioUrl,
          title: _this.audioName,
          cover: _this.cover
        };
        _this.audioFn.newSong(songItem,true);
      },
      closeAudioFn(){
        this.$emit('closeAudioFn');
      }
    },
    destroyed() {
      var _this = this;
     //audioPlay({
     //    song : _this.songs,
     //    autoPlay : false  //是否立即播放第一首，autoPlay为true且song为空，会alert文本提示并退出
     //  });
     _this.audioFn.stopAudio();
    }
  }
</script>