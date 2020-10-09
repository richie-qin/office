// axios
import request from './request'
// import qs from "qs"
// import aes from "../util/aes"

//获取楼宇数据
export function getBuilding(data,number){
  return request({
    url: `/rent/building/search/${number.page}/${number.size}`,
    method: 'post',
    data
  })
}

//获取房源
export function getResource(data,number){
  return request({
    url: `/rent/resource/search/${number.page}/${number.size}`,
    method: 'post',
    data
  })
}

export function getResourceDetails(id){
  return request({
    url: `/rent/resource/${id}`,
    method: 'get',
  })
}



