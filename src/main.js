import "babel-polyfill"
import 'static/css/style.css';
import 'element-ui/lib/theme-chalk/index.css';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Vue from 'vue';
import router from './router';
console.log(router)
Vue.config.productionTip = true;

import Qs from 'qs'
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true; 
axios.defaults.timeout = 600000; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
import store from 'src/store';
import 'lib/filterTools';

import ElementUI from 'element-ui';
import { Message,MessageBox,Notification} from 'element-ui';
Vue.use(ElementUI);

// import aa from '@/components/aa'
// Vue.use(aa);

axios.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('token')) { 
        config.headers.token = window.sessionStorage.getItem('token');
    }
    let data = config.data;
    if (data && Object.prototype.toString.call(data) == '[object Object]') {
      let requestData = {};
      requestData = Qs.stringify(data);
      config.data = requestData;
    }
    config.cancelToken = store1.source.token;
    return config;
},
err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    //console.log(response)
    let body = response.data;   
    if ((body && body.code == 100) || (body && body.code == 101)) {
        if(window.location.hash == '#/login' || window.location.hash == '#/'){
          Notification({
              title: '提示',
              message: body.msg,
              type: 'error',
              duration: 3 * 1000
          });
          return;
        }

        Notification({
            title: '提示',
            message: body.msg,
            type: 'error',
            duration: 3 * 1000
        });
        window.sessionStorage.removeItem("token");
        store.dispatch('UNSET_MENU')
        router.go();
        return;
    }
    return response;
}, function (error) {
    console.log(JSON.stringify(error));
    if(JSON.stringify(error) == '{}'){ //cancel
      return;
    }
    Notification({
        title: '提示',
        message: '服务器错误',
        type: 'error',
        duration: 3 * 1000
    });
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  NProgress.start(); 
  if (!window.sessionStorage.getItem('token') && to.path != '/login') { 
    next({
      path: '/login' 
    })
  }else{
    //路由变化时使用axios取消所有请求
    const CancelToken = axios.CancelToken
    store1.source.cancel && store1.source.cancel()
    store1.source = CancelToken.source()
    next()
  }
  //next()
})

var store1 = {
    source: {
        token: null,
        cancel: null
  }
}

router.afterEach(() => {
    NProgress.done();
});
/*new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})*/
new Vue({
  router,
  store
}).$mount('#app');

