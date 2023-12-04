const axios = require('axios');
const BASE_API_URL = "https://localhost/api";
        async function get (endpoint, responseType='json'){
            console .log(BASE_API_URL+endpoint);
            const response = await axios.get(BASE_API_URL+endpoint,{responseType: responseType}).catch(error=>{console.log(error)});
            return response;
        }
        async function post (endpoint, data) {   
            console.log(`POST request to: ${BASE_API_URL + endpoint}`);
            const response = await axios.post(BASE_API_URL + endpoint, data).catch(error => { console.log(error);
            return {
                status: error.response ? error.response.status : 500
            };
            });
            return response;
        }
        async function del (endpoint){
            console .log(BASE_API_URL+endpoint);
            const response = await axios.delete(BASE_API_URL+endpoint).catch(error=>{console.log(error)});
            return response;
        }
       
        module.exports = {
            get,
            post,
            del
          };