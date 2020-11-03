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
            {name:"蜀山",code:"02"},
            {name:"滨湖新",code:"03"},
            {name:"政务",code:"04"},
            {name:"新站",code:"05"},
            {name:"瑶海",code:"06"},
            {name:"庐阳",code:"07"},
            {name:"包河",code:"08"},
            {name:"长丰",code:"09"},
            {name:"肥东",code:"10"},
            {name:"肥西",code:"11"},
            {name:"庐江",code:"12"},
            {name:"高新",code:"13"},
            {name:"经开",code:"14"},
            {name:"巢湖",code:"15"},
        ],
        metroList:[//地铁数组
            //                   
            {name:"全部",code:"01"},
            {name:"望湖城",code:"02"},
            {name:"合肥南站葛大店",code:"03"},
            {name:"秋浦河路",code:"04"},
            {name:"朱岗",code:"05"},
            {name:"合工大南区",code:"06"},
            {name:"包公园",code:"07"},
            {name:"大东门",code:"08"},
            {name:"明光路",code:"09"},
            {name:"长淮",code:"10"},
            {name:"南站南广场",code:"11"},
            {name:"骆岗",code:"12"},
            {name:"九联圩",code:"13"},
            {name:"丙子铺",code:"14"},
            {name:"万年埠",code:"15"},
            {name:"万达城",code:"15"},
            {name:"云谷路",code:"15"},
            {name:"金斗公园",code:"15"},
            {name:"塘西河公园",code:"15"},
            {name:"紫庐",code:"15"},
            {name:"滨湖会展中心",code:"15"},
            {name:"高王",code:"15"},
            {name:"合肥火车站",code:"15"},
        ],
        priceList:[//单价数组
            {name:"不限",code:"01"},
            {name:"1000以下",start:"0",end:"1000",code:"02"},
            {name:"1000-2000",start:"1000",end:"2000",code:"03"},
            {name:"2000-3000",start:"2000",end:"3000",code:"04"},
            {name:"3000-4000",start:"3000",end:"4000",code:"05"},
            {name:"4000-5000",start:"4000",end:"5000",code:"06"},
            {name:"5000以上",start:"5000",end:"",code:"07"},
        ],
        areaList:[//面积数组
            {name:"不限",code:"01"},
            {name:"100㎡以下",start:"0",end:"100",code:"02"},
            {name:"100㎡-200㎡",start:"100",end:"200",code:"03"},
            {name:"200㎡-300㎡",start:"200",end:"300",code:"04"},
            {name:"300㎡-500㎡",start:"300",end:"500",code:"05"},
            {name:"500㎡-1000㎡",start:"500",end:"1000",code:"06"},
            {name:"1000㎡以上",start:"1000",end:"",code:"07"},
        ],
        renovationList:[//装修类型
            {value:null,label:"全部"},
            {value:1,label:"豪装"},
            {value:2,label:"精装"},
            {value:3,label:"简装"},
            {value:4,label:"毛坯"},
        ],
        buildList:[//建筑类型
            {value:null,label:"全部"},
            {value:1,label:"写字楼"},
            {value:2,label:"公寓"},
            {value:3,label:"商铺"},
            {value:4,label:"厂房"},
            {value:5,label:"园区"},
            {value:6,label:"联合办公"},
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