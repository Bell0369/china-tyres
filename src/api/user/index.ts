import { request } from "@/utils/service"
import type * as Table from "./types"

/** 查詢用戶 */
export function getUserListApi(params: Table.GetUserListRequestData) {
  return request<Table.GetTableResponseData>({
    url: "user/userList",
    method: "get",
    params
  })
}
/** 删除用戶 */
export function deleteUserListApi(data: number) {
  return request({
    url: "user/deleteUser",
    method: "post",
    data
  })
}
// 用戶信息
export function getUserItemApi(params: any) {
  return request<Table.GetUserItemData>({
    url: "user/getOneUser",
    method: "get",
    params
  })
}
