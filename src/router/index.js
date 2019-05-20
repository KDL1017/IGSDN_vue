import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/genUserLogin',
            component: resolve => require(['../components/gen/Login.vue'], resolve)
        },
        {
            path: '/',
            redirect: 'genUser'
        },
        {
            path: '/genUser',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/',
                    redirect: 'recommendation'
                },
                {
                    path: 'recommendation',
                    component: resolve => require(['../components/page/Recommendation.vue'], resolve),
                    meta: {title: '个性推荐'}
                },
                {
                    path: 'knowledge-:category',
                    component: resolve => require(['../components/page/Knowledge.vue'], resolve),
                    meta: {title: '知识分类'},
                },
                {
                    path: 'knowledgeDetails',
                    component: resolve => require(['../components/page/com/KnowledgeDetails.vue'], resolve),
                    meta: {title: '文档详情'},
                },
                {
                    path: 'upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: {title: '文件上传'}
                },
                {
                    path: '*',
                    redirect: '404'
                },
                {
                    path: '404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {title: '404'}
                },
            ]
        },

        {
            path: '*',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: {title: '404'}
        }
    ]
})
