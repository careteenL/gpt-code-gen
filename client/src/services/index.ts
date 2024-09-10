import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8701',
  timeout: 10000
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