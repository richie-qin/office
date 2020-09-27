// axios
import request from './request'
import qs from "qs"
// import aes from "../util/aes"

//获取楼宇数据
export function getBuilding(data){
  return request({
    url: `/rent/building/search/${data.page}/${data.size}`,
    method: 'post',
    data
  })
}

//获取楼宇房源
export function getResource(data){
  return request({
    url: `/rent/resource/search/${data.page}/${data.size}`,
    method: 'post',
    data:qs.stringify({data:data})
  })
}



