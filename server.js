import express from 'express';
import data from './data.js';
const app = express();

app.get("/api/cities", (req, res) => {
    res.send(data.cities);
});
app.listen(5000, () => console.log("Server started at http://localhost:5000"));
