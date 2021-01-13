import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-builder-f166a-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;