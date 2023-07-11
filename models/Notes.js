const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    description: {
        type: String
       
    },
   tag:{
         type: String,
        default: "General"
   },
    date: {
        type: Date,
        default: Date.now
    }

  }
);

module.exports = mongoose.model('notes', NotesSchema); 
// 'user' is the name of the collection in the database and UserSchema is the schema that we defined above
