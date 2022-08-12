import { Router } from "express";
import { authenticateClient, createClient, listClients } from "./controllers/client-controller";
import { authenticateDeliveryman, createDeliveryman, listDeliverymen } from "./controllers/deliveryman-controller";

const router = Router();

// router clients
router.post("/v1/client/", createClient)
router.get("/v1/client/", listClients)
router.post("/v1/client/authenticate", authenticateClient)

// router deliverymen
router.post("/v1/deliveryman/", createDeliveryman)
router.get("/v1/deliveryman/", listDeliverymen)
router.post("/v1/deliveryman/authenticate", authenticateDeliveryman)

export {router}