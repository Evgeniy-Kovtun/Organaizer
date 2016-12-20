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
const UserModel = new Schema({
    email:  String,
    password: String,
});
const connection = mongoose.createConnection('mongodb://localhost:27017/organaizer');
const Actions = connection.model('Actions', ActionsModel),
    Meets = connection.model('Meets', MeetsModel),
    Notes = connection.model('Notes', NotesModel);
    User = connection.model('User', UserModel);
module.exports.Actions = Actions;
module.exports.Meets = Meets;
module.exports.Notes = Notes;
