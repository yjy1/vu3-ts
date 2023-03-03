<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="2">
                    <el-button type="primary" @click="showAddDialog">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table :data="list" border style="width: 100%">
                <el-table-column type="index" label="#" width="80" />
                <el-table-column prop="roleName" label="角色名称" width="180" />
                <el-table-column prop="roleDesc" label="角色描述" />

                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>


        <el-dialog v-model="addForm.isShow" title="添加角色">
            <el-form :model="addForm">
                <el-form-item label="角色名称" :label-width="addForm.formLabelWidth">
                    <el-input v-model="addForm.roleName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色描述" :label-width="addForm.formLabelWidth">
                    <el-input v-model="addForm.roleDesc" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addForm.isShow = false">取消</el-button>
                    <el-button type="primary" @click="handleSave4Add">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="editForm.isShow" title="编辑角色">
            <el-form :model="editForm">
                <el-form-item label="角色名称" :label-width="editForm.formLabelWidth">
                    <el-input v-model="editForm.roleName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色描述" :label-width="editForm.formLabelWidth">
                    <el-input v-model="editForm.roleDesc" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editForm.isShow = false">取消</el-button>
                    <el-button type="primary" @click="handleSave4Edit">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getRoleList, getRoleById, updateRole, deleteRole,addRole } from '@/request/api'
import { rolesData, editInt } from '@/type/roles'
import { ElMessage } from 'element-plus'

export default defineComponent({
    setup() {
        const data = reactive(new rolesData())

        const getRoles = () => {
            getRoleList().then(res => {
                console.log(res)
                data.list = res.data
            })
        }
        getRoles()
        const showEditDialog = (row: editInt) => {
            console.log(row)
            data.editForm.isShow = true

            getRoleById(row.id).then(res => {
                data.editForm = res.data
                data.editForm.id = res.data.roleId
                console.log(data.editForm)
                data.editForm.isShow = true
            })
        }
        const handleSave4Edit = () => {
            console.log(data.editForm.id)
            updateRole(data.editForm.id, {
                roleName: data.editForm.roleName,
                roleDesc: data.editForm.roleDesc
            }).then(res => {

                data.editForm.isShow = false
                getRoles()
            })
        }
        const handleDelete = (row: editInt) => {
            deleteRole(row.id).then(res => {
                getRoles()
            })
        }
        const showAddDialog=()=>{
            console.log('sssssssssss')
            ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
            ElMessage.error(' aaaaaaa')
            data.addForm.isShow = true
        }
        const handleSave4Add=()=>{
            
            addRole({
                roleName: data.addForm.roleName,
                roleDesc: data.addForm.roleDesc
            }).then(res => {
                data.addForm.isShow = false
               
                getRoles()
            })
        }
        return {
            ...toRefs(data),
            showEditDialog,
            handleSave4Edit,
            handleDelete,
            showAddDialog,
            handleSave4Add
        }
    }
})
</script>

<style scoped>
.el-row{
    margin-bottom: 10px;
}
</style>