import { request } from "@/utils/service"

/** 訂單管理-列表 */
// 查
export function getOrderListApi(params) {
  return request({
    url: "order/orderList",
    method: "get",
    params
  })
}

// 刪*

// 修改柜量
export function updateQuantityApi(data) {
  return request({
    url: "order/editQuantity",
    method: "post",
    data
  })
}

// 上传订单
export function uploadOrderApi(data) {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "order/uploadOrder",
    method: "post",
    data
  })
}

// 订单详情
// 详情基本信息
export function getOrderDetailApi(params) {
  return request({
    url: "order/orderDetail",
    method: "get",
    params
  })
}

// 产品信息
export function getOrderDetailProductApi(params) {
  return request({
    url: "order/orderDetailProduct",
    method: "get",
    params
  })
}

/** PI订单 */
// 列表
export function getPiListApi(params) {
  return request({
    url: "order/piList",
    method: "get",
    params
  })
}
