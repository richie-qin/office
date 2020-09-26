// axios
import request from './request'
// import qs from "qs"
// import aes from "../util/aes"

//获取楼宇数据
export function getBuilding(params){
  return request({
    url: `/rent/building/search/${params.page}/${params.size}`,
    method: 'get',
    params
  })
}

//获取楼宇房源
export function getResource(params){
  return request({
    url: `/rent/resource/search/${params.page}/${params.size}`,
    method: 'get',
    params
  })
}



