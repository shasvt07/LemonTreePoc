import Bookings from "../models/bookings.js";

export const bookingidSearch = async (req, res) => {
    try {
        const booking = await Bookings.findOne({ bookingId: req.query.bookingId});
        if(booking)
            res.status(200).json(Boolean(true));
        else
            res.status(200).json(Boolean(false));
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export const bookingnameSearch = async(req,res) => {
    try {
        const booking = await Bookings.findOne({ name: req.query.bookingName});
        if(booking)
            res.status(200).json(Boolean(true));
        else
            res.status(200).json(Boolean(false));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const addDetails = async(req,res) => {
    try{
        const booking = new Bookings(req.body);
        await booking.save();
        res.status(200).json(booking);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}


export const getDetails = async(req,res) => {
    console.log(req.query.bookingName)
    try{
        const booking = await Bookings.findOne({name: req.query.bookingName});
        if(!booking)
            res.status(401).json({ message: "No booking found" });
        else
            res.status(200).json(booking);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const editBookingDeatails = async(req,res) => {
    const {bookingName, guestName,idUploaded, editedGuestName} = req.body;
    try{
        const booking = await Bookings.findOne({name: bookingName});
        if(!booking)
            res.status(401).json({ message: "No booking found" });

        booking.guestList.map((guest) => {
            if(guest.name === guestName){
                guest.idUploaded = idUploaded;
                guest.name = editedGuestName;
            }
        })
    await Bookings.findOneAndUpdate({name: bookingName},booking,{new: true});
        res.status(200).json(booking);

    }catch(error){
        res.status(400).json({ message: error.message });
    }
}
