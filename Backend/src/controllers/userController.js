import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// create jwt token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "user already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};

export { registerUser };
