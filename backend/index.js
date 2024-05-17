//step-1
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import multer from "multer";
import {Video} from "./models/files.js"

databaseConnection();

dotenv.config({
    path: ".env"
})

const app = express();
//middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

const middleware = async (req, res, next) => {
    console.log("middleware", req.body);
    next();
}
// api
app.use("/api/user", middleware, userRoute);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './videos');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFilename =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
        cb(null, newFilename);
    },
});
const upload = multer({ storage: storage });

// Routes
app.post(
    "/api/user/upload",
    upload.single('file'),
    async (req, res) => {
        try {
            console.log(req.query);
            const { videoName, videoType, hostName, contactNo } = req.query;
            console.log( req.query);
            const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
            console.log(videoUrl)
            const newVideo = new Video({
                videoName: videoName,
                videoType: videoType,
                hostName: hostName,
                contactNo: contactNo,
                videoUrl: videoUrl,
            });
            console.log(newVideo)
            await newVideo.save();
            res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
);


app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
});



