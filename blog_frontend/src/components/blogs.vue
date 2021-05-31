<template>
    <div>
        <header>
            <h1 style="width: 100vw; text-align: center">Blogs</h1>
            <div style="width: 100vw; text-align: center; margin-top: -1%; margin-bottom: -3%"
                 v-if="$store.getters.profileId !== ''">
                <button class="createBtn" v-on:click="createBlog()">Create one more blog!</button>
            </div>
        </header>

        <!--            "_id": "60b0819d759ad23fa8235311",-->
        <!--            "name": "Test Blog",-->
        <!--            "userId": "60b027b17633be2ec842771f",-->
        <!--            "description": "Description of test blog",-->
        <!--            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a9/John_Thompson_%28headshot%29.jpg?uselang=ru",-->
        <!--            "date": "June 20, 2017",-->

        <article id="scroll">
            <transition-group class="comments" name="fade-up" tag="ul">
                <li v-bind:id="index" v-bind:key="blog" v-for="(blog, index) in blogs">
                    <div class="comment-author-meta">
                        <div class="avatar">
                            <img style="border-radius: 50%; height: 120%; width: 120%; margin-left: -10%; margin-top: -10%"
                                 v-bind:alt="blog.user" v-bind:src="blog.imageUrl"/>
                        </div>
                        <!--                            <p>{{blogs}}</p>-->
                        <div>
                            <div class="user" style="width: 40%; float:left">{{blog.name}}</div>
                            <div class="user"
                                 style="width: 40%; float:right; align-content: center; text-align: center">
                                <button class="deleteBtn" style="width: 50%; float:left; "
                                        v-if="$store.getters.profileId === blog.userId"
                                        v-on:click="deleteBlog(blog._id); blogs.splice(index, 1)">Delete
                                </button>
                                <button class="openBtn" style="width: 45%; float:right"
                                        v-on:click="openPosts(blog._id)">Open
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="comment-text">
                        <p style="white-space: pre-line" v-html="blog.description"></p>
                    </div>
                    <div class="comment-meta">
                        <span class="comment-date">Created at: {{blog.date}}</span>
                    </div>
                </li>

            </transition-group>
        </article>
        <div v-if="blogs.length === 0">
            <h1 style="align-content: center; text-align: center; margin-top: 1%">
            <span>All blogs are decided to disappear. But, if you have an account, you can create a first one!</span></h1>
        </div>
    </div>
</template>

<script>
    import router from "@/router";
    import axios from "axios"

    export default {
        // localStorage: window.sessionStorage,
        name: "blogs",
        data() {
            return {
                blogs: null,
            }
        },
        methods: {
            openPosts: function (blogId) {
                this.$store.commit('changeBlogId', blogId);
                router.push("/posts")
            },
            createBlog: function () {
                router.push("/add-b")
            },
            deleteBlog: function (blogId) {
                axios
                    .delete('http://localhost:3000/blog?blogId=' + blogId, {
                        headers: {
                            "Authorization": this.$store.getters.token
                        }
                    })
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/blogs', {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                .then(response => (this.blogs = response.data));
        }
    }
</script>


<style>
    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 10px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #447587;
    }

    body {
        color: #666;
    }

    article {
        max-width: 600px;
        margin: 65px auto;
        padding: 16px;
    }

    h1 {
        font-size: 36px;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 32px;
    }

    p {
        font-size: 18px;
        line-height: 1.8;
        margin-bottom: 32px;
    }

    a {
        color: #50c6d8;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: all 0.3s ease-in-out;
    }

    a:hover {
        border-bottom: 1px solid skyblue;
    }

    .comments-wrapper {
        border-top: 1px solid #eee;
        padding-top: 32px;
    }

    .comments-wrapper h2 a {
        text-decoration: none;
        font-size: 14px;
        float: right;
        font-weight: 400;
    }

    /** COMMENTS FORM **/
    .comments-form .field-wrapper {
        margin-bottom: 16px;
    }

    .comments-form label {
        display: inline-block;
        font-size: 12px;
        color: #999;
        text-transform: uppercase;
        padding-left: 5px;
    }

    .comments-form input[type="text"], .comments-form textarea {
        box-sizing: border-box;
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 3px;
        float: none;
        display: block;
        clear: both;
        outline: none;
        padding: 8px;
        width: 100%;
        transition: all 0.3s ease-in-out;
    }

    .comments-form input[type="text"]:focus, .comments-form textarea:focus {
        background-color: #fbfbfb;
    }

    .comments-form input[type="text"] {
        height: 40px;
        line-height: 40px;
    }

    .comments-form textarea {
        height: 150px;
    }

    .deleteBtn {
        background-color: #d81f71;
        border: 1px solid #d8426a;
        border-radius: 3px;
        box-shadow: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        line-height: 1;
        padding: 7px 19px 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease-in-out;
        margin-top: -8px;
    }

    .createBtn {
        background-color: #50c6d8;
        border: 1px solid #fff;
        border-radius: 3px;
        box-shadow: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        line-height: 1;
        padding: 7px 19px 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease-in-out;
        margin-top: -8px;
    }

    .createBtn:hover, .createBtn:focus {
        background-color: #b4dce4;
        border: 1px solid #239ed0;
    }

    .openBtn {
        background-color: #50c6d8;
        border: 1px solid #50c6d8;
        border-radius: 3px;
        box-shadow: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        line-height: 1;
        padding: 7px 19px 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease-in-out;
        margin-top: -8px;
    }

    .btn {
        background-color: #50c6d8;
        border: 1px solid #50c6d8;
        border-radius: 3px;
        box-shadow: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        line-height: 1;
        padding: 12px 24px 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease-in-out;
    }

    .btn:hover, .btn:focus {
        background-color: #5bbce4;
        border: 1px solid #239ed0;
    }

    /** COMMENTS **/
    .comments {
        list-style-type: none;
        overflow: hidden;
        margin: 32px auto;
        padding: 0;
    }

    .comments * {
        box-sizing: border-box;
    }

    .comments li {
        overflow: hidden;
        border-radius: 5px;
        margin-bottom: 16px;
    }

    .comment-author-meta {
        display: block;
        float: none;
        clear: both;
        padding: 10px 16px;
        background-color: #ebebeb;
        overflow: hidden;
    }

    .comment-author-meta .avatar {
        width: 40px;
        height: 40px;
        background-color: skyblue;
        padding: 3px;
        border-radius: 100%;
        float: left;
    }

    .comment-author-meta .avatar img {
        width: 100%;
    }

    .comment-author-meta .user {
        float: left;
        height: 40px;
        padding: 13px;
    }

    .comment-author-meta .delete-comment {
        color: red;
        cursor: pointer;
        float: right;
        font-size: 120%;
    }

    .comment-meta {
        background-color: #eee;
        padding: 5px 16px;
        font-size: 12px;
        color: #888;
        float: right;
    }

    .comment-meta span:first-child {
        padding-right: 8px;
        margin-right: 8px;
        border-right: 1px solid #888;
    }

    .comment-meta a {
        float: right;
        color: #5bbce4;
    }

    .comment-text {
        float: none;
        clear: both;
        padding: 0 16px 16px;
        border: 1px solid #eee;
        background-color: #fbfbfb;
    }

    /* VUE.JS Transitions */
    .fade-up-enter-active, .fade-up-leave-to {
        transition: all 0.3s ease-in-out;
        opacity: 0.75;
    }

    .fade-up-enter, .fade-up-leave-to {
        opacity: 0;
        transform: translateY(-32px);
    }
</style>