import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/v1/auth'

export default {
  async login(payload) {
    const response = await axios.post(`${API_URL}/login`, payload)
    return response.data
  },
}
