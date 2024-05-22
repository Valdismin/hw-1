import "reflect-metadata";
import {Container} from "inversify";
import {PostService} from "../features/postsFeature/postService";
import {PostsController} from "../features/postsFeature/postsController";
import {PostsRepository} from "../features/postsFeature/postsRepository";
import {PostsQueryRepository} from "../features/postsFeature/postQueryRepository";
import {AuthController} from "../features/authFeature/authController";
import {AuthService} from "../features/authFeature/authService";
import {JWTService} from "../features/authFeature/JWTService";
import {RefreshTokenRepository} from "../features/authFeature/refreshTokenRepository";
import {BlogsController} from "../features/blogFeature/blogsController";
import {BlogsRepository} from "../features/blogFeature/blogsRepository";
import {BlogsQueryRepository} from "../features/blogFeature/blogsQueryRepository";
import {BlogService} from "../features/blogFeature/blogService";
import {CommentsService} from "../features/commentsFeature/commentsService";
import {CommentsRepository} from "../features/commentsFeature/commentsRepository";
import {CommentsQueryRepository} from "../features/commentsFeature/commentsQueryRepository";
import {CommentsController} from "../features/commentsFeature/commentsController";
import {RecoveryPasswordRepository} from "../features/passwordRecoveryFeature/recoveryPasswordRepository";
import {SecurityService} from "../features/securityFeature/securityService";
import {SecurityController} from "../features/securityFeature/securityController";
import {SecurityQueryRepository} from "../features/securityFeature/securityQueryRepository";
import {SecurityRepository} from "../features/securityFeature/securityRepository";
import {ApiUsageRepository} from "../features/securityFeature/apiUsageRepository";
import {ApiUsageService} from "../features/securityFeature/apiUsageService";
import {UsersController} from "../features/usersFeature/usersController";
import {UsersService} from "../features/usersFeature/usersService";
import {UsersRepository} from "../features/usersFeature/usersRepository";
import {UsersQueryRepository} from "../features/usersFeature/usersQueryRepository";

export const TYPES = {
    PostService: PostService,
    PostsController: PostsController,
    PostsRepository: PostsRepository,
    PostsQueryRepository: PostsQueryRepository,
    AuthService: AuthService,
    AuthController: AuthController,
    JWTService: JWTService,
    RefreshTokenRepository: RefreshTokenRepository,
    BlogsController: BlogsController,
    BlogsQueryRepository: BlogsQueryRepository,
    BlogsRepository: BlogsRepository,
    BlogService: BlogService,
    CommentsService: CommentsService,
    CommentsController: CommentsController,
    CommentsRepository: CommentsRepository,
    CommentsQueryRepository: CommentsQueryRepository,
    RecoveryPasswordRepository: RecoveryPasswordRepository,
    SecurityService: SecurityService,
    SecurityController: SecurityController,
    SecurityQueryRepository: SecurityQueryRepository,
    SecurityRepository: SecurityRepository,
    ApiUsageRepository: ApiUsageRepository,
    ApiUsageService: ApiUsageService,
    UsersController: UsersController,
    UsersService: UsersService,
    UsersRepository: UsersRepository,
    UsersQueryRepository: UsersQueryRepository
};

export const container = new Container();

container.bind<PostService>(TYPES.PostService).to(PostService);
container.bind<PostsController>(TYPES.PostsController).to(PostsController);
container.bind<PostsRepository>(TYPES.PostsRepository).to(PostsRepository);
container.bind<PostsQueryRepository>(TYPES.PostsQueryRepository).to(PostsQueryRepository);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<JWTService>(TYPES.JWTService).to(JWTService);
container.bind<RefreshTokenRepository>(TYPES.RefreshTokenRepository).to(RefreshTokenRepository);

container.bind<BlogsController>(TYPES.BlogsController).to(BlogsController);
container.bind<BlogsQueryRepository>(TYPES.BlogsQueryRepository).to(BlogsQueryRepository);
container.bind<BlogsRepository>(TYPES.BlogsRepository).to(BlogsRepository);
container.bind<BlogService>(TYPES.BlogService).to(BlogService);

container.bind<CommentsService>(TYPES.CommentsService).to(CommentsService);
container.bind<CommentsController>(TYPES.CommentsController).to(CommentsController);
container.bind<CommentsQueryRepository>(TYPES.CommentsQueryRepository).to(CommentsQueryRepository);
container.bind<CommentsRepository>(TYPES.CommentsRepository).to(CommentsRepository);

container.bind<RecoveryPasswordRepository>(TYPES.RecoveryPasswordRepository).to(RecoveryPasswordRepository);

container.bind<SecurityService>(TYPES.SecurityService).to(SecurityService);
container.bind<SecurityController>(TYPES.SecurityController).to(SecurityController);
container.bind<SecurityQueryRepository>(TYPES.SecurityQueryRepository).to(SecurityQueryRepository);
container.bind<SecurityRepository>(TYPES.SecurityRepository).to(SecurityRepository);
container.bind<ApiUsageRepository>(TYPES.ApiUsageRepository).to(ApiUsageRepository);
container.bind<ApiUsageService>(TYPES.ApiUsageService).to(ApiUsageService);

container.bind<UsersController>(TYPES.UsersController).to(UsersController);
container.bind<UsersService>(TYPES.UsersService).to(UsersService);
container.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
container.bind<UsersQueryRepository>(TYPES.UsersQueryRepository).to(UsersQueryRepository);
