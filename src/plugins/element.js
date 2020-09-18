import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui'

window.showLoading = function(){
    window.loadingInstance  = Loading.service({background:"rgba(0,0,0,0.5)"});
    
}
window.closeLoading = function(){
    window.loadingInstance.close();
}
Vue.use(Element);
