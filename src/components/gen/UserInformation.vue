<template>
    <div style="margin:50px 50px">
        <el-tabs type="border-card">
            <el-tab-pane label="未处理">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="日期"
                            width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                            prop="information"
                            label="信息内容"
                    >
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            prop="status">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                            >回复
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div style="margin-top: 20px">
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button type="primary">标为已读</el-button>
                    <el-button type="danger" style="float:right" v-on:click="deletes">删除信息</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="系统通知">
                <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="日期"
                        prop="date">
                </el-table-column>
                <el-table-column
                        label="信息内容"
                        prop="information">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status">
                </el-table-column>
                <el-table-column
                        align="right">
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="其他用户"> <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                                 style="width: 100%">
                <el-table-column
                        label="日期"
                        prop="date">
                </el-table-column>
                <el-table-column
                        label="信息内容"
                        prop="information">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status">
                </el-table-column>
                <el-table-column
                        align="right">
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="已处理"> <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                                style="width: 100%">
                <el-table-column
                        label="日期"
                        prop="date">
                </el-table-column>
                <el-table-column
                        label="信息内容"
                        prop="information">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status">
                </el-table-column>
                <el-table-column
                        align="right">
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="已删除"> <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                                style="width: 100%">
                <el-table-column
                        label="日期"
                        prop="date">
                </el-table-column>
                <el-table-column
                        label="信息内容"
                        prop="information">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status">
                </el-table-column>
                <el-table-column
                        align="right">
                </el-table-column>
            </el-table>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "UserInformation",
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    information: '王小虎',
                    status:'未读'
                },
                    {
                        date: '2016-05-02',
                        information: '王小虎',
                        status:'未读'
                    }],
                multipleSelection: []

            }
        },
        methods: {
            deletes() {
                this.$confirm('此操作将删除选中文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }


    }
</script>

<style scoped>

</style>