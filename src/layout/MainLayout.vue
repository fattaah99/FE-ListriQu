<template>
  <div>
    <DashboardLayout>
      <v-main>
        <router-view />
      </v-main>
    </DashboardLayout>
  </div>
</template>

<script scoped>
import DashboardLayout from './DashboardLayout.vue'

export default {
  name: 'MainLayout',
  components: {
    DashboardLayout,
  },
}
</script>

<style scoped>
/* Optional styling */
main {
  padding: 1rem;
}
</style>
