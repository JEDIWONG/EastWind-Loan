import exp from "../assets/react.svg";

import {
  TextField,
  Button,
} from "@mui/material";

const About = () => {
  const reasons = [
    {
      img: exp,
      title: "Multiple Lenders",
      description:
        "Access loan products from multiple lenders through a single platform, giving you more choices when looking for financing.",
    },
    {
      img: exp,
      title: "Simple Application",
      description:
        "Submit your loan application online through a straightforward process without having to visit multiple lenders individually.",
    },
    {
      img: exp,
      title: "Transparent Process",
      description:
        "Compare important loan details and track your application status so you can stay informed throughout the process.",
    },
  ];

  return (
    <div className="w-full">

      <section className="w-full bg-white px-8 py-20">

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">

          <div className="flex w-full justify-center md:w-1/2">
            <img
              src={exp}
              alt="About EastWind Loan"
              className="w-full max-w-lg object-contain"
            />
          </div>

          <div className="w-full md:w-1/2">

            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-yellow-500">
              About EastWind Loan
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900">
              Making Loan Applications
              <br />
              Simple and Accessible
            </h1>

            <p className="mt-6 max-w-xl leading-7 text-gray-500 text-justify">
              EastWind Loan is a multi-lender loan platform designed to
              connect borrowers with loan products offered by different
              lenders. Our platform makes it easier to discover suitable
              loan options, understand their requirements, and submit
              applications through one convenient platform.
            </p>

          </div>

        </div>

      </section>

      <section className="m-10 bg-white px-8 py-20 rounded-3xl">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Us?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              We make the loan discovery and application process
              simpler by bringing borrowers and multiple lenders
              together on one platform.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {reasons.map((reason) => (
              <div
                className="flex flex-col rounded-3xl text-center items-center p-10 border border-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                
                <img
                    src={reason.img}
                    alt={reason.title}
                    className="mb-5 h-20 w-20 object-contain"
                />

                <h3 className="mb-3 text-xl font-bold text-gray-900 ">
                    {reason.title}
                </h3>

                <p className="text-sm leading-6 text-gray-500">
                    {reason.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      <section className="w-full bg-white px-8 py-20">

        <div className="mx-auto flex max-w-7xl flex-col gap-16 md:flex-row">

          <div className="flex w-full flex-col justify-center md:w-1/2">

            <h2 className="text-4xl leading-tight text-gray-900">
              Have a Question?
              <br />
              We'd Love to Hear From You.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-gray-500">
              Whether you have a question about our platform, loan
              products, or the application process, feel free to
              reach out to our team.
            </p>

          </div>

          <div className="w-full md:w-1/2">

            <div
              className="rounded-2xl border border-gray-200 shadow-lg"
            >
                <div className="flex flex-col gap-5 px-15 py-10">
                    <h1 className="text-center m-5">
                        Contact Us
                    </h1>

                    <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    variant="outlined"
                    />

                    <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    />

                    <TextField
                    label="Subject"
                    name="subject"
                    fullWidth
                    variant="outlined"
                    />

                    <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    />

                    <Button
                    type="submit"
                    variant="contained"
                    className="mt-2"
                    sx={{
                        backgroundColor: "#eab308",
                        color: "#000",
                        fontWeight: "bold",
                        padding: "12px",
                        "&:hover": {
                        backgroundColor: "#ca8a04",
                        },
                    }}
                    >
                    Send Message
                    </Button>

                </div>


            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;

