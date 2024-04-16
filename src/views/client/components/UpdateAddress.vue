<script setup>
import { reactive, ref } from "vue"
import cloneDeep from "lodash-es/cloneDeep" // 导入深拷贝函数
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue"
import { getCountriesAreaApi } from "@/api/selects"

const phones_default = ref(1)
const formRef = ref()
const dynamicValidateForm = reactive({
  // client_id: 1,
  // client_contact_id: 1,
  client_contact: "",
  phones: [],
  address: [],
  emails: [
    {
      email: ""
    }
  ]
})

// 添加電話
const phoneVisible = ref(false)
const phonesForm = ref({
  area: "",
  phone: ""
})

let phoneType = false
let phoneIndex = 0
const addPhone = () => {
  if (phoneType) {
    console.log("添加")
    // 深拷贝 phonesForm 中的值
    const phones = cloneDeep(phonesForm.value)
    dynamicValidateForm.phones.push(phones)
  } else {
    console.log("修改", phoneIndex)
    Object.assign(dynamicValidateForm.phones[phoneIndex], phonesForm.value)
  }
  phoneVisible.value = false
}

const updatePhone = (item, index) => {
  phoneVisible.value = true
  phoneIndex = index
  if (item) {
    console.log("修改-彈框")
    const phones = cloneDeep(item)
    phoneType = false
    phonesForm.value = phones
  } else {
    console.log("添加-彈框")
    phoneType = true
    phonesForm.value.area = ""
    phonesForm.value.phone = ""
  }
}

// 添加地址
const addressVisible = ref(false)
const addressForm = ref({
  country: null,
  province: null,
  city: null,
  address: ""
})

// let phoneType = false
// let phoneIndex = 0
const addaddress = () => {
  if (phoneType) {
    console.log("添加")
    // 深拷贝 phonesForm 中的值
    // const phones = cloneDeep(phonesForm.value)
    // dynamicValidateForm.phones.push(phones)
  } else {
    // console.log("修改", phoneIndex)
    // Object.assign(dynamicValidateForm.phones[phoneIndex], phonesForm.value)
  }
  addressVisible.value = false
  console.log(addresValue)
}

const updateAddress = (item, index) => {
  addressVisible.value = true
  phoneIndex = index
  // if (item) {
  //   console.log("修改-彈框")
  //   const phones = cloneDeep(item)
  //   phoneType = false
  //   phonesForm.value = phones
  // } else {
  //   console.log("添加-彈框")
  //   phoneType = true
  //   phonesForm.value.area = ""
  //   phonesForm.value.phone = ""
  // }
}

const removeDomain = (item) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!")
      return false
    }
  })
}

// 獲取國家
// const options1
const id = 0
const addresValue = ref(["1", "2", "1"])
const areaId = ref(undefined)
const props = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
    console.log(level)

    getCountriesAreaApi({
      id: areaId.value
    }).then(({ data }) => {
      console.log(data)
      setTimeout(() => {
        const nodes = data.map((item) => ({
          value: item.id,
          label: item.name,
          leaf: level >= 2
        }))
        console.log(nodes)
        resolve(nodes)
      }, 1000)
    })

    // setTimeout(() => {
    //   const nodes = Array.from({ length: level + 1 }).map((item) => ({
    //     value: ++id,
    //     label: `Option - ${id}`,
    //     leaf: level >= 2
    //   }))
    //   console.log(nodes)
    //   resolve(nodes)
    // }, 1000)
  }
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="dynamicValidateForm">
      <el-form-item
        prop="client_contact"
        label="聯繫人"
        :rules="[{ required: true, message: '請輸入聯繫人', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.client_contact" />
      </el-form-item>
      <div>
        <el-form-item label="電話">
          <div class="flex items-center" v-for="(domain, index) in dynamicValidateForm.phones" :key="domain.id">
            <el-radio-group v-model="phones_default">
              <el-radio :value="index" border>{{ domain.area }} - {{ domain.phone }}</el-radio>
            </el-radio-group>
            <el-button-group class="ml-1 mr-4 pt-2">
              <el-icon class="cursor-pointer" size="22px" color="#409eff" @click="updatePhone(domain, index)"
                ><Edit
              /></el-icon>
              <el-icon class="cursor-pointer" size="22px" color="#f56c6c"><Delete /></el-icon>
            </el-button-group>
          </div>
          <div class="mb-2">
            <el-button type="primary" :icon="CirclePlus" plain @click="updatePhone(0, 0)">添加</el-button>
          </div>
        </el-form-item>
      </div>
      <div class="">
        <el-form-item label="地址">
          <div class="flex items-center w-[100%]" v-for="domain in dynamicValidateForm.address" :key="domain.city">
            <el-radio-group>
              <el-radio value="1" border>{{ domain.address }}</el-radio>
            </el-radio-group>
            <el-button-group class="ml-1 mr-4 pt-2">
              <el-icon class="cursor-pointer" size="22px" color="#409eff" @click="updateAddress(domain, index)"
                ><Edit
              /></el-icon>
              <el-icon class="cursor-pointer" size="22px" color="#f56c6c"><Delete /></el-icon>
            </el-button-group>
          </div>
          <div class="mb-2">
            <el-button type="primary" :icon="CirclePlus" plain @click="updateAddress(0, 0)">添加</el-button>
          </div>
        </el-form-item>
      </div>
      <div class="">
        <el-form-item label="郵箱">
          <div class="flex items-center" v-for="domain in dynamicValidateForm.emails" :key="domain.email">
            <el-radio-group>
              <el-radio value="1" border>{{ domain.email }}</el-radio>
            </el-radio-group>
            <el-button-group class="ml-1 mr-4 pt-2">
              <el-icon class="cursor-pointer" size="22px" color="#409eff"><Edit /></el-icon>
              <el-icon class="cursor-pointer" size="22px" color="#f56c6c"><Delete /></el-icon>
            </el-button-group>
          </div>
          <div class="mb-2">
            <el-button type="primary" :icon="CirclePlus" plain>添加</el-button>
          </div>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      </el-form-item>
    </el-form>

    <!-- phone -->
    <el-dialog v-model="phoneVisible" align-center title="電話" append-to-body>
      <div>
        <el-form-item label="電話">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-input v-model="phonesForm.area" />
            </el-col>
            <el-col :span="18">
              <el-input v-model="phonesForm.phone" />
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="phoneVisible = false">關閉</el-button>
        <el-button type="primary" @click="addPhone"> 確定 </el-button>
      </template>
    </el-dialog>

    <!-- addresss -->
    <el-dialog v-model="addressVisible" align-center title="地址" append-to-body>
      <div>
        <el-form-item label="地址">
          <el-cascader :props="props" v-model="addresValue" filterable />
          <!-- <el-select-v2 v-model="addressForm.country" :options="options1" /> -->
          <el-col :span="18">
            <el-input v-model="addressForm.phone" />
          </el-col>
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="addressVisible = false">關閉</el-button>
        <el-button type="primary" @click="addaddress"> 確定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
