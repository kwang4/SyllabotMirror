import styles from './NcsuHeader.module.css';
const axios = require('axios');
const BASE_API_URL = "https://localhost/api";
const APIModule = {
        get: async (endpoint) =>{
            console .log(BASE_API_URL+endpoint);
            const response = await axios.get(BASE_API_URL+endpoint).catch(error=>{console.log(error)});
            return response;
        },
        post: async (endpoint, data) => {   
            console.log(`POST request to: ${BASE_API_URL + endpoint}`);
            const response = await axios.post(BASE_API_URL + endpoint, data).catch(error => { console.log(error);
            return {
                status: error.response ? error.response.status : 500
            };
            });
            return response;
        }
}

export default APIModule;