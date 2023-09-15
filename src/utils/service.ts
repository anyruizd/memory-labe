import axios from 'axios'
import { Memory } from './types'

const baseUrl = 'http://localhost:4001'

export async function getMemories(userId: number) {
  return axios.get(`${baseUrl}/users/${userId}/memories`)
}

export async function createMemory(payload: Memory) {
  axios.post(`${baseUrl}/memories/`, {
    ...payload,
  })
}

export async function deleteMemory(memoryId: number) {
  axios.delete(`${baseUrl}/memories/${memoryId}`)
}

export async function updateMemory(memoryId: number, payload: Memory) {
  axios.put(`${baseUrl}/memories/${memoryId}`, {
    ...payload,
  })
}

export async function createUser(userName: string) {
  return axios.post(`${baseUrl}/users/`, {
    name: userName,
  })
}
