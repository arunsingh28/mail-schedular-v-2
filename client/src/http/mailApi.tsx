import axios from 'axios'

const mailApi = axios.create({
    baseURL: 'http://localhost:4000',
})

export const fetchMail = async () => {
    const { data } = await mailApi.get('/list')
    return data
}

export const deleteMail = async (id: string) => {
    const { data } = await mailApi.delete(`/delete/${id}`)
    return data
}

export const createMail = async (mail: any) => {
    const { data } = await mailApi.post('/create', mail)
    return data
}

export const updateMail = async (id: string, time: string, date: string) => {
    const { data } = await mailApi.put(`/update/${id}`, { time, date })
    return data
}