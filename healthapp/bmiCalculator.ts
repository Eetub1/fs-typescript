interface BodyData {
    height: number;
    weight: number;
}

export const validateQueryParams = (height: string, weight: string): BodyData | null => {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return {
            height: Number(height),
            weight: Number(weight)
        };
    }
    return null;
};

const parseArguments = (args: string[]): BodyData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / ((height / 100) ** 2);

    if (bmi < 16) {
        return "Underweight (Severe thinness)";
    } else if (bmi < 17) {
        return "Underweight (Moderate thinness)";
    } else if (bmi < 18.5) {
        return "Underweight (Mild thinness)";
    } else if (bmi < 25) {
        return "Normal range";
    } else if (bmi < 30) {
        return "Overweight (Pre-obese)";
    } else if (bmi < 35) {
        return "Obese (Class I)";
    } else if (bmi < 40) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
};

if (process.argv[1] === import.meta.filename) {
    try {
        const { height, weight} = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }
}
