import api from './axiosInstance'

export default {
  // Ambil semua unit
  async getAll() {
    return await api.get('/api/v1/unit')
  },

  // Ambil unit berdasarkan ID
  async getById(id) {
    return await api.get(`/api/v1/unit/${id}`)
  },

  // Buat unit baru
  async create(data) {
    return await api.post('/api/v1/unit', data)
  },

  // Update unit
  async update(id, data) {
    return await api.put(`/api/v1/unit/${id}`, data)
  },

  // Hapus unit
  async delete(id) {
    return await api.delete(`/api/v1/unit/${id}`)
  },
}
