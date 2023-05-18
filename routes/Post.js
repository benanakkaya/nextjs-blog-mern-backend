import express from "express";
import { GetCategoryPosts, GetLastPosts, GetMyPosts, GetPopularPosts, GetPost, NewPost, SetPostViews } from "../controllers/Post.js";

const route = express.Router();

route.post("/new-post", NewPost)
route.get("/get-post", GetPost)
route.get("/get-my-posts", GetMyPosts)
route.get("/get-popular-posts", GetPopularPosts)
route.get("/get-last-posts", GetLastPosts)
route.get("/get-category-posts", GetCategoryPosts)
route.post("/set-post-views", SetPostViews)


export default route;