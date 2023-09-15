import axios from 'axios'
import { Memory } from './types'

export async function getMemories() {
    return axios.get('http://localhost:4001/memories/')
}

export async function createMemory(payload:Memory) {
    axios.post('http://localhost:4001/memories/', {
        ...payload
    })
}

export async function deleteMemory(memoryId:number) {
    axios.post(`http://localhost:4001/memories/${memoryId}`)
}
