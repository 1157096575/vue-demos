<template>
  <div class="slideBar" id="slideBar">
  <div id="bar" class="bar">
    <div class="top">
      <img :src="logo"/>
    </div>
   
    <el-menu 
      class="el-menu-vertical-demo"
      :key="menuInit"
      :unique-opened = "uniqueOpened"
      :default-active="defaultActive"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#0065b3"
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
      router>
      <template v-if="item" v-for="(item, index) in getMenu">        
        <el-submenu :index="item.title" v-if="item && item.list && item.list.length>0?true:false" >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <template v-if="item2" v-for="(item2 , index2) in item.list">
            <template v-if="item2 && item2.menuRoute && item2.list  && item2.list.length>0 ?false:true">
              <el-menu-item :index="item2.menuRoute" :route="{name: item2.menuRoute}" class="countBacklogMenu">{{item2.title}}<em v-if="countBacklog && countBacklog > 0 && item2.menuRoute == 'myjob-pending'">{{countBacklog}}</em></el-menu-item>
              <!--<template v-else>
                <el-menu-item :index="item2.title" :route="{name: item2.menuRoute, query: {'cptname': item2.title}}" v-if="item2.title">{{item2.title}}</el-menu-item>
              </template>-->
            </template>
          </template>
        </el-submenu>
        <template v-else>
          <el-menu-item v-if="item && item.menuRoute && item.list && item.list.length>0?false:true" :index="item.menuRoute" :route="{name: item.menuRoute}">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

    </div>
  </div>
</template>
<script>
    import menuApi from '@/resource/menuApi';
    import { mapGetters } from 'vuex';
    import indexApi from 'api/index';

    export default {
        name: 'sidebar',
        props: {
          isCollapse: {
              type: Boolean,
              default: false 
          },
          logo: {
              type: String,
              default: '' 
          }
        },
        data: function () {
            return {
                //isCollapse: true,
                //getMenuLin : menuApi.menuData,
                secMenu:[],
                showTimeout: 10,
                hideTimeout: 10,
                routerFlag: true,
                uniqueOpened: true,
                menuInit:1,
                countBacklog:
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            })
        },
        watch: {
            '$route' () {
                this.getCountBacklog();
            }
        },
        methods: {
            init: function () {
              var _this = this;
              this.getCountBacklog();
              document.addEventListener('visibilitychange',function(){
                  if(document.visibilityState=='visible') {
                    _this.getCountBacklog();
                  }
              });
              require('mCustomScrollbar');  
              $("#slideBar").mCustomScrollbar({
                theme:"dark-thin",
                advanced:{
                  updateOnBrowserResize:true,
                  updateOnContentResize:true,
                  autoExpandHorizontalScroll:true,
                  autoScrollOnFocus:true
                }
              });
            },
            handleOpen(key, keyPath) {
              //console.log(key, keyPath,$("#slideBar"));
              this.$nextTick(function () {
     
              })

            },
            handleClose(key, keyPath) {
              //console.log(key, keyPath);
              this.$nextTick(function () {
                
              })

            },
            handleSelect(key, keyPath) {
              //console.log(this.getMenuAndButton);
              //console.log('handleSelect',key, keyPath);
              //console.log($("#slideBar"))

            },
            getCountBacklog(){
              var _this = this;
              indexApi.getCountBacklog(_this).then(function (response) {
                let body = response.data;
                console.log(body);
                if (body && body.code != 0) {
                    _this.$notify({
                      title: '提示',
                      message: body.msg,
                      type: 'error'
                    });
                    return;
                }
                if (body && body.code == 0) {
                  _this.countBacklog = body.data;
                  return;
                }
              }, function (response) {
                  console.log(response); 
              });
            }
        },
        computed: {
          ...mapGetters([
            'getMenu',
            'getMenuAndButton'
          ]),
          defaultActive: function(){
            var showName = this.$route.matched.length>2 ? this.$route.matched[1].name : this.$route.name;
            if(this.$route.name=='project-statistics-list'){
              showName = 'project-statistics-list';
            }
            if(showName=='projectmgt-contracts'){
              showName = 'projectmgt-view';
            }
            if(this.$route.name=='rn-all' && this.$route.query.cptname){
              showName = this.$route.query.cptname;
            }
            return showName;
          }
        }
    }
</script>
<style rel="stylesheet/less" lang="less" >
    //.slideLeft{height:100%;}
    
  .slideBar{
      width:100%;
      height:100%;
      color:#fff;
      //height:100%;
      //background:red;
      //overflow-y:scroll;
      .el-menu-item i, .el-submenu__title i, .el-submenu.is-active .el-submenu__icon-arrow{
        color:#fff;
      }
      .el-submenu.is-active i{  /* 菜单 */
          color:#409eff;
      }
      .top{
        width:100%;
        height:60px;
        overflow:hidden;
      }

      .el-menu-vertical-demo{
      height:100%;
      background:red;
      }
      .mCSB_container{
        margin-right:0;
        width:100%;
      }
      .el-menu .el-submenu__title, .el-menu .el-menu-item, .el-menu .el-submenu__title{
          white-space:nowrap; 
          overflow:hidden; 
          text-overflow:ellipsis; 
          height:42px;
          line-height:42px;
          border:none;
          //background-color:red!important;
        }
      .bar>.el-menu>.el-submenu>.el-submenu__title, .bar>.el-menu>.el-menu-item{
        background:#00508f!important;
      }
      .el-menu .el-submenu__title:hover, .el-menu-item:hover, .bar>.el-menu>.el-submenu>.el-submenu__title:hover, .bar>.el-menu>.el-menu-item:hover{
        background-color:#409eff!important; color:#fff!important;
      }
      .el-menu .el-submenu__title:hover i, .el-menu-item:hover i{
        color:#fff!important;
      }
      .el-menu-item.is-active, .bar>.el-menu>.el-menu-item.is-active{
        background-color:#409eff!important;
      }
      
  }
  .countBacklogMenu{
    em{
      display:inline-block;
      padding:0 3px;
      background:#ff3b30;
      font-size:12px;
      height:14px;
      line-height:14px;
      border-radius:5px;
      margin:-20px 0 0 5px;
    }
  }  
</style>