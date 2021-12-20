import axios from "axios";
import { CoursesResponse } from "../interfaces/courses";
import { LoginResponse } from "../interfaces/login";
import { RubricResponse } from "../interfaces/rubric";
import { StudentsGradeResponse } from "../interfaces/students";

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

axiosEnv.interceptors.response.use(
    res => res,
    err => {    
        if(err?.response?.data?.error === "token not verified") {
            localStorage.setItem("ref", window.location.pathname + window.location.search)
            window.location.href = window.location.origin + "/login"
            console.log(window.location)
            console.log(window.location.search)
        }
    }
  )


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
    return axiosEnv.post("/courses_username", { "semester": "2021 - 2", "role": role })
}


export const GetRubrics = (code: string): Promise<RubricResponse> => {
    const role = localStorage.getItem("role")
    return axiosEnv.post("/rubrics_course", { "semester": "2021 - 2", "courseCode": code, "role": role })
}

export const GetRubricCreation = (courseCode: string, rubricCode: string) => {
    return axiosEnv.get(`/rubric_creation/?semester=2021 - 2&courseCode=${courseCode}&rubricCode=${rubricCode}`)
}

export const SaveRubric = (data: { title: string, content: any, activity: string, courseName: string, rubricCode: string, semester: string, courseCode: string }) => {
    return axiosEnv.post("/rubric_creation", { ...data, onlySave: true })
}

export const RubricReviewPetition = (data: { title: string, content: any, activity: string, courseName: string, rubricCode: string, semester: string, courseCode: string }) => {
    return axiosEnv.post("/rubric_creation", { ...data, onlySave: false })
}

export const RubricRevisionPetitionAccepted = (data: {
    rubricCode: string,
    semester: string,
    courseCode: string,
    courseName: string,
    title: string
}) => {
    return axiosEnv.post("/rubric_revision", { ...data, accepted: true, comment: "" })
}

export const RubricRevisionPetitionDecline = (data: {
    rubricCode: string,
    semester: string,
    courseCode: string,
    courseName: string,
    title: string,
    comment: string
}) => {
    return axiosEnv.post("/rubric_revision", { ...data, accepted: false })
}

export const GetRubricsForImport = (courseCode: string, rubricCode: string) => {
    return axiosEnv.get(`/rubric_import/?semester=2021 - 2&courseCode=${courseCode}&rubricCode=${rubricCode}`)
}

export const GetRubricInfoForGradeStudent = (courseCode: string,rubricCode: string) => {
    const role = localStorage.getItem("role")
    return axiosEnv.get(`/rubric_sections/?semester=2021 - 2&courseCode=${courseCode}&role=${role}&rubricCode=${rubricCode}`)
}

export const GetStudentsBySection = (courseCode: string, rubricCode: string, section: string | undefined) => {
    return axiosEnv.get(`/students_by_sections/?semester=2021 - 2&courseCode=${courseCode}&rubricCode=${rubricCode}&section=${section}`)
}

export const GetStudentsGradeBySection = (courseCode: string, rubricCode: string, studentCode: string): Promise<StudentsGradeResponse> => {
    return axiosEnv.get(`/rubric_grade/?semester=2021 - 2&courseCode=${courseCode}&rubricCode=${rubricCode}&studentCode=${studentCode}`)
}

export const RubricGradeSave = (content: any, rubricCode: string, courseCode: string, studentCode: string, studentGrade: string,competenceGrade: string,finished:boolean) => {
    return axiosEnv.post("/rubric_grade", {
        content: content,
        onlySave: true,
        rubricCode: rubricCode,
        semester: "2021 - 2",
        courseCode: courseCode,
        studentCode: studentCode,
        studentGrade: studentGrade,
        competenceGrade: competenceGrade,
        finished: finished

    })
}


export const RubricGradeSaveFinish = (rubricCode: string): Promise<StudentsGradeResponse> => {
    return axiosEnv.post(`/rubric_finish`, {
        "semester": "2021 - 2",
        rubricCode: rubricCode
    })
}