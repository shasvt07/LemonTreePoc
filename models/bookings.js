import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date,
        default:Date.now()
    },
    adults:{
        type:Number,
        default:0
    },
    children:{
        type:Number,
        default:0
    },
    deluxRooms:{
        type:Number,
        default:0
    },
    basicRooms:{
        type:Number,
        default:0

    },
    luxuryRooms:{
        type:Number,
        default:0

    },
    guestList:{
        type:Array,
        default:[]
    },
},
{timestamps : true}
);

export default mongoose.model("Bookings", bookingSchema);