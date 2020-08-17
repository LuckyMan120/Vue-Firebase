<template>
  <section id="settings">
    <div class="col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name">Name</label>
        <input v-model.trim="name" type="text" :placeholder="userData.name" id="name" />

        <label for="title">Job Title</label>
        <input v-model.trim="title" type="text" :placeholder="userData.title" id="title" />

        <button @click="ProfileUpdate()" class="button">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      title: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapGetters({
        userData: 'users/user'
    })
  },
  methods: {
    ...mapActions({
        update: 'users/updateProfile'
    }),
    ProfileUpdate: function () {
      this.update({
        name: this.name !== '' ? this.name : this.userData.name,
        title: this.title !== '' ? this.title : this.userData.title
      })

      this.name = ''
      this.title = ''

      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>