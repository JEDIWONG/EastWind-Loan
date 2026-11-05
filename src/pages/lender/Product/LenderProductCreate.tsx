import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "@mui/material";
import { Save } from "@mui/icons-material";

import SectionTitle from "../../../components/generic/typography/SectionTitle";
import AppTextField from "../../../components/generic/form/AppTextField";
import AppNumberField from "../../../components/generic/form/AppNumberField";
import type { LoanProduct } from "../../../schemas/LoanProductSchema";
import CardSectionHeader from "../../../components/generic/typography/CardSectionHeader";
import useCreateLoanProduct from "../../../hooks/useCreateLoanProduct";
import { useEffect } from "react";

const LenderProductCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const loanProductId = id ? Number(id) : null;
    const isEditMode = loanProductId !== null;

    const {
        control,
        trigger, 
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoanProduct>({
        defaultValues: {
            loan_product_name: "",
            loan_product_desc: "",
            loan_product_min_amount: 0,
            loan_product_max_amount: 0,
            loan_product_min_tenure_month: 1,
            loan_product_max_tenure_month: 12,
            loan_product_interest_rate: 0,
        },
    });

    const minAmount = useWatch({
        control,
        name: "loan_product_min_amount",
    });
    
    useEffect(() => {
        trigger("loan_product_max_amount");
    }, [minAmount, trigger]);

    const {
        loanProduct,
        loading,
        error,
        createProduct,
        creating,
        createError,
    } = useCreateLoanProduct(loanProductId, reset);

    const onSubmit = async (data: LoanProduct) => {
        const success = await createProduct(data);

        if (success) {
            navigate("/lender/product");
        }
    };

    if (isEditMode && loading) {
        return (
            <div className="mx-15 my-12">
                <p className="text-sm text-slate-500">
                    Loading loan product details...
                </p>
            </div>
        );
    }

    if (isEditMode && (error || !loanProduct)) {
        return (
            <div className="mx-15 my-12">
                <p className="text-sm text-red-600">
                    {error || "Loan product not found."}
                </p>

                <Button
                    onClick={() => navigate("/lender/products")}
                    sx={{ mt: 2, textTransform: "none" }}
                >
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-15 my-12 min-h-screen">
            <div className="mb-6">
                <SectionTitle
                    title={isEditMode ? "Update Loan Product" : "Create Loan Product"}
                    desc={
                        isEditMode
                            ? "Update your organization's loan product details."
                            : "Configure a new loan product for your organization."
                    }
                />
            </div>

            <Card
                variant="outlined"
                className="overflow-hidden rounded-xl border-slate-200 shadow-sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-8 p-6 sm:p-8">
                        <section className="flex flex-col gap-5">
                            <CardSectionHeader
                                title="Product Information"
                                subtitle="Provide the basic details of your loan product."
                                showPrefixLine
                            />

                            <div className="mx-10 flex flex-col gap-8">
                                <Controller
                                    name="loan_product_name"
                                    control={control}
                                    rules={{
                                        required: "Product name is required",
                                        maxLength: {
                                            value: 255,
                                            message: "Product name cannot exceed 255 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <AppTextField
                                            label="Product Name"
                                            name="loan_product_name"
                                            value={field.value}
                                            error={!!errors.loan_product_name}
                                            helperText={errors.loan_product_name?.message}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />

                                <Controller
                                    name="loan_product_desc"
                                    control={control}
                                    rules={{
                                        maxLength: {
                                            value: 255,
                                            message: "Description cannot exceed 255 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <AppTextField
                                            label="Product Description (Optional)"
                                            name="loan_product_desc"
                                            value={field.value}
                                            error={!!errors.loan_product_desc}
                                            helperText={errors.loan_product_desc?.message}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </section>

                        <div className="border-t border-slate-100" />

                        <section className="flex flex-col gap-5">
                            <CardSectionHeader
                                title="Loan Amount Range"
                                subtitle="Define the minimum and maximum financing amount borrowers can request."
                                showPrefixLine
                            />

                            <div className="mx-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Controller
                                    name="loan_product_min_amount"
                                    control={control}
                                    rules={{
                                        required: "Minimum loan amount is required",
                                        min: {
                                            value: 0.01,
                                            message: "Minimum amount must be greater than zero",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <AppNumberField
                                            prefix="RM"
                                            label="Min Amount"
                                            name="loan_product_min_amount"
                                            value={field.value}
                                            error={!!errors.loan_product_min_amount}
                                            helperText={errors.loan_product_min_amount?.message}
                                            onChange={field.onChange}
                                            min={0}
                                            step={100}
                                        />
                                    )}
                                />

                                <Controller
                                    name="loan_product_max_amount"
                                    control={control}
                                    rules={{
                                        required: "Maximum loan amount is required",
                                        validate: (value) =>
                                            Number(value) > Number(minAmount) ||
                                            "Maximum amount must be greater than minimum amount",
                                    }}
                                    render={({ field }) => (
                                        <AppNumberField
                                            prefix="RM"
                                            label="Max Amount"
                                            name="loan_product_max_amount"
                                            value={field.value}
                                            error={!!errors.loan_product_max_amount}
                                            helperText={errors.loan_product_max_amount?.message}
                                            onChange={field.onChange}
                                            min={0}
                                            step={100}
                                        />
                                    )}
                                />
                            </div>
                        </section>

                        <div className="border-t border-slate-100" />

                        <section className="flex flex-col gap-5">
                            <CardSectionHeader
                                title="Loan Terms & Interest"
                                subtitle="Configure the repayment duration and annual interest rate."
                                showPrefixLine
                            />

                            <div className="mx-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Controller
                                    name="loan_product_min_tenure_month"
                                    control={control}
                                    rules={{
                                        required: "Minimum tenure is required",
                                        min: {
                                            value: 1,
                                            message: "Minimum tenure must be at least 1 month",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <AppNumberField
                                            label="Minimum Tenure"
                                            name="loan_product_min_tenure_month"
                                            value={field.value??1}
                                            error={!!errors.loan_product_min_tenure_month}
                                            helperText={errors.loan_product_min_tenure_month?.message}
                                            onChange={field.onChange}
                                            min={1}
                                            step={1}
                                        />
                                    )}
                                />

                                <Controller
                                    name="loan_product_max_tenure_month"
                                    control={control}
                                    rules={{
                                        required: "Maximum tenure is required",
                                        validate: (value) =>
                                            value >= getValues("loan_product_min_tenure_month") ||
                                            "Maximum tenure must be greater than or equal to minimum tenure",
                                    }}
                                    render={({ field }) => (
                                        <AppNumberField
                                            label="Maximum Tenure (Months)"
                                            name="loan_product_max_tenure_month"
                                            value={field.value}
                                            error={!!errors.loan_product_max_tenure_month}
                                            helperText={errors.loan_product_max_tenure_month?.message}
                                            onChange={field.onChange}
                                            min={1}
                                            step={1}
                                        />
                                    )}
                                />

                                <Controller
                                    name="loan_product_interest_rate"
                                    control={control}
                                    rules={{
                                        required: "Interest rate is required",
                                        min: {
                                            value: 0,
                                            message: "Interest rate cannot be negative",
                                        },
                                        max: {
                                            value: 99.9999,
                                            message: "Interest rate cannot exceed 99.9999%",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <AppNumberField
                                            label="Annual Interest Rate (%)"
                                            name="loan_product_interest_rate"
                                            value={field.value}
                                            error={!!errors.loan_product_interest_rate}
                                            helperText={errors.loan_product_interest_rate?.message}
                                            onChange={field.onChange}
                                            min={0}
                                            max={99.9999}
                                            step={0.0001}
                                        />
                                    )}
                                />
                            </div>
                        </section>

                        {createError && !isEditMode && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {createError}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
                        <Button
                            variant="outlined"
                            onClick={() => {}}
                            disabled={isSubmitting || creating}
                            sx={{
                                color: "#475569",
                                borderColor: "#CBD5E1",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1.2,
                            }}
                        >
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Save />}
                            disabled={isSubmitting || creating}
                            sx={{
                                bgcolor: "#EAB308",
                                color: "#0F172A",
                                textTransform: "none",
                                fontWeight: 700,
                                px: 3,
                                py: 1.2,
                                boxShadow: "none",
                                "&:hover": {
                                    bgcolor: "#FACC15",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            {creating
                                ? "Saving..."
                                : isEditMode
                                    ? "Update Product"
                                    : "Create Product"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default LenderProductCreate;