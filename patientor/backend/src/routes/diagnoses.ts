import express from "express";
const router = express.Router();
import diagnosesService from "../services/diagnosesService.ts";

router.get("/", (_req, res) => {
    const data = diagnosesService.getDiagnoses();
    res.send(data);
});

export default router;