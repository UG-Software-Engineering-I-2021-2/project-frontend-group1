import axios from "axios";
import { CoursesResponse } from "../interfaces/courses";
import { LoginResponse } from "../interfaces/login";
import { RubricResponse } from "../interfaces/rubric";

const BASE_URL = "https://api.cs.mrg.com.pe/api-u-group01/"

const axiosEnv = axios.create({
    baseURL: process.env.REACT_APP_USE_DEV_ENDPOINT ? `http://localhost:${process.env.PORT || 8080}/` : BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || ""
    }
})

axiosEnv.interceptors.request.use((request) => {
    request.headers = {
        Authorization: localStorage.getItem("token") || ""
    }
    return request;
})

export const LoginApp = (token: string): Promise<LoginResponse> => {
    return axios.post(`${BASE_URL}login`, null, {
        headers: {
            Authorization: token,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        }
    })
}

export const GetCourses = (): Promise<CoursesResponse> => {
    const role = localStorage.getItem("role")
    return axiosEnv.post("/courses_username", { "semester": "2021 - 2" , "role": role})
}


export const GetRubrics = (code: string): Promise<RubricResponse> => {
    const role = localStorage.getItem("role")
    return axiosEnv.post("/rubrics_course", { "semester": "2021 - 2", "courseCode": code, "role": role})
}

export const CreateRubric = (courseCode: string, rubricCode: string) => {
    return axiosEnv.get(`/rubric_creation/?semester=2021 - 2&courseCode=${courseCode}&rubricCode=${rubricCode}`)
}