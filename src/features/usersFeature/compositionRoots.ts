import {UsersRepository} from "./usersRepository";
import {UsersQueryRepository} from "./usersQueryRepository";
import {UsersService} from "./usersService";
import {UsersController} from "./usersController";

const usersRepository = new UsersRepository();
const usersQueryRepository = new UsersQueryRepository();
const usersService = new UsersService(usersRepository);
export const usersController = new UsersController(usersService, usersQueryRepository);
