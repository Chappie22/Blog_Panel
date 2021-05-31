<template>
    <div id="app" style="{width: 100vw; height: 100vh; position: absolute; top: 0; right: 0; bottom: 0; left: 0;} ">
        <div>
            <div class="svg-container1" style="margin: 10px">
                <p class="header-in" style="width: 10%; float:right; margin-top: 8px " v-if="$store.getters.profileId !== ''">Hello,
                    {{$store.getters.username}}</p>
                <button class="header-in btn" style="width: 10%; float:left" v-if="$store.getters.profileId !== ''"
                        v-on:click="logoutOnClick()">Logout
                </button>

                <button class="header-in btn" style="width: 10%; float:right" v-if="$store.getters.profileId === ''"
                        v-on:click="loginOnClick">Login
                </button>
                <button class="header-in btn" style="width: 10%; float:left" v-if="$store.getters.profileId === ''"
                        v-on:click="regOnClick()">Register
                </button>
            </div>


            <div class="svg-container">
                <!-- I crated SVG with: https://codepen.io/anthonydugois/pen/mewdyZ -->
                <svg class="svg" viewBox="0 0 600 80">
                    <path d="M 600 30 Q 300 120 0 30 L 0 0 L 800 0 L 800 300 Z"
                          fill="#50c6d8"
                          id="curve">
                        /*M 100 300 Q -400 350 0 300 L 0 0 L 800 0 L 800 300 Z*/
                    </path>
                </svg>
            </div>

            <router-view/>

            <footer id="myFooter">
                <p style="margin-top: 7px">Made by Kyrylo Kryklyvyi</p>
            </footer>
        </div>
    </div>
</template>

<script>
    import router from "@/router";

    export default {
        name: "App",
        methods: {
            loginOnClick: function () {
                router.push("/log")
            },
            regOnClick: function () {
                router.push("/reg")
            },
            logoutOnClick: function () {
                this.$store.commit('changeProfileId', '')
            }
        }
    }
</script>

<style>

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

    #scroll {
        max-height: 70vh;
        overflow-y: auto;
    }

    #header-in {
        top: 0;
        position: absolute;
    }

    .svg-container1 {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }

    .svg-container {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: -2;
    }

    svg path {
        transition: 0.1s;
    }

    svg:hover path {
        /*M 600 30 Q 300 120 0 30 L 0 0 L 800 0 L 800 300 Z*/
        d: path("M 600 30 Q 300 80 0 30 L 0 0 L 800 0 L 800 300 Z");
    }

    #myHeader {
        color: #50c6d8;
        padding-top: 1vw;
        padding-bottom: 10vw;
        text-align: center;
    }

    #myFooter {
        height: 6vh;
        background: #50c6d8;
        padding: 1vh;
        text-align: center;
        clear: both;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }

</style>