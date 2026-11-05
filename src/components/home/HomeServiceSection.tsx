import loanOptionsImg from "../../assets/explore_loan_options.png";
import easyLoanApplicationImg from "../../assets/easy_loan_application.png";
import loanTrackingImg from "../../assets/track_loan.png";
import HomeSectionHeader from "./HomeSectionHeader";

interface ServiceItemProps {
    image: string;
    title: string;
    description: string;
}

const ServiceItem = ({
    image,
    title,
    description,
}: ServiceItemProps) => {
    return (
        <div className="flex flex-col items-center rounded-3xl bg-white px-10 py-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img
              src={image}
              alt={title}
              className="h-50 w-full object-cover"
            />

            <h2 className="mb-3 text-lg font-bold text-gray-900">
              {title}
            </h2>

            <p className="text-sm text-justify text-gray-500">
                {description}
            </p>
        </div>
    );
};

const HomeServiceSection = () => {
    const services = [
        {
            image: loanOptionsImg,
            title: "Explore Loan Options",
            description:
                "Discover personal loan products from multiple lenders and find one which suits your financial needs.",
        },
        {
            image: easyLoanApplicationImg,
            title: "Simple Process",
            description: "Choose your preferred loan product and complete your application all in one convenient place.",
        },
        {
            image: loanTrackingImg,
            title: "Track Your Loan",
            description: "Stay informed throughout the application process, review your loan offers, and monitor important updates directly from your EastWind Loan account.",
        },
    ];

    return (
        <section className="my-10 rounded-top-4xl bg-white px-20 py-10 shadow-xs">
            <HomeSectionHeader
              title="What We Offer"
              desc="EastWind Loan makes it easier to discover, apply for, and manage loan products offered by multiple lenders."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {services.map((service) => (
                    <ServiceItem
                      key={service.title}
                      image={service.image}
                      title={service.title}
                      description={service.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default HomeServiceSection;
