const Room = require("../models/Room");
const User = require("../models/User");



const addNewRoom = async (req, res) => {
    const { userId } = req.params;
    const {
        residentType,
        rent,
        maxTenant,
        roomType,
        tenantType,
        floorNumber,
        roomPrivacy,
        bathroomPrivacy,
        furnitureFacility,
        furnitureFacilityValues,
        waterFacilty,
        gasFacilty,
        internetFacilty,
        accessbility,
        address
    } = req.body;

    console.log("dataa",
        residentType,
        rent,
        maxTenant,
        roomType,
        tenantType,
        floorNumber,
        roomPrivacy,
        bathroomPrivacy,
        furnitureFacility,
        furnitureFacilityValues,
        waterFacilty,
        gasFacilty,
        internetFacilty,
        accessbility,
        address

    )
    // TODO - add data validation
    // TODO - validate req.files
    const imagesArray = []
    if (req.files.length > 0) {
        req.files?.map((item) => {
            const path = item.path.replace(/\\/g, '/');
            imagesArray.push(path)
        })
    }

    const parsedWaterFacilty = JSON.parse(waterFacilty);
    const parsedGasFacilty = JSON.parse(gasFacilty);
    const parsedInternetFacilty = JSON.parse(internetFacilty);
    const parsedAccessbility = JSON.parse(accessbility);
    const parsedAddress = JSON.parse(address);
    // console.log("imagesArray",imagesArray)
    try {
        const newRoom = new Room({
            userId,
            residentType,
            rent,
            maxTenant,
            roomType,
            tenantType,
            images: imagesArray,
            floorNumber,
            roomPrivacy,
            bathroomPrivacy,
            furnitureFacility,
            furnitureFacilityValues,
            waterFacilty: parsedWaterFacilty,
            gasFacility: parsedGasFacilty,
            internetFacilty: parsedInternetFacilty,
            accessbility: parsedAccessbility,
            address: parsedAddress
        });

        const savedRoom = await newRoom.save();
        return res.status(201).json({ message: "new room created", data: savedRoom });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}


const getSingleRoom = async (req, res) => {
    const { roomId } = req.params;
    // TODO add validation for room id
    try {
        const room = await Room.findById(roomId);
        // TODO  return 404 if room not exist
        return res.status(200).json({ message: "room retrieved succesfull", data: room });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" });
    }
}

const getAllRoom = async (req, res) => {

    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        // TODO  handle if no rooms there
        return res.status(200).json({ message: "all rooms retrieved", data: rooms });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const removeRoom = async (req, res) => {
    const { roomId } = req.params;
    // TODO is user authentic
    console.log("roomId", roomId);
    try {
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "room not found" })
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        const updateUser = await User.findByIdAndUpdate(room.userId,{ $pull: { visitors: { roomId } }},{new:true}
        );
        console.log("updateUser", updateUser.visitors)

        return res.status(200).json({ message: "room deleted succesfully", data: deletedRoom });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const updateRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
        return res.status(200).json({ message: "room updated successfully", data: updatedRoom })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const bookRoom = async (req, res) => {
    const { userId, roomId } = req.params;
    // TODO validate data
    // TODO verify roomid 

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { bookedRooms: roomId } }, { new: true });

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "room not found" })
        }
        const newVisitor = {
            visitorId: userId,
            roomId
        }
        const updatedRoomOwner = await User.findByIdAndUpdate(room.userId, { $push: { visitors: newVisitor } }, { new: true });

        return res.status(200).json({ message: "room booked succesfully", data: updatedUser, updateOwner: updatedRoomOwner });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const cancelBookedRoom = async (req, res) => {
    const { userId, roomId } = req.params;
    // TODO validate data
    // TODO verify roomid 
    try {

        const room = await Room.findById(roomId);

        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { bookedRooms: roomId } }, { new: true });

        const updatedRoomOwner = await User.findOneAndUpdate(
            room.userId,
            { $pull: { visitors: { visitorId: userId, roomId } } },
            { new: true }
        );

        return res.status(200).json({ message: "room booking canceled", data: updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const filterRooms = async (req, res) => {
    const {
        roomType,
        residentType,
        rent,
        tenantType,
        maxTenant,
        floorNumber,
        roomPrivacy,
        bathroomPrivacy,
        furnitureFacility,
        accessbility //  JSON string in the request query
    } = req.query;



    const filterObj = {};

    if (residentType !== "null" && residentType) {
        filterObj.residentType = residentType;
    }
    if (rent !== "null" && rent) {
        filterObj.rent = { $lte: parseInt(rent) }; // Ensure rent is parsed as an integer
    }
    if (maxTenant !== "null" && maxTenant) {
        filterObj.maxTenant = { $lte: parseInt(maxTenant) };
    }
    if (roomType !== "null" && roomType) {
        const regex = new RegExp(roomType, 'i');
        filterObj.roomType = regex;
    }
    if (tenantType !== "null" && tenantType) {
        filterObj.tenantType = { $in: Array.isArray(tenantType) ? tenantType : [tenantType] };
    }
    if (floorNumber !== "null" && floorNumber) {
        console.log(typeof floorNumber);
        console.log(floorNumber);
        filterObj.floorNumber = parseInt(floorNumber);
    }
    if (roomPrivacy !== "null" && roomPrivacy) {
        filterObj.roomPrivacy = roomPrivacy;
    }
    if (bathroomPrivacy !== "null" && bathroomPrivacy) {
        filterObj.bathroomPrivacy = bathroomPrivacy;
    }
    if (furnitureFacility !== "null" && furnitureFacility) {
        filterObj.furnitureFacility = furnitureFacility;
    }

    try {
        const parsedaccessbility = JSON.parse(accessbility);
        const accessbilityFilter = [];
        if (parsedaccessbility.parking) {
            accessbilityFilter.push({ 'accessbility.parking': true });
        }
        if (parsedaccessbility.lift) {
            accessbilityFilter.push({ 'accessbility.lift': true });
        }
        if (parsedaccessbility.wheelramp) {
            accessbilityFilter.push({ 'accessbility.wheelramp': true });
        }
        if (parsedaccessbility.petallowed) {
            accessbilityFilter.push({ 'accessbility.petallowed': true });
        }

        // Build the $or condition for accessbility properties
        if (accessbilityFilter.length > 0) {
            filterObj.$or = accessbilityFilter;
        }


        const filteredRooms = await Room.find(filterObj);
        return res.status(200).json({ message: "filtered rooms retrieved", data: filteredRooms });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}


module.exports = {
    addNewRoom,
    getSingleRoom,
    getAllRoom,
    removeRoom,
    updateRoom,
    bookRoom,
    cancelBookedRoom,
    filterRooms,

}