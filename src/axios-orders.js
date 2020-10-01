import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-2-b6453.firebaseio.com/"
});

export default instance; 