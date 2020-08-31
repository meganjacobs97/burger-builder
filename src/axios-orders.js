import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-d1512.firebaseio.com/"
});

export default instance; 