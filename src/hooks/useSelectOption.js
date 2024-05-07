import { ref, onMounted } from "vue"
import {
  getBrandListApi,
  getDeliveryListApi,
  getFactoryListApi,
  getDepartmentApi,
  getPaymentTermsApi
} from "@/api/selects"

// 獲取品牌
export function useBrandSelect() {
  const brandOptions = ref([])
  const getBrandList = () => {
    getBrandListApi().then(({ data }) => {
      brandOptions.value = data
    })
  }
  onMounted(() => {
    getBrandList()
  })

  return {
    brandOptions
  }
}

// 獲取發貨類型
export function useeDeliverTypeSelect() {
  const eDeliverTypeOptions = ref([])
  const getBrandList = () => {
    getDeliveryListApi().then(({ data }) => {
      eDeliverTypeOptions.value = data
    })
  }
  onMounted(() => {
    getBrandList()
  })

  return {
    eDeliverTypeOptions
  }
}

// 獲取付款條件
export function usePayMentSelect() {
  // 區號
  const codeArr = ["86", "852", "1", "44", "91", "81", "49", "7", "82", "39", "33", "34", "61", "64", "52"]

  // const PayMentOptions = ["付款条件A", "付款条件B", "付款条件C", "付款条件D"]
  const PayMentOptions = ref([])
  const getPaymentTerms = () => {
    getPaymentTermsApi().then(({ data }) => {
      PayMentOptions.value = data
    })
  }
  onMounted(() => {
    getPaymentTerms()
  })

  return {
    PayMentOptions,
    codeArr
  }
}

// 獲取工廠代碼
export function useFactoryCodeSelect() {
  const factoryCodeOptions = ref([])
  const getBrandList = () => {
    getFactoryListApi().then(({ data }) => {
      factoryCodeOptions.value = data
    })
  }
  onMounted(() => {
    getBrandList()
  })

  return factoryCodeOptions
}

// 獲取部門
export function useDepartmentSelect() {
  const roleOptions = ref([])
  const getDataList = () => {
    getDepartmentApi().then(({ data }) => {
      roleOptions.value = data
    })
  }
  onMounted(() => {
    getDataList()
  })

  return {
    roleOptions
  }
}
