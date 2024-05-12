import {CommentsRepository} from "./commentsRepository";
import {CommentsService} from "./commentsService";
import {CommentsQueryRepository} from "./commentsQueryRepository";
import {CommentsController} from "./commentsController";

const commentsRepository = new CommentsRepository();
const commentsQueryRepository = new CommentsQueryRepository();
const commentsService = new CommentsService(commentsRepository);
export const commentsController = new CommentsController(commentsService, commentsQueryRepository);
