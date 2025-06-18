<template>
  <!-- Main Content -->
  <main class="flex-1 bg-gray-50 overflow-auto">
    <div class="">
      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 mb-6">
        <button
          @click="showAddChildPopup"
          class="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span class="text-sm font-medium">Add Child</span>
        </button>
        <button
          @click="showAddParentPopup"
          class="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span class="text-sm font-medium">Add Parent</span>
        </button>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-lg border border-gray-200">
        <!-- Table Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            <!-- Toggle Checkbox Button (Hamburger Menu) -->
            <button
              @click="toggleCheckboxes"
              class="text-gray-400 hover:text-gray-600 p-1 transition-colors"
              :class="{ 'text-blue-600': showCheckboxes }"
              title="Toggle checkboxes"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
            </button>
            <span class="text-lg font-medium text-gray-900">Master Unit</span>
          </div>
          <div class="flex items-center space-x-3">
            <button
              v-if="showCheckboxes"
              @click="deleteSelectedUnits"
              class="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors"
              :disabled="selectedUnits.length === 0 || loading"
              :class="{ 'opacity-50 cursor-not-allowed': selectedUnits.length === 0 || loading }"
            >
              <span v-if="loading">Deleting...</span>
              <span v-else>Delete ({{ selectedUnits.length }})</span>
            </button>
            <button
              class="text-gray-400 hover:text-gray-600 p-2"
              @click="fetchUnits"
              :disabled="loading"
              title="Refresh data"
            >
              <svg
                class="w-5 h-5 transition-transform duration-200"
                :class="{ 'animate-spin': loading }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            </button>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search child..."
                v-model="searchQuery"
                @input="performSearch"
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                @click="performSearch"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-8">
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
              <span class="text-gray-600">Loading units...</span>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="flex justify-center items-center py-8">
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-red-400"
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
              <h3 class="mt-2 text-sm font-medium text-gray-900">Error loading data</h3>
              <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
              <button
                @click="fetchUnits"
                class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>

          <!-- Table -->
          <table v-else class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  v-if="showCheckboxes"
                  class="text-left px-4 py-3 text-sm font-medium text-gray-700"
                >
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                    @change="toggleAllUnits"
                    :checked="isAllSelected"
                    :indeterminate="isIndeterminate"
                  />
                </th>
                <th class="text-left px-4 py-3 text-sm font-medium text-gray-700">Nama Unit</th>
                <th class="text-left px-4 py-3 text-sm font-medium text-gray-700">Kode Unit</th>
                <th class="text-left px-4 py-3 text-sm font-medium text-gray-700">Unit Type</th>
                <th class="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                <th class="text-left px-4 py-3 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <!-- Show "No results found" message when search returns empty -->
              <tr v-if="filteredUnits.length === 0 && searchQuery.trim() !== ''">
                <td :colspan="showCheckboxes ? 6 : 5" class="px-4 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center space-y-2">
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <p>No results found for "{{ searchQuery }}"</p>
                  </div>
                </td>
              </tr>

              <!-- Parent and Child Rows with Accordion -->
              <template v-for="(unit, index) in filteredUnits" :key="unit.id">
                <!-- Parent Row -->
                <tr
                  class="hover:bg-gray-50 cursor-pointer"
                  :class="{
                    'bg-blue-50': showCheckboxes && selectedUnits.includes(unit.id),
                    'bg-gray-100': unit.children && unit.children.length > 0,
                  }"
                  @click="toggleAccordion(unit.id)"
                >
                  <td v-if="showCheckboxes" class="px-4 py-3" @click.stop>
                    <input
                      type="checkbox"
                      class="rounded border-gray-300"
                      :value="unit.id"
                      v-model="selectedUnits"
                    />
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">
                    <div class="flex items-center space-x-2">
                      <!-- Accordion Toggle Icon for Parent with Children -->
                      <div
                        v-if="unit.children && unit.children.length > 0"
                        class="w-4 h-4 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm"
                        :class="{
                          'bg-blue-100 border-blue-400': expandedUnits.includes(unit.id),
                          'bg-white': !expandedUnits.includes(unit.id),
                        }"
                      >
                        <svg
                          class="w-2.5 h-2.5 transition-colors duration-200"
                          :class="{
                            'text-blue-600': expandedUnits.includes(unit.id),
                            'text-gray-500': !expandedUnits.includes(unit.id),
                          }"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            v-if="!expandedUnits.includes(unit.id)"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                          />
                          <path
                            v-else
                            d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                          />
                        </svg>
                      </div>
                      <!-- Spacing for units without children -->
                      <div v-else class="w-4"></div>
                      <span class="font-medium" v-html="highlightMatch(unit.nama)"></span>
                    </div>
                  </td>
                  <td
                    class="px-4 py-3 text-sm text-gray-600"
                    v-html="highlightMatch(unit.kode)"
                  ></td>
                  <td
                    class="px-4 py-3 text-sm text-gray-600"
                    v-html="highlightMatch(unit.type)"
                  ></td>
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': unit.status === 'Active',
                        'bg-red-100 text-red-800': unit.status === 'Inactive',
                      }"
                    >
                      {{ unit.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.description }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.parent_unit_id }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.address }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.phone }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.email }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.manager_id }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.status }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">
                    {{ formatDate(unit.created_at) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">
                    {{ formatDate(unit.updated_at) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.created_by }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 hidden">{{ unit.updated_by }}</td>
                  <td class="px-4 py-3" @click.stop>
                    <button
                      @click="showEditPopup(unit)"
                      class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>

                <!-- Child Rows -->
                <template
                  v-if="
                    unit.children && (expandedUnits.includes(unit.id) || searchQuery.trim() !== '')
                  "
                >
                  <tr
                    v-for="child in unit.children"
                    :key="`child-${child.id}`"
                    class="hover:bg-gray-50 bg-gray-25"
                    :class="{ 'bg-blue-50': showCheckboxes && selectedUnits.includes(child.id) }"
                  >
                    <td v-if="showCheckboxes" class="px-4 py-3">
                      <input
                        type="checkbox"
                        class="rounded border-gray-300"
                        :value="child.id"
                        v-model="selectedUnits"
                      />
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-900">
                      <div class="flex items-center space-x-2 pl-6">
                        <!-- Child indicator -->
                        <svg
                          class="w-3 h-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                          ></path>
                        </svg>
                        <span v-html="highlightMatch(child.nama)"></span>
                      </div>
                    </td>
                    <td
                      class="px-4 py-3 text-sm text-gray-600"
                      v-html="highlightMatch(child.kode)"
                    ></td>
                    <td
                      class="px-4 py-3 text-sm text-gray-600"
                      v-html="highlightMatch(child.type)"
                    ></td>
                    <td class="px-4 py-3">
                      <span
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-green-100 text-green-800': child.status === 'Active',
                          'bg-red-100 text-red-800': child.status === 'Inactive',
                        }"
                      >
                        {{ child.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <button
                        @click="showEditPopup(unit)"
                        class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
          <!-- Left side - Showing entries info -->
          <div class="text-sm text-gray-700">Showing {{ getShowingText() }}</div>

          <!-- Right side - Pagination controls -->
          <div class="flex items-center space-x-2">
            <!-- Previous button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <!-- Page numbers -->
            <div class="flex items-center space-x-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="{
                  'bg-blue-600 text-white': page === currentPage,
                  'bg-white text-blue-600 hover:bg-blue-50': page !== currentPage,
                }"
                class="w-8 h-8 text-sm border border-gray-300 rounded flex items-center justify-center"
              >
                {{ page }}
              </button>
            </div>

            <!-- Next button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <EditPopUpMu
      :isVisible="isEditPopupVisible"
      :unitData="selectedEditUnit"
      @close="closeEditPopup"
      @save="handleEditSave"
    />

    <!-- Menjadi ini -->
    <AddPopUpMu :visible="isPopupVisible" @close="closePopup" @save="handleSave" />
    <AddChildPopupMu :visible="isPopupChildVisible" @close="closeChildPopup()" @save="handleSave" />
  </main>
</template>

<script>
import AddPopUpMu from '@/components/AddPopUpMu.vue'
import AddChildPopupMu from '@/components/AddChildPopupMu.vue'
import EditPopUpMu from '@/components/EditPopUpMu.vue'
export default {
  name: 'MasterUnitDashboard',
  data() {
    return {
      isPopupVisible: false, // ← INI YANG HILANG!,
      isPopupChildVisible: false, // ← INI YANG HILANG!,
      isEditPopupVisible: false, // Tambahkan state untuk edit popup
      selectedEditUnit: {}, // Tambahkan state untuk menyimpan data unit yang akan diedit
      savedData: null,
      searchQuery: '',
      selectedUnits: [],
      expandedUnits: [], // New array to track expanded accordion items
      currentPage: 1,
      itemsPerPage: 10,
      showUserDropdown: false,
      showCheckboxes: false,
      dropdowns: {
        dataMaster: true,
        disposal: false,
        transaction: false,
        information: false,
      },
      // API data will be loaded here
      units: [],
      loading: false,
      error: null,
    }
  },
  components: {
    AddPopUpMu,
    AddChildPopupMu,
    EditPopUpMu,
  },
  computed: {
    filteredUnits() {
      if (!this.searchQuery.trim()) {
        return this.units
      }

      const query = this.searchQuery.toLowerCase()
      const filtered = []

      this.units.forEach((unit) => {
        // Check if parent matches
        const parentMatches = this.matchesSearch(unit, query)

        // Check if any child matches
        let matchingChildren = []
        if (unit.children) {
          matchingChildren = unit.children.filter((child) => this.matchesSearch(child, query))
        }

        // Include unit if parent matches or has matching children
        if (parentMatches || matchingChildren.length > 0) {
          const unitCopy = { ...unit }

          // If parent doesn't match but children do, only show matching children
          if (!parentMatches && matchingChildren.length > 0) {
            unitCopy.children = matchingChildren
          }

          filtered.push(unitCopy)
        }
      })

      return filtered
    },
    totalPages() {
      return Math.ceil(this.filteredUnits.length / this.itemsPerPage)
    },
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    },
    isAllSelected() {
      const allIds = this.getAllUnitIds()
      return allIds.length > 0 && this.selectedUnits.length === allIds.length
    },
    isIndeterminate() {
      const allIds = this.getAllUnitIds()
      return this.selectedUnits.length > 0 && this.selectedUnits.length < allIds.length
    },
  },
  methods: {
    showEditPopup(unit) {
      this.selectedEditUnit = { ...unit } // Copy data unit untuk diedit
      this.isEditPopupVisible = true
    },

    closeEditPopup() {
      this.isEditPopupVisible = false
      this.selectedEditUnit = {}
    },

    async handleEditSave(payload) {
      try {
        // payload berisi { id, data }
        console.log('Updating unit:', payload)

        // Panggil method updateUnit yang sudah ada
        const result = await this.updateUnit(payload.id, payload.data)

        if (result) {
          console.log('Unit updated successfully:', result)
          // Data akan otomatis ter-refresh karena updateUnit() sudah memanggil fetchUnits()
        }
      } catch (error) {
        console.error('Error in handleEditSave:', error)
        alert('Gagal menyimpan perubahan data')
      }
    },

    showAddParentPopup() {
      this.isPopupVisible = true
    },
    showAddChildPopup() {
      this.isPopupChildVisible = true
    },
    closePopup() {
      this.isPopupVisible = false
    },
    closeChildPopup() {
      this.isPopupChildVisible = false
    },
    handleSave(data) {
      // Handle data yang dikirim dari popup
      console.log('Data received:', data)
      this.savedData = data

      // Di sini Anda bisa mengirim data ke API
      // this.createParentUnit(data)
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString('id-ID', {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    },
    // API Methods
    async fetchUnits() {
      this.loading = true
      this.error = null
      try {
        // Import the API service (you'll need to adjust the path based on your project structure)
        const unitAPI = await import('../services/masterUnitService') // ← path relatif sesuai lokasi file ini

        const response = await unitAPI.default.getAll()

        if (response.data && response.data.status === 'success') {
          this.units = this.transformApiData(response.data.data)
        } else {
          this.error = 'Failed to fetch units'
        }
      } catch (error) {
        console.error('Error fetching units:', error)
        this.error = 'Error loading data'
      } finally {
        this.loading = false
      }
    },

    transformApiData(apiData) {
      // Create a map to store all units by ID
      const unitMap = new Map()
      const transformedUnits = []

      // First pass: transform all units and create the map
      apiData.forEach((item) => {
        const unit = {
          id: item.unit_id,
          nama: item.unit_name,
          kode: item.unit_code,
          type: item.description || 'Unit', // Using description as type
          status: item.status,
          parent_id: item.parent_unit ? item.parent_unit.unit_id : null,
          children: [],
          // Store additional data for potential use
          address: item.address,
          phone: item.phone,
          email: item.email,
          manager: item.manager,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }

        unitMap.set(unit.id, unit)
      })

      // Second pass: build parent-child relationships
      unitMap.forEach((unit) => {
        if (unit.parent_id) {
          const parent = unitMap.get(unit.parent_id)
          if (parent) {
            parent.children.push(unit)
          }
        } else {
          // This is a root unit
          transformedUnits.push(unit)
        }
      })

      return transformedUnits
    },

    async createUnit(unitData) {
      try {
        const unitAPI = await import('../services/masterUnitService') // ← path relatif sesuai lokasi file ini
        const response = await unitAPI.default.create(unitData)

        if (response.data && response.data.status === 'success') {
          await this.fetchUnits() // Refresh the list
          return response.data
        }
      } catch (error) {
        console.error('Error creating unit:', error)
        throw error
      }
    },

    async updateUnit(unitId, unitData) {
      try {
        const unitAPI = await import('../services/masterUnitService') // ← path relatif sesuai lokasi file ini

        const response = await unitAPI.default.update(unitId, unitData)

        if (response.data && response.data.status === 'success') {
          await this.fetchUnits() // Refresh the list
          return response.data
        }
      } catch (error) {
        console.error('Error updating unit:', error)
        throw error
      }
    },

    async deleteUnit(unitId) {
      try {
        const unitAPI = await import('../services/masterUnitService') // ← path relatif sesuai lokasi file ini
        const response = await unitAPI.default.delete(unitId)

        if (response.data && response.data.status === 'success') {
          await this.fetchUnits() // Refresh the list
          return response.data
        }
      } catch (error) {
        console.error('Error deleting unit:', error)
        throw error
      }
    },

    async deleteSelectedUnits() {
      if (this.selectedUnits.length === 0) return

      if (confirm(`Are you sure you want to delete ${this.selectedUnits.length} selected units?`)) {
        try {
          this.loading = true
          const promises = this.selectedUnits.map((unitId) => this.deleteUnit(unitId))
          await Promise.all(promises)
          this.selectedUnits = []
          this.showCheckboxes = false
        } catch (error) {
          console.error('Error deleting units:', error)
          alert('Error deleting some units. Please try again.')
        } finally {
          this.loading = false
        }
      }
    },

    matchesSearch(unit, query) {
      return (
        unit.nama.toLowerCase().includes(query) ||
        unit.kode.toLowerCase().includes(query) ||
        unit.type.toLowerCase().includes(query) ||
        unit.status.toLowerCase().includes(query)
      )
    },
    highlightMatch(text) {
      if (!this.searchQuery.trim()) {
        return text
      }

      const query = this.searchQuery.trim()
      const regex = new RegExp(`(${query})`, 'gi')
      return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
    },
    performSearch() {
      // Reset to first page when searching
      this.currentPage = 1

      // Auto-expand units that have matching children when searching
      if (this.searchQuery.trim()) {
        this.filteredUnits.forEach((unit) => {
          if (unit.children && unit.children.length > 0) {
            const hasMatchingChild = unit.children.some((child) =>
              this.matchesSearch(child, this.searchQuery.toLowerCase()),
            )

            if (hasMatchingChild && !this.expandedUnits.includes(unit.id)) {
              this.expandedUnits.push(unit.id)
            }
          }
        })
      }
    },
    getShowingText() {
      const totalItems = this.filteredUnits.length
      if (totalItems === 0) {
        return 'Showing 0 entries'
      }

      const start = (this.currentPage - 1) * this.itemsPerPage + 1
      const end = Math.min(this.currentPage * this.itemsPerPage, totalItems)

      if (this.searchQuery.trim()) {
        return `Showing ${start} to ${end} of ${totalItems} filtered entries`
      }

      return `Showing ${start} to ${end} of ${totalItems} entries`
    },
    toggleDropdown(dropdownName) {
      this.dropdowns[dropdownName] = !this.dropdowns[dropdownName]
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
    },
    toggleCheckboxes() {
      this.showCheckboxes = !this.showCheckboxes
      if (!this.showCheckboxes) {
        this.selectedUnits = []
      }
    },
    toggleAccordion(unitId) {
      const index = this.expandedUnits.indexOf(unitId)
      if (index > -1) {
        this.expandedUnits.splice(index, 1)
      } else {
        this.expandedUnits.push(unitId)
      }
    },
    getAllUnitIds() {
      const ids = []
      this.filteredUnits.forEach((unit) => {
        ids.push(unit.id)
        if (unit.children) {
          unit.children.forEach((child) => {
            ids.push(child.id)
          })
        }
      })
      return ids
    },
    toggleAllUnits() {
      if (this.isAllSelected) {
        this.selectedUnits = []
      } else {
        this.selectedUnits = this.getAllUnitIds()
      }
    },
    logout() {
      if (confirm('Apakah Anda yakin ingin logout?')) {
        console.log('User logged out')
      }
      this.showUserDropdown = false
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        console.log(`Navigate to page ${page}`)
      }
    },
  },
  watch: {
    searchQuery() {
      // Automatically perform search as user types (debounced effect)
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.performSearch()
      }, 300)
    },
  },
  mounted() {
    // Load units when component mounts
    this.fetchUnits()

    document.addEventListener('click', (event) => {
      if (!this.$el.contains(event.target)) {
        this.showUserDropdown = false
      }
    })
  },
}
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Custom styling for indeterminate checkbox */
input[type='checkbox']:indeterminate {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

/* Light background for child rows */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
