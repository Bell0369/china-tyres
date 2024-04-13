export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

export interface GetTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  state?: string
  department?: string
}

export interface GetTableData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
  loading: boolean
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
