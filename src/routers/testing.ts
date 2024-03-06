import {Router} from "express";
import {clearDatabaseController} from "../controllers/testingController";

export const testsRouter = Router()

testsRouter.delete('/all-data', clearDatabaseController)
