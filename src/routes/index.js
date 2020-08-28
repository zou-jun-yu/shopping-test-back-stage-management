import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Admin from '../pages/Admin'
import GoodsManage from '../pages/adminDir/GoodsManage'
import Order from '../pages/adminDir/Order'
import Category from '../pages/adminDir/Category'
import GoodsDetail from '../pages/adminDir/GoodsDetail'
import GoodsList from '../pages/adminDir/GoodsList'
import UserManage from '../pages/adminDir/UserManage'

export const mainRoutes=[
    {
        path:'/login',   
        component:Login
    },
    {
        path:'/404',
        component:NotFound
    },
    {
        path:'/admin',
        component:Admin
    }
]

export const adminRoutes=[
    {
        path:'/admin/goodsManage',   
        component:GoodsManage
    },
    {
        path:'/admin/order',
        component:Order
    },
    {
        path:'/admin/userManage',
        component:UserManage
    }
]

export const goodsManageRoutes=[
    {
        path:'/admin/goodsManage/category',   
        component:Category
    },
    {
        path:'/admin/goodsManage/goodsDetail/:id',
        component:GoodsDetail
    },
    {
        path:'/admin/goodsManage/goodsList',   
        component:GoodsList
    }
]