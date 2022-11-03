require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");

// database connection
const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("could not connect to database")
    }
}

database();

// middlewares
app.use(express.json())
app.use(cors())

// routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`))