import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/documentOnlinePreview',
            name: "documentOnlinePreview",
            component: resolve => require(['../components/common/DocumentOnlinePreview.vue'], resolve),
            meta: {
                title: 'IGSDN - 在线预览'
            }
        },
        {
            path: '/genUserLogin',
            component: resolve => require(['../components/gen/Login.vue'], resolve),
            meta: {
                title: 'IGSDN - 用户登陆'
            }
        },
        {
            path: '/',
            redirect: 'genUser'
        },
        {
            path: '/genUser',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/',
                    redirect: 'recommendation',
                },
                {
                    path: 'changePassword',
                    component: resolve => require(['../components/gen/ChangePassword.vue'], resolve),
                    meta: {
                        title: 'IGSDN - 修改密码'
                    }
                },
                {
                    path: 'userCenter',
                    component: resolve => require(['../components/gen/UserCenter.vue'], resolve),
                    meta: {title: 'IGSDN - 用户中心'}
                },
                {
                    path: 'changePerson',
                    component: resolve => require(['../components/common/ChangePerson.vue'], resolve),
                    meta: {title: 'IGSDN - 修改个人信息'}
                },
                {
                    path: 'recommendation',
                    component: resolve => require(['../components/page/Recommendation.vue'], resolve),
                    meta: {title: 'IGSDN - 首页'}
                },
                {
                    path: 'knowledge-:category',
                    component: resolve => require(['../components/page/Knowledge.vue'], resolve),
                    meta: {title: 'IGSDN - 知识分类'}
                },
                {
                    path: 'userUpload',
                    component: resolve => require(['../components/gen/UserUpLoad.vue'], resolve),

                },
                {
                    path: 'memory',
                    component: resolve => require(['../components/gen/Memory.vue'], resolve),

                },
                {
                    path: 'userinformation',
                    component: resolve => require(['../components/gen/UserInformation.vue'], resolve),

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
