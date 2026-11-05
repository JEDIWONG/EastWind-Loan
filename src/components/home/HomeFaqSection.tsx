import { Accordion, AccordionSummary, AccordionDetails }from "@mui/material";
  
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeSectionHeader from "./HomeSectionHeader";
  
  const HomeFaqSection = () => {
    const faqs = [
      {
        question: "What is EastWind Loan?",
        answer:
          "EastWind Loan is a platform that allows borrowers to discover and apply for loan products offered by multiple lenders in one place.",
      },
      {
        question: "Can I compare loan products from different lenders?",
        answer:
          "Yes. You can browse available loan products and compare important details such as loan amount, tenure, and interest rate before deciding which product to apply for.",
      },
      {
        question: "How do I apply for a loan?",
        answer:
          "After finding a suitable loan product, you can submit an application through the platform by providing the required personal and loan information.",
      },
      {
        question: "How is my loan eligibility determined?",
        answer:
          "Eligibility may depend on factors such as your requested loan amount, loan tenure, employment status, and other requirements defined by the respective lender.",
      },
      {
        question: "Can I track my loan application?",
        answer:
          "Yes. After submitting an application, you can log in to your account to view the current status and updates of your loan application.",
      },
    ];
  
    return (
      <section className="bg-white px-8 py-10">
        <HomeSectionHeader 
          title="Frequently Asked Questions"
          desc="Find answers to some of the most common questions about EastWind Loan."          
        />
  
        <div className="mx-10 my-10 ">
  
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              sx={{
                borderBottom: "1px solid #e5e7eb",
                "&:before": {
                  display: "none",
                },
              }}
            >
  
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  padding: "8px 0",
                }}
              >
                <p className="font-bold text-gray-800">
                  {faq.question}
                </p>
              </AccordionSummary>
  
              <AccordionDetails
                sx={{
                  padding: "0 0 20px 0",
                }}
              >
                <p className="text-sm text-gray-500">
                  {faq.answer}
                </p>
              </AccordionDetails>
  
            </Accordion>
          ))}
  
        </div>
  
      </section>
    );
  };
  
  export default HomeFaqSection;