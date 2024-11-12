const axios = require('axios');
// const { apiEndpoint } = require('../config/config');

// const apiClient = axios.create({
//     baseURL: apiEndpoint,
//     timeout: 5000,
// });

async function postStatus(url, data) {
    try {
        // await apiClient.post('/', data);
        // await axios.post(url, data)
        console.log('Status posted successfully:', data);
    } catch (error) {
        console.error('Error posting to API:', error.message);
    }
}

module.exports = { postStatus };
