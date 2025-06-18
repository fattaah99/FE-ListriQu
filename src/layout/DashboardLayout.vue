<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Header/Navbar -->
      <Navbar @logout="handleLogout" />

      <!-- Main Content -->
      <main class="flex-1">
        <!-- <Dashboard /> -->
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Dashboard from '@/views/Dashboard.vue'

export default {
  name: 'MainLayout',
  components: {
    Sidebar,
    Navbar,
  },
  methods: {
    handleLogout() {
      // Implement your logout logic here
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('menu')
      localStorage.removeItem('token') // if you have token

      // Redirect to login page
      this.$router.push('/login')

      // Or you can emit to parent component if needed
      this.$emit('logout')
    },
  },
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
