import express from "express";
const router = express.Router();
import patientsService from "../services/patientsService.ts";

router.get("/", (_req, res) => {
    const data = patientsService.getNonSensitiveEntries();
    res.send(data);
});

export default router;