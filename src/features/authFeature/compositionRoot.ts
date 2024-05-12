import {RefreshTokenRepository} from "./refreshTokenRepository";
import {JWTService} from "./JWTService";
import {AuthService} from "./authService";
import {UsersRepository} from "../usersFeature/usersRepository";
import {AuthController} from "./authController";

const refreshTokenRepository = new RefreshTokenRepository();
const jwtService = new JWTService(refreshTokenRepository);
const usersRepository = new UsersRepository();
const authService = new AuthService(usersRepository, jwtService);

export const authController = new AuthController(authService, jwtService);
