<template>
    <div>
        <header>
            <h1 style="width: 100vw; text-align: center">Posts</h1>
            <div style="width: 100vw; text-align: center; margin-top: -1%; margin-bottom: -3%"
                 v-if="$store.getters.profileId !== ''">
                <button class="createBtn"  v-if="$store.getters.profileId === blog.userId" v-on:click="createPost()">Add one more post!</button>
            </div>
        </header>
        <article id="scroll" v-if="posts.length !== 0">
            <transition-group class="comments" name="fade-up" tag="ul">
                <li v-bind:id="index" v-bind:key="post" v-for="(post, index) in  posts">
                    <div class="comment-author-meta">
                        <div class="user" style="width: 40%; float:left">{{post.title}}</div>
                        <div class="user" style="width: 40%; float:right; align-content: center; text-align: center">
                            <button class="deleteBtn" style="width: 50%; float:left; "
                                    v-if="$store.getters.profileId === blog.userId" v-on:click="deletePost(post._id); posts.splice(index, 1)">
                                Delete
                            </button>
                            <button class="openBtn" style="width: 45%; float:right" v-on:click="openPost(post._id)">
                                Open
                            </button>
                        </div>
                    </div>
                    <div class="comment-text">
                        <p style="white-space: pre-line" v-html="post.subtitle"></p>
                    </div>
                    <div class="comment-meta">
                        <span class="comment-date">Created at: {{post.date}}</span><span class="comment-time">{{post.time}}</span>
                    </div>
                </li>
            </transition-group>
        </article>
        <div v-if="posts.length === 0">
            <h1 style="align-content: center; text-align: center; margin-top: 15%">
                <span>No posts here yet. <br>The owner of this blog really </span>
                <span style="color: #d81f71">l&#10084;ves </span> this blog...</h1>
        </div>
    </div>
</template>

<script>
    import router from "@/router";
    import axios from "axios"

    export default {
        name: "posts",
        data() {
            return {
                blog: null,
                posts: null,
            }
        }, methods: {
            openPost: function (postId) {
                this.$store.commit('changePostId', postId);
                router.push("/post")
            },
            createPost: function () {
                router.push("/add-p")
            },
            deletePost: function (postId) {
                axios
                    .delete('http://localhost:3000/post?postId=' + postId + "&blogId=" + this.$store.getters.blogId, {
                        headers: {
                            "Authorization": this.$store.getters.token
                        }
                    })
            }
        }, mounted() {
            axios
                .get('http://localhost:3000/blog?blogId=' + this.$store.getters.blogId, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                .then(response => {
                    this.blog = response.data[0];
                    this.posts = this.blog.posts;
                });
        }
    }

</script>


<style scoped>

</style>