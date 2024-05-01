import { ref, onMounted } from "vue"
import { getBrandListApi, getDeliveryListApi, getFactoryListApi } from "@/api/selects"

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
  // 部門
  const roleOptions = [
    {
      id: 1,
      name: "銷售部"
    },
    {
      id: 2,
      name: "財務部"
    },
    {
      id: 3,
      name: "物流部"
    },
    {
      id: 4,
      name: "文件部"
    }
  ]

  // 區號
  const codeArr = ["86", "852", "1", "44", "91", "81", "49", "7", "82", "39", "33", "34", "61", "64", "52"]

  const PayMentOptions = ["付款条件A", "付款条件B", "付款条件C", "付款条件D"]

  return {
    PayMentOptions,
    codeArr,
    roleOptions
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
