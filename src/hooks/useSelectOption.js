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
  const PayMentOptions = ["付款条件A", "付款条件B", "付款条件C", "付款条件D"]
  return {
    PayMentOptions
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
