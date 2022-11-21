const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
{
    fullName: String,
    lastName: String,
    email: {
        unique: true,
        type: String,
    },
    password: String,
    mobile: String,
    role: {
        type: Number,
        default: 0,
    },
 },

        {
            timestamps: true,
        }
);

            const userModel = mongoose.model("user", userSchema)
            module.exports = userModel;