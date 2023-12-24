import express from "express";
import {getFeedPosts, getUserPosts , likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { verify } from "jsonwebtoken";

const router = express.Router();

//READ
//get user feed when we are in homepage- get all posts from database

router.get("/",verifyToken,getFeedPosts); 
router.get("/:userId/posts",verifyToken,getUserPosts); //get relevent users post


//UPDATE

router.patch("/:id/like",verifyToken,likePost); //for liking and unliking posts

export default router;