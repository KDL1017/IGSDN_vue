<template>
    <el-card class="box-card" style="width: 800px;margin: 0 auto">
        <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="选择文件">
                <div style="float: left">
                    <el-upload
                            class="upload-demo"
                            action="1"
                            :http-request="getFile"
                            :show-file-list="false"
                            drag
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            可将文件拖到此处
                            <div style="color: #909399; font-size: 12px">说明：文件大小限制为200MB</div>
                        </div>
                    </el-upload>
                </div>

            </el-form-item>


            <el-form-item label="文件名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="文件格式">
                <el-input v-model="form.format" :disabled="true"></el-input>
            </el-form-item>

            <!-- <el-form-item label="活动性质">
                 <el-checkbox-group v-model="form.type">
                     <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                     <el-checkbox label="地推活动" name="type"></el-checkbox>
                     <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                     <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                 </el-checkbox-group>
             </el-form-item>-->
            <el-form-item label="所属分类">
                <el-cascader
                        @change="handleChange"
                        :options="options"
                        :props="optionProps"
                        :show-all-levels="false"
                ></el-cascader>
            </el-form-item>


            <el-form-item label="文件权限">
                <el-radio-group v-model="isPublic">
                    <el-radio label="公有" checked></el-radio>
                    <el-radio label="私有"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="添加标签">
                <el-input v-model="tagsContent" @keyup.enter.native="intoTags" placeholder="不能超过10个字符"></el-input>
                <el-tag
                        style="margin: 10px 10px 0 0"
                        v-for="(tag,index) in tags"
                        :key="index" v-if="tag.name!==null"
                        closable
                        @close="handleCloseTag(index)"
                        :type="tag.type">
                    {{tag.name}}
                </el-tag>
            </el-form-item>

            <el-form-item label="文件封面">
                <el-upload
                        class="avatar-uploader"
                        action="1"
                        :http-request="httpRequest"
                        :show-file-list="false"
                        :on-remove="handleRemoveImg">
                    <img v-if="imageUrl" :src="imageUrl" height="180px" width="360px" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="文件描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="isSubmitting" :plain="true">
                    {{isSubmitting?"提交中...":"提交"}}
                </el-button>
                <el-button type="danger" @click="goBack">返回</el-button>
            </el-form-item>

        </el-form>
        <!--上传图片-->


    </el-card>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                isSubmitting: false,
                flag: '',
                tagesFlag: 0,
                tagsContent: '',
                isPublic: "公有",
                fileReader2: '',
                fileList2: [],
                fileList: [],
                limitSize: 2209715200,
                isExceedLimitSize: false,
                form: {
                    name: '',
                    format: '',
                    file: '',
                    photoBase64: '',
                    isPublic: '',
                    desc: '',
                    tags: [],
                    order: '',
                    formatId: '',
                    size: '',
                },
                tags: [{name: null, type: ''}],
                imageUrl: '',
                fileReader: '',
                options: [],
                optionProps: {
                    value: 'index',
                    label: 'title',
                    children: 'subs'
                }
            };
        },
        computed: {},
        mounted() {
            if (!window.FileReader) {
                console.error('Your browser does not support FileReader API!')
            }
            this.fileReader = new FileReader()
            const preList = null
            axios.post("/IGSDN/getAllCategoryTree", {preList}).then((res) => {
                this.options = res.data[0]
            }).catch(error => {

            })
        },
        methods: {
            open1(value) {
                this.$message.error(value);
            },
            // 标签
            handleCloseTag(index) {
                //console.log(index)
                this.tags.splice(index, 1)
                this.tagesFlag--

            },
            intoTags() {
                if (this.tagsContent.trim().length > 10) {
                    this.open1('输入内容太长')
                    this.tagsContent = ''
                    return
                }
                if (this.tags.length > 3) {

                    this.open1('只能添加三个标签')
                    this.tagsContent = ''
                    return
                }
                let type = [{type: 'success'}, {type: 'info'}, {type: 'danger'}]
                let tags = {name: '', type: ''}
                tags.name = this.tagsContent.trim()
                tags.type = type[this.tagesFlag].type
                this.tags.push(tags)
                this.tagesFlag++
                this.tagsContent = ''
            },

            //级联选框
            handleChange(value) {
                // console.log(value);
                this.form.order = value[value.length - 1]
            },
            //文件
            getFile(options) {
                this.isExceedLimitSize = false
                let file = options.file
                console.log(file)
                let filename = file.name
                this.fileList.splice(this.fileList.length)
                this.fileList.push(file.key)
                this.form.size = file.size
                let suffix = filename.slice(filename.lastIndexOf('.'), filename.length)

                if (file.size > this.limitSize) {
                    this.isExceedLimitSize = true
                    this.form.name = "文件大小不可大于200MB"
                } else {
                    this.form.name = filename.slice(0, filename.lastIndexOf('.'))
                }
                axios.post("/IGSDN/getDocumentFormatName", {suffix}).then((res) => {
                    if (res.data[1] === '' || res.data[1] === null) {
                        this.form.format = "当前处理不了这类文件"
                        this.flag = false

                    } else {
                        this.flag = true
                        this.form.format = res.data[1]
                        this.form.formatId = res.data[0]
                    }
                }).catch(error => {
                })

                if (file) {
                    this.fileReader.readAsDataURL(file)
                }
                this.fileReader.onload = () => {
                    let base64Str = this.fileReader.result

                    this.form.file = base64Str
                }

            },
            //提交
            onSubmit() {
                if (!this.form.file) {
                    this.open1("请选择文件")
                    return
                }
                if (!this.flag) {
                    this.open1("当前处理不了这类文件")
                    return
                }
                if (!this.form.name) {
                    this.open1("文件名称不可为空")
                    return
                }
                if (!this.form.order) {
                    this.open1("请选择该文件所属类型")
                    return
                }
                if (this.isExceedLimitSize) {
                    this.open1("该文件大小超过限制")
                    return
                }
                if (!this.form.desc) {
                    this.open1("文件描述不可为空")
                    return
                }
                let isPublic
                if (this.isPublic === '公有') {
                    isPublic = true
                } else {
                    isPublic = false
                }

                let key1 = ''
                let key2 = ''
                let key3 = ''
                if (this.tags[1]) {
                    key1 = this.tags[1].name
                }
                if (this.tags[2]) {
                    key2 = this.tags[2].name
                }
                if (this.tags[3]) {
                    key3 = this.tags[3].name
                }

                let document = {}
                document.id = ''
                document.name = this.form.name
                document.isPublic = isPublic
                document.uploader = JSON.parse(localStorage.getItem('user_msg')).id
                document.format = this.form.formatId
                document.size = this.form.size
                document.src = this.form.file
                document.iconSrc = this.form.photoBase64
                document.category = this.form.order
                document.intro = this.form.desc
                document.key1 = key1
                document.key2 = key2
                document.key3 = key3
                this.isSubmitting = true
                axios.post(
                    "/IGSDN/uploadFile", {'document': JSON.stringify(document)}
                ).then((res) => {
                    if (res.data) {
                        this.isSubmitting = false
                        this.$message({
                            message: '上传成功！',
                            type: 'success'
                        });
                        window.location.reload()
                    }
                }).catch(e => {
                    this.isSubmitting = false
                    this.$message({
                        message: '上传失败！',
                        type: 'error'
                    });
                })
            },

            //图片
            httpRequest(options) {
                let file = options.file
                console.log(file)
                if (!this.beforeAvatarUpload(file)) {
                    this.$message.error('封面格式必须为图片！')
                    return
                }
                if (file) {
                    this.fileReader.readAsDataURL(file)
                }
                this.fileReader.onload = () => {
                    let base64Str = this.fileReader.result
                    this.imageUrl = base64Str
                    this.form.photoBase64 = base64Str
                }

            },
            beforeAvatarUpload(file) {
                const isImage = file.type.split("/")[0] === 'image'
                return isImage;
            },
            handleRemoveImg(file, fileList2) {
                this.imageUrl = ''
            },
            goBack() {
                this.$router.go(-1);
            },
        }

    }
</script>

<style scoped>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>