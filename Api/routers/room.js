const router = require('express').Router();
const { addNewRoom, getSingleRoom, getAllRoom, removeRoom, updateRoom, bookRoom, cancelBookedRoom, filterRooms } = require("../controllers/room");
const uploadImages = require('../utils/multer');

router.post("/add-room/:userId",uploadImages.array('images', 6),addNewRoom);
router.get("/get-room/:roomId",getSingleRoom);
router.get("/all-rooms/",getAllRoom);
router.delete("/remove-room/:roomId",removeRoom);
router.put("/update-room/:roomId",updateRoom);
router.put("/book-room/:roomId/:userId",bookRoom);
router.put("/cancel-room/:roomId/:userId",cancelBookedRoom);

router.get("/filter-rooms/",filterRooms);


module.exports = router;