const cwevents = require('../libs/CloudWatchEvents')
const settings = require('../config/settings')
const {STS} = require('../libs/AWS')

const createRule = async (lote, date) => {
    const Name = _createRuleName(lote)
    const ScheduleExpression = _createCronAwsByMoment(date)
    const State = 'ENABLED'
    let rules = await cwevents
        .putRule({Name, ScheduleExpression, State})
        .promise();

    return {
        lote: Name,
        data: date.format(),
        regraArn: rules.RuleArn
    }
}

const deleteRule = async (lote) => {
    const Name = _createRuleName(lote)

    const params = {
        Name,
        Force: true
    };

    await cwevents
        .deleteRule(params)
        .promise();

    return {
        lote: Name
    }
}

const createTargets = async (lote) => {

    const account = await _getAccount()

    const targetParams = {
        Rule: _createRuleName(lote),
        Targets: [
            {
                Id: 'default',
                Arn: `arn:aws:lambda:${settings.AWS_REGION}:${account}:function:sigeco-promocao-serverless-promotion-activator-${settings.APP_ENV}`,
                Input: JSON.stringify(lote)
            }
        ]
    };

    await cwevents
        .putTargets(targetParams)
        .promise();
}

const removeTargets = async (lote) => {
    const Name = _createRuleName(lote)

    const params = {
        Ids: ['default'],
        Rule: Name,
        Force: true
    };

    return await cwevents
        .removeTargets(params)
        .promise();
}

/** cron(Minutos,    Horas,    Dia do mês,    Mês,    Dia da semana,    Ano) */
const _createCronAwsByMoment = (date) => {
    return `cron(${date.minutes()} ${date.hour()} ${date.date()} ${date.month() + 1} ? ${date.year()})`
}
/** ${stage}_promocao_lote_{id_lote}*/
const _createRuleName = (lote) => {
    return `promocao_lote_${lote.id_lote}_${settings.APP_ENV}`
}

const _getAccount = async () => {
    const sts = new STS();
    const { Account: account} = await sts.getCallerIdentity({}).promise();

    return account;
}

module.exports = {
    createRule,
    deleteRule,
    createTargets,
    removeTargets
}

