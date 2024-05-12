import {body} from "express-validator";
import {LikeStatus} from "./commentsTypes";

export const commentValidation = body('content').trim().isString().bail().isLength({min: 20, max: 300}).bail().notEmpty().bail()

export const likeValidation = body('likeStatus').trim().isString().bail().isIn([LikeStatus.Dislike, LikeStatus.Like, LikeStatus.None]).bail()
