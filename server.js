import express from 'express';
import data from './data.js';
import config from './config'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'
import axios from 'axios'
// const axios = require('axios')

// require('dotenv').config()
// const fetch = require('node-fetch');
const app = express();
dotenv.config()

const mongodburl = config.MONGODB
const tp_token = config.TRAVELPAYOUTS
const rapid_api = config.RAPIDAPI
const tp_url = config.TP_URL

mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason))
// const tp_token = process.env.REACT_APP_TRAVELPAYOUTS_API
// const rapid_api = process.env.REACT_APP_RAPID_API

app.use("/api/users", userRoute)
app.get("/api/cities", (req, res) => {
    res.send(data.cities);
});
app.get("/api/airlines", (req, res) => {
    res.send(data.airlines);
});
app.get("/api/flights", (req, res) => {
    let origin = req.query.origin
    let dest = req.query.destination
    let departure = req.departureDate
    let arrival = req.returnDate
    // let url = "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/"
    let url = "https://test.com"

    axios({
        "method": "GET",
        "url": url,
        // "headers": {
        //     "content-type": "application/octet-stream",
        //     "x-access-token": tp_token,
        //     "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
        //     "x-rapidapi-key": rapid_api,
        //     "useQueryString": true
        // }, 
        "params": {
            "destination": dest,
            "origin": origin,
            "depart_date": departure,
            "return_date": arrival
        }
    })
        .then((response) => {
            res.send(JSON.stringify(response.data))
            // console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
})



app.listen(5000, () => console.log("Server started at http://localhost:5000"));
