import axios from "axios"

const token = "f004603e-3f93-49d7-8982-c4b73bde5933"
const apiKey = "a7553069-750f-4ed7-b12e-43ded9f28663"

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})