import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import type { AppTableColumn } from "../../components/generic/table/AppDataTable";
import { ddCurrency, ddInterestRate, ddTenureMonths } from "../../utils/data-format-helper";
import SectionTitle from "../../components/generic/typography/SectionTitle";
import AppDataTableTabs from "../../components/generic/tab/AppDataTableTab";
import useLenderLoanProductList from "../../hooks/useLenderLoanProductList";
import type { LoanProduct } from "../../schemas/LoanProductSchema";
import { Button } from "@mui/material";
import { useRouteHelper } from "../../utils/route-helper";

const LenderProductDashboard = () => {

    const {
        loanProducts,
    } = useLenderLoanProductList();

    const {navToEditLoanProduct} = useRouteHelper();

    const columns: AppTableColumn<LoanProduct>[] = [
        {
            label: "Product Name",
            render: (data) => (
                data.loan_product_name
            ),
            searchable: true,
            searchValue: (data) => data.loan_product_name,
        },
        {
            label: "Loan Amount Range",
            render: (data) => (
                <div className="flex gap-1">
                    <span>
                        {ddCurrency(data.loan_product_min_amount)}
                    </span>
                    <span>
                        - {ddCurrency(data.loan_product_max_amount)}
                    </span>
                </div>
            ),
            sortable: true,
            sortValue: (data) => data.loan_product_max_amount,
        },
        {
            label: "Tenure",
            render: (data) => (
                <div className="flex gap-1">
                    <span>
                        {ddTenureMonths(data.loan_product_min_tenure_month??0)}
                    </span>
                    <span>-</span>
                    <span>
                        {ddTenureMonths(data.loan_product_max_tenure_month)}
                    </span>
                </div>
            ),
            sortable: true,
            sortValue: (data) => data.loan_product_max_tenure_month,
        },
        {
            label: "Interest Rate",
            render: (data) => ddInterestRate(data.loan_product_interest_rate),
            sortable: true,
            sortValue: (data) => data.loan_product_interest_rate,
        },
        {
            label: "Status",
            render: (data) => (
                <Chip
                    label={data.loan_product_is_active ? "Active" : "Inactive"}
                    size="small"
                    color={data.loan_product_is_active ? "success" : "default"}
                    variant="outlined"
                />
            ),
            searchable: true,
            searchValue: (data) =>
                data.loan_product_is_active ? "Active" : "Inactive",
        },
    ];

    return (
        <div className="mx-15 my-12 min-h-screen">
            <SectionTitle
                title="Loan Products"
                desc="Manage your organization's loan products, pricing and eligibility requirements."
            />

            <div className="flex justify-end my-10">
                <Button
                    component={Link}
                    to="/lender/product/create"
                    variant="contained"
                    startIcon={<Add />}
                    sx={{
                        px: 3,
                        py: 1.2,
                        boxShadow: "none",
                        "&:hover": {
                            bgcolor: "#FACC15",
                            boxShadow: "none",
                        },
                    }}
                >
                    Create Product
                </Button>
            </div>

            <AppDataTableTabs
                tabs={null}
                data={loanProducts}
                columns={columns}
                loading={false}
                onRowClick={
                   (loan)=> navToEditLoanProduct(loan.id)
                }
                emptyMessage="No loan products found."
                searchable
                searchPlaceholder="Search loan products..."
            />
        </div>
    );
};

export default LenderProductDashboard;