import axios from "axios";

const hei = axios.create({});

hei.interceptors.request.use();
