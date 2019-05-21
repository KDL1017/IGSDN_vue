<template>
    <div style="margin:50px 50px">
        <el-card class="box-card">
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple style="text-align:center">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传文件，且不超过500kb</div>
            </el-upload>
            <div style="margin: 20px 0;"></div>
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 10}"
                    placeholder="请输入你对该文件的描述"
                    v-model="textarea"
                    maxlength="100"
                    show-word-limit
            >
            </el-input>
            <el-divider></el-divider>
            <div>
                <el-tooltip class="item" effect="dark" content="所上传公共可见" placement="bottom">
                    <el-radio v-model="radio1" label="1" border>公共</el-radio>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="所上传仅自己可见" placement="bottom">
                    <el-radio v-model="radio1" label="2" border>私有</el-radio>
                </el-tooltip>

            </div>
            <div style="margin: 20px 0;"></div>
            <div class="block">
                <el-cascader
                        placeholder="类型"
                        :options="options"
                        filterable
                        change-on-select
                ></el-cascader>
            </div>
            <div style="margin: 20px 0;"></div>
            <div>
                <el-row>

                    <el-button type="primary" plain>提交文档</el-button>
                    <el-button type="primary" plain v-on:click="userUploadmemory">返回上级</el-button>

                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "UserUpLoad",
        data() {
            return {
                radio1: '',
                text: '',
                textarea: '',
                /*多选*/
                options: [{
                    value: 'zhishifenlei',
                    label: '知识分类',
                    children: [{
                        value: 'jisuanjijichu',
                        label: '计算机基础',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }],
                    }, {
                        value: 'bianchengyuyan',
                        label: '编程语言',
                        children: [{
                            value: 'C',
                            label: 'C'
                        }, {
                            value: 'Java',
                            label: 'Java'
                        }, {
                            value: 'C#',
                            label: 'C#'
                        }, {
                            value: 'Kotlin',
                            label: 'Kotlin'
                        }, {
                            value: 'Python',
                            label: 'Python'
                        }, {
                            value: 'JavaScript',
                            label: 'JavaScript'
                        }],
                    }],

                }, {
                    value: 'gerenzhishi',
                    label: '个人知识',
                    children: [{
                        value: 'jisuanjijichu',
                        label: '计算机基础',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }],
                    }, {
                        value: 'bianchengyuyan',
                        label: '编程语言',
                        children: [{
                            value: 'C',
                            label: 'C'
                        }, {
                            value: 'Java',
                            label: 'Java'
                        }, {
                            value: 'C#',
                            label: 'C#'
                        }, {
                            value: 'Kotlin',
                            label: 'Kotlin'
                        }, {
                            value: 'Python',
                            label: 'Python'
                        }, {
                            value: 'JavaScript',
                            label: 'JavaScript'
                        }],
                    }],

                }]
            }
        },


        methods: {
            userUploadmemory() {
                this.$router.push('memory');
            },

        }
    }

</script>

<style scoped>

</style>