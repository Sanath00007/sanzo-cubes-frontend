import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9092/cube"
});

export default api;