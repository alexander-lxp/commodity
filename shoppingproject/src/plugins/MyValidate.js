//vee-validate插件：表单验证
import Vue from 'vue';
import VeeValidate from 'vee-validate';
//引入中文的提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN';

//注册插件
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        //修改内置规则的messages，让确认密码和密码相同
        is: (field) => `${field}必须与密码相同`
    },
    attributes: {
        phone: "手机号码",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree: "协议"
    }
});

//自定义校验规则
VeeValidate.Validator.extend("agree", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
})