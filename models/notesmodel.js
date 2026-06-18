
 import mongoose  from "mongoose";

 const notesSchema = new mongoose.Schema({
   user: {
   type:mongoose.Schema.Types.ObjectId,
  ref: "UserModel",
  required: true
},
  topic: {
     type:String,
     required: true
  },
    classLevel: String,
    examType: String,

    revisionMode: {
      type: Boolean,
      default: false
    },

    includeChart: Boolean,
    includeDiagram: Boolean,

    content: {
      type: mongoose.Schema.Types.Mixed, 
      required : true
    }
     
 },{timestamps:true})
 const Notes = mongoose.model("NotesModel" , notesSchema)

 export default Notes;