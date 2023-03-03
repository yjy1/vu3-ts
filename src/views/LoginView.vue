<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <h2 class="title">后台管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button class="login-btn" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs ,ref} from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import {login} from '.././request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {

        const data = reactive( new LoginData())
        const rules = {
            username: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 15, message: '账号长度3-15个字符', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 15, message: '密码长度3-15个字符', trigger: 'blur' },
            ],
        }

        const ruleFormRef = ref<FormInstance>()

        // 重置
        const resetForm = ()=>{
            data.ruleForm.username = '' 
            data.ruleForm.password = '' 
        } 

        const router = useRouter() //相当于 $router
        const submitForm =   (formEl: FormInstance | undefined) => {
            console.log('aaaaaaaaaaaaaaa')
            if (!formEl) return
            login(data.ruleForm)
            // console.log(res);
            .then(res => {
                console.log('1111111111')
                console.log(res.data.token)
                localStorage.setItem('token', res.data.token)
                router.push('/')
                return res
            })
            //   formEl.validate(async (valid, fields) => {
            // console.log('bbbbbbb',valid)

            //     if (valid) {
            //         console.log('submit!')
            //         let res =  await login(data.ruleForm) .then(res=>{
            //             console.log('1111111111')
            //             console.log(res.data.token)
            //             localStorage.setItem('token',res.data.token)
            //             router.push('/')
            //             return res
            //         }).catch(err=>{

            //         })  
            //         console.log(res)
            //     } else {
            //         console.log('error submit!', fields)
            //     }
            // })
        }
        return { 
            ...toRefs(data),
            rules ,
            resetForm,
            submitForm,
            ruleFormRef
        }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    padding: 1px;
    background: url('../assets/login.jpg') no-repeat;

    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 15px;

        .login-btn {
            width: 48%;
        }

        .title {
            text-align: center;
            margin-bottom: 30px;
        }
    }
}</style>