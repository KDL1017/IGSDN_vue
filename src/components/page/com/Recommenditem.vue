<template>
    <a class="file-item-recommend">
                <div class="file-img-recommend" >
                <img :src="recommend.image" style="height: 80px;width: 60px">
                </div>
                <div class="file-title-recommend">{{ recommend.title }}</div>
                <div class="file-introduction-recommend">
                    作者：{{ recommend.author }}|
                    文件大小：{{recommend.size}}|
                    上传时间：{{recommend.uploadDate}}|
                    上次修改时间：{{recommend.lastUpdateDate}}
                </div>

    </a>
</template>
<script>
    import $ from '../libs/util';
    export default {
        props: ['recommend','index'],

        data () {
            return {

            }
        },
        mounted() {

        }

    }
</script>

