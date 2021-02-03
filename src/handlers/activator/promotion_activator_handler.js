const moment = require('moment')
const API = require('../../libs/API')
const settings = require('../../config/settings')
const {deleteRule, removeTargets} = require("../common");

module.exports.main = async (event, context, callback) => {
    console.log('Executando a promoção agendada');

    const data_hora = new moment().subtract(3, 'h').format('YYYY-MM-DD HH:mm:ss')

    try {
        console.log('Excluindo o agendamento')
        await removeTargets(event)

        await deleteRule(event)

        const bodyLogin = {
            'st_login': settings.USER_SIGECO,
            'st_senha': settings.PWD_USER_SIGECO
        }

        const headers = {
            Authorization: ``,
            'User-Agent': 'GCO@',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        const config = {
            headers: headers
        }
        console.log('Efetuando o login')
        const responseLogin = await API.post(`/auth/login`,bodyLogin, config)

        const token = responseLogin.data.token

        config.headers.Authorization = `Bearer ${token}`

        console.log('Ativando a promoção')
        const response = await API.post(`/ativar-promocao`,{data_hora}, config)

        console.log(response.data)

        callback(null, 'Finished');
    } catch (error) {
        switch (error.code) {
            case 'ResourceNotFoundException':
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'A promoção foi ativada, nenhum recurso para excluir'
                    })
                }
                break;
            default:
                console.log(error.response.data.error || error.response.data || error.response)
                return {
                    statusCode: 500,
                    body: 'Error'
                }
        }
    }
};
