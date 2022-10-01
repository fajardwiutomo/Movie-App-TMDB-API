import User from "../../models/users/Users.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(201).json('User has been created')
    } catch (error) {
        next(error)
    }
}
