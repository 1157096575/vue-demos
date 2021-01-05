import { asyncComponent } from 'lib/utils';
const Index = r => require.ensure([], () => r(require('components/homePage/index')), 'Index');
const commonRT = asyncComponent('common/commonRT');

export let r = [
    {
        path: '',
        redirect: 'index'
    },
    {
        path: 'index',
        name: 'index',
        component: Index
    },
    {
        path: 'commonRT',
        name: 'commonRT',
        component: commonRT
    }
]