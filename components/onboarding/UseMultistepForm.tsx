import { ReactElement, useState } from "react";


export function useMultistepForm(steps: ReactElement[]) {
    const [StepIndex, setStepIndex] = useState(0);

    function next() {
        setStepIndex(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function back() {
        setStepIndex(i => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function isFirstStep() {
        setStepIndex(i => {
            if (i <= 0) return i;
            return i + 1;
        });
    }

    function isLastStep() {
        setStepIndex(i => {
            if (i <= 0) return i;
            return i + 1;
        });
    }

    return {
        StepIndex,
        step: steps[StepIndex],
        steps,
        next,
        back,
        isFirstStep: StepIndex === 0,
        isLastStep: StepIndex === steps.length - 1
    }
}