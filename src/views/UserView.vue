<template>
    <div>
        
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item label="用户名称">
                <el-input v-model="searchData.query" placeholder="用户名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="username" label="用户名称" width="180" />
            <el-table-column prop="mobile" label="手机号" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="create_time" label="创建时间" />
            <el-table-column prop="mg_state" label="状态">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.mg_state">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="role_name" label="角色名称" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="editForm.isShow" title="编辑用户">
            <el-form :model="editForm">
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="editForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.mobile" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="editForm.email" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editForm.isShow = false">取消</el-button>
                    <el-button type="primary" @click="handleSave">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, toRef ,ref} from 'vue'
import { getUserList,getUserById,updateUser,deleteUser } from '@/request/api'
import { userData ,editInt} from '../type/user'
import { ElMessage } from 'element-plus'

export default defineComponent({
    setup() {
        const data = reactive(new userData())
        const formLabelWidth = 180

        const getUserData = () => {
            getUserList(data.searchData).then(res => {
                console.log(res)
                data.list = res.data.users
            })
        }
        getUserData()
        const showEditDialog = (row:editInt) => {
            data.editForm.isShow = true
             
            getUserById(row.id).then(res=>{
                console.log(res.data)
                data.editForm = res.data
                data.editForm.isShow = true
                // console.log(data.editForm)
                // if(res.data.meta.status!==200) console.log(res.data.meta.msg)
            })
        }
        const handleDelete = (row: editInt) => {
             deleteUser(row.id).then(res=>{
                data.editForm.isShow =false
                getUserData()
             })
        }
        const handleSave = ()=>{
            updateUser(data.editForm.id, {
                username: data.editForm.username,
                mobile: data.editForm.mobile,
                email: data.editForm.email,
            }).then(res=>{
                console.log(res)
                data.editForm.isShow = false
                getUserData()
            })
            data.editForm
        }
        const onSubmit = () => {
            getUserData()
        }
        return {
            ...toRefs(data),
            showEditDialog,
            handleDelete,
            onSubmit,
            formLabelWidth,
            handleSave,
        }
    }
})
</script>

<style scoped></style>