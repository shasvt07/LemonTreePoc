import mongoose from "mongoose";

const DLSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    validity:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        default:'https://cirrusindia.co.in/wp-content/uploads/2016/10/dummy-profile-pic-male1.jpg'
    },

},
{timestamps : true}
);

export default mongoose.model("drivingLicense", DLSchema);