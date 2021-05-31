import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import("./components/blogs.vue")
        },
        {
            path: '/posts',
            component: () => import("./components/posts.vue")
        },
        {
            path: '/post',
            component: () => import("./components/post.vue")
        },
        {
            path: '/log',
            component: () => import("./components/login.vue")
        },
        {
            path: '/reg',
            component: () => import("./components/register.vue")
        },
        {
            path: '/add-p',
            component: () => import("./components/createPost.vue")
        },
        {
            path: '/add-b',
            component: () => import("./components/createBlog.vue")
        }
    ]
})