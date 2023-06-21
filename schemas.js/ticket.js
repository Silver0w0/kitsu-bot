const {model, Schema} = require('mongoose')

let ticket = new Schema({
  Guild: String,
  Channel: String,
  Message: String,
  Reaction: String
})

module.exports = model('welcomeSchema', ticket)