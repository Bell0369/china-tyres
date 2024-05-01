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

// 刪
export function deleteOrderApi(data) {
  return request({
    url: "order/deleteOrder",
    method: "post",
    data
  })
}

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

// 订单产品ETD时间查询options
export function getEtdOptionsApi(params) {
  return request({
    url: "order/etdOptions",
    method: "get",
    params
  })
}

// 订单产品ETD时间查询
export function getEtdOrderProductSelectApi(params) {
  return request({
    url: "order/etdOrderProductSelect",
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

// 刪
export function deletePiListApi(data) {
  return request({
    url: "order/deletePi",
    method: "post",
    data
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

// 修改PI数量
export function updatePiNumberApi(data) {
  return request({
    url: "order/editPiNumber",
    method: "post",
    data
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

// 刪
export function deleteDeliveryPlanApi(data) {
  return request({
    url: "delivery/deleteDeliveryPlan",
    method: "post",
    data
  })
}

// 生成销售发票
export function createInvApi(data) {
  return request({
    url: "delivery/createInv",
    method: "post",
    data
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

/** 销售发票 */
// 列表
export function getInvListApi(params) {
  return request({
    url: "inv/invList",
    method: "get",
    params
  })
}

// 导出發票
export function exportInvApi(params) {
  return request({
    url: "inv/exportInv",
    method: "get",
    responseType: "blob",
    params
  })
}

// 刪
export function deleteSellInvApi(data) {
  return request({
    url: "inv/deleteSellInv",
    method: "post",
    data
  })
}

// 詳情
export function getinvDetailApi(params) {
  return request({
    url: "inv/invDetail",
    method: "get",
    params
  })
}

// 修改發票
export function updateInvApi(data) {
  return request({
    url: "inv/editInv",
    method: "post",
    data
  })
}
