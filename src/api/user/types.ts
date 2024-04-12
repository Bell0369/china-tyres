export interface GetUserListRequestData {
  /** 当前页码 */
  page: number
  /** 查询条数 */
  page_size: number
  /** 查询参数：關鍵字 */
  keyword?: string
  /** 查询参数：狀態 */
  state?: string
}

// 用户列表返回数据
export interface GetTableData {
  id: number
  username: string
  account: string
  user_status: number
  role_name: string
  sex: string
  phone: string
  email: string
  created_at: string
}
export type GetTableResponseData = ApiResponseData<{
  data: GetTableData[]
  total: number
}>

// 用户列表返回数据
export interface GetUserItemData {
  id?: number
  username: string
  account: string
  status: number
  role_name: string
  sex: number
  area_code: string
  phone: number | null
  email: string
  password: string
  remarks: string
  role_id: string
}

// 用户列表返回数据
export interface GetTableData {
  id: number
  username: string
  account: string
  user_status: number
  role_name: string
  sex: string
  phone: string
  email: string
  created_at: string
}
// export type GetClientListResponseData = ApiResponseData<{

// }>
