import { Router } from "express";
import { authenticateClient, createClient, listClients } from "./controllers/client-controller";

const router = Router();

router.post("/", createClient)
router.get("/", listClients)
router.post("/authenticate", authenticateClient)

export {router}