import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    chats:{
        type:Array,
        default:[]
    },
    sende_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
},{
    timestamps:true
})


export const Messages = mongoose.model('messages',messageSchema)