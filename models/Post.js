import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0
    }
},{timestamps:true})

export default mongoose.model("Post", BlogSchema);