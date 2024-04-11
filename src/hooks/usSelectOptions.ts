// 區號
const codeArr = ["86", "852", "1", "44", "91", "81", "49", "7", "82", "39", "33", "34", "61", "64", "52"]

// 付款條件
const paymentTermsArr = ["付款条件A", "付款条件B", "付款条件C", "付款条件D"]

// 發貨類型
const deliverTypeArr = ["CTD", "DIR", "WH"]

export function useSelectOptions() {
  return { deliverTypeArr, paymentTermsArr, codeArr }
}
