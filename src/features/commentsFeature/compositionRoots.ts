import {CommentsRepository} from "./commentsRepository";
import {CommentsService} from "./commentsService";
import {CommentsQueryRepository} from "./commentsQueryRepository";
import {CommentsController} from "./commentsController";
import {UsersRepository} from "../usersFeature/usersRepository";

const commentsRepository = new CommentsRepository();
const commentsQueryRepository = new CommentsQueryRepository();
const usersRepository = new UsersRepository();
const commentsService = new CommentsService(commentsRepository, usersRepository);

export const commentsController = new CommentsController(commentsService, commentsQueryRepository);
