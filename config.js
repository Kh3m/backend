require("dotenv").config()
export default {
    TRAVELPAYOUTS: process.env.REACT_APP_TRAVELPAYOUTS_API,
    RAPIDAPI: process.env.RAPID_API,
    MONGODB: process.env.MONGODB_URL || 'mongodb://localhost/flightapp',
    TP_URL: process.env.TP_URL,
    JWT_SECRET: process.env.SECRET_ACCESS || 'anythingsecret'
}