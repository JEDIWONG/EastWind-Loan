import { useState } from "react";
import {
    Stepper,
    Step,
    StepLabel,
    Button,
} from "@mui/material";

interface LoanApplicationStepProps {
  steps: {
    label: string;
    content: React.ReactNode;
    fields?: string[];
  }[];
  trigger: any;
  onSubmit?: () => void;
}

const LoanApplicationStep = ({
  steps,
  trigger,
  onSubmit,
}: LoanApplicationStepProps) => {
    const [activeStep, setActiveStep] = useState(0);

    const isLastStep =
        activeStep === steps.length - 1;

    const handleNext = async () => {
        const currentStep = steps[activeStep];

        const valid = currentStep.fields?.length
            ? await trigger(currentStep.fields)
            : await trigger();

        if (!valid) {
            return;
        }

        if (isLastStep) {
            onSubmit?.();
            return;
        }

        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    return (
        <div className="w-full">
            <Stepper
                activeStep={activeStep}
                alternativeLabel
            >
                {steps.map((_step, index) => (
                    <Step key={index}>
                        <StepLabel />
                    </Step>
                ))}
            </Stepper>

            <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                    {steps[activeStep].label}
                </h2>

                {steps[activeStep].content}

                <div className="mt-10 flex justify-between">
                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                            backgroundColor: "#eab308",
                            color: "#000",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#ca8a04",
                            },
                        }}
                    >
                        {isLastStep
                            ? "Submit Application"
                            : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoanApplicationStep;