    import express from "express"
    import { getMyMessages, sendMessage } from "../controller/MessageController.js"

    export const messageRouter = express.Router()


    messageRouter.post('/send-message/:sender_id/:receiver_id',sendMessage)
    messageRouter.get('/get-message/:sender_id/:receiver_id',getMyMessages)