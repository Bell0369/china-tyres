import { ref } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"

interface FetchSelectProps {
  api: (params?: { id?: number }) => Promise<any>
  text: string
}

export function useDeleteList(props: FetchSelectProps) {
  const isLoading = ref(false)

  const isDeleted = ref(false)

  const { api, text } = props

  const handleDelete = (id: number) => {
    console.log(id)
    ElMessageBox.confirm(`確認刪除该 ${text}？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        isLoading.value = true
        api({
          id: id
        })
          .then(() => {
            ElMessage.success("刪除成功")
            isDeleted.value = true
          })
          .catch(() => {
            ElMessage.error("刪除失败")
          })
          .finally(() => {
            isLoading.value = false
          })
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消"
        })
      })
  }

  return {
    handleDelete,
    isLoading,
    isDeleted
  }
}
