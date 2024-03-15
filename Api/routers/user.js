const { getUser, addAddress, getAllAddress, getAllBookedRooms, updateRoomToWishlist, getVisitors, cancelVisit, getWishlist, removeFromWishlist, getUsersRooms } = require('../controllers/user');
const { verifyAccessToken } = require('../utils/token');

const router = require('express').Router();

router.get("/getuser",verifyAccessToken ,getUser);
router.get("/booked-room/:userId",getAllBookedRooms);
router.get("/visitors/:userId",getVisitors);
router.get("/wishlist/:userId",getWishlist);
router.get("/users-rooms/:userId",getUsersRooms);
router.put("/cancel-visit/:visitorId/:userId/:roomId",cancelVisit);
router.put("/update-wishlist/:roomId/:userId",updateRoomToWishlist);
router.put("/remove-from-wishlist/:roomId/:userId",removeFromWishlist);


module.exports = router