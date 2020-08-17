import * as types from '../mutation-types';
import * as fb from '../../firebase'
import router from '../../router'
import globalStore from '../index';

const state = {
	userProfile: {}
}

const getters = {
	user: state => state.userProfile
}

const actions = {
	login: async function (store, form) {
		// sign user in
		const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

		// fetch user profile and set in state
		globalStore.dispatch('users/fetchUserProfile', user)
	},

	fetchUserProfile: async function (store, user) {
		// fetch user profile
		const userProfile = await fb.usersCollection.doc(user.uid).get()

		// set user profile in state
		store.commit(types.SET_USER_PROFILE, userProfile.data())

		// change route to dashboard
		if (router.currentRoute.path === '/login') {
			router.replace('/')
		}
	},

	signup: async function (store, form) {
		console.log('form', form)
		// sign user up
		const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

		// create user profile object in userCollections
		await fb.usersCollection.doc(user.uid).set({
			name: form.name,
			title: form.title
		})

		// fetch user profile and set in state
		globalStore.dispatch('users/fetchUserProfile', user)
	},

	logout: async function (store) {
		await fb.auth.signOut()

		// clear userProfile and redirect to /login
		store.commit(types.CLEAR_USER_PROFILE)

		router.push('/login')
	},

	updateProfile: async function (user) {
		const userId = fb.auth.currentUser.uid

		const userRef = await fb.usersCollection.doc(userId).update({
			name: user.name,
			title: user.title
		})
		console.log(userRef)

		globalStore.dispatch('users/fetchUserProfile', { uid : userId })

		// update all posts by user
		const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
		postDocs.forEach(doc => {
			fb.postsCollection.doc(doc.id).update({
				userName: user.name
			})
		})

		// update all comments by user
		const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
		commentDocs.forEach(comment => {
			fb.commentsCollection.doc(comment.id).update({
				userName: user.name
			})
		})
	}
}

const mutations = {
	[types.SET_USER_PROFILE] (state, user) {
		state.userProfile = user
	},

	[types.CLEAR_USER_PROFILE] (state) {
		state.userProfile = {}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}