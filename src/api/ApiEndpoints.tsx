import axios from "axios";
import { LoginResponse } from "../interfaces/login";


const axiosEnv = axios.create({
    baseURL: process.env.REACT_APP_USE_DEV_ENDPOINT ? `http://localhost:${process.env.PORT || 8080}/` : "https://api.cs.mrg.com.pe/api-u-group01/" ,
    headers:{
        "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json"
    }
})


export const LoginApp = (email: string | undefined, token: string): Promise<LoginResponse> => {
    return axiosEnv.post("login", {email}, { headers: { Authorization: token } })
}