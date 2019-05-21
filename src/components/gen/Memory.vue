<template>
    <div>
        <el-card class="box-card" style="width:50%;margin:50px auto">
            <div slot="header" class="clearfix">
                <div><span>总容量:500G</span></div>
                <div>
                    <el-progress :percentage="80"></el-progress>
                </div>
                <el-button type="primary" v-on:click="userUpload">上传<i class="el-icon-upload el-icon--right"></i>
                </el-button>
            </div>

            <div class="block">
                <span class="demonstration">已上传的文档</span>
                <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="上传成功" name="first">
                            <div>
                                <el-table
                                        :data="tableData"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="date"
                                            label="日期"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="文件名"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="states"
                                            label="状态">
                                    </el-table-column>
                                </el-table></div>
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                            </el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="待审核" name="second">
                            <div>
                                <el-table
                                        :data="tableData"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="date"
                                            label="日期"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="文件名"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="states"
                                            label="状态">
                                    </el-table-column>
                                </el-table></div>
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                            </el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="上传失败" name="third"><div>
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="日期"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="文件名"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="states"
                                        label="状态">
                                </el-table-column>
                            </el-table></div>
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                            </el-pagination></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
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
            },
            userUpload() {
                this.$router.push('userUpload');
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
            },
            data() {
                return {
                    activeName: 'first',
                    tableData: [{
                        date: '2016-05-02',
                        name: '王小虎',
                        states: '查看状态'
                    }],
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

    .clearfix div {
        margin: 10px;
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