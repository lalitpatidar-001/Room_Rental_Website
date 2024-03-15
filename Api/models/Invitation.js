const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    user: { // invitation sender
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    guest: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room"
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("Invitation", InvitationSchema);
