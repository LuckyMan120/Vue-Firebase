<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li><a>comments {{ fullPost.comments }}</a></li>
              <li><a>likes {{ fullPost.likes }}</a></li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ currentUser.name }}</h5>
          <p>{{ currentUser.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent class="create-post">
              <textarea v-model.trim="post.content"></textarea>
              <button class="button" @click="createPost" :disabled="post.content == ''">post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li><a @click="toggleCommentModal(post)">comments {{ post.comments }}</a></li>
              <li><a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { commentsCollection } from '@/firebase'

// import components
import CommentModal from '@/components/CommentModal'
export default {
	data () {
		return {
			post: {
				content: ''
			},
      showCommentModal: false,
      selectedPost: null,
      showPostModal: false,
      fullPost: {},
      postComments: []
		}
	},
  components: {
    CommentModal
  },
  filters: {
    formatDate: function (val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength : function (val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  },
	computed: {
		...mapGetters({
			currentUser: 'users/user',
      posts: 'post/getPosts'
		})
	},
	methods: {
		...mapActions({
			doPost: 'post/createPost',
      addlike: 'post/likePost'
		}),
		createPost: function () {
			this.doPost({ content: this.post.content })
			this.post.content = ''
		},
    toggleCommentModal: function (data) {
      this.showCommentModal = !this.showCommentModal
      this.selectedPost = data
    },
    likePost: function (id, likeCount) {
      this.addlike({id, likeCount})
    },
    viewPost: async function (data) {
      const docs = await commentsCollection.where('postId', '==', data.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = data
      this.showPostModal = true
    },
    closePostModal: function () {
      this.postComments = []
      this.showPostModal = false
    }
	}
}
</script>