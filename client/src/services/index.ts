import axios from "axios";
import { SERVER_URL, STORAGE_ACCESS_TOKEN } from "../utils";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000
})

// 请求拦截器，加上 accessHeader
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (!error.response) {
    return Promise.reject(error)
  }
  if (error.response?.data?.code === 401) {
    message.info(`登录查看完整历史记录`)
  }
  Promise.reject(error.response)
})

export interface PostGptGenerateParams {
  apiKey: string;
  baseUrl: string;
  model: string;
  prompt: string
}

/**
 * 根据 prompt 生成代码
 * @param params 
 * @returns 
 */
export async function postGptGenerate(params: PostGptGenerateParams) {
  return await axiosInstance.post('/generate', params)
}

/**
 * 获取生成历史
 * @returns 
 */
export async function getHistoryList() {
  return await axiosInstance.get('/history')
}

/**
 * 获取历史详细内容
 * @param id 
 * @returns 
 */
export async function getHistory(id: number) {
  return await axiosInstance.get(`/history/${id}`)
}


export interface PostLoginParams {
  username: string
  password: string
}

/**
 * 登录
 * @param params 
 * @returns 
 */
export async function postLogin(params: PostLoginParams) {
  return await axiosInstance.post('user/login', params)
}