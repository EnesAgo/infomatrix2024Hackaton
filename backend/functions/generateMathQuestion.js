
function generateQuestions() {
    const questions = [];


        const type = Math.floor(Math.random() * 5);
        let question = '';
        let answer = '';

        switch (type) {
            case 0: // Logarithm questions
                const base = Math.floor(Math.random() * 9) + 2; // base between 2 and 10
                const value = Math.pow(base, Math.floor(Math.random() * 5) + 1); // value as a power of base
                question = `What is the value of log(${value}) base ${base}?`;
                answer = `${Math.log(value) / Math.log(base)}`;
                break;

            case 1: // Simple linear equation
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10);
                question = `Solve for x: ${a}x + ${b} = 0`;
                answer = `x = ${-b / a}`;
                break;

            case 2: // Quadratic equations
                const c = Math.floor(Math.random() * 10) + 1;
                const d = Math.floor(Math.random() * 10) - 5;
                const e = Math.floor(Math.random() * 10) - 5;
                question = `Solve the quadratic equation: ${c}x^2 + ${d}x + ${e} = 0`;
                const discriminant = Math.pow(d, 2) - 4 * c * e;
                if (discriminant < 0) {
                    answer = "No real roots";
                } else if (discriminant === 0) {
                    answer = `x = ${-d / (2 * c)}`;
                } else {
                    const root1 = (-d + Math.sqrt(discriminant)) / (2 * c);
                    const root2 = (-d - Math.sqrt(discriminant)) / (2 * c);
                    answer = `x = ${root1}, x = ${root2}`;
                }
                break;

            case 3: // Derivative questions
                const power = Math.floor(Math.random() * 10) + 1;
                question = `What is the derivative of x^${power}?`;
                answer = `${power}x^${power - 1}`;
                break;

            case 4: // Integral questions
                const integralPower = Math.floor(Math.random() * 10) + 1;
                question = `What is the integral of x^${integralPower}?`;
                answer = `1/${integralPower + 1} x^${integralPower + 1} + C`;
                break;
        }



    return {question, answer};
}

module.exports = generateQuestions