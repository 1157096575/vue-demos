<template>
    <div class="mediaEditTemp">
        <div class="mediaBox clear">
            <ul class="medias clear fl" >
              <li :title="item.name" class="fl" v-for="(item,index) in listMedias" >
                <em @click="removeMedia(index, item)" class="el-icon-circle-close"></em>
                <div class="imgLiBox audioLiBox" v-if="item.type==1" @click="showImg(item)">
                  <img width="100px" :src="item.url"/>
                  <i class="el-icon-zoom-in"></i>
                </div>
                <div class="videoLiBox" v-if="item.type==2" @click="showVideo(item)">
                  <img width="100px" height="100px" :src="videoImg"/>
                </div>
                <div class="audioLiBox" @click="showAudio(item)" v-if="item.type==3">
                  <span class="audioImg">
                    <img :src="audioImg"/>
                  </span>
                  <p class="elli2">{{item.name}}.{{item.suffixName}}</p>
                  <i class="el-icon-service"></i>
                </div>
                <div class="docLiBox audioLiBox" @click="downloadFn(item)" v-if="item.type==4">
                  <span class="audioImg">
                    <img v-if="item.suffixName == 'doc'" :src="docIcon.doc"/>
                    <img v-if="item.suffixName == 'pdf'" :src="docIcon.pdf"/>
                    <img v-if="item.suffixName == 'xls'" :src="docIcon.xls"/>
                    <img v-if="item.suffixName == 'ppt'" :src="docIcon.ppt"/>
                    <img v-if="item.suffixName == 'txt'" :src="docIcon.txt"/>
                    <img v-else :src="docIcon.otherDoc"/>
                  </span>
                  <p class="elli2">{{item.name}}.{{item.suffixName}}</p>
                  <i class="download el-icon-download"></i>
                </div>
                <div @click="downloadFn(item)" class="othersLiBox audioLiBox" v-if="item.type != 1 && item.type != 2 && item.type != 3 && item.type != 4">
                  <span class="audioImg">
                    <img :src="otherFileImg"/>
                  </span>
                  <p class="elli2">{{item.name}}.{{item.suffixName}}</p>
                  <i class="download el-icon-download"></i>
                </div>
              </li>
              <li class="fl" v-if="mediaState">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                     <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                    <i v-else class="el-icon-plus upbtnBox"></i>
                  </el-upload>
              </li>
            </ul>
        </div>
        <vv-box v-if="videoFlag" :videoUrl="videoUrl" @closeVideoFn="closeVideoFn"></vv-box>
        <audio-box v-if="audioFlag" :audioInitFlag="audioInitFlag" :audioName="audioName" :audioUrl="audioUrl" @closeAudioFn="closeAudioFn"></audio-box>
        <img-box v-if="imgFlag" :imgUrl="imgUrl" @closeImgFn="closeImgFn"></img-box>
    </div>
