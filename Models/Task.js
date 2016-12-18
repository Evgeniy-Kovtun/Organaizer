/**
 * Created by jeck on 16.12.16.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionsModel = new Schema({
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    Name: String,
    ADate: {type: Date, default: Date.now},
    Place: String,
    Actives: {type: String, default: "true"},
    Regularity: {type: String, default: "false"},
    Description: String
});
const MeetsModel = new Schema({
    Name: String,
    ADate: {type: Date, default: Date.now},
    Place: String,
    Regularity: {type: String, default: "false"},
    Description: String
});
const NotesModel = new Schema({
    Name: String,
    Date: {type: Date, default: Date.now},
    Tags: String,
    Description: String
});
const UserModel = new Schema({
    name:  String,
    surname: String,
    avatar:{ type: String, default: '/images/avatars/no-avatar_jpg.jpg' },
    email:  String,
    tel: { type: String, default: '-'},
    skype: { type: String, default: '-'},
    password: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});
const connection = mongoose.createConnection('mongodb://localhost:27017/actions');
const Actions = connection.model('Actions', ActionsModel),
    Meets = connection.model('Meets', MeetsModel),
    Notes = connection.model('Notes', NotesModel);
    User = connection.model('User', UserModel);
module.exports.Actions = Actions;
module.exports.Meets = Meets;
module.exports.Notes = Notes;
