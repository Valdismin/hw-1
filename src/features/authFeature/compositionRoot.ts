import {RefreshTokenRepository} from "./refreshTokenRepository";
import {JWTService} from "./JWTService";
import {AuthService} from "./authService";
import {UsersRepository} from "../usersFeature/usersRepository";
import {AuthController} from "./authController";
import {SecurityService} from "../securityFeature/securityService";
import {SecurityRepository} from "../securityFeature/securityRepository";
import {RecoveryPasswordRepository} from "../passwordRecoveryFeature/recoveryPasswordRepository";

const refreshTokenRepository = new RefreshTokenRepository();
const jwtService = new JWTService(refreshTokenRepository);
const usersRepository = new UsersRepository();
const securityRepository = new SecurityRepository();
const securityService = new SecurityService(securityRepository, jwtService);
const recoveryPasswordRepository = new RecoveryPasswordRepository();
const authService = new AuthService(usersRepository, jwtService, securityRepository, recoveryPasswordRepository);

export const authController = new AuthController(authService, jwtService, securityService);
