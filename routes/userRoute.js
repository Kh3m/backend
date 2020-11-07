import express from 'express'
import User from '../models/userModel'
import { getToken } from '../util'


const router = express.Router()
router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            fName: 'Chibuike2',
            lName: 'Chibyke',
            email: 'example2@example.com',
            password: '12345',
            isAdmin: true
        })

        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        res.send({ msg: error.message })
    }
})

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.fName,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ message: "Invalid email or password" })
    }
})
router.post("/register", async (req, res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    })
    const newUser = await user.save()

    if (newUser) {
        res.send({
            _id: newUser.id,
            fName: newUser.fName,
            lName: newUser.lName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({ message: "Invalid user data" })
    }
})
export default router