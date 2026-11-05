import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    getBankList,
    getDebtTypeList,
    getEduLevelList,
    getEmploymentStatuses,
    getHomeOwnershipStatuses,
    getLoanPurposes,
    getSectorList,
    getStateList,
} from "../api/GeneralAPI";
import type { LoanProduct } from "../schemas/LoanProductSchema";
import { getLoanProductById } from "../api/LoanProductApi";

const useLoanApplicationForm = (loanProductId: number) => {
    const {
        control,
        register,
        setValue,
        getValues,
        watch,
        reset,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nric: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            monthlyIncome: 0,

            borrowerAddr: "",
            borrowerAddrPostcode: "",
            borrowerCity: "",
            borrowerState: "",
            borrowerEduLevel: "",
            homeOwnershipID: "",

            employmentStatusID: "",
            employmentOccupation: "",
            employmentSector: "",
            employerName: "",
            employmentAddr: "",
            employmentAddrPostcode: "",
            employmentCity: "",
            employmentState: "",
            employmentDurationYear: 0,
            employmentDurationMonth: 0,
            employerContactNo: "",

            loanAmount: 0,
            loanTenure: 0,
            loanPurposeID: "",

            borrowerBankId: "",
            borrowerBankAccNo: "",

            debtInfo: [
                {
                    debtTypeID: "",
                    monthlyDebtCommitment: "",
                },
            ],
        },
    });

    const [productInfo, setProductInfo] =
        useState<LoanProduct | null>(null);

    const [loanPurposes, setLoanPurposes] = useState<any[]>([]);
    const [homeOwnershipStatuses, setHomeOwnershipStatuses] =useState<any[]>([]);
    const [employmentStatuses, setEmploymentStatuses] =useState<any[]>([]);
    const [sectorList, setSectorList] = useState<any[]>([]);
    const [stateList, setStateList] = useState<any[]>([]);
    const [eduLevelList, setEduLevelList] = useState<any[]>([]);
    const [debtTypeList, setDebtTypeList] = useState<any[]>([]);
    const [bankList, setBankList] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLoanApplicationForm = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [
                productResponse,
                loanPurposeData,
                homeOwnershipData,
                employmentStatusData,
                sectorData,
                stateData,
                eduLevelData,
                debtTypeData,
                bankData,
            ] = await Promise.all([
                getLoanProductById(loanProductId),
                getLoanPurposes(),
                getHomeOwnershipStatuses(),
                getEmploymentStatuses(),
                getSectorList(),
                getStateList(),
                getEduLevelList(),
                getDebtTypeList(),
                getBankList(),
            ]);

            if (productResponse.success) {
                setProductInfo(productResponse.data);

                setValue(
                    "loanAmount",
                    Number(
                        productResponse.data.loan_product_min_amount
                    )
                );
            }

            setLoanPurposes(
                loanPurposeData.data ?? []
            );

            setHomeOwnershipStatuses(
                homeOwnershipData.data ?? []
            );

            setEmploymentStatuses(
                employmentStatusData.data ?? []
            );

            setSectorList(
                sectorData.data ?? []
            );

            setStateList(
                stateData.data ?? []
            );

            setEduLevelList(
                eduLevelData.data ?? []
            );

            setDebtTypeList(
                debtTypeData.data ?? []
            );

            setBankList(
                bankData.data ?? []
            );
        } catch (error) {
            console.error(
                "Failed to fetch loan application form data:",
                error
            );

            setError(
                "Failed to load loan application form data."
            );
        } finally {
            setLoading(false);
        }
    }, [loanProductId, setValue]);

    useEffect(() => {
        fetchLoanApplicationForm();
    }, [fetchLoanApplicationForm]);

    return {
        control,
        register,
        setValue,
        getValues,
        watch,
        reset,
        trigger,
        handleSubmit,
        errors,

        productInfo,

        loanPurposes,
        homeOwnershipStatuses,
        employmentStatuses,
        sectorList,
        stateList,
        eduLevelList,
        debtTypeList,
        bankList,

        loading,
        error,
        refetch: fetchLoanApplicationForm,
    };
};

export default useLoanApplicationForm;