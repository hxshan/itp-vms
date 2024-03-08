import axios from "axios";

export default axios.create({
    baseURL:'http://localhost:3000/api'
})
//once backend is hosted baseURL:'http://165.22.213.22:3000/api'