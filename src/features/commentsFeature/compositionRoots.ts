import {CommentsRepository} from "./commentsRepository";
import {CommentsService} from "./commentsService";
import {CommentsQueryRepository} from "./commentsQueryRepository";
import {CommentsController} from "./commentsController";
import {UsersRepository} from "../usersFeature/usersRepository";
import {JWTService} from "../authFeature/JWTService";
import {RefreshTokenRepository} from "../authFeature/refreshTokenRepository";

const commentsRepository = new CommentsRepository();
const commentsQueryRepository = new CommentsQueryRepository();
const usersRepository = new UsersRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const jwtService = new JWTService(refreshTokenRepository);
const commentsService = new CommentsService(commentsRepository, usersRepository);

export const commentsController = new CommentsController(commentsService, commentsQueryRepository, jwtService);
