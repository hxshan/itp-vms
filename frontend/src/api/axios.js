import axios from "axios";
const BASE_URL='http://localhost:3000/api'

export default axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

//http://localhost:3000/api
//once backend is hosted baseURL:'http://165.22.213.22/api'