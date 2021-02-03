const env = require('env-var')
const settings = {
    APP_ENV: env.get('APP_ENV').required().asString(),
    URL_API_SIGECO: env.get('URL_API_SIGECO').required().asString(),
    AWS_REGION: env.get('AWS_REGION').required().asString(),
    USER_SIGECO: env.get('USER_SIGECO').asString(),
    PWD_USER_SIGECO: env.get('PWD_USER_SIGECO').asString(),
}

module.exports = settings