</template>
<script>
  import vvBox from 'components/common/media/videoBox';
  import audioBox from 'components/common/media/audioBox';
  import imgBox from 'components/common/media/imgBox';
  export default {
    name:'vediobox',
    props: {
        mediaState:{
          type :Boolean,
          default: true
        },
        listMedias: {
            type: Array,
            default: [{
              id:'1',
              supplierVisitId:'sdsd',
              type:1,
              suffixName:'png',
              name:'1',
              url:'http://img3.redocn.com/tupian/20160108/lvsehuahuizhizhangfanyexiaoguobeijingsucai_5728265.jpg'
            },
            {
              id:'2',
              supplierVisitId:'34',
              type:2,
              suffixName:'mp4',
              name:'3',
              url:'http://jq22com.qiniudn.com/jq22-sp.mp4'
            },
            {
              id:'2s',
              supplierVisitId:'34',
              type:2,
              suffixName:'mp4',
              name:'4',
              url:'http://jq22com.qiniudn.com/jq22-sp.mp4'
            },
            {
              id:'3',
              supplierVisitId:'34',
              type:3,
              suffixName:'mp3',
              name:'5',
              url:'http://jq22.qiniudn.com/the.mp3'
            },
            {
              id:'3-2',
              supplierVisitId:'34',
              type:3,
              suffixName:'mp3',
              name:'6',
              url:'http://dl.stream.qqmusic.qq.com/C400003TfyNp47dm7E.m4a?vkey=9A2B80651AE982D1E724F698E874BC7CB13B25B103A294B4AB01762CA70CD7335297C12E9BD165758A47ADFB27C415170BB20D057571ACDB&guid=2286913994&uin=0&fromtag=66'
            },
            {
              id:'3-3',
              supplierVisitId:'34',
              type:3,
              suffixName:'mp3',
              name:'7',
              url:'http://dl.stream.qqmusic.qq.com/C400004RiqvD4Necim.m4a?vkey=37F8EEBBEC7176B6A5AF4203EF2D229687396DAEA955A7AA09BEAA1F1BA6B88A9AEBCA8D84F46D992A458AF8EC4D3C04ACB2436FF42F6E64&guid=2286913994&uin=0&fromtag=66'
            },
            {
              id:'3-3',
              supplierVisitId:'34',
              type:3,
              suffixName:'mp3',
              name:'8',
              url:'http://dl.stream.qqmusic'
            },
            {
              id:'4',
              supplierVisitId:'545',
              type:4,
              suffixName:'txsdt',
              name:'9',
              url:'http://jq22.qiniudn.com/the2.txt'
            },
            {
              id:'5',
              supplierVisitId:'545',
              type:4,
              suffixName:'doc',
              name:'10',
              url:'http://jq22.qiniudn.com/the.doc'
            },
            {
              id:'6',
              supplierVisitId:'545',
              type:5,
              suffixName:'cff',
              name:'11',
              url:'http://jq22.qiniudn.com/the'
            }]
        }
    },
    data() {
      return {
        docIcon:{
            folder: require('static/img/folder.png'),
            pdf:require('static/img/pdf.png'),
            doc:require('static/img/doc.png'),
            xls:require('static/img/xls.png'),
            ppt:require('static/img/ppt.png'),
            txt:require('static/img/txt.png'),
            zipRar:require('static/img/zipRar.png'),
            torrent:require('static/img/torrent.png'),
            isoBinImg:require('static/img/isoBinImg.png'),
            html:require('static/img/html.png'),
            code:require('static/img/code.png'),
            video:require('static/img/video.png'),
            music:require('static/img/music.png'),
            otherFile:require('static/img/otderFile.png')
        },
        otherFileImg:'',
        uploadImageUrl:'',
        imgFlag:false,
        imgUrl:'',
        videoFlag:false,
        videoImg: require('static/img/me.png'),
        videoUrl:'http://jq22com.qiniudn.com/jq22-sp.mp4',
        audioFlag:false,
        audioName: 'ddfdkfsfv',
        audioUrl:'http://jq22.qiniudn.com/the.mp3',
        audioInitFlag:0,
        audioId:'',
        audioImg:require('static/img/music.png')
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
        this.videoFlag = false;
      },
      closeAudioFn(){
        this.audioFlag = false;
      },
      showVideo(v){
        console.log(v);
        this.videoFlag = true;
        this.videoUrl = v.url;
        console.log(this.videoUrl);
      },
      showAudio(v){
        this.audioInitFlag++;
        this.audioUrl = v.url;
        this.audioName = v.name;
        this.audioId = v.id;
        this.audioFlag = true;
      },
      showImg(v){
        console.log(v);
        this.imgFlag = true;
        this.imgUrl = v.url || '';
      },
      closeImgFn(){
        this.imgFlag = false;
      },
      removeMedia(i, item){
        console.log(i);
        var _this = this;
        if(this.audioFlag){
          if(this.audioId == item.id){
            _this.$alert('无法删除正在播放的媒体资料！', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                
              }
            });
            return;
          }
        }
        _this.$confirm('确定要删除选中的记录？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //添加相应的接口代码
              _this.form.listMedias.splice(i,1);
            }).catch(() => {   
         });
      },
      downloadFn(v){
        console.log(v);
        window.open(v.url);
      },
      handleAvatarSuccess(res){
        console.log(res);
      },
      beforeAvatarUpload(res){
        console.log(res);
      }
    },
    destroyed() {
      this.videoFlag = false;
      this.videoUrl = '';
      this.audioFlag = false;
      this.audioName = '';
      this.audioUrl = '';
      this.audioId = '';
      //console.log(this.audioFlag);
    },
    components: {
      vvBox,
      audioBox,
      imgBox
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .mediaEditTemp{
    .mediaBox{
        .upbtnBox{
          width:100px;
          height:100px;
          border:1px solid #eee;
          line-height:100px;
        }
        .upbtnBox:hover{
          color:#409eff;
        }
        .medias li{
          box-shadow:0 1px 3px #eee;
          margin-right:10px;
          margin-bottom:10px;
          cursor:pointer;
          position:relative;
          em{
            position:absolute;
            top:0;
            right:0;
            font-size:16px;
            z-index:3;
            color:#eee;
          }
          em:hover{
            color:#ff2121;
          }
        }
        .videoLiBox{
          text-align:center;
        }
        .videoLiBox, .imgLiBox{
          position:relative;
          width:100px;
          height:100px;
          overflow:hidden;
        }
        .audioLiBox, .docLiBox, .othersLiBox{
          //width:205px;
          position:relative;
          min-width:100px;
          height:100px;
          overflow:hidden;
        }
        .audioLiBox .audioImg{
          width:80px;
          height:70px;
          overflow:hidden;
          padding:5px;
          display:block;
          img{
            width:60px;
            height:60px;
          }
        }
        .audioLiBox p{
          //width:100%;
          min-width:100px;
          height:30px;
          line-height:20px;
          padding:0 5px;
        }
        .audioLiBox:hover i{
          height:100%;
          display:block;
        }
        .audioLiBox i{
          display:block;
          position:absolute;
          top:0;
          ledt:0;
          font-size:30px;
          background:rgba(0,0,0,.5);
          width:100%;
          height:0;
          display:none;
          line-height:100px;
          color:#ccc;
          text-align:center;
        }
        .videoLiBox::before{
          content: '►';
          font-family:'宋体';
          font-size:30px;
          background:rgba(255,255,255,.3);
          position:absolute;
          top:50%;
          left:50px;
          width:50px;
          height:50px;
          margin:-25px 0 0 -25px;
          border-radius:50%;
          color:#333;
          text-indent:0.2em;
          line-height:50px;
          z-index:2;
        }
        .videoLiBox:hover::before{
          background:rgba(255,255,255,.7);
        }
        .videoLiBox::after{
          width:100%;
          height:100%;
          position:absolute;
          top:0;
          left:0;
          background:rgba(0,0,0,.5);
          z-index:1;
          content:'';
        }
      }
  }

</style>