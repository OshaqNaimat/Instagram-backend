import { Messages } from "../models/messageModal"

export const sendMessage = async(req,res)=>{
    const {message} = req.body
    const {sender_id,receiver_id} = req.params

    // check if any message exists
   let findChat = await Messages.findOne({
    sender_id,receiver_id
   })

   if(!findChat){
    let newChat = await Messages.create({
        chats:chat.push({message,sender_id,receiver_id}),
        sender_id,
        receiver_id 
    })
    res.send(newChat)
   }else{
    findChat.chats.push({message,sender_id,receiver_id})
    res.send(findChat)
   }

}