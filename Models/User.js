
var connection = mongoose.createConnection('mongodb://localhost:27017/actions');

module.exports.Actions = connection.model('Actions', ActionsModel);