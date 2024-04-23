<script setup>
import { reactive, ref, onMounted } from "vue"
import cloneDeep from "lodash-es/cloneDeep" // 导入深拷贝函数
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue"
import { getCountriesAreaApi } from "@/api/selects"

const { addressData, idName } = defineProps(["addressData", "idName"])
console.log(idName)

// 初始化
const ruleForm = reactive({
  item: {
    phones: [],
    address: [],
    emails: []
  }
})

onMounted(() => {
  Object.assign(ruleForm, addressData)
})

// 移除數據
const removeDomain = (type, index) => {
  if (type === "phone") {
    ruleForm.item.phones.splice(index, 1)
  } else if (type === "address") {
    ruleForm.item.address.splice(index, 1)
  } else {
    ruleForm.item.emails.splice(index, 1)
  }
}

/**---------------------- */
// 添加電話
const phones_default = ref(0)
const phoneVisible = ref(false)
const phonesForm = ref({
  area: "",
  phone: ""
})

let phoneType = false
// 修改時找到對應修改數據的下標
let phoneIndex = 0
const addPhone = () => {
  const phones = ruleForm.item.phones
  if (phoneType) {
    // 深拷贝 phonesForm 中的值
    const phone = cloneDeep(phonesForm.value)
    phones.push(phone)
  } else {
    Object.assign(phones[phoneIndex], phonesForm.value)
  }
  phoneVisible.value = false
}

const updatePhone = (item, index) => {
  phoneVisible.value = true
  phoneIndex = index
  if (item) {
    const phones = cloneDeep(item)
    phoneType = false
    phonesForm.value = phones
  } else {
    phoneType = true
    phonesForm.value.area = ""
    phonesForm.value.phone = ""
  }
}

/**---------------------- */
// 添加地址
const address_default = ref(0)
const addressVisible = ref(false)
const addressForm = ref({
  country: "",
  province: "",
  city: "",
  address: ""
})

let addressType = false
// 修改時找到對應修改數據的下標
let addressIndex = 0

const addaddress = () => {
  const addresses = ruleForm.item.address
  if (addressType) {
    const address = cloneDeep(addressForm.value)
    addresses.push(address)
  } else {
    Object.assign(addresses[addressIndex], addressForm.value)
  }
  addressVisible.value = false

  console.log(addresses)
}

const updateAddress = (item, index) => {
  addressVisible.value = true
  addressIndex = index
  if (item) {
    console.log(item)
    const addresses = cloneDeep(item)
    addressType = false
    phonesForm.value = addresses
  } else {
    addressType = true
    getCountriesArea(1)
  }
}

const options1 = ref([])
const options2 = ref([])
const options3 = ref([])
const getOptions = (type) => {
  if (type === 1) {
    getCountriesArea(2, addressForm.value.country)
    addressForm.value.province = ""
    addressForm.value.city = ""
  } else {
    getCountriesArea(3, addressForm.value.province)
    addressForm.value.city = ""
  }
}

// 查询接口
const getCountriesArea = async (index, id) => {
  getCountriesAreaApi({
    pid: id || undefined
  }).then(({ data }) => {
    if (index === 1) {
      options1.value = data
    } else if (index === 2) {
      options2.value = data
    } else {
      options3.value = data
    }
  })
}

/**---------------------- */
// 添加電郵
const emails_default = ref(0)

let emailType = false
let emailIndex = 0

const emailVisible = ref(false)
const emailForm = ref("")
const addEmail = () => {
  const emails = ruleForm.item.emails
  if (emailType) {
    // 深拷贝 phonesForm 中的值
    const email = cloneDeep(emailForm.value)
    emails.push({ email: email })
  } else {
    Object.assign(emails[emailIndex], { email: emailForm.value })
  }
  emailVisible.value = false
}

const updateEmail = (item, index) => {
  emailVisible.value = true
  emailIndex = index
  if (item) {
    const email = cloneDeep(item.email)
    emailType = false
    emailForm.value = email
  } else {
    emailType = true
    emailForm.value = ""
  }
}

// 提交
const submitForm = () => {
  console.log(ruleForm)
}
</script>

