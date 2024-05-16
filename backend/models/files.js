 import mongoose from "mongoose";

const content = new mongoose.Schema({
    videoName:{
        type:String,
        require:true
    },
    videoType:{
        type:String,
        require:true
    },
    hostName:{
        type:String,
        require:true
    },
    contactNo:{
        type:Number
    },
    videoUrl:{
        type:String
    }

},{timestamps:true});

export const Video= mongoose.model("Video", content);