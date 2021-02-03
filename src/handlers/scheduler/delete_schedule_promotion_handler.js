const {deleteRule, removeTargets} = require("../common");

const deleteSchedulers = async (loteToDeleteSchedule) => {

    let schedulers = [];

    for (const [_, lote] of loteToDeleteSchedule.lotes.entries()) {
        await removeTargets(lote)

        const data = await deleteRule(lote)

        schedulers.push(data)
    }

    return schedulers;
}

module.exports.main = async (event) => {

    try {
        const loteToDeleteSchedule = JSON.parse(event.body)

        const data = await deleteSchedulers(loteToDeleteSchedule)

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        console.log(error)
        switch (error.code) {
            case 'ResourceNotFoundException':
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'Recurso não encontrado'
                    })
                }
                break;
            default:
                return {
                    statusCode: 500,
                    body: 'Error'
                }
        }
    }
};