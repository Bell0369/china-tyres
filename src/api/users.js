import { request } from "@/utils/service"

/** 用戶信息列表 */
//  查
export function getUserListApi(params) {
  return request({
    url: "user/userList",
    method: "get",
    params
  })
}
// 删
export function deleteUserListApi(data) {
  return request({
    url: "user/deleteUser",
    method: "post",
    data
  })
}
// 详情
export function getUserItemApi(params) {
  return request({
    url: "user/getOneUser",
    method: "get",
    params
  })
}
// 加
export function updateUserItemApi(params) {
  return request({
    url: "user/addUser",
    method: "post",
    params
  })
}

/** 客戶信息列表 */
// 查
export function getClientListApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}
// 刪
export function deleteClientListApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}

/** 客戶产品列表 */
// 查
export function getClientProductApi(params) {
  return request({
    url: "client/clientProductList",
    method: "get",
    params
  })
}
// 刪
export function deleteClientProductApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}
