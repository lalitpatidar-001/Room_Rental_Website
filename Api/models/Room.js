const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    residentType: {
        type: String,
        require: true,
        enum: ["PG","Flat", "GirlsPG", "BoysPG", "Room", "BoysHostel"]
    },
    rent: {
        type: Number,
        require: true
    },
    maxTenant: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    images: [String],
    tenantType: {
        type: [String],
        require: true,
        enum: ['Boys', 'Girls', 'Couple', 'Married', 'Family', 'Bachelor', "Any"]
    },
    floorNumber: {
        type: Number,
        required: true,
        default: 0
    },
    roomPrivacy: {
        type: String,
        enum: ["Private", "Shared", "Flat"]
    },
    bathroomPrivacy: {
        type: String,
        enum: ["Private", "Common"]
    },
    furnitureFacility: {
        type: String,
        enum: ["Not Furnished", "Semi Furnished", "Full Furnished"]
    },
    furnitureFacilityValues: {
        type: String
    },
    waterFacilty: {
        isFee: {
            type: Boolean,
            default: false
        },
        rent: {
            type: Number
        }
    },
    gasFacility: {
        isFee: {
            type: Boolean,
            default: false
        },
        rent: {
            type: Number
        }
    },
    internetFacilty: {
        isFee: {
            type: Boolean,
            default: false
        },
        rent: {
            type: Number
        }
    },
    accessbility: {
        parking: { type: Boolean },
        lift: { type: Boolean },
        wheelramp: { type: Boolean },
        petallowed: { type: Boolean },
    },
    address: {
        name: {
            type: String
        },
        contact: {
            type: String
        },
        city: {
            type: String
        },
        district: {
            type: String
        },
        state: {
            type: String
        },
        area: {
            type: String
        },
        pincode: {
            type: String
        }
    }

},
    { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);