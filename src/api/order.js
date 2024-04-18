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
