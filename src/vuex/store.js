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
            {name:"全部",code:"01"},
            {name:"蜀山区",code:"02"},
            {name:"滨湖新区",code:"03"},
            {name:"政务区",code:"04"},
            {name:"新站区",code:"05"},
            {name:"瑶海区",code:"06"},
            {name:"庐阳区",code:"07"},
            {name:"包河区",code:"08"},
            {name:"长丰县",code:"09"},
            {name:"肥东县",code:"10"},
            {name:"肥西县",code:"11"},
            {name:"庐江县",code:"12"},
            {name:"高新区",code:"13"},
            {name:"经开区",code:"14"},
            {name:"巢湖市",code:"15"},
        ],
        areaList:[//面积数组
            {name:"不限",code:"01"},
            {name:"100㎡以下",start:"",end:"100",code:"02"},
            {name:"100㎡-200㎡",start:"100",end:"200",code:"03"},
            {name:"200㎡-300㎡",start:"200",end:"300",code:"04"},
            {name:"300㎡-500㎡",start:"300",end:"500",code:"05"},
            {name:"500㎡-1000㎡",start:"500",end:"1000",code:"06"},
            {name:"1000㎡以上",start:"",end:"1000",code:"07"},
        ],
        buildList:[//建筑类型
            {value:null,label:"全部"},
            {value:1,label:"写字楼"},
            {value:2,label:"公寓"},
            {value:3,label:"商铺"},
            {value:4,label:"厂房"},
            {value:5,label:"园区"},
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