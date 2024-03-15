const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,

    },
    password: {
        type: String,
        require: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    bookedRooms: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Room"
    },
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Room"
        }
    ],
    visitors: [
        {
            visitorId: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            roomId: {
                type: mongoose.Schema.ObjectId,
                ref: "Room"
            }
        }
    ],


},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
