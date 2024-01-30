import mongoose from "mongoose";

const VisaSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    expireDate:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    passportNumber:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        default:'https://cirrusindia.co.in/wp-content/uploads/2016/10/dummy-profile-pic-male1.jpg'
    },
    country:{
        type:String,
        require:true
    },

},
{timestamps : true}
);

export default mongoose.model("visa", VisaSchema);