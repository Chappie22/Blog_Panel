<template>
    <div>
        <div style="width: 100vw; text-align: center" v-if="$store.getters.profileId !== ''">
            <h1 style="width: 100vw; text-align: center">Adding Post</h1>
            <p style="width: 100vw; text-align: center">Please fill in this form to add a new post to your blog.</p>
            <br>
            <h3 style="text-align: center;"><b>Take a break, and think, what the best title for your new post?</b></h3>
            <input id="title" maxlength="26" placeholder="Enter title" required type="text">
            <br>
            <h3 style="text-align: center;"><b>Ok, ok, we know that titles are good, but, what about subtitles? The
                second thing, that users look in article at!</b></h3>
            <input id="subtitle" placeholder="Enter subtitle:" required type="text">
            <br>
            <h3 style="text-align: center;"><b>Aaand, here we are. Freaking main text input. Put here all your thoughts
                and ideas! No limits!</b></h3>
            <textarea cols="128" id="mainText" required rows="8" style="resize: none"
                      type="text">Enter main text:</textarea>
            <br>
            <button class="btn" type="submit" v-on:click="createPost">Add Post!</button>
        </div>
        <div v-if="$store.getters.profileId === ''">
            <h1 style="margin-left: 33%; margin-top: 20%; align-content: center;">ERROR 401 (Unauthorized)</h1>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import router from "@/router";

    export default {
        name: "createPost",
        methods: {
            createPost: function () {
                axios
                    .post("http://localhost:3000/post?blogId=" + this.$store.getters.blogId, {
                        data: {
                            title: document.getElementById("title").value,
                            subtitle: document.getElementById("subtitle").value,
                            mainText: document.getElementById("mainText").value,
                            date: new Date(Date.now()).toDateString()
                        }
                    }, {
                        headers: {
                            Authorization: this.$store.getters.token
                        }
                    })
                    .then(() => {
                        router.push("/posts");
                    });
            }
        }
    }
</script>


<style scoped>
    /* Full-width input fields */
    input[type=text], input[type=password], textarea {
        width: 60%;
        padding: 10px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    input[type=text]:focus, input[type=password]:focus, textarea:focus {
        background-color: #ddd;
        outline: none;
    }

    /* Add a blue text color to links */
    a {
        color: dodgerblue;
    }

    /*body {*/
    /*    color: #666;*/
    /*}*/

    article {
        max-width: 600px;
        margin: 65px auto;
        padding: 16px;
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