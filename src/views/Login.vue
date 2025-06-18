<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-25 to-blue-50 flex items-center justify-center px-4"
  >
    <div class="w-full max-w-sm">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <!-- Logo -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold">
            <span class="text-blue-600">Listri</span><span class="text-orange-400">Qu</span
            ><span class="text-blue-600">.</span>
          </h1>
          <p class="text-gray-500 text-xs mt-1">Smart Home Energy Management</p>
        </div>

        <!-- Welcome -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-1">Hi, Welcome</h2>
          <p class="text-gray-500 text-xs">It's good to see you again</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Username -->
          <div>
            <label for="username" class="block text-xs font-medium text-gray-700 mb-1"
              >Username</label
            >
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Input username"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-xs font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Input your password"
                class="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <!-- Eye Icon -->
                <svg
                  v-if="!showPassword"
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <!-- Eye Off Icon -->
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Forgot Password -->
          <div class="text-left">
            <button
              type="button"
              @click="handleForgotPassword"
              class="text-blue-600 text-xs hover:text-blue-700"
            >
              Forgot your password? Click here
            </button>
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {{ errorMessage }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2.5 text-sm rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Loading...
            </span>
          </button>

          <!-- Register -->
          <div class="text-center pt-3">
            <span class="text-gray-600 text-xs">Don't have an account? </span>
            <button
              type="button"
              @click="handleRegister"
              class="text-blue-600 text-xs font-medium hover:text-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-gray-400 text-xs">© 2024 ListriQu. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ username: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// onMounted(() => {
//   auth.loadFromStorage?.()
//   if (auth.token) {
//     router.push('/dashboard')
//   }
// })

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const res = await authService.login(form.value)

    auth.setUser({
      token: res.data.token,
      user_id: res.data.user_id,
      username: res.data.username,
      full_name: res.data.full_name,
      role_id: res.data.role_id,
      menu: res.data.menu,
    })

    router.push('/dashboard')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  // Tambahkan logika forgot password
  alert('Forgot password clicked')
}

const handleRegister = () => {
  router.push('/register')
}
</script>
