import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    menu: [],
  }),
  actions: {
    setUser(data) {
      this.user = {
        user_id: data.user_id,
        username: data.username,
        full_name: data.full_name,
        role_id: data.role_id,
      }
      this.token = data.token
      this.menu = data.menu

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('menu', JSON.stringify(this.menu))
    },
    logout() {
      this.user = null
      this.token = null
      this.menu = []

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('menu')
    },
    loadFromStorage() {
      this.token = localStorage.getItem('token')
      this.user = JSON.parse(localStorage.getItem('user'))
      this.menu = JSON.parse(localStorage.getItem('menu'))
    },
  },
})
