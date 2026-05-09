import express from "express";
import {validateQueryParams, calculateBmi} from "./bmiCalculator.ts";
import { validateArguments2, calculateExercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const {height, weight} = req.query;

    const validatedData = validateQueryParams(height as string, weight as string);
    if (!validatedData) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const bmi = calculateBmi(validatedData.height, validatedData.weight);
    return res.json({
        weight: validatedData.weight,
        height: validatedData.height,
        bmi: bmi
    }); //Unsafe argument of type `any` assigned to a parameter of type `number`
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target} = req.body;

    if (daily_exercises === undefined || target === undefined) {
        return res.status(400).json({ error: "parameters missing" });
    }

    const validatedData = validateArguments2(daily_exercises, target);
    if (!validatedData) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const processedData = calculateExercises(validatedData.hours, validatedData.target);
    return res.json(processedData);
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});