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
export function updateUserItemApi(data) {
  return request({
    url: "user/addUser",
    method: "post",
    data
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
// 改
export function updateClientListApi(data) {
  return request({
    url: "client/addClient",
    method: "post",
    data
  })
}
// 看
export function viewClientShowApi(params) {
  return request({
    url: "client/clientShow",
    method: "get",
    params
  })
}

// 客戶-产品列表
// 查
export function getClientProductApi(params) {
  return request({
    url: "client/clientProductList",
    method: "get",
    params
  })
}
// 刪 *
export function deleteClientProductApi(params) {
  return request({
    url: "client/clientList",
    method: "get",
    params
  })
}
// 看
export function viewProductShowApi(params) {
  return request({
    url: "client/productShow",
    method: "get",
    params
  })
}
// 加
export function updateClientProductApi(data) {
  return request({
    url: "client/addProduct",
    method: "post",
    data
  })
}

// 批量修改
export function updateAllClientProductApi(data) {
  return request({
    url: "client/editAllClientProductPrice",
    method: "post",
    data
  })
}

// 预付款 - 加
export function addClientAdvancePaymentApi(data) {
  return request({
    url: "client/clientAdvancePayment",
    method: "post",
    data
  })
}
// 联系人信息 - 查
export function getClientContactApi(params) {
  return request({
    url: "client/clientContact",
    method: "get",
    params
  })
}

/**工厂管理 */
// 查
export function getFactoryListApi(params) {
  return request({
    url: "factory/factoryList",
    method: "get",
    params
  })
}
// 刪*

// 加
export function updateFactoryApi(data) {
  return request({
    url: "factory/addFactory",
    method: "post",
    data
  })
}

// 看
export function getFactoryBasicInfoApi(params) {
  return request({
    url: "factory/factoryBasicInfo",
    method: "get",
    params
  })
}

// 工廠 - 聯係人信息
// 看
export function getFactoryContactApi(params) {
  return request({
    url: "factory/factoryContact",
    method: "get",
    params
  })
}

// 工廠 - 產品
// 查
export function getFactoryProductListApi(params) {
  return request({
    url: "factory/factoryProductList",
    method: "get",
    params
  })
}

// 刪*

// 看
export function getFactoryProductShowApi(params) {
  return request({
    url: "factory/productShow",
    method: "get",
    params
  })
}

// 改
export function updateFactoryAddProductApi(data) {
  return request({
    url: "factory/addProduct",
    method: "post",
    data
  })
}
