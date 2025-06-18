<template>
  <aside class="w-60 bg-white border-r border-gray-200 min-h-screen flex flex-col">
    <!-- Logo Section -->
    <div class="p-3.5 border-b border-gray-200">
      <div class="flex items-center justify-center mb-4">
        <div class="flex items-center">
          <div class="text-2xl font-bold">
            <span class="text-blue-600">Listri</span><span class="text-orange-400">Qu</span>
          </div>
          <div class="w-2 h-2 bg-orange-400 rounded-full ml-1 -mt-4"></div>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <div class="flex-1 p-4">
      <div class="text-sm font-medium text-gray-600 mb-4">Super Admin</div>

      <div v-for="menu in menus" :key="menu.menu_id" class="mb-2">
        <!-- Parent Menu -->
        <div v-if="menu.children && menu.children.length > 0">
          <button
            @click="toggleDropdown(menu.menu_name)"
            class="w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-colors"
            :class="{
              'bg-blue-600 text-white': isParentActive(menu),
              'text-gray-700 hover:bg-gray-100': !isParentActive(menu),
            }"
          >
            <span>{{ menu.menu_name }}</span>
            <svg
              class="w-4 h-4 transform transition-transform duration-200"
              :class="{ 'rotate-180': dropdowns[menu.menu_name] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            class="overflow-hidden transition-all duration-200"
            :class="{
              'max-h-96 opacity-100': dropdowns[menu.menu_name],
              'max-h-0 opacity-0': !dropdowns[menu.menu_name],
            }"
          >
            <div class="mt-1 ml-4 space-y-1">
              <router-link
                v-for="child in menu.children"
                :key="child.menu_id"
                :to="child.menu_url"
                class="block px-3 py-2 rounded text-sm transition-colors"
                :class="{
                  'bg-blue-100 text-blue-700 font-medium': isActive(child.menu_url),
                  'text-gray-600 hover:text-blue-600 hover:bg-blue-50': !isActive(child.menu_url),
                }"
              >
                {{ child.menu_name }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Menu tanpa children -->
        <div v-else>
          <router-link
            :to="menu.menu_url"
            class="block w-full px-3 py-2 rounded text-sm font-medium transition-colors"
            :class="{
              'bg-blue-600 text-white': isActive(menu.menu_url),
              'text-gray-800 hover:bg-gray-200': !isActive(menu.menu_url),
            }"
          >
            {{ menu.menu_name }}
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      menus: [],
      dropdowns: {},
    }
  },

  methods: {
    toggleDropdown(menuName) {
      this.dropdowns[menuName] = !this.dropdowns[menuName]
    },
    isActive(menuUrl) {
      return this.$route.path === menuUrl
    },
    isParentActive(menu) {
      return menu.children?.some((child) => this.isActive(child.menu_url))
    },
  },
  mounted() {
    const storedMenu = localStorage.getItem('menu')
    if (storedMenu) {
      this.menus = JSON.parse(storedMenu)
      this.menus.forEach((menu) => {
        this.dropdowns[menu.menu_name] = this.isParentActive(menu)
      })
    }
  },
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
