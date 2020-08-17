import * as types from '../mutation-types'
import * as fb from '../../firebase'
// import router from '../../router'
import globalStore from '../index'

const state = {
	posts: []
}

const getters = {
	getPosts: state => state.posts
}

const actions = {
	createPost: async function (store, post) {
		await fb.postsCollection.add({
			createdOn: new Date(),
			content: post.content,
			userId: fb.auth.currentUser.uid,
			userName: globalStore.state.users.userProfile.name,
			comments: 0,
			likes: 0
		})
	},

	setPosts: function (store, posts) {
		store.commit(types.SET_POSTS, posts)
	},

	likePost: async function (store, data) {
		const userId = fb.auth.currentUser.uid
		const docId = `${userId}_${data.id}`

		// check if user has liked post
		const doc = await fb.likesCollection.doc(docId).get()
		if (doc.exists) { return }

		// create post
		await fb.likesCollection.doc(docId).set({
			postId: data.id,
			userId: userId
		})
		
		// update post likes count
		fb.postsCollection.doc(data.id).update({
			likes: data.likeCount + 1
		})
	}
}

const mutations = {
	[types.SET_POSTS] (state, posts) {
		state.posts = posts
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}