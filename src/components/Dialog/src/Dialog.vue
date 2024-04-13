<script setup lang="ts">
import { ElDialog, ElScrollbar } from "element-plus"
import { computed, useAttrs, ref, unref, useSlots, watch, nextTick } from "vue"
import { isNumber } from "@/utils/is"

const slots = useSlots()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "Title"
  },
  fullscreen: {
    type: Boolean,
    default: true
  },
  maxHeight: {
    type: String,
    default: "400px"
  }
})

const getBindValue = computed(() => {
  const delArr: string[] = ["fullscreen", "title", "maxHeight"]
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

const isFullscreen = ref(false)

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}
const fullscreenSvgName = computed(() => {
  return isFullscreen.value ? "fullscreen-exit" : "fullscreen"
})

const dialogHeight = ref(isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight)

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick()
    if (val) {
      const windowHeight = document.documentElement.offsetHeight
      dialogHeight.value = `${windowHeight - 55 - 60 - (slots.footer ? 63 : 0)}px`
    } else {
      dialogHeight.value = isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight
    }
  },
  {
    immediate: true
  }
)

const dialogStyle = computed(() => {
  return {
    height: unref(dialogHeight)
  }
})
// console.log(dialogStyle)
</script>

<template>
  <ElDialog
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header="{ close }">
      <div class="flex justify-between items-center h-54px pl-15px pr-15px relative">
        <slot name="title">
          {{ title }}
        </slot>
        <div class="h-54px flex justify-between items-center absolute top-[50%] right-15px translate-y-[-50%]">
          <SvgIcon :name="fullscreenSvgName" @click="toggleFull" class="!h-54px mr-3 cursor-pointer" />
          <SvgIcon name="close" @click="close" class="!h-54px cursor-pointer" />
        </div>
      </div>
    </template>

    <ElScrollbar>
      <slot />
    </ElScrollbar>

    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ElDialog>
</template>

<style lang="scss">
.el-dialog {
  &__header {
    padding: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
    .svg-icon:hover {
      color: var(--el-color-primary);
    }
  }

  &__body {
    padding: 15px !important;
  }

  &__footer {
    border-top: 1px solid var(--el-border-color-lighter);
  }

  &__headerbtn {
    top: 0;
  }
}
</style>
