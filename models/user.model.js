import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthdate: { type: Date },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "client","medecin"], default: "client" },
        picture : {type: String, default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"},
        gender: { type: String, enum: ["homme", "femme"], default: "homme" },
        phone : {type: String, maxLength:11 ,required: true},
        height : {type: Number},
        weight : {type: Number},
        location: {type: String},
        favorites :{type: Array, default: []},
        isVerified: { type: Boolean, default: false },
        isBanned: { type: Boolean, default: false },
        passwordResetToken: { type: String },
        speciality: { type: String},
        description: { type: String },
        disponibility: { type: String},
        rating: { type: Number, default: 0 },
        patients: { type: Array, default: [] }, 
        rendezVous: { type: Array, default: [] },
    },
    { timestamps: true}
); 


const User = mongoose.model("User", userSchema);


export default { User };
