import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/users",
    component: Layouts,
    redirect: "/users/userlist",
    children: [
      {
        path: "userlist",
        component: () => import("@/views/users/UserList.vue"),
        name: "UserList",
        meta: {
          title: "用戶管理",
          svgIcon: "user",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/client",
    component: Layouts,
    redirect: "/client/clientlist",
    name: "Client",
    meta: {
      title: "客戶管理"
    },
    children: [
      {
        path: "clientlist",
        component: () => import("@/views/client/ClientList.vue"),
        name: "ClientList",
        meta: {
          title: "客戶管理",
          svgIcon: "client",
          keepAlive: true
        }
      },
      {
        path: "clientitem",
        component: () => import("@/views/client/ClientItem.vue"),
        name: "ClientItem",
        meta: {
          title: "客戶詳情",
          hidden: true
        }
      },
      {
        path: "clientadd",
        component: () => import("@/views/client/ClientAdd.vue"),
        name: "ClientAdd",
        meta: {
          title: "添加客戶",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/foreman",
    component: Layouts,
    redirect: "/foreman/foremanlist",
    name: "Foreman",
    meta: {
      title: "工廠管理"
    },
    children: [
      {
        path: "foremanlist",
        component: () => import("@/views/foreman/ForemanList.vue"),
        name: "ForemanList",
        meta: {
          title: "工廠管理",
          svgIcon: "dashboard",
          keepAlive: true
        }
      },
      {
        path: "foremanitem",
        component: () => import("@/views/foreman/ForemanItem.vue"),
        name: "ForemanItem",
        meta: {
          title: "工廠詳情",
          hidden: true
        }
      },
      {
        path: "foremanadd",
        component: () => import("@/views/foreman/ForemanAdd.vue"),
        name: "ForemanAdd",
        meta: {
          title: "添加工廠",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/configuration",
    component: Layouts,
    redirect: "/configuration/foremancode",
    name: "Configuration",
    meta: {
      title: "配置項",
      svgIcon: "dashboard"
    },
    children: [
      {
        path: "foremancode",
        component: () => import("@/views/configuration/ForemanCode.vue"),
        name: "ForemanCode",
        meta: {
          title: "工廠代碼"
        }
      },
      {
        path: "brand",
        component: () => import("@/views/configuration/Brand.vue"),
        name: "Brand",
        meta: {
          title: "品牌"
        }
      },
      {
        path: "shipping",
        component: () => import("@/views/configuration/Shipping.vue"),
        name: "Shipping",
        meta: {
          title: "發貨方式"
        }
      }
    ]
  },
  {
    path: "/product",
    component: Layouts,
    redirect: "/product/productlist",
    name: "Product",
    meta: {
      title: "產品管理"
    },
    children: [
      {
        path: "productlist",
        component: () => import("@/views/product/ProductList.vue"),
        name: "ProductList",
        meta: {
          title: "產品管理",
          svgIcon: "dashboard",
          keepAlive: true
        }
      },
      {
        path: "productitem",
        component: () => import("@/views/product/ProductItem.vue"),
        name: "ProductItem",
        meta: {
          title: "產品詳情",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/order",
    component: Layouts,
    redirect: "/order/orderlist",
    name: "Order",
    meta: {
      title: "訂單管理"
    },
    children: [
      {
        path: "orderlist",
        component: () => import("@/views/order/OrderList.vue"),
        name: "OrderList",
        meta: {
          title: "訂單管理",
          svgIcon: "dashboard",
          keepAlive: true
        }
      },
      {
        path: "orderitem",
        component: () => import("@/views/order/OrderItem.vue"),
        name: "OrderItem",
        meta: {
          title: "訂單詳情",
          hidden: true
        }
      },
      {
        path: "orderupload",
        component: () => import("@/views/order/OrderUpload.vue"),
        name: "OrderUpload",
        meta: {
          title: "上傳訂單",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/piorder",
    component: Layouts,
    redirect: "/piorder/piorderlist",
    name: "PIOrder",
    meta: {
      title: "PI管理"
    },
    children: [
      {
        path: "piorderlist",
        component: () => import("@/views/piorder/PIOrderList.vue"),
        name: "PIOrderList",
        meta: {
          title: "PI管理",
          svgIcon: "dashboard",
          keepAlive: true
        }
      },
      {
        path: "piorderitem",
        component: () => import("@/views/piorder/PIOrderItem.vue"),
        name: "PIOrderItem",
        meta: {
          title: "PI詳情",
          hidden: true
        }
      },
      {
        path: "piorderupload",
        component: () => import("@/views/piorder/PIOrderUpload.vue"),
        name: "PIOrderUpload",
        meta: {
          title: "上傳PI",
          hidden: true
        }
      },
      {
        path: "pidelivery",
        component: () => import("@/views/piorder/PIDelivery.vue"),
        name: "PIDelivery",
        meta: {
          title: "PI發貨計劃",
          hidden: true
        }
      },
      {
        path: "filedelivery",
        component: () => import("@/views/piorder/FileDelivery.vue"),
        name: "FileDelivery",
        meta: {
          title: "文件發貨計劃",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/delivery",
    component: Layouts,
    redirect: "/delivery/deliverylist",
    name: "Delivery",
    meta: {
      title: "發貨計劃"
    },
    children: [
      {
        path: "deliverylist",
        component: () => import("@/views/delivery/DeliveryList.vue"),
        name: "DeliveryList",
        meta: {
          title: "發貨計劃",
          svgIcon: "dashboard",
          keepAlive: true
        }
      },
      {
        path: "deliveryitem",
        component: () => import("@/views/delivery/DeliveryItem.vue"),
        name: "DeliveryItem",
        meta: {
          title: "發貨計劃詳情",
          hidden: true
        }
      },
      {
        path: "deliveryupload",
        component: () => import("@/views/delivery/DeliveryUpload.vue"),
        name: "DeliveryUpload",
        meta: {
          title: "上傳發貨計劃",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/invoice",
    component: Layouts,
    redirect: "/invoice/invoicelist",
    name: "Invoice",
    meta: {
      title: "銷售發票"
    },
    children: [
      {
        path: "invoicelist",
        component: () => import("@/views/invoice/InvoiceList.vue"),
        name: "InvoiceList",
        meta: {
          title: "銷售發票",
          svgIcon: "dashboard",
          keepAlive: true
        }
      },
      {
        path: "invoiceitem",
        component: () => import("@/views/invoice/InvoiceItem.vue"),
        name: "InvoiceItem",
        meta: {
          title: "發票詳情",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/payment",
    component: Layouts,
    redirect: "/payment/paymentlist",
    name: "Payment",
    children: [
      {
        path: "paymentlist",
        component: () => import("@/views/payment/PaymentList.vue"),
        name: "PaymentList",
        meta: {
          title: "應收應付",
          svgIcon: "dashboard",
          keepAlive: true
        }
      }
    ]
  }
]

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
