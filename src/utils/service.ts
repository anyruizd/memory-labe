import axios from 'axios'
import { Memory } from './types'

const baseUrl = 'http://localhost:4001'

export async function getMemories() {
    return axios.get(`${baseUrl}/memories/`)
}

export async function createMemory(payload:Memory) {
    axios.post(`${baseUrl}/memories/`, {
        ...payload
    })
}

export async function deleteMemory(memoryId:number) {
    axios.delete(`${baseUrl}/memories/${memoryId}`)
}

export async function updateMemory(memoryId:number, payload:Memory) {
    axios.put(`${baseUrl}/memories/${memoryId}`, {
        ...payload
    })
}