<template>
  <div>
    <el-form :model="ruleForm" label-width="70px" label-position="left">
      <el-form-item label="聯繫人">
        <el-input v-model="ruleForm.factory_contact" />
      </el-form-item>
      <!-- 電話 -->
      <div>
        <el-form-item label="電話">
          <div class="flex items-center" v-for="(domain, index) in ruleForm.item.phones" :key="domain.id">
            <el-radio-group v-model="phones_default">
              <el-radio :value="index" border>{{ domain.area }} - {{ domain.phone }}</el-radio>
            </el-radio-group>
            <el-button-group class="ml-1 mr-4 pt-2">
              <el-icon class="cursor-pointer" size="22px" color="#409eff" @click="updatePhone(domain, index)"
                ><Edit
              /></el-icon>
              <el-icon class="cursor-pointer" size="22px" color="#f56c6c" @click="removeDomain('phone', index)"
                ><Delete
              /></el-icon>
            </el-button-group>
          </div>
          <div class="mb-2">
            <el-button type="primary" :icon="CirclePlus" plain @click="updatePhone(0, 0)">添加</el-button>
          </div>
        </el-form-item>
      </div>
      <!-- 地址 -->
      <div class="">
        <el-form-item label="地址">
          <div class="flex items-center w-[100%]" v-for="(domain, index) in ruleForm.item.address" :key="domain.city">
            <el-radio-group v-model="address_default">
              <el-radio :value="index" border>{{ domain.address }}</el-radio>
            </el-radio-group>
            <el-button-group class="ml-1 mr-4 pt-2">
              <el-icon class="cursor-pointer" size="22px" color="#409eff" @click="updateAddress(domain, index)"
                ><Edit
              /></el-icon>
              <el-icon class="cursor-pointer" size="22px" color="#f56c6c" @click="removeDomain('address', index)"
                ><Delete
              /></el-icon>
            </el-button-group>
          </div>
          <div class="mb-2">
            <el-button type="primary" :icon="CirclePlus" plain @click="updateAddress(0, 0)">添加</el-button>
          </div>
        </el-form-item>
      </div>
      <!-- 郵箱 -->
      <div class="">
        <el-form-item label="郵箱">
          <div class="flex items-center" v-for="(domain, index) in ruleForm.item.emails" :key="domain.email">
            <el-radio-group v-model="emails_default">
              <el-radio :value="index" border>{{ domain.email }}</el-radio>
            </el-radio-group>
            <el-button-group class="ml-1 mr-4 pt-2">
              <el-icon class="cursor-pointer" size="22px" color="#409eff" @click="updateEmail(domain, index)"
                ><Edit
              /></el-icon>
              <el-icon class="cursor-pointer" size="22px" color="#f56c6c" @click="removeDomain('email', index)"
                ><Delete
              /></el-icon>
            </el-button-group>
          </div>
          <div class="mb-2">
            <el-button type="primary" :icon="CirclePlus" plain @click="updateEmail(0, 0)">添加</el-button>
          </div>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>

    <!-- phone -->
    <el-dialog v-model="phoneVisible" align-center title="電話" append-to-body width="500px">
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
        <el-form-item label="地區選擇">
          <el-col :span="8">
            <el-select v-model="addressForm.country" @change="getOptions(1)">
              <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
          <el-col :span="8" v-show="options2.length !== 0">
            <el-select v-model="addressForm.province" @change="getOptions(2)">
              <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
          <el-col :span="8" v-show="options3.length !== 0">
            <el-select v-model="addressForm.city">
              <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="詳細地址">
          <el-input v-model="addressForm.address" type="textarea" />
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="addressVisible = false">關閉</el-button>
        <el-button type="primary" @click="addaddress"> 確定 </el-button>
      </template>
    </el-dialog>

    <!-- email -->
    <el-dialog v-model="emailVisible" align-center title="電郵" append-to-body width="500px">
      <div>
        <el-form-item label="電郵">
          <el-input v-model="emailForm" />
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="emailVisible = false">關閉</el-button>
        <el-button type="primary" @click="addEmail"> 確定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
