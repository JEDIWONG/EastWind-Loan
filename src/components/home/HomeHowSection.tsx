import {
    SearchRounded,
    FactCheckRounded,
    DescriptionRounded,
    RateReviewRounded,
    TimelineRounded,
} from "@mui/icons-material";
import type { ReactNode } from "react";
import HomeSectionHeader from "./HomeSectionHeader";

interface LoanStepProps {
    number: number;
    title: string;
    description: string;
    icon: ReactNode;
}

const LoanStepCard = ({
    number,
    title,
    description,
    icon,
}: LoanStepProps) => {
    return (
        <>
          <div className="flex gap-3 items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-gray-900">
              {number}
            </div>

            <div className="flex w-full items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1  hover:shadow-lg">
              
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
                {icon}
              </div>

              <div>
                <h3 className="mb-2 font-bold text-gray-900">
                  {title}
                </h3>

                <p className="text-sm text-gray-500">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </>
        
    );
};

const HomeHowSection = () => {
    const loanSteps = [
        {
            icon: <SearchRounded sx={{ fontSize: 34 }} />,
            title: "Explore Loan Options",
            description: "Browse personal loan products from multiple lenders and compare loan amounts, interest rates, repayment terms, and requirements.",
        },
        {
            icon: <FactCheckRounded sx={{ fontSize: 34 }} />,
            title: "Review Loan Requirements",
            description: "Check the eligibility criteria and supporting requirements for each loan product to identify options that suit your needs.",
        },
        {
            icon: <DescriptionRounded sx={{ fontSize: 34 }} />,
            title: "Submit Your Application",
            description: "Select your preferred loan product and complete the online application with your personal, employment, and financial information.",
        },
        {
            icon: <RateReviewRounded sx={{ fontSize: 34 }} />,
            title: "Lender Review",
            description: "The selected lender reviews your application and determines whether to approve, reject, or make a loan offer.",
        },
        {
            icon: <TimelineRounded sx={{ fontSize: 34 }} />,
            title: "Track Your Loan",
            description: "Monitor your application status, review available loan offers, and stay informed about important updates throughout the process.",
        },
    ];

    return (
        <section className="my-10 bg-white px-8 py-10">
            <HomeSectionHeader
                title="How it Works"
                desc="From exploring loan options to tracking your application, manage your loan journey in a few simple steps."
            />

            <div className="flex flex-col mx-auto my-5 max-w-5xl gap-5">
                {loanSteps.map((step, index) => (
                    <LoanStepCard
                      key={step.title}
                      number={index + 1}
                      icon={step.icon}
                      title={step.title}
                      description={step.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default HomeHowSection;
