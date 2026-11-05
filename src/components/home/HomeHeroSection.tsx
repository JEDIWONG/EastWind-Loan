import { Button } from "@mui/material";
import hero_img from "../../assets/hero_1.png";
import { useRouteHelper } from "../../utils/route-helper";

const HomeHeroSection = () => {
    const { navToFindLoan, navToCompare } = useRouteHelper();

    return (
        <div
            className="flex relative min-h-[450px] max-h-[450px] overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: `url(${hero_img})`,
                backgroundPosition: "100px",
            }}
        >
            <div className="absolute inset-y-0 left-0 w-1/2 bg-black/55 backdrop-blur-md" />

            <div className="absolute inset-y-0 left-1/2 right-0 bg-gradient-to-r from-black/20 to-transparent" />

            <div className="relative z-10 flex w-1/2 items-end px-14 py-20">
                <div className="max-w-2xl">
                    <h1 className="text-[60px] font-bold text-white">
                        Easy Application for Personal Loan
                    </h1>

                    <p className="mt-6 text-justify text-yellow-200">
                        Eastwind Loan serving as one stop platform for applying
                        personal loan and matches you with the best offers by
                        banks and financial institutions.
                    </p>

                    <div className="mt-10 flex justify-end px-10">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: 200,
                                borderRadius: "9999px",
                                fontWeight: 700,
                                py: 1.5,
                                boxShadow: "none",
                            }}
                            onClick={navToFindLoan}
                        >
                            Get a Loan
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                width: 200,
                                borderRadius: "9999px",
                                fontWeight: 700,
                                py: 1.5,
                                ml: 2,
                                borderColor: "white",
                                color: "white",
                                "&:hover": {
                                    borderColor: "white",
                                    backgroundColor:
                                        "rgba(255,255,255,0.08)",
                                },
                            }}
                            onClick={navToCompare}
                        >
                            Compare Rate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHeroSection;
