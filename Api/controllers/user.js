const Room = require("../models/Room");
const User = require("../models/User");

const getUser = async (req, res) => {
    console.log("in get user");
    return res.status(200).json("all ok")

}

const getAllBookedRooms = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select("bookedRoom").populate("bookedRooms");
        return res.status(200).json({ message: "all booked room retrieved ", data: user.bookedRooms })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const updateRoomToWishlist = async (req, res) => {
    const { userId, roomId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if roomId already exists in the wishlist
        const roomIndex = user.wishlist.indexOf(roomId);
        if (roomIndex !== -1) {
            // Room already exists in the wishlist, remove it
            user.wishlist.splice(roomIndex, 1);
            await user.save();
            return res.status(200).json({ message: "Removed room from wishlist", data: user.wishlist });
        } else {
            // Room does not exist in the wishlist, add it
            user.wishlist.push(roomId);
            await user.save();
            return res.status(200).json({ message: "Added room to wishlist", data: user.wishlist });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const removeFromWishlist = async (req,res)=>{
    const { userId, roomId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if roomId already exists in the wishlist
        const roomIndex = user.wishlist.indexOf(roomId);
        if (roomIndex !== -1) {
            // Room already exists in the wishlist, remove it
            user.wishlist.splice(roomIndex, 1);
            await user.save();
            return res.status(200).json({ message: "Removed room from wishlist", data: user.wishlist });
        }
        else{
            return res.status(400).json({ message: "room not exist in  wishlist"});
        }
    }
        catch(error){
            console.log(error)
            return res.status(500).json({message:"internal server error"});
        }


}
const getVisitors = async (req,res)=>{
    const {userId} = req.params;
    try{
        const visitors = await User.findById(userId).populate({
            path: 'visitors',
            populate: {
                path: 'visitorId roomId',
            }
        });
        return res.status(200).json({message:"all visitors retrieved",data:visitors});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}


const cancelVisit = async(req,res)=>{
    const {userId,visitorId,roomId} = req.params;
    console.log("roomId",roomId)
    try{
        const updatedUser = await User.findOneAndUpdate(
            { 'visitors._id': visitorId }, 
            { $pull: { visitors: { _id: visitorId } } }, 
            { new: true } 
        );
        if(!updatedUser){
            return res.status(404).json({message:"visit not found"})
        }

        console.log("visitorId",visitorId)
        const user = await User.findByIdAndUpdate(userId,{$pull:{bookedRooms:roomId}},{new:true});

        console.log("removedVisit",user);

        // console.log("updatedUser",updatedUser)
        return res.status(200).json({message:"visit canceled"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}

const getWishlist = async(req,res)=>{
    const {userId} = req.params;

    try{
        const user = await User.findById(userId).populate("wishlist");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json({message:"wishlist retrieved successfully",data:user.wishlist});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}


const getUsersRooms = async (req,res)=>{
    const {userId}  = req.params;

    try{
        const rooms = await Room.find({userId});
        
        return res.status(200).json({message:"users all room retrieved",data:rooms});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}
module.exports = {
    getUser,
    getAllBookedRooms,
    updateRoomToWishlist,
    getVisitors,
    cancelVisit,
    getWishlist,
    removeFromWishlist,
    getUsersRooms

}