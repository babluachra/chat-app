import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            patricipants:{ $all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                patricipants:[senderId,receiverId],

            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //  here we add socet io


        // this wil run one by one
        await conversation.save();
        await newMessage.save();

        // this will run in parallel 
        
        // await Promise.all(conversation.save(),newMessage.save());
        

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("error in send message control",error.message);
        res.status(500).json({
            error:"internal server error"
        })
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} =req.params;
        const senderId= req.user._id;
        const conversation = await Conversation.findOne({
            patricipants: {$all:[senderId, userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("error in get message controller",error.message);
        res.status(500).json({
            error:"internal server error"
        })
    }
}