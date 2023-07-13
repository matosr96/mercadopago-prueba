import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/payment.js";

const router = Router();

router.post("/create-order", createOrder);
router.get("/success", (req, res) => res.send("Order success"));
router.get("/failure", (req, res) => res.send("Order failure"));
router.get("/pending", (req, res) => res.send("Order pending"));
router.post("/webhook", receiveWebhook);

export default router;
