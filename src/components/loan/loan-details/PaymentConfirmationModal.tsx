import {
    Button,
    Card,
    Divider,
    Typography,
} from "@mui/material";
import {
    CloseRounded,
    PaymentRounded,
} from "@mui/icons-material";
import { useState } from "react";
import type { LoanRepayment } from "../../../schemas/loanSchema";
import { ddCurrency } from "../../../utils/data-format-helper";
import AppDropDown from "../../generic/form/AppDropDown";
import usePaymentMethodList from "../../../hooks/usePaymentMethodList";

interface PaymentConfirmationModalProps {
    repayment: LoanRepayment;
    loading?: boolean;
    onConfirm: (paymentMethodId: number) => void;
    onCancel: () => void;
}

const PaymentConfirmationModal = ({
    repayment,
    loading = false,
    onConfirm,
    onCancel,
}: PaymentConfirmationModalProps) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | "">("");

    const {
        paymentMethodList,
        loading: paymentMethodLoading,
    } = usePaymentMethodList();

    const handleConfirm = () => {
        if (selectedPaymentMethod === "") return;

        onConfirm(selectedPaymentMethod);
    };

    const paymentMethodOptions = paymentMethodList.map((method) => ({
        value: method.id,
        label: method.payment_method_name,
    }));

    const totalPayment = Number(repayment.repayment_amount) + Number(repayment.late_fee);

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <Typography variant="h6">
                            Make Payment
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Confirm your repayment details
                        </Typography>
                    </div>

                    <Button
                        onClick={onCancel}
                        disabled={loading}
                        sx={{
                            minWidth: 40,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                        }}
                    >
                        <CloseRounded />
                    </Button>
                </div>

                <div className="px-6 py-5">
                    <Card
                        elevation={0}
                        sx={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 2,
                            p: 2.5,
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <Typography>
                                Installment #{repayment.installment_no}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Due {repayment.due_date}
                            </Typography>
                        </div>

                        <Divider sx={{ my: 2 }} />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Principal
                                </Typography>

                                <Typography variant="body2">
                                    {ddCurrency(
                                        repayment.principal_amount
                                    )}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Interest
                                </Typography>

                                <Typography variant="body2">
                                    {ddCurrency(
                                        repayment.interest_amount
                                    )}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Late Fee
                                </Typography>

                                <Typography variant="body2">
                                    {ddCurrency(
                                        repayment.late_fee
                                    )}
                                </Typography>
                            </div>
                        </div>

                        <Divider sx={{ my: 2 }} />

                        <div className="flex items-center justify-between">
                            <Typography >
                                Total Payment
                            </Typography>

                            <Typography
                                variant="h6"
                            >
                                {ddCurrency(totalPayment)}
                            </Typography>
                        </div>
                    </Card>

                    <div className="mt-5">
                        <Typography
                            variant="body1"
                            
                            sx={{ mb: 1 }}
                        >
                            Payment Method
                        </Typography>

                        <AppDropDown
                            label="Select Payment Method"
                            value={selectedPaymentMethod}
                            options={paymentMethodOptions}
                            placeholder={
                                paymentMethodLoading
                                    ? "Loading payment methods..."
                                    : "Select payment method"
                            }
                            onChange={(event) => {
                                setSelectedPaymentMethod(
                                    event.target.value
                                        ? Number(event.target.value)
                                        : ""
                                );
                            }}
                            
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<PaymentRounded />}
                        onClick={handleConfirm}
                        disabled={
                            loading ||
                            paymentMethodLoading ||
                            selectedPaymentMethod === "" ||
                            paymentMethodList.length === 0
                        }
                    >
                        {loading
                            ? "Processing..."
                            : `Pay ${ddCurrency(totalPayment)}`}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmationModal;
