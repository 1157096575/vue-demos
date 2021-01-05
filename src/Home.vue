<template>
    <!--
    <div>
        <el-container style="height:100%; position:relative;">
            <el-collapse-transition>
                <el-aside class="elside" :width="asideWidth">
                    <sidebar :isCollapse="isCollapse"></sidebar>
                </el-aside>
            </el-collapse-transition>
    
            <el-container>
                <el-header >
                    <myHeader v-on:menuShow="menuShowFn()" ></myHeader>
                </el-header>
                <el-main style="height:100%;">
                    <div class="el-main-box">
                        <router-view></router-view>
                        <el-footer><div class="footer">copyright@2017 xxx</div></el-footer> 
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
    -->
    <div class="layoutNew" :class="[isCollapse?'pl0':'']">
        <div v-if="browserTipShow" class='ie8Text'>您的浏览器版本过低，为了更好的体验系统功能，推荐下载安装<a class='ie8Btn' target= _blank href='https://www.google.cn/intl/zh-CN/chrome'>谷歌浏览器</a> 获取更好的使用体验！</div>
        <div class="layoutLeft" :class="[isCollapse?'sw':'']">
            <sidebar :isCollapse="isCollapse" :logo = "logo"></sidebar>
        </div>
        
        <div class="layoutConWrap">
            <div class="layoutTop">
              <myHeader v-on:menuShow="menuShowFn()" @modifyPwd="modifyPwd"></myHeader>
            </div>
            <router-view></router-view>
            
        </div>
    </div>
</template>
<script>
    //组件
    import myHeader from 'components/common/Header';
    import Sidebar from 'components/common/Sidebar';
    import globalDialog from 'components/common/globalDialog';
    import indexApi from 'api/index';
    import { broserVersionUpdate } from 'lib/versionTool';
    import verifyReg from 'lib/verifyReg';
    export default {
        name: 'app',
        components: {
            myHeader,
            Sidebar,
            globalDialog
        },
        data() {
           
            return {
                
            }
        },
        created(){
            
        },
        mounted() {
            this.$nextTick(function () {
                this.browserTipShow = broserVersionUpdate();
                this.modifyPwdForm.name = sessionStorage.getItem("loginName")
            })
        },
        methods: {

        }
    };
</script>
