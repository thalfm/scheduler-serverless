const AWS = require('./AWS')
// Para teste
// const ep = new AWS.Endpoint('http://192.168.0.104:4566');
//

const CloudWatchEvents = new AWS.CloudWatchEvents({apiVersion: '2015-10-07'})

module.exports = CloudWatchEvents