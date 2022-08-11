import { Router } from "express";
import { createClient, listClients } from "./controllers/client_controller";

const router = Router();

router.post("/", createClient)
router.get("/", listClients)

export {router}