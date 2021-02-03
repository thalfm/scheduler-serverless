const moment = require('moment')
const {createRule, createTargets} = require("../common");

const createSchedulers = async (lotesToSchedule) => {

    let schedulers = [];

    for (const [_, lote] of lotesToSchedule.lotes.entries()) {
        let date = new moment(lote.horario_promocao).add(3, 'h')
        let params = await createRule(lote, date)

        await createTargets(lote)

        schedulers.push(params)
    }

    return schedulers;
}

module.exports.main = async (event) => {

    try {
        const lotesToSchedule = JSON.parse(event.body)

        const data = await createSchedulers(lotesToSchedule)

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: 'Error'
        }
    }
};