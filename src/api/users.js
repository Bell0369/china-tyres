import { request } from "@/utils/service"

// 用戶信息
export function getUserItemApi(params) {
  return request({
    url: "user/getOneUser",
    method: "get",
    params
  })
}

/** 查詢客戶 */
export function getClientListApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}
// 刪 *
export function deleteClientListApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}

/** 客戶信息 */
// 產品列表 - 查
export function getClientProductApi(params) {
  return request({
    url: "client/clientProductList",
    method: "get",
    params
  })
}
// 產品列表 - 刪 *
export function deleteClientProductApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}
