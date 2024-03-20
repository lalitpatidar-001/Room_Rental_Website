const Invitation = require("../models/Invitation");
const User = require("../models/User");

const sentInvitation = async(req,res)=>{
    const {userId,roomId,guestId} = req.params;

    try{
        const newInvitaion  = new Invitation({
            user:userId,
            room:roomId,
            guest:guestId
        });

        const savedInvitation = await newInvitaion.save();
        const updatedGuest = await User.findByIdAndUpdate(guestId,{$pull:{bookedRooms:roomId}});
        
        const updatedInviter = await User.findByIdAndUpdate(userId,{$pull:{visitors:{visitorId: guestId}}})
        return res.status(201).json({message:"invitaion sent successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}

const getAllInvitaions = async (req,res)=>{
    const {userId} = req.params; // guest id

    try{
        const invitations = await Invitation.find({guest:userId}).populate("user guest room");
        return res.status(200).json({message:"all invitaions retireved",data:invitations});
    }catch(error){  
        console.log(error);
        res.status(500).json({message:"internal server error"});

    }
}
module.exports = {
    sentInvitation,
    getAllInvitaions
}