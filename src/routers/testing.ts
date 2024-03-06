import {Router} from "express";
import {clearDatabaseController} from "../controllers/testingController";

export const testsRouter = Router()

testsRouter.delete('/testing/all-data', clearDatabaseController)
