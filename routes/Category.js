import express from "express"
import { GetCategories, GetCategory, NewCategory } from "../controllers/Category.js";

const route = express.Router();

route.post("/new-category", NewCategory);
route.get("/get-categories", GetCategories);
route.get("/get-category", GetCategory);


export default route;