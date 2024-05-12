import {PostsRepository} from "./postsRepository";
import {PostsQueryRepository} from "./postQueryRepository";
import {PostService} from "./postService";
import {BlogsRepository} from "../blogFeature/blogsRepository";
import {PostsController} from "./postsController";
import {BlogsQueryRepository} from "../blogFeature/blogsQueryRepository";
import {CommentsRepository} from "../commentsFeature/commentsRepository";
import {CommentsService} from "../commentsFeature/commentsService";
import {CommentsQueryRepository} from "../commentsFeature/commentsQueryRepository";

const postsRepository = new PostsRepository();
const postsQueryRepository = new PostsQueryRepository();
const blogsRepository = new BlogsRepository();
const blogsQueryRepository = new BlogsQueryRepository();
const postService = new PostService(postsRepository, blogsRepository);
const commentsRepository = new CommentsRepository();
const commentsQueryRepository = new CommentsQueryRepository();
const commentsService = new CommentsService(commentsRepository);
export const postsController = new PostsController(postService, blogsQueryRepository, postsQueryRepository, commentsService, commentsQueryRepository);
