import userModel from "../models/user-model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user dosn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "invalid password" })
        }

        const token = createTocken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "somthing went wrong" })
    }

}

const createTocken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //check if user is already exist
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "user is already exist" })
        }

        //validate email & strong passwaor
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a stromg password" })
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createTocken(user._id)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "somthing went wrong" })
    }
}


export { loginUser, registerUser, };