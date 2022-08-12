import { Router } from "express";
import { authenticateClient, createClient, listClients } from "./controllers/client-controller";
import { createDelivery, findAllDeliveriesAvailable, toAssignDeliveryToDeliveryman } from "./controllers/delivery-controller";
import { authenticateDeliveryman, createDeliveryman, listDeliverymen } from "./controllers/deliveryman-controller";
import { ensureAuthenticateClient } from "./middleware/ensure-authenticate-client";
import { ensureAuthenticateDeliveryman } from "./middleware/ensure-authenticate-deliveryman";

const router = Router();

// router clients
router.post("/v1/client/", createClient)
router.get("/v1/client/", listClients)
router.post("/v1/client/authenticate", authenticateClient)

// router deliverymen
router.post("/v1/deliveryman/", createDeliveryman)
router.get("/v1/deliveryman/", listDeliverymen)
router.post("/v1/deliveryman/authenticate", authenticateDeliveryman)

//router deliveries
router.post("/v1/delivery/", ensureAuthenticateClient, createDelivery)
router.get("/v1/delivery/available", ensureAuthenticateDeliveryman,findAllDeliveriesAvailable)
router.put("/v1/delivery/:id/assign", ensureAuthenticateDeliveryman, toAssignDeliveryToDeliveryman)

export {router}