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
        regionList:[//区域数组
            {name:"不限",code:"01"},
            {name:"蜀山",code:"02"},
            {name:"庐阳",code:"03"},
            {name:"瑶海",code:"04"},
            {name:"滨湖",code:"05"},
            {name:"包河",code:"06"},
            {name:"经开",code:"07"},
            {name:"合肥周边",code:"08"},
            {name:"高新区",code:"09"},
            {name:"政务区",code:"10"},
        ],
        areaList:[//面积数组
            {name:"不限",code:"01"},
            {name:"100㎡以下",code:"02"},
            {name:"100㎡-200㎡",code:"03"},
            {name:"200㎡-300㎡",code:"04"},
            {name:"300㎡-500㎡",code:"05"},
            {name:"500㎡-1000㎡",code:"06"},
            {name:"1000㎡以上",code:"07"},
        ]

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