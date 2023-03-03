<template>
    <div>
         <el-card>
            <el-table :data="list" border style="width: 100%">
                <el-table-column type="index" label="#" width="80" />
                <el-table-column prop="authName" label="权限说明" width="180" />
                <el-table-column prop="level" label="权限层级" />
                <el-table-column prop="path" label="对应访问路径" />

                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
         </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import{RightsData} from '@/type/rights'
import {getRightsList} from '@/request/api'

export default defineComponent({
    setup () {
        const data = reactive(new RightsData())
         
        const getRights = ()=>{
            getRightsList('list').then(res=>{
                data.list = res.data
            })
        }
        getRights()
        return {
            ...toRefs(data)
        }
    }
})
</script>

<style scoped>

</style>