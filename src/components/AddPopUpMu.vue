<template>
  <div class="add-parent-popup">
    <!-- Overlay -->
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closePopup"
    >
      <!-- Modal Container -->
      <div class="bg-white rounded-lg shadow-xl w-[500px] max-w-md mx-4" @click.stop>
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <div class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Add Parent</h3>
          </div>
          <button @click="closePopup" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <div class="p-4 space-y-4 max-h-96 overflow-y-auto">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-4">
            <div class="flex items-center space-x-2">
              <svg
                class="animate-spin h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="text-gray-600">Saving...</span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-50 border border-green-200 rounded-md p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="ml-3">
                <p class="text-sm text-green-800">{{ success }}</p>
              </div>
            </div>
          </div>

          <!-- Form Fields -->
          <div v-if="!loading" class="grid grid-cols-1 gap-4">
            <!-- Unit Code -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Unit Code <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.unit_code"
                type="text"
                placeholder="DKI01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                :disabled="loading"
              />
            </div>

            <!-- Unit Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Unit Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.unit_name"
                type="text"
                placeholder="DKI Jakarta"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                :disabled="loading"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Description </label>
              <textarea
                v-model="formData.description"
                rows="3"
                placeholder="Deskripsi unit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                :disabled="loading"
              ></textarea>
            </div>

            <!-- Parent Unit ID -->
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1"> Parent Unit ID </label>
              <input
                v-model.number="formData.parent_unit_id"
                type="number"
                placeholder="0"
                min="0"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm bg-gray-100 text-gray-400"
                disabled
              />
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Address </label>
              <textarea
                v-model="formData.address"
                rows="2"
                placeholder="Alamat lengkap unit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                :disabled="loading"
              ></textarea>
            </div>

            <!-- Phone & Email (2 columns) -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Phone </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="021-123-4567"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  :disabled="loading"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="unit@company.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- Manager ID -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Manager ID </label>
              <input
                v-model.number="formData.manager_id"
                type="number"
                placeholder="0"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                :disabled="loading"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
                  :disabled="loading"
                >
                  <option value="">Pilih Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-400"
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
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            @click="closePopup"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            :disabled="loading"
          >
            Batal
          </button>
          <button
            @click="saveUnit"
            :disabled="!isFormValid || loading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import service langsung di komponen popup
import masterUnitService from '@/services/masterUnitService'

