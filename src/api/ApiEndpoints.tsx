import axios from "axios";


const axiosEnv = axios.create({
    baseURL: process.env.REACT_BASE_URL || `http://localhost:${process.env.PORT || 8080}/`,
})


export const LoginApp = (email: string) => {
    return axiosEnv.post("login", email)
}