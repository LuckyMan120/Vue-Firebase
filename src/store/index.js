import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'

// import stores
import users from './modules/user'
import post from './modules/post'

Vue.use(Vuex)

// realtime firebase connection
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })
  store.dispatch('post/setPosts', postsArray)
  console.log(store)
})

const store = new Vuex.Store({
	state: {
        appVersion: 3
    },
	modules: {
		users,
		post
	}
})
 export default store