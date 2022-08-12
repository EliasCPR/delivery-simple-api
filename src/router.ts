import { Router } from "express";
import { createClient, listClients } from "./controllers/client-controller";

const router = Router();

router.post("/", createClient)
router.get("/", listClients)

export {router}