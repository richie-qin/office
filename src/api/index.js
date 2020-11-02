// axios
import request from './request'
// import qs from "qs"
// import aes from "../util/aes"

//获取楼宇数据
export function getBuilding(data,number){
  return request({
    url: `/rent/building/searchForUser/${number.page}/${number.size}`,
    method: 'post',
    data
  })
}

//获取房源
export function getResource(data,number){
  return request({
    url: `/rent/resource/searchForUser/${number.page}/${number.size}`,
    method: 'post',
    data
  })
}

// 房源详情
export function getBuildingDetails(id){
  return request({
    url: `/rent/building/${id}`,
    method: 'get',
  })
}

// 房源详情
export function getResourceDetails(id){
  return request({
    url: `/rent/resource/${id}`,
    method: 'get',
  })
}


// 委托找房
export function entrustSeek(data){
  return request({
    url: `/rent/entrust`,
    method: 'post',
    data
  })
}


// 投放房源
export function custHouse(data){
  return request({
    url: `/rent/custHouse`,
    method: 'post',
    data
  })
}


// 预约看房
export function getSubscribe(data){
  return request({
    url: `/rent/request`,
    method: 'post',
    data
  })
}



