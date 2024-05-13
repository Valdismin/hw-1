import {UsersRepository} from "../features/usersFeature/usersRepository";
import {RefreshTokenRepository} from "../features/authFeature/refreshTokenRepository";
import {JWTService} from "../features/authFeature/JWTService";
import {SecurityRepository} from "../features/securityFeature/securityRepository";
import {SecurityService} from "../features/securityFeature/securityService";
import {ApiUsageRepository} from "../features/securityFeature/apiUsageRepository";
import {ApiUsageService} from "../features/securityFeature/apiUsageService";
import {UsersQueryRepository} from "../features/usersFeature/usersQueryRepository";

export const usersRepository = new UsersRepository()
export const usersQueryRepository = new UsersQueryRepository()
export const refreshTokenRepository = new RefreshTokenRepository()
export const jwtService = new JWTService(refreshTokenRepository)
export const securityRepository = new SecurityRepository()
export const securityService = new SecurityService(securityRepository, jwtService);
export const apiUsageRepository = new ApiUsageRepository();

export const apiUsageService = new ApiUsageService(apiUsageRepository);
