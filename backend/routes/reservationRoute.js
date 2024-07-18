import express from "express";
import { send_reservation } from "../controller/reservation.js";
import { user_registration } from "../controller/reservation.js";

const router = express.Router();

router.post("/send", send_reservation);
router.post("/registration", user_registration);

export default router;
