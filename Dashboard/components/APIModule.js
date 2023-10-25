import styles from './NcsuHeader.module.css';
const axios = require('axios');
const BASE_API_URL = "https://localhost/api";
const APIModule = {
        get: async (endpoint) =>{
            console .log(BASE_API_URL+endpoint);
            const response = await axios.get(BASE_API_URL+endpoint).catch(error=>{console.log(error)});
            return response;
        }
}

export default APIModule;