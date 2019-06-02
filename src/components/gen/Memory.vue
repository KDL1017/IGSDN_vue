<template>
    <div>
        <el-card class="box-card" style="width:700px;margin:50px auto;padding:20px">
            <table style="float: left;width: 50%">
                <tr style="height:150px">
                    <td align="center">总内存：</td>
                    <td align="center">
                        <el-progress type="circle" :stroke-width="10" :percentage="100"></el-progress>
                    </td>
                </tr>
                <tr style="height:150px">
                    <td align="center">已使用内存：</td>
                    <td align="center">
                        <el-progress :stroke-width="10" type="circle"
                                     :percentage="parseFloat(this.data.percentUsedMemory)"></el-progress>
                    </td>
                </tr>
            </table>
            <table style="float: left;width: 50%;margin-top: 40px">
                <tr style="height: 30px">
                    <td align="center">总内存：</td>
                    <td align="center">{{data.totalMemory}}</td>
                </tr>
                <tr style="height: 30px">
                    <td align="center">剩余内存：</td>
                    <td align="center">{{data.remainingMemory}}</td>
                </tr>
                <tr style="height: 30px">
                    <td align="center">总文件数：</td>
                    <td align="center">{{data.documentTotal}}</td>
                </tr>
                <tr style="height: 30px">
                    <td align="center">公有文档数：</td>
                    <td align="center">{{data.publicDocumentTotal}}</td>
                </tr>
                <tr style="height: 30px">
                    <td align="center">私有文档数：</td>
                    <td align="center">{{data.privateDocumentTotal}}</td>
                </tr>
                <tr style="height: 80px">
                    <td align="center" colspan="2">
                        <el-button type="primary" v-on:click="userUpload">
                            上传新文档<i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                    </td>
                </tr>
            </table>

        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Memory",
        mounted() {
            this.userId = JSON.parse(localStorage.getItem("user_msg")).id
            this.getUserMemoryInfo()
        },
        watch: {
            $route() {
                this.getUserMemoryInfo()
            },
        },
        methods: {
            getUserMemoryInfo() {
                axios.get("/IGSDN/genUser/getUserMemoryInfo/" + this.userId).then((res) => {
                    this.data = res.data
                }).catch(() => {
                    this.$message.error('服务器连接失败')
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            userUpload() {
                this.$router.push('upload');
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        data() {
            return {
                activeName: 'first',
                userId: null,
                data: {
                    percentUsedMemory: '',
                    totalMemory: '',
                    remainingMemory: '',
                    documentTotal: 0,
                    publicDocumentTotal: 0,
                    privateDocumentTotal: 0
                },

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