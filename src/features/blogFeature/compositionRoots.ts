import {BlogService} from "./blogService";
import {BlogsQueryRepository} from "./blogsQueryRepository";
import {BlogsController} from "./blogsController";

const blogService = new BlogService();
const blogsQueryRepository = new BlogsQueryRepository();
export const blogsController = new BlogsController(blogService, blogsQueryRepository);
