<template>
    <div>
        <div style="width: 100vw; text-align: center">
            <h1 style="width: 100vw; text-align: center">Register</h1>
            <p style="width: 100vw; text-align: center">Please fill in this form to create an account.</p>
            <br>
            <label for="username"><b>Username: </b></label>
            <input id="username" name="username" placeholder="Enter Username" required type="text">
            <br>
            <label for="psw"><b>Password: </b></label>
            <input id="psw" name="psw" placeholder="Enter Password:" required type="password">
            <br>
            <label for="psw-repeat"><b>Repeat Password: </b></label>
            <input id="psw-repeat" name="psw-repeat" placeholder="Repeat Password:" required type="password">
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button class="btn" type="submit" v-on:click="register()">Register</button>
            <h3 id="hidden" style="display: none; color: #e23a85"></h3>
        </div>
        <div style="width: 100vw; text-align: center">
            <p>Already have an account?
                <router-link to="/log">Sign in</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import router from "@/router";

    var error = false;
    export default {
        name: "register",
        error: error,
        methods: {
            register: function () {
                if (document.getElementById("psw").value !== document.getElementById("psw-repeat").value) {
                    error = true;
                    document.getElementById("hidden").style.display = "block";
                    document.getElementById("hidden").textContent = "The passwords do not match!"
                } else {
                    axios
                        .post("http://localhost:3000/reg", null, {
                                params: {
                                    username: document.getElementById("username").value,
                                    password: document.getElementById("psw").value
                                }
                            }
                        )
                        .then(response => {
                            this.$store.commit('changeProfileId', response.data.userId);
                            this.$store.commit('changeToken', response.data.accessToken);
                            this.$store.commit('changeUsername', response.data.username);
                            router.push("/");
                        }).catch((err) => {
                        error = true;
                        document.getElementById("hidden").style.display = "block";
                        if (err.response.status === 409) {
                            document.getElementById("hidden").textContent = "The user with such username is already registered!"
                        } else {
                            document.getElementById("hidden").textContent = "Oops, something went wrong.."
                        }
                    });
                }

            }
        }
    }
</script>

<style scoped>
    /* Full-width input fields */
    input[type=text], input[type=password] {
        width: 60%;
        padding: 10px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    input[type=text]:focus, input[type=password]:focus {
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