import Vue from 'vue'
import Router from 'vue-router'
import { asyncComponent } from 'lib/utils';
Vue.use(Router)

const Login = asyncComponent('common/login');
const Home = resolve => require(['@/Home'], resolve)
const NotFound = asyncComponent('common/NotFound');

export default new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children: registerRouter(require.context('./', false, /\.route.js$/))
        },
        { // 其他页面，强制跳转到 404 页面
            path: '*', component: NotFound
        }
    ]
})

function registerRouter(requireContext) {
    let rMap = [];
    requireContext.keys().forEach(comp => {
        let vueComp = requireContext(comp);
        let rList = vueComp.r || [];
        for(let i =0,l=rList.length;i<l;i++){
            rMap.push(rList[i]);
        }
    });
    return rMap;
}