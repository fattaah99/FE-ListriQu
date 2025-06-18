<template>
  <div class="edit-popup-mu">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Edit Unit</h3>
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
              <span class="text-gray-600">Updating...</span>
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
            <!-- Unit ID (readonly) -->
            <div hidden>
              <label class="block text-sm font-medium text-gray-700 mb-1">Unit ID</label>
              <input
                type="text"
                v-model="formData.id"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed text-sm"
              />
            </div>

            <!-- Kode Unit -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Kode Unit <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="formData.kode"
                required
                placeholder="Masukkan kode unit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                :disabled="loading"
              />
            </div>

            <!-- Nama Unit -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nama Unit <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="formData.nama"
                required
                placeholder="Masukkan nama unit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                :disabled="loading"
              />
            </div>

            <!-- Type Unit -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Type Unit <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
                  :disabled="loading"
                >
                  <option value="">Pilih Type</option>
                  <option value="Regional">Regional</option>
                  <option value="Cabang">Cabang</option>
                  <option value="Unit">Unit</option>
                  <option value="Departemen">Departemen</option>
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

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.status"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
                  :disabled="loading"
                >
                  <option value="">Pilih Status</option>
                  <option value="Active">Aktif</option>
                  <option value="Inactive">Tidak Aktif</option>
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

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                v-model="formData.description"
                rows="3"
                placeholder="Masukkan deskripsi unit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                :disabled="loading"
              ></textarea>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea
                v-model="formData.address"
                rows="2"
                placeholder="Masukkan alamat unit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                :disabled="loading"
              ></textarea>
            </div>

            <!-- Phone & Email (2 columns) -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                <input
                  type="tel"
                  v-model="formData.phone"
                  placeholder="021-123-4567"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  :disabled="loading"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  v-model="formData.email"
                  placeholder="unit@company.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- Manager ID & Parent Unit ID (2 columns) -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Manager ID -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Manager ID</label>
                <input
                  v-model.number="formData.manager_id"
                  type="number"
                  placeholder="0"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  :disabled="loading"
                />
              </div>

              <!-- Parent Unit ID -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Parent Unit ID</label>
                <input
                  v-model.number="formData.parent_unit_id"
                  type="number"
                  placeholder="0"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  :disabled="loading"
                />
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
            @click="handleSave"
            :disabled="!isFormValid || loading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Updating...</span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPopUpMu',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    unitData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      error: null,
      success: null,
      formData: {
        id: '',
        kode: '',
        nama: '',
        type: '',
        status: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        manager_id: '',
        parent_unit_id: '',
      },
    }
  },
  computed: {
    isFormValid() {
      return (
        this.formData.kode.trim() !== '' &&
        this.formData.nama.trim() !== '' &&
        this.formData.type !== '' &&
        this.formData.status !== ''
      )
    },
  },
  watch: {
    unitData: {
      handler(newData) {
        if (newData && Object.keys(newData).length > 0) {
          this.formData = {
            id: newData.id || '',
            kode: newData.kode || '',
            nama: newData.nama || '',
            type: newData.type || '',
            status: newData.status || '',
            description: newData.description || '',
            address: newData.address || '',
            phone: newData.phone || '',
            email: newData.email || '',
            manager_id: newData.manager_id || '',
            parent_unit_id: newData.parent_unit_id || '',
          }
        }
      },
      immediate: true,
      deep: true,
    },
    isVisible(newVal) {
      if (newVal) {
        this.clearMessages()
      }
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
  methods: {
    async handleSave() {
      if (!this.isFormValid) {
        this.error = 'Mohon lengkapi semua field yang wajib diisi'
        return
      }

      this.loading = true
      this.clearMessages()

      try {
        // Validate email and phone if provided
        if (this.formData.email && !this.validateEmail(this.formData.email)) {
          this.error = 'Format email tidak valid'
          return
        }

        if (this.formData.phone && !this.validatePhone(this.formData.phone)) {
          this.error = 'Format nomor telepon tidak valid'
          return
        }

        // Prepare data untuk dikirim ke API
        const updateData = {
          unit_code: this.formData.kode,
          unit_name: this.formData.nama,
          description: this.formData.description,
          type: this.formData.type,
          status: this.formData.status,
          address: this.formData.address,
          phone: this.formData.phone,
          email: this.formData.email,
          manager_id: this.formData.manager_id,
          parent_unit_id: this.formData.parent_unit_id,
        }

        // Emit event ke parent component
        this.$emit('save', {
          id: this.formData.id,
          data: updateData,
        })

        // Show success message
        this.success = 'Data berhasil diperbarui!'

        // Close popup after delay
        setTimeout(() => {
          this.closePopup()
        }, 1500)
      } catch (error) {
        console.error('Error saving data:', error)
        this.error = 'Terjadi kesalahan saat menyimpan data'
      } finally {
        this.loading = false
      }
    },

    closePopup() {
      this.$emit('close')
      this.clearMessages()
    },

    clearMessages() {
      this.error = null
      this.success = null
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
.edit-popup-mu .fixed {
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

.edit-popup-mu .bg-white {
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
