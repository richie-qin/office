// axios
import request from './request'
import qs from "qs"
// import aes from "../util/aes"

//获取学校列表
export function getSchoolList(data){
  return request({
    url: `/new-cms/app/school/list/${data.type}`,
    method: 'POST',
    data:qs.stringify(data),
    // hideloading:true
  })
}

//查看详情
export function getDetailsData(id){
  return request({
    url: `/new-cms/app/school/info/${id}`,
    method: 'get',
  })
}

//查看文章
export function getArticleDetails(id){
  return request({
    url: `/new-cms/app/cms/info/${id}`,
    method: 'get',
  })
}


