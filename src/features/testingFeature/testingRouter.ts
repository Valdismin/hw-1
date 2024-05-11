import {Router} from "express";
import {clearDatabaseController} from "./testingController";

export const testsRouter = Router()

testsRouter.delete('/all-data', clearDatabaseController)
