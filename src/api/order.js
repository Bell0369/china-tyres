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

// 刪*
export function deletePiListApi(params) {
  return request({
    url: "order/piList",
    method: "get",
    params
  })
}

// 上传PI
export function uploadPiApi(data) {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "order/uploadPi",
    method: "post",
    data
  })
}

// PI基本信息
export function getPiBasicDetailApi(params) {
  return request({
    url: "order/piBasicDetail",
    method: "get",
    params
  })
}

// PI产品信息
export function getPiProductDetailApi(params) {
  return request({
    url: "order/piProductDetail",
    method: "get",
    params
  })
}

// 修改柜量
export function updatePiQuantityApi(data) {
  return request({
    url: "order/PiEditQuantity",
    method: "post",
    data
  })
}

// 生成发货计划-上传文件
export function uploadPiQuantityPlanApi(data) {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "order/uploadDeliveryPlan",
    method: "post",
    data
  })
}

// 生成发货计划-從PI導入
export function uploadPIDeliveryPlanApi(data) {
  return request({
    url: "order/PIDeliveryPlan",
    method: "post",
    data
  })
}

/** 發貨計劃 */
// 列表
export function getDeliveryPlanListApi(params) {
  return request({
    url: "delivery/deliveryPlanList",
    method: "get",
    params
  })
}

// 查詢發貨計劃號
export function getDeliveryPlanNoApi(params) {
  return request({
    url: "delivery/searchDeliveryPlanNo",
    method: "get",
    params
  })
}

// 上傳發貨計劃
export function uploadPackingListApi(data) {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "delivery/uploadPackingList",
    method: "post",
    data
  })
}

// 詳情
export function getDeliveryPlanDetailsApi(params) {
  return request({
    url: "delivery/deliveryPlanDetails",
    method: "get",
    params
  })
}

// 詳情 - 產品
export function getDeliveryPlanProductApi(params) {
  return request({
    url: "delivery/deliveryPlanProduct",
    method: "get",
    params
  })
}
