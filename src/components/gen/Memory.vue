<template>
    <div>
        <el-card class="box-card" style="width:50%;margin:50px auto">
            <div slot="header" class="clearfix">
                <div><span>总容量:500G</span></div>
                <div><el-progress :percentage="80"></el-progress></div>
            </div>

           <!-- <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}-->
                <div class="block">
                    <span class="demonstration">上传文档</span>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                </div>
           <!-- </div>-->
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "Memory",
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4
            };
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>