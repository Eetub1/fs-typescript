interface ExerciseData {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Data {
    target: number;
    hours: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateArguments2 = (hours: any, target: any): Data | null => {
    if (!Array.isArray(hours)) {
        return null;
    }

    const targetNum = Number(target);
    if (isNaN(targetNum)) {
        return null;
    }

    for (const hour of hours) {
        if (isNaN(Number(hour))) {
            return null;
        }
    }

    const hours_nums: number[] = hours.map((hour: number) => Number(hour));

    return { 
        target: targetNum,
        hours: hours_nums
    };
};


const parseArguments2 = (args: string[]): Data => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNaN(Number(args[2]))){
        throw new Error('Target is not a number');
    }

    const hours = args.slice(3);
    for (const hour of hours) {
        if (isNaN(Number(hour))) {
            throw new Error("Hour isn't a number");
        }
    }

    const hours_nums = hours.map(hour => Number(hour));

    return { 
        target: Number(args[2]),
        hours: hours_nums
    };
};


export const calculateExercises = (hours: number[], target: number): ExerciseData => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(hour => hour > 0).length;
    const average = periodLength > 0 ? hours.reduce((a, b) => a + b, 0) / periodLength : 0;
    const success = average >= target;

    let ratingDescription = "You really missed the goal :(";
    let rating = 1;
    if (average >= target) {
        rating = 3;
        ratingDescription = "Good work, you hit your target!";
    } else if (average >= target / 2) {
        rating = 2;
        ratingDescription = "Not too bad but could be better :)";
    }
    return {periodLength, trainingDays, average, success, rating, ratingDescription, target};
};


if (process.argv[1] === import.meta.filename) {
    try {
        const { hours, target } = parseArguments2(process.argv);
        console.log(calculateExercises(hours, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}