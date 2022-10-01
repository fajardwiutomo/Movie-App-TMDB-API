import User from "../../models/users/Users.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(!user) {
            throw {
                code: 400,
                name: "Unauthorized",
                message: "username or email or password must required",
              };
        }

        // compare password
        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if(!isPassword){
            throw {
                code: 401,
                name: "Unauthorized",
                message: "Invalid username, email or password",
              };
        }

        //create token to save cookies
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        // const {password, isAdmin, ...otherDetails} = user._doc
        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // }).status(200).json({otherDetails})
        res.status(200).json({
            access_token: token,
          });
    } catch (error) {
        next(error)
    }
}
