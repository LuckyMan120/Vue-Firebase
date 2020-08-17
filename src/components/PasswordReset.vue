<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('close')" class="close">close</div>
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <input v-model.trim="email" type="email" placeholder="you@email.com" />
        </form
        >
        <p v-if="errMessage !== ''">{{ errMessage }}</p>
        <button @click="resetPassword()" class="button">Reset</button>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

export default {
  data () {
    return {
      email: '',
      showSuccess: false,
      errMessage: ''
    }
  },
  methods: {
    resetPassword: async function () {
      // reset logic
      this.errMessage = ''

      try {
        await auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errMessage = err.message
      }
    }
  }
}
</script>