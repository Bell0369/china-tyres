import { ref, onMounted } from "vue"
import { getBrandListApi, getDeliveryListApi } from "@/api/selects"

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
