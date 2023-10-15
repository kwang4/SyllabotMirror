import styles from './NcsuHeader.module.css';
const axios = require('axios');
const APIModule = {
        get: async (url) =>{
            const response = await axios.get('https://localhost/api/shib').catch(error=>{console.log(error)});
            return response.data;
        }
}

export default APIModule;