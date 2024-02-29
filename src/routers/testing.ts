import {Router} from "express";
import {setDB} from "../db/db";

export const testsRouter = Router()

testsRouter.delete('/', () => setDB())
