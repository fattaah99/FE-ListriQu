<template>
  <main class="flex-1 bg-gray-50 overflow-auto">
    <div class="p-6">
      <!-- Dashboard Analytics Cards -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard Analytics</h1>

        <!-- Cards Container -->
        <!-- Top Row: 2 Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Card 1: Total Users -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ totalUsers.toLocaleString() }}
                </p>
                <div class="flex items-center mt-2">
                  <svg
                    class="w-4 h-4 text-green-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    ></path>
                  </svg>
                  <span class="text-sm text-green-600 font-medium">+12.5%</span>
                  <span class="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <svg
                  class="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 2: Total Revenue -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  Rp {{ totalRevenue.toLocaleString() }}
                </p>
                <div class="flex items-center mt-2">
                  <svg
                    class="w-4 h-4 text-green-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    ></path>
                  </svg>
                  <span class="text-sm text-green-600 font-medium">+8.2%</span>
                  <span class="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg
                  class="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Large Analytics Dashboard -->
        <div class="mb-6">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <div class="flex space-x-2">
                <button
                  class="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                >
                  7D
                </button>
                <button
                  class="text-sm px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  30D
                </button>
                <button
                  class="text-sm px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  90D
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Chart Area -->
              <div class="lg:col-span-2">
                <div class="relative h-64 mb-4">
                  <svg class="w-full h-full" viewBox="0 0 500 250">
                    <!-- Grid lines -->
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" stroke-width="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    <!-- Sample chart line -->
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      stroke-width="3"
                      points="25,200 75,180 125,160 175,140 225,120 275,130 325,110 375,100 425,90 475,80"
                    />

                    <!-- Area under curve -->
                    <polygon
                      fill="url(#gradient)"
                      opacity="0.3"
                      points="25,200 75,180 125,160 175,140 225,120 275,130 325,110 375,100 425,90 475,80 475,240 25,240"
                    />

                    <!-- Gradient definition -->
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color: #3b82f6; stop-opacity: 1" />
                        <stop offset="100%" style="stop-color: #3b82f6; stop-opacity: 0" />
                      </linearGradient>
                    </defs>

                    <!-- Data points -->
                    <circle cx="25" cy="200" r="4" fill="#3b82f6" />
                    <circle cx="75" cy="180" r="4" fill="#3b82f6" />
                    <circle cx="125" cy="160" r="4" fill="#3b82f6" />
                    <circle cx="175" cy="140" r="4" fill="#3b82f6" />
                    <circle cx="225" cy="120" r="4" fill="#3b82f6" />
                    <circle cx="275" cy="130" r="4" fill="#3b82f6" />
                    <circle cx="325" cy="110" r="4" fill="#3b82f6" />
                    <circle cx="375" cy="100" r="4" fill="#3b82f6" />
                    <circle cx="425" cy="90" r="4" fill="#3b82f6" />
                    <circle cx="475" cy="80" r="4" fill="#3b82f6" />
                  </svg>
                </div>
              </div>

              <!-- Stats Sidebar -->
              <div class="space-y-4">
                <!-- Stats Grid -->
                <div class="grid grid-cols-1 gap-4">
                  <div class="text-center p-4 bg-gray-50 rounded-lg">
                    <p class="text-2xl font-bold text-gray-900">
                      {{ activeUsers.toLocaleString() }}
                    </p>
                    <p class="text-sm text-gray-600">Active Users</p>
                    <p class="text-xs text-green-600 mt-1">+5.4%</p>
                  </div>
                  <div class="text-center p-4 bg-gray-50 rounded-lg">
                    <p class="text-2xl font-bold text-gray-900">{{ conversionRate }}%</p>
                    <p class="text-sm text-gray-600">Conversion Rate</p>
                    <p class="text-xs text-green-600 mt-1">+2.1%</p>
                  </div>
                </div>

                <!-- Recent Activity -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div class="space-y-3 max-h-32 overflow-y-auto">
                    <div
                      v-for="activity in recentActivities"
                      :key="activity.id"
                      class="flex items-center text-sm"
                    >
                      <div class="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <span class="text-gray-600 text-xs">{{ activity.description }}</span>
                        <div class="text-gray-400 text-xs">{{ activity.time }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="bg-orange-100 p-2 rounded-lg mr-4">
                <svg
                  class="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Orders</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ totalOrders.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="bg-purple-100 p-2 rounded-lg mr-4">
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Products</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ totalProducts.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="bg-red-100 p-2 rounded-lg mr-4">
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Issues</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalIssues }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                <svg
                  class="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Performance</p>
                <p class="text-2xl font-bold text-gray-900">{{ performanceScore }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: { Breadcrumb },
  name: 'Dashboard',
  data() {
    return {
      searchQuery: '',
      menus: [], // untuk menu dari localStorage
      dropdowns: {},
      user: null,
      selectedUnits: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 50,
      showUserDropdown: false,
      showCheckboxes: false, // New state for toggling checkboxes
      dropdowns: {
        dataMaster: true, // Set to true to show it's expanded by default
        disposal: false,
        transaction: false,
        information: false,
      },

      // Dashboard Analytics Data
      totalUsers: 12547,
      totalRevenue: 2547890,
      activeUsers: 8932,
      conversionRate: 3.2,
      totalOrders: 1834,
      totalProducts: 456,
      totalIssues: 23,
      performanceScore: 94,

      recentActivities: [
        { id: 1, description: 'New user registration', time: '2 min ago' },
        { id: 2, description: 'Order #1234 completed', time: '5 min ago' },
        { id: 3, description: 'Product updated', time: '10 min ago' },
        { id: 4, description: 'System backup completed', time: '15 min ago' },
        { id: 5, description: 'New payment received', time: '20 min ago' },
      ],
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
    // toggleDropdown(dropdownName) {
    //   this.dropdowns[dropdownName] = !this.dropdowns[dropdownName]
    // },
    toggleDropdown(menuName) {
      this.dropdowns[menuName] = !this.dropdowns[menuName]
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
    },
    toggleCheckboxes() {
      this.showCheckboxes = !this.showCheckboxes
      // Clear selected units when hiding checkboxes
      if (!this.showCheckboxes) {
        this.selectedUnits = []
      }
    },
    toggleAllUnits() {
      if (this.isAllSelected) {
        this.selectedUnits = []
      } else {
        this.selectedUnits = this.units.map((unit) => unit.id)
      }
    },
    logout() {
      // Implement logout logic here
      if (confirm('Apakah Anda yakin ingin logout?')) {
        // Example: redirect to login page or clear session
        console.log('User logged out')
        // window.location.href = '/login'
        // or emit an event to parent component
        // this.$emit('logout')
      }
      this.showUserDropdown = false
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        // Here you would typically fetch new data for the selected page
        console.log(`Navigate to page ${page}`)
      }
    },
  },

  mounted() {
    const storedMenu = localStorage.getItem('menu')
    const storedUser = localStorage.getItem('user')

    // Ambil dan set menu dari localStorage
    if (storedMenu) {
      this.menus = JSON.parse(storedMenu)

      // Inisialisasi dropdown tertutup untuk setiap menu
      this.menus.forEach((menu) => {
        this.dropdowns[menu.menu_name] = false
      })
    }

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

/* Custom styling for indeterminate checkbox */
input[type='checkbox']:indeterminate {
  background-color: #3b82f6;
  border-color: #3b82f6;
}
</style>