export default {
  name: 'AddPopupMu',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // Optional: parent unit ID jika ini adalah child unit
    defaultParentUnitId: {
      type: [String, Number],
      default: null,
    },
    // Current user ID untuk created_by dan updated_by
    currentUserId: {
      type: [String, Number],
      default: 1,
    },
  },
  data() {
    return {
      isVisible: false,
      loading: false,
      error: null,
      success: null,
      formData: {
        unit_code: '',
        unit_name: '',
        description: '',
        parent_unit_id: 0,
        address: '',
        phone: '',
        email: '',
        manager_id: 0,
        status: '',
        created_by: 1,
        updated_by: 1,
      },
    }
  },
  computed: {
    isFormValid() {
      return (
        this.formData.unit_code.trim() !== '' &&
        this.formData.unit_name.trim() !== '' &&
        this.formData.status !== ''
      )
    },
  },
  methods: {
    showPopup() {
      this.isVisible = true
      this.resetForm()
      this.clearMessages()
    },
    closePopup() {
      this.isVisible = false
      this.clearMessages()
      this.$emit('close')
    },
    resetForm() {
      this.formData = {
        unit_code: '',
        unit_name: '',
        description: '',
        parent_unit_id: this.defaultParentUnitId || 0,
        address: '',
        phone: '',
        email: '',
        manager_id: 0,
        status: 'Active', // Default to Active
        created_by: this.currentUserId || 1,
        updated_by: this.currentUserId || 1,
      }
    },
    clearMessages() {
      this.error = null
      this.success = null
    },

    // Debug method untuk melihat response structure
    debugResponse(response) {
      console.group('🔍 API Response Debug')
      console.log('Full Response:', response)
      console.log('Response Status:', response?.status)
      console.log('Response Data:', response?.data)
      console.log('Response Headers:', response?.headers)
      console.groupEnd()
    },
    async saveUnit() {
      if (!this.isFormValid) {
        return
      }

      this.loading = true
      this.clearMessages()

      try {
        // Siapkan data untuk API sesuai dengan request body yang diminta
        const apiData = {
          unit_code: this.formData.unit_code.trim(),
          unit_name: this.formData.unit_name.trim(),
          description: this.formData.description.trim() || '',
          parent_unit_id: this.formData.parent_unit_id || 0,
          address: this.formData.address.trim() || '',
          phone: this.formData.phone.trim() || '',
          email: this.formData.email.trim() || '',
          manager_id: this.formData.manager_id || 0,
          status: this.formData.status,
          created_by: this.formData.created_by,
          updated_by: this.formData.updated_by,
        }

        console.log('Sending data:', apiData) // Debug log

        // Panggil API service
        const response = await masterUnitService.create(apiData)

        console.log('API Response:', response) // Debug log

        // Periksa response dengan lebih teliti
        if (response && response.status >= 200 && response.status < 300) {
          // Cek berbagai struktur response yang mungkin
          const responseData = response.data

          // Jika response sukses berdasarkan status code HTTP
          if (
            responseData &&
            (responseData.status === 'success' ||
              responseData.success === true ||
              !responseData.error)
          ) {
            this.success = 'Unit berhasil ditambahkan!'

            // Emit success event dengan data yang baru dibuat
            this.$emit('save', {
              ...apiData,
              id:
                responseData.data?.unit_id ||
                responseData.data?.id ||
                responseData.unit_id ||
                responseData.id ||
                null,
              apiResponse: responseData.data || responseData,
            })

            // Tutup popup setelah delay singkat
            setTimeout(() => {
              this.closePopup()
            }, 1500)
          } else {
            // Response structure menunjukkan error meskipun HTTP status OK
            this.error =
              responseData?.message ||
              responseData?.error ||
              'Gagal menambahkan unit. Silakan coba lagi.'
          }
        } else {
          // Status code bukan 2xx
          this.error = 'Gagal menambahkan unit. Status: ' + response.status
        }
      } catch (error) {
        console.error('Error creating unit:', error)

        // Jika error tapi data tetap tersimpan (status 2xx dengan error message)
        if (error.response && error.response.status >= 200 && error.response.status < 300) {
          // Data berhasil disimpan tapi ada warning/error message
          this.success = 'Unit berhasil ditambahkan!'
          this.error = null // Clear error karena data berhasil disimpan

          // Emit success event
          this.$emit('save', {
            ...apiData,
            id:
              error.response.data?.data?.unit_id ||
              error.response.data?.data?.id ||
              error.response.data?.unit_id ||
              error.response.data?.id ||
              null,
            apiResponse: error.response.data?.data || error.response.data,
          })

          setTimeout(() => {
            this.closePopup()
          }, 1500)
        } else {
          // Handle error yang sesungguhnya
          if (error.response && error.response.data) {
            const errorData = error.response.data

            if (errorData.message) {
              this.error = errorData.message
            } else if (errorData.errors) {
              // Handle validation errors
              const errorMessages = Object.values(errorData.errors).flat().join(', ')
              this.error = errorMessages
            } else if (errorData.error) {
              this.error = errorData.error
            } else {
              this.error = 'Terjadi kesalahan pada server'
            }
          } else if (error.response) {
            // Handle HTTP status errors
            switch (error.response.status) {
              case 422:
                this.error = 'Data tidak valid. Periksa kembali form Anda.'
                break
              case 409:
                this.error = 'Unit code sudah ada. Gunakan kode unit yang berbeda.'
                break
              case 500:
                this.error = 'Terjadi kesalahan server. Silakan coba lagi nanti.'
                break
              default:
                this.error = `Terjadi kesalahan (${error.response.status}). Silakan coba lagi.`
            }
          } else {
            this.error = 'Terjadi kesalahan koneksi. Periksa koneksi internet Anda.'
          }
        }
      } finally {
        this.loading = false
      }
    },
    // Validation helpers
    validateEmail(email) {
      if (!email) return true // Optional field
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    validatePhone(phone) {
      if (!phone) return true // Optional field
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      return phoneRegex.test(phone)
    },
  },
  watch: {
    visible: {
      handler(newVal) {
        if (newVal) {
          this.showPopup()
        } else {
          this.isVisible = false
        }
      },
      immediate: true,
    },
    defaultParentUnitId: {
      handler(newVal) {
        if (newVal !== null && newVal !== undefined) {
          this.formData.parent_unit_id = newVal
        }
      },
      immediate: true,
    },
    currentUserId: {
      handler(newVal) {
        if (newVal) {
          this.formData.created_by = newVal
          this.formData.updated_by = newVal
        }
      },
      immediate: true,
    },
    // Real-time validation
    'formData.email'(newVal) {
      if (newVal && !this.validateEmail(newVal)) {
        this.error = 'Format email tidak valid'
      } else if (this.error === 'Format email tidak valid') {
        this.error = null
      }
    },
    'formData.phone'(newVal) {
      if (newVal && !this.validatePhone(newVal)) {
        this.error = 'Format nomor telepon tidak valid'
      } else if (this.error === 'Format nomor telepon tidak valid') {
        this.error = null
      }
    },
  },
  mounted() {
    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.closePopup()
      }
    })
  },
}
</script>

<style scoped>
/* Custom select arrow positioning */
select {
  background-image: none;
}

/* Focus styles */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Transition untuk smooth animations */
.transition-colors {
  transition:
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}

/* Modal animation */
.add-parent-popup .fixed {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.add-parent-popup .bg-white {
  animation: slideIn 0.15s ease-out;
}

@keyframes slideIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Loading animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
