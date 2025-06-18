<template>
  <div class="flex flex-col">
    <h1 class="text-xl font-semibold text-gray-900">{{ currentTitle }}</h1>
    <div class="text-sm text-gray-500 mt-1">
      <router-link to="/dashboard" class="text-blue-600 hover:text-blue-800 cursor-pointer">
        ListriQu
      </router-link>
      <span class="mx-2">></span>

      <template v-for="(item, index) in breadcrumbs" :key="item.menu_id">
        <span v-if="index < breadcrumbs.length - 1">
          <router-link :to="item.menu_url" class="text-blue-600 hover:text-blue-800 cursor-pointer">
            {{ item.menu_name }}
          </router-link>
          <span class="mx-2">></span>
        </span>
        <span v-else class="text-gray-700">{{ item.menu_name }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      menus: [],
      breadcrumbs: [],
      currentTitle: '',
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        this.generateBreadcrumbs()
      },
    },
  },
  methods: {
    generateBreadcrumbs() {
      const currentPath = this.$route.path
      const storedMenus = localStorage.getItem('menu')
      if (!storedMenus) return

      this.menus = JSON.parse(storedMenus)
      this.breadcrumbs = []

      const findPath = (menus, path, trail = []) => {
        for (const menu of menus) {
          const newTrail = [...trail, menu]
          if (menu.menu_url === path) {
            this.breadcrumbs = newTrail
            this.currentTitle = menu.menu_name
            return true
          }
          if (menu.children && menu.children.length > 0) {
            const found = findPath(menu.children, path, newTrail)
            if (found) return true
          }
        }
        return false
      }

      findPath(this.menus, currentPath)
    },
  },
}
</script>
