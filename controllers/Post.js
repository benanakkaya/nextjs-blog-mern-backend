import Post from "../models/Post.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const NewPost = async (req, res) => {
  try {
    const { title, subtitle, content, category, author, image } = req.body;

    const { userID } = jwt.verify(author, "SECRET_KEY");

    const NewPost = await Post.create({
      title,
      subtitle,
      content,
      category,
      image,
      author: userID,
    });

    await User.findByIdAndUpdate(userID, { $push: { posts: NewPost._id } });

    return res
      .status(201)
      .json({ message: "Post created successfully", post: NewPost });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const GetPost = async (req, res) => {
  const { postID } = req.query;

  const post = await Post.findById(postID)
    .populate("author")
    .populate("category");

  return res.status(200).json(post);
};

export const GetMyPosts = async (req, res) => {
  const { token } = req.query;

  const { userID } = jwt.verify(token, "SECRET_KEY");

  if (!userID) {
    return res.status(500).json({ message: "Token is wrong" });
  }

  console.log(userID);

  const posts = await Post.find({ author: userID })
    .populate("author")
    .populate("category").sort({createdAt: -1})

  console.log(posts);

  return res.status(200).json(posts);
};

export const GetLastPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(12).populate("author").populate("category");
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const SetPostViews = async (req,res) => {
    const {postID} = req.body;

    await Post.findByIdAndUpdate(postID,{ $inc: { viewsCount: 1 } })

    return res.status(200);

}

export const GetPopularPosts = async (req,res) => {

    const posts = await Post.find().sort({viewsCount:-1}).limit(3).populate("category");

    return res.status(200).json(posts);
}


export const GetCategoryPosts = async (req,res) => {

    const {categoryID} = req.query;

    const posts = await Post.find({category:categoryID}).sort({createdAt: -1}).populate("category").populate("author");

    return res.status(200).json(posts);
}
