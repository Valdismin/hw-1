import {SecurityQueryRepository} from "./securityQueryRepository";
import {SecurityService} from "./securityService";
import {SecurityRepository} from "./securityRepository";
import {JWTService} from "../authFeature/JWTService";
import {RefreshTokenRepository} from "../authFeature/refreshTokenRepository";
import {SecurityController} from "./securityController";

const securityQueryRepository = new SecurityQueryRepository();
const securityRepository = new SecurityRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const jwtService = new JWTService(refreshTokenRepository);
const securityService = new SecurityService(securityRepository, jwtService);

export const securityController = new SecurityController(securityQueryRepository, securityService);
