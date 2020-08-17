<template>
  <div class="c-container">
    <a @click="$emit('close')">close</a>
    <p>add a comment</p>
    <form @submit.prevent>
      <textarea v-model.trim="comment"></textarea>
      <button @click="addComment()" :disabled="comment == ''" class="button">add comment</button>
    </form>
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  props: {
    post: {
        type: Object,
        required: false,
        default: null
    }
  },
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/user'
    })
  },
  methods: {
    async addComment() {
      // create comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.currentUser.name
      })

      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1
      })

      // close modal
      this.$emit('close')
    }
  }
}
</script>