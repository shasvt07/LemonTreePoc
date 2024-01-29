import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    adhaarNumber:{
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

export default mongoose.model("Adhaar", UserDataSchema);