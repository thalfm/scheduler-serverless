const axios = require('axios')
const settings = require('../config/settings')

const API = axios.create({
    baseURL: settings.URL_API_SIGECO
});

module.exports = API