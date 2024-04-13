export interface LoginRequestData {
  account: string
  /** 密码 */
  password: string
}

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ userinfo: object; roles: string[] }>
