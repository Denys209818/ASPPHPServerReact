import axios from "axios";


export default axios.create({
    //http://127.0.0.1:8000/
    //http://localhost:8000/
    baseURL:'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json'
    }
});