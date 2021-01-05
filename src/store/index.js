import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './sidebar'
import projPlanBatch from './projPlanBatch'
import projPlanBudget from './projPlanBudget'
import infor from './infor'
import projectCur from './projectCur.js'
import rnList from './rnList.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sidebar,
        projPlanBatch,
        projPlanBudget,
        infor,
        projectCur,
        rnList
    }
})
