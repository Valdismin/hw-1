import {BlogService} from "./blogService";
import {BlogsQueryRepository} from "./blogsQueryRepository";
import {BlogsController} from "./blogsController";
import {BlogsRepository} from "./blogsRepository";

const blogsRepository = new BlogsRepository();
const blogService = new BlogService(blogsRepository);
const blogsQueryRepository = new BlogsQueryRepository();
export const blogsController = new BlogsController(blogService, blogsQueryRepository);
