import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        blogId: '',
        postId: '',
        profileId: '',
        username: '',
        token: '',
        commentId: ''
    },
    mutations: {
        changeBlogId(state, blogId) {
            state.blogId = blogId
        },
        changePostId(state, postId) {
            state.postId = postId
        },
        changeProfileId(state, profileId) {
            state.profileId = profileId
        },
        changeUsername(state, username) {
            state.username = username
        },
        changeToken(state, token) {
            state.token = token
        },
        changeCommentId(state, commentId) {
            state.commentId = commentId;
        }
    },
    getters: {
        blogId: state => state.blogId,
        postId: state => state.postId,
        profileId: state => state.profileId,
        username: state => state.username,
        token: state => 'Bearer ' + state.token,
        commentId: state => state.commentId
    }
});