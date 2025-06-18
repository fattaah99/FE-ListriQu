<template>
  <header class="bg-white border-b border-gray-200">
    <div class="flex items-center justify-between px-6 py-3">
      <!-- Left side - Page Title and Breadcrumb -->
      <div class="flex flex-col">
        <Breadcrumb />
      </div>

      <!-- Right side - Notification and User Profile -->
      <div class="flex items-center space-x-4">
        <!-- Notification Icon -->
        <div class="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
          <div class="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1"></div>
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-5 5-5-5h5v-12"
            ></path>
          </svg>
        </div>

        <!-- User Profile Dropdown -->
        <div class="relative">
          <div
            @click="toggleUserDropdown"
            class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
          >
            <!-- Profile Picture -->
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-600 text-sm font-medium">{{ userInitials }}</span>
            </div>
            <!-- User Info -->
            <div class="text-left">
              <div class="text-sm font-medium text-gray-900">{{ user?.full_name }}</div>
              <div class="text-xs text-gray-500">Super Admin</div>
            </div>
            <!-- Dropdown Arrow -->
            <svg
              class="w-4 h-4 text-gray-400 transform transition-transform duration-200"
              :class="{ 'rotate-180': showUserDropdown }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          <!-- User Dropdown Menu -->
          <div
            v-if="showUserDropdown"
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div class="py-1">
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Profile
              </a>
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Settings
              </a>
              <div class="border-t border-gray-100"></div>
              <a
                href="#"
                @click="handleLogout"
                class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
  },
  data() {
    return {
      user: null,
      showUserDropdown: false,
    }
  },
  setup() {
    const auth = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
      if (window.confirm('Apakah Anda yakin ingin logout?')) {
        auth.logout()
        router.push('/login')
      }
    }

    return {
      handleLogout,
    }
  },
  computed: {
    // Ambil inisial dari nama user
    userInitials() {
      if (!this.user?.full_name) return ''
      const parts = this.user.full_name.trim().split(' ')
      return parts.length === 1
        ? parts[0][0].toUpperCase()
        : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    },
  },
  methods: {
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
    },
    // logout() {
    //   // Implement logout logic here
    //   if (confirm('Apakah Anda yakin ingin logout?')) {
    //     // Example: redirect to login page or clear session
    //     console.log('User logged out')
    //     // window.location.href = '/login'
    //     // or emit an event to parent component
    //     this.$emit('logout')
    //   }
    //   this.showUserDropdown = false
    // },
  },
  mounted() {
    const storedUser = localStorage.getItem('user')

    // Ambil dan set user dari localStorage langsung
    if (storedUser) {
      this.user = JSON.parse(storedUser)
    }

    // Listener untuk menutup dropdown user saat klik di luar komponen
    document.addEventListener('click', (event) => {
      if (!this.$el.contains(event.target)) {
        this.showUserDropdown = false
      }
    })
  },
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
