import {PostsRepository} from "./postsRepository";
import {PostsQueryRepository} from "./postQueryRepository";
import {PostService} from "./postService";
import {BlogsRepository} from "../blogFeature/blogsRepository";
import {PostsController} from "./postsController";
import {BlogsQueryRepository} from "../blogFeature/blogsQueryRepository";

const postsRepository = new PostsRepository();
const postsQueryRepository = new PostsQueryRepository();
const blogsRepository = new BlogsRepository();
const blogsQueryRepository = new BlogsQueryRepository();
const postService = new PostService(postsRepository, blogsRepository);
export const postsController = new PostsController(postService, blogsQueryRepository, postsQueryRepository);
