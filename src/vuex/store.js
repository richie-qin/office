import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
    //定义状态
    state: {
        actNav: 1, //nav活动

    },
    getters,
    mutations,
    actions,
    plugins: [createPersistedState({ //解决刷新数据丢失问题
        storage: window.localStorage, //缓存在sessionStorage
        reducer(val) { //reducer函数不存在的话默认存储所有state,存在的话只存储自己设定的
            return {
                actNav: val.actNav,
            }
        }
    })]
})

export default store