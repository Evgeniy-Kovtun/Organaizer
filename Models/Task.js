/**
 * Created by jeck on 16.12.16.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionsModel = new Schema({
    Name: String,
    ADate:String,
    Place: String,
    Actives: {type: String, default: "true"},
    Regularity: {type: String, default: "false"},
    Description: String
});
const MeetsModel = new Schema({
    Name: String,
    MDate: String,
    Place: String,
    Regularity: {type: String, default: "false"},
    Description: String
});
const NotesModel = new Schema({
    Name: String,
    NDate: String,
    Tags: String,
    Description: String
});
const AdminsModel = new Schema({
    email:  String,
    password: String,
});
const connection = mongoose.createConnection('mongodb://localhost:27017/organaizer');

/*AdminModel.statics.findByEmail = (email, cb) => {
    return AdminModel.findOne({email: email}, cb);
};
*/
const Actions = connection.model('Actions', ActionsModel),
    Meets = connection.model('Meets', MeetsModel),
    Notes = connection.model('Notes', NotesModel);
    Admins = connection.model('Admins', AdminsModel);
module.exports.Actions = Actions;
module.exports.Meets = Meets;
module.exports.Notes = Notes;
module.exports.Admins = Admins;
