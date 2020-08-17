<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Vuegram</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li><a @click="logout">logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	methods: {
		...mapActions({
			signoff: 'users/logout'
		}),
		logout: function () {
			this.signoff()
		}
	}
}
</script>