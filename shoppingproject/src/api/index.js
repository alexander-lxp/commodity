//当前这个模块：API进行统一管理
import requests from './http'
//引入mockHttp.js的API
import mockRequests from './mockHttp'

//三级联动接口
//  /api/product/getBaseCategoryList   get   无参数
export const reqCategoryList = () => {
    //发请求:axios发请求返回结构Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取banner数据(Home首页轮播图接口)
export const reqGetBannerList = () => {
    return mockRequests.get('/banner');
}

//获取floor数(Home首页家用电器和手机接口数据)
export const reqGetFloorList = () => {
    return mockRequests.get('/floor');
}

//获取Search搜索模块的数据---请求地址：/api/list---请求方式:post---需要带参数
//当前这个函数需不需要接受外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数[至少是一个空对象]
export const reqGetSearchInfo = (params) =>
    requests({
        url: "/list",
        method: "post",
        data: params
    })

//详情模块(动态数据)
//获取产品详细信息的接口---请求地址：/api/item/{skuId}---请求的方式：get---需要带参数
export const reqGetGoodsInfo = (skuId) =>
    requests({
        url: `/item/${skuId}`,
        method: "get"
    })

//获取加入购物车模块数据(获取更新某一个产品的个数)---请求地址：/api/cart/addToCart/{ skuId }/{ skuNum }---请求方式：post---需要带参数
export const reqGetAddOrUpdateShopCart = (skuId, skuNum) =>
    requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "post"
    })

//获取购物车列表数据接口---请求地址：/api/cart/cartList---请求方式：get---不需要带参数
export const reqGetCartList = () =>
    requests({
        url: "/cart/cartList",
        method: "get"
    })
//删除购物车的产品的接口---请求地址：/api/cart/deleteCart/{skuId}---请求方式：delete---需要带参数
export const reqGetDeleteCartById = (skuId) =>
    requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "delete"
    })
//修改商品选中的状态的接口---请求地址：/api/cart/checkCart/{skuID}/{isChecked}---请求方式：get---需要带参数
export const reqGetUpdateCheckedById = (skuId, isChecked) =>
    requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "get"
    })
//获取验证码接口---请求地址：/api/user/passport/sendCode/phone---请求方式：get---需要带参数
export const reqGetSendCode = (phone) =>
    requests({
        url: `/user/passport/sendCode/${phone}`,
        method: "get"
    })
//获取用户注册接口---请求地址：/api/user/passport/register---请求方式：post---需要带参数
export const reqGetRegister = (data) =>
    requests({
        url: "/user/passport/register",
        data,
        method: "post"
    })
//获取用户登录接口---请求地址：/api/user/passport/login---请求方式：post---需要带参数
export const reqGetLogin = (data) =>
    requests({
        url: `/user/passport/login`,
        data,
        method: "post"
    })
//获取用户登录信息[需要带着用户的token向服务器要用户信息]---请求地址：/api/user/passport/auth/getUserInfo---请求方式：get---不需要带参数
export const reqGetUserInfo = () =>
    requests({
        url: "/user/passport/auth/getUserInfo",
        method: "get"
    })
//获取用户退出登录信息---请求地址：/api/user/passport/logout---请求方式：get---不需要带参数
export const reqGetLoginOut = () =>
    requests({
        url: "/user/passport/logout",
        method: "get"
    })
//获取用户地址信息---请求地址：/api/user/userAddress/auth/findUserAddressList---请求方式：get---不需要带参数
export const reqGetAddressInfo = () =>
    requests({
        url: "/user/userAddress/auth/findUserAddressList",
        method: "get"
    })
//获取商品清单信息---请求地址：/api/order/auth/trade---请求方式：get---不需要带参数
export const reqGetOrderInfo = () =>
    requests({
        url: "/order/auth/trade",
        method: "get"
    })
//获取提交订单信息的接口---请求地址：/api/order/auth/submitOrder?tradeNo={tradeNo}---请求方式：post---需要带参数
export const reqGetSubmitOrder = (tradeNo, data) =>
    requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: "post"
    })
//获取订单支付信息---请求地址：/api/payment/weixin/createNative/{orderId}---请求方式：get---需要带参数
export const reqGetPayInfo = (orderId) =>
    requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: "get"
    })
//获取支付状态的接口---请求地址：/api/payment/weixin/queryPayStatus/{orderId}---请求方式：get---需要带参数
export const reqGetPayStatus = (orderId) =>
    requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: "get"
    })
//获取个人中心数据的接口---请求地址：/api/order/auth/{page}/{limit}---请求方式：get---需要带参数
export const reqGetMyOrderList = (page, limit) =>
    requests({
        url: `/order/auth/${page}/${limit}`,
        method: "get"
    })
