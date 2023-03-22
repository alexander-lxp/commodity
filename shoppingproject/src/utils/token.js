//对外暴露一个函数
//登录组件---用户信息持久化存储token
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}

//登录组件---用户获取token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}

//登录组件---退出登录---清除本地数据
export const removeToken = () => {
    return localStorage.removeItem("TOKEN");
}