import { request } from "@/utils/service"

/** 工廠代碼配置 */
//  查
export function getFactoryListApi(params) {
  return request({
    url: "config/factoryCode",
    method: "get",
    params
  })
}
//  加
export function addFactoryListApi(data) {
  return request({
    url: "config/addFactoryCode",
    method: "post",
    data
  })
}

// 刪
export function deleteFactoryCodeApi(data) {
  return request({
    url: "config/deleteFactoryCode",
    method: "post",
    data
  })
}

/** 品牌配置 */
//  查
export function getBrandListApi(params) {
  return request({
    url: "config/brand",
    method: "get",
    params
  })
}
//  加
export function addBrandListApi(data) {
  return request({
    url: "config/addBrand",
    method: "post",
    data
  })
}

/** 發貨方式配置 */
//  查
export function getDeliveryListApi(params) {
  return request({
    url: "config/deliveryMethod",
    method: "get",
    params
  })
}

//  加
export function addDeliveryListApi(data) {
  return request({
    url: "config/addDeliveryMethod",
    method: "post",
    data
  })
}

/** 付款條件配置 */
//  查
export function getPaymentTermsApi(params) {
  return request({
    url: "config/paymentTerms",
    method: "get",
    params
  })
}

//  加
export function addPaymentTermsApi(data) {
  return request({
    url: "config/addPaymentTerms",
    method: "post",
    data
  })
}

// 國家地區
export function getCountriesAreaApi(params) {
  return request({
    url: "common/getCountriesArea",
    method: "get",
    params
  })
}

// 部門列表
export function getDepartmentApi(params) {
  return request({
    url: "auth/roleList",
    method: "get",
    params
  })
}
