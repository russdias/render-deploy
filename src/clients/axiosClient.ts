import axios from 'axios'
import { RENDER_API_KEY, RENDER_API_URL } from '../consts'

export const axiosClient = axios.create({
  baseURL: RENDER_API_URL,
  headers: {
    Authorization: `Bearer ${RENDER_API_KEY}`
  }
})
