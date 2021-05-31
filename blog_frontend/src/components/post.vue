<template>
    <div>
        <article id="scroll-less">
            <header>
                <h1>{{post.title}}</h1>
                <h3>{{post.subtitle}}</h3>
            </header>
            <section>
                <p id="main-text" v-html="post.mainText" v-if="post != null"></p>
            </section>

            <footer class="comments-wrapper" id="comments">
                <h2>
                    <span v-if="post.comments.length === 0">Be the first to comment!</span>
                    <span v-else-if="post.comments.length !== 1">{{post.comments.length}}  Comments</span>
                    <span v-else>{{post.comments.length}}  Comment</span>
                    <a href="#comments-form" v-scroll-to="'#comments-form'" v-show="'#comments-form'">Write a
                        Comment</a>
                </h2>

                <transition-group class="comments" name="fade-up" tag="ul">
                    <li v-bind:id="index" v-bind:key="comment" v-for="(comment, index) in comments">
                        <div class="comment-author-meta">
                            <div class="avatar">
                                <img src="http://orig07.deviantart.net/4bc8/f/2013/240/2/2/free_avatar_aang_icon_by_zutarart-d6k31hx.gif"
                                     v-bind:alt="comment.user"/>
                            </div>
                            <div class="user">{{comment.username}}</div>
                            <div class="delete-comment" title="Delete Comment"
                                 v-if="$store.getters.profileId === blog.userId" v-on:click="deleteComment(comment._id); comments.splice(index, 1)">
                                &times;
                            </div>
                        </div>
                        <div class="comment-text">
                            <p style="white-space: pre-line" v-html="comment.text"></p>
                        </div>
                        <div class="comment-meta">
                            <span class="comment-date">Posted at: {{comment.date}}</span>
                        </div>
                    </li>
                </transition-group>

                <div class="comments-form" id="comments-form">
                    <h2>Leave a Comment</h2>
                    <form v-on:submit.prevent="addComment">
                        <div class="field-wrapper">
                            <label><span>Name yourself (public)</span><span v-if="$store.getters.profileId.length < 1" style="margin-left: 5px; color: #239ed0">You need te login/register first!</span></label>
                            <input name="user" type="text" id="username" :value="$store.getters.username" :disabled="$store.getters.profileId.length < 1"/>
                        </div>

                        <div class="field-wrapper">
                            <label>Comment (also public)<span v-if="$store.getters.profileId.length < 1" style="margin-left: 5px; color: #239ed0">You need te login/register first!</span></label>
                            <textarea cols="50" id="mainText" required rows="8" style="resize: none" name="comment-text" :disabled="$store.getters.profileId.length < 1"></textarea>
                        </div>

                        <div class="field-wrapper">
                            <input class="btn" type="submit" value="Add Comment" :disabled="$store.getters.profileId.length < 1"/>
                        </div>
                    </form>
                </div>

            </footer>
        </article>
    </div>
</template>

<script>
    import axios from "axios"
    // import router from "@/router";

    export default {
        name: "post",
        data() {
            return {
                post: null,
                blog: null,
                comments: null
            }
        },

        methods: {
            clearForm: function () {
                document.getElementById("username").value = '';
                document.getElementById("mainText").value = '';
            },
            addComment: function () {

                axios
                    .post("http://localhost:3000/comment?postId=" +  this.$store.getters.postId + "&blogId=" + this.$store.getters.blogId, {
                            data: {
                                username: document.getElementById("username").value,
                                text: document.getElementById("mainText").value,
                                date: new Date(Date.now()).toDateString()
                            }
                        }, {
                            headers: {
                                'Authorization': this.$store.getters.token
                            }
                        }
                    )
                    .then(response => {
                        this.$store.commit('changeCommentId', response.data.posts.find(p => p._id === this.$store.getters.postId).comments[response.data.posts.find(p => p._id === this.$store.getters.postId).comments.length-1]._id);
                    });

                this.comments.push({
                    _id: this.$store.getters.commentId,
                    username: document.getElementById("username").value,
                    text: document.getElementById("mainText").value,
                    date: new Date(Date.now()).toDateString()
                });

            },
            deleteComment: function (id) {
                axios
                    .delete('http://localhost:3000/comment?postId=' + this.$store.getters.postId + "&blogId=" + this.$store.getters.blogId + "&commentId=" + id, {
                        headers: {
                            "Authorization": this.$store.getters.token
                        }
                    });
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/blog?blogId=' + this.$store.getters.blogId, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                .then(response => {
                    this.blog = response.data[0];
                    this.post = this.blog.posts.find(p => p._id === this.$store.getters.postId);
                    this.comments = this.post.comments;
                });
        }
    }
</script>

<style>
    #scroll-less {
        max-height: 80vh;
        overflow-y: scroll;
    }

    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 10px rgba(128, 128, 128, 0);
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(153, 153, 153, 0);
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
        margin: 60px auto;
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
        height: 35px;
        line-height: 40px;
    }

    .comments-form textarea {
        height: 150px;
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