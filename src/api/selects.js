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
export function addFactoryListApi(params) {
  return request({
    url: "config/addFactoryCode",
    method: "get",
    params
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
export function addBrandListApi(params) {
  return request({
    url: "config/addBrand",
    method: "post",
    params
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
export function addDeliveryListApi(params) {
  return request({
    url: "config/addDeliveryMethod",
    method: "post",
    params
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
