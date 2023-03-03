<template>
    <div class="select-box">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item label="商品名称">
                <el-input v-model="searchData.query" placeholder="商品名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column type="index" label="#" width="60" />
            <el-table-column prop="goods_name" label="商品名称" width="180" />
            <el-table-column prop="goods_price" label="价格" width="180" />
            <el-table-column prop="goods_number" label="数量" />
            <el-table-column prop="goods_weight" label="重量" />
            <el-table-column prop="goods_state" label="商品状态" />
            <el-table-column prop="add_time" label="添加时间" />
            <el-table-column prop="upd_time" label="更新时间" />
            <el-table-column prop="hot_mumber" label="热销品数量" />
            <el-table-column prop="is_promote" label="是否是热销品" />
        </el-table>

        <el-pagination v-model:current-page="searchData.pagenum" v-model:page-size="searchData.pagesize" :page-sizes="[10, 20, 30, 40]"
             layout="total, sizes, prev, pager, next, jumper"
            :total="searchData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getGoodsList } from '@/request/api';
import goodsDataClass from '../type/goods'

export default defineComponent({
    setup() {
        const data = reactive(new goodsDataClass())
        
        const getList = () => {
            getGoodsList(data.searchData).then(res => {
                console.log(res)
                data.list = res.data.goods
                data.searchData.total = res.data.total
                console.log(res.data.goods)
            })
        }
        getList()
        const onSubmit = () => {
            getList()
        }
        const handleSizeChange = (val:number)=>{
            console.log('val')
            console.log(data.searchData.pagesize)
            getList()
        }
        const handleCurrentChange = ()=>{
            getList()
        }
        return {
            ...toRefs(data),
            onSubmit,
            handleSizeChange,
            handleCurrentChange
        }
    }
})
</script>

<style lang="scss" scoped>
.select-box {
    padding: 0;
}
</style